# SEO Implementation Directive — onsiteclub.ca

> **Generated**: 2026-03-12
> **Auditor**: Claude (Senior SEO Engineer)
> **Target**: Next.js 14 App Router site with next-intl i18n (en, fr, es, pt)
> **Deployment**: Vercel (auto-deploy from GitHub)

---

## Audit Summary

### What is already good

| Area | Details | Files |
|------|---------|-------|
| **Metadata API** | Uses `generateMetadata` correctly with per-locale titles, descriptions, canonicals, OG, and Twitter cards | `src/app/[locale]/layout.tsx` |
| **hreflang alternates** | `alternates.languages` set in layout and learn pages; sitemap also emits `xhtml:link` hreflang annotations | `layout.tsx`, `sitemap.ts` |
| **Canonical URLs** | Correctly generated per locale, default locale has no prefix | `layout.tsx`, `learn/[slug]/page.tsx` |
| **`<html lang>`** | Dynamically set to `{locale}` on every page | `layout.tsx:118` |
| **JSON-LD structured data** | Comprehensive `@graph` with Organization, WebSite, SoftwareApplication ×2, Product ×3, FAQPage ×10 | `[locale]/page.tsx:16-215` |
| **Article schema** | Learn pages include Article JSON-LD with headline, description, author, publisher, language | `learn/[slug]/page.tsx:96-113` |
| **Semantic HTML** | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>` used correctly; proper heading hierarchy h1 > h2 > h3 | All section components |
| **`generateStaticParams`** | All locale × slug combinations pre-rendered at build time for learn and legal pages | `layout.tsx:79`, `learn/page.tsx:15`, `legal/page.tsx:19` |
| **Programmatic robots.ts** | Allows all crawlers + AI bots (GPTBot, ClaudeBot, anthropic-ai, etc.) | `src/app/robots.ts` |
| **Programmatic sitemap.ts** | Dynamic sitemap with locale alternates for homepage + all learn articles | `src/app/sitemap.ts` |
| **Font optimization** | `next/font/google` with `display: 'swap'` prevents render-blocking | `layout.tsx:22-33` |
| **Dynamic imports** | ChatWidget and AccessibilityToolbar loaded with `dynamic()` + `ssr: false` | `layout.tsx:12-18` |
| **External link security** | All external links have `target="_blank"` + `rel="noopener noreferrer"` | All components |
| **LLMs.txt** | Provides `llms.txt` and `llms-full.txt` for AI crawlers | `public/llms.txt` |
| **Accessibility** | aria-labels, aria-hidden on decorative SVGs, aria-expanded on toggles, proper form labels | Throughout |
| **Hero image priority** | Hero background uses `priority` prop for LCP optimization | `Hero.tsx:81` |

---

## CRITICAL Issues (Fix Immediately)

### C1 — Missing `x-default` hreflang

**Problem**: The `alternates.languages` in `layout.tsx` only maps `en`, `fr`, `es`, `pt` — there is no `x-default` entry. Google uses `x-default` to determine which URL to show when no locale matches the user's language. Without it, Google may pick the wrong locale variant for international users.

**File**: `src/app/[locale]/layout.tsx:51-58`

**Fix**:
```tsx
alternates: {
  canonical: canonicalUrl,
  languages: {
    ...Object.fromEntries(
      routing.locales.map((l) => [
        l,
        l === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${l}`,
      ])
    ),
    'x-default': SITE_URL,  // ← ADD THIS
  },
},
```

**Also apply to**: `learn/[slug]/page.tsx:44-51` and `sitemap.ts:11-19` — add `'x-default'` to every `localeAlternates` function.

**Research reference**: Google's hreflang documentation states `x-default` is essential for multilingual sites to signal the default/fallback page.

---

### C2 — Missing `title.template` — subpages don't inherit brand suffix consistently

**Problem**: The root layout uses a flat `title` string (`"OnSite Club — Built for Those Who Build"`). Child pages manually append ` | OnSite Club` (e.g. `learn/[slug]/page.tsx:40`). This is fragile and inconsistent. If a page forgets to append the brand, the title tag will have no brand association.

**File**: `src/app/[locale]/layout.tsx:47-48`

**Fix**: Use `title.template` and `title.default`:
```tsx
return {
  title: {
    template: '%s | OnSite Club',
    default: t('title'),  // "OnSite Club — Built for Those Who Build"
  },
  description,
  // ... rest unchanged
};
```

Then in child pages, return just the page title (without manual ` | OnSite Club`):
```tsx
// learn/[slug]/page.tsx
return {
  title: title,  // Will render as "Construction Steps | OnSite Club"
  // ...
};
```

**Research reference**: Next.js docs recommend `title.template` in the root layout to ensure all pages carry the brand suffix automatically.

---

### C3 — Legal pages missing from sitemap

**Problem**: `sitemap.ts` includes the homepage and learn articles but **not** the 4 legal pages (`calculator-privacy`, `calculator-terms`, `timekeeper-privacy`, `timekeeper-terms`). While legal pages are low-priority for ranking, they need to be indexed for app store compliance and user trust signals.

**File**: `src/app/sitemap.ts`

**Fix**: Add legal pages after the learn entries:
```tsx
import { LEARN_SLUGS } from '@/lib/constants';

const LEGAL_SLUGS = ['calculator-privacy', 'calculator-terms', 'timekeeper-privacy', 'timekeeper-terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    // ... homepage entry ...
  ];

  // Learn articles
  for (const slug of LEARN_SLUGS) {
    entries.push({
      url: `${SITE_URL}/learn/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: localeAlternates(`/learn/${slug}`),
    });
  }

  // Legal pages
  for (const slug of LEGAL_SLUGS) {
    entries.push({
      url: `${SITE_URL}/legal/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: localeAlternates(`/legal/${slug}`),
    });
  }

  return entries;
}
```

---

### C4 — OpenGraph `locale` format is wrong

**Problem**: The OG `locale` is set to bare `locale` value (e.g. `"en"`, `"fr"`). OpenGraph protocol requires the format `language_TERRITORY` (e.g. `"en_CA"`, `"fr_CA"`, `"es_MX"`, `"pt_BR"`). Incorrect locale format means Facebook/LinkedIn/WhatsApp may not correctly associate the content with a regional audience.

**File**: `src/app/[locale]/layout.tsx:65`

**Fix**: Map locales to proper OG territory codes:
```tsx
const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_CA',
  fr: 'fr_CA',
  es: 'es_419',  // Latin America Spanish
  pt: 'pt_BR',   // Brazilian Portuguese
};

// In generateMetadata:
openGraph: {
  title,
  description,
  url: canonicalUrl,
  siteName: 'OnSite Club',
  locale: OG_LOCALE_MAP[locale] || 'en_CA',
  type: 'website',
},
```

**Also apply to**: `learn/[slug]/page.tsx:58` — same issue.

---

## IMPORTANT Issues (Fix Soon)

### I1 — Empty alt text on Learn card images

**Problem**: `LearnTeaser.tsx:32` renders learn cards with `alt=""`. These are NOT decorative — they are content images paired with learn paths. Empty alt means Google Image Search won't index them, and screen readers skip them.

**File**: `src/components/sections/LearnTeaser.tsx:32`

**Fix**: Add descriptive alt text using the card key for i18n:
```tsx
const LEARN_CARDS = [
  { slug: 'construction-steps', image: '/images/learn.png', key: 'card_steps', alt: 'Construction career pathway guide' },
  { slug: 'safety-equipment', image: '/images/epis.png', key: 'card_safety', alt: 'Construction safety equipment and PPE' },
  { slug: 'trades-guide', image: '/images/trades.png', key: 'card_trades', alt: 'Construction trades overview' },
  { slug: 'starter-kit', image: '/images/kit-tools.webp', key: 'card_kit', alt: 'Construction starter toolkit' },
] as const;

// In JSX:
<Image src={card.image} alt={card.alt} fill sizes="(max-width: 768px) 100vw, 33vw" />
```

**Research reference**: Google's image SEO guidelines state that descriptive alt text is the #1 signal for image search ranking.

---

### I2 — Product schema uses hardcoded fallback data, not API data

**Problem**: The JSON-LD Product schema on the homepage (`page.tsx:85-126`) uses hardcoded product names, prices, and local image paths. Meanwhile, the Gear component fetches real products from `shop.onsiteclub.ca/api/featured`. This means structured data doesn't match what the user sees if the API returns different products. Google may flag this as a schema mismatch.

**File**: `src/app/[locale]/page.tsx:84-126`

**Fix (Option A — conservative)**: Update the hardcoded Product schema to match the current real products in the shop. Since the schema is server-rendered and the API is client-side, keep them in sync manually or remove Product schema from the homepage entirely (products live on shop.onsiteclub.ca, not the main site).

**Fix (Option B — advanced)**: Fetch products server-side in the page component and generate the Product schema dynamically:
```tsx
// In the Home page component (server component)
const res = await fetch('https://shop.onsiteclub.ca/api/featured', { next: { revalidate: 3600 } });
const data = await res.json();
const products = data.products || [];

const productSchemas = products.map((p: ShopProduct) => ({
  '@type': 'Product',
  name: p.name,
  image: p.image,
  brand: { '@id': `${SITE_URL}/#organization` },
  offers: {
    '@type': 'Offer',
    price: p.price.toFixed(2),
    priceCurrency: 'CAD',
    availability: 'https://schema.org/InStock',
    url: p.url,
  },
}));
```

**Recommendation**: Option A is safer. Remove the 3 hardcoded Product schemas from the homepage since the real product pages live on `shop.onsiteclub.ca`. A product schema should ideally be on the page where the purchase happens.

---

### I3 — No BreadcrumbList schema on learn/legal pages

**Problem**: Learn and legal pages have no breadcrumb structured data. BreadcrumbList is one of the most impactful schema types for search appearance — Google displays breadcrumbs in search results, improving CTR.

**File**: `src/app/[locale]/learn/[slug]/page.tsx` and `legal/[slug]/page.tsx`

**Fix**: Add BreadcrumbList JSON-LD alongside the existing Article schema:
```tsx
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Learn',
      item: `${SITE_URL}/learn`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: title,
    },
  ],
};
```

Render as a second `<script type="application/ld+json">` alongside the Article schema.

---

### I4 — `lastModified: new Date()` in sitemap produces today's date every build

**Problem**: `sitemap.ts` uses `lastModified: new Date()` for all entries. This means every Vercel deployment generates a new date for all URLs, even if the content hasn't changed. Frequent false `lastmod` signals devalue the field — Google may start ignoring it.

**File**: `src/app/sitemap.ts:27, 39`

**Fix**: Use actual last-modified dates:
```tsx
const entries: MetadataRoute.Sitemap = [
  {
    url: SITE_URL,
    lastModified: new Date('2026-03-12'),  // Update when homepage content changes
    changeFrequency: 'weekly',
    priority: 1,
    alternates: localeAlternates(''),
  },
];
```

Or for a more maintainable approach, use git commit dates or a content version constant.

---

### I5 — Product alt texts are generic

**Problem**: Products in `constants.ts` have alt texts like `"T-Shirt The Jump"`, `"T-Shirt Mascot"`, `"T-Shirt Classic"`. These are just the product names repeated. Better alt text describes the image content for both accessibility and image SEO.

**File**: `src/lib/constants.ts:18, 24, 30`

**Fix**:
```tsx
export const PRODUCTS: Product[] = [
  {
    name: 'T-Shirt — The Jump',
    price: '$38',
    image: '/images/product-men.webp',
    alt: 'OnSite Club The Jump t-shirt — construction skyline graphic on dark cotton tee',
    variant: 'main',
  },
  {
    name: 'T-Shirt — Mascot',
    price: '$38',
    image: '/images/product-women.webp',
    alt: 'OnSite Club Mascot t-shirt — brand mascot graphic on fitted tee',
    variant: 'thumb',
  },
  {
    name: 'T-Shirt — Classic',
    price: '$45',
    image: '/images/product-members.webp',
    alt: 'OnSite Club Classic t-shirt — members-only branded cotton tee',
    variant: 'thumb',
  },
];
```

**Research reference**: Image alt should describe what's visible in the image + include the brand name. Keep under 125 characters.

---

### I6 — No `disallow` rules for API routes in robots.txt

**Problem**: `robots.ts` allows all paths (`/`) but doesn't disallow internal API routes (`/api/chat`, `/api/whisper`). While these won't typically appear in search results, explicitly blocking them prevents wasted crawl budget.

**File**: `src/app/robots.ts`

**Fix**:
```tsx
rules: [
  {
    userAgent: '*',
    allow: '/',
    disallow: ['/api/'],
  },
  // ... AI bot rules unchanged
],
```

---

### I7 — Meta description not optimized for search intent

**Problem**: The current description `"OnSite Club — construction lifestyle brand. Gear, digital tools, and a community for people who actually build. Based in Ontario, Canada."` is decent but doesn't include key action-oriented phrases that would improve CTR from search results.

**File**: `src/messages/en.json:5`

**Fix** (English only — adapt translations accordingly):
```json
"description": "Construction lifestyle brand based in Ontario, Canada. Premium gear, free digital tools (calculator, time tracker), and a crew for tradespeople who actually build."
```

This version:
- Leads with "Construction lifestyle brand" (keyword match)
- Includes "Ontario, Canada" (geo signal)
- Mentions "free digital tools" (click incentive)
- Names specific tools (long-tail keywords)
- Keeps under 160 characters

---

## Nice to Have (Competitive Advantage)

### N1 — Add `twitter-image.tsx` alongside OG image

**Problem**: There is no Twitter-specific image. Twitter uses OG images as fallback but a dedicated `twitter-image` can be optimized for Twitter's 2:1 aspect ratio (1200×600) vs OG's 1.91:1 (1200×630).

**Fix**: Create `src/app/[locale]/twitter-image.tsx` with the same design as `opengraph-image.tsx` but with `size: { width: 1200, height: 600 }`.

---

### N2 — Add image sitemaps

**Problem**: The sitemap doesn't include `images` entries. Google can discover images from the sitemap's `images` property, which helps with Google Image Search indexing.

**Fix**: Add `images` to sitemap entries:
```tsx
{
  url: SITE_URL,
  lastModified: new Date('2026-03-12'),
  changeFrequency: 'weekly',
  priority: 1,
  alternates: localeAlternates(''),
  images: [
    `${SITE_URL}/images/product-men.webp`,
    `${SITE_URL}/images/product-women.webp`,
    `${SITE_URL}/images/product-members.webp`,
  ],
},
```

---

### N3 — Add `WebSite` SearchAction for sitelinks searchbox

**Problem**: The WebSite schema (`page.tsx:43-49`) doesn't include a `potentialAction` SearchAction. If you have site search functionality (the Navbar appears to have a search dropdown), adding this can trigger Google's sitelinks searchbox in results.

**Fix**: Add to the WebSite schema:
```tsx
{
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'OnSite Club',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: ['en', 'fr', 'es', 'pt'],
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
},
```

Only add this if you have or plan to have a `/search` page. Otherwise skip.

---

### N4 — Add `datePublished` / `dateModified` to Article schema

**Problem**: Learn page Article schemas (`learn/[slug]/page.tsx:96-113`) don't include `datePublished` or `dateModified`. These are important for Google's freshness signals, especially for "how to" content.

**Fix**: Add dates to the schema and translations:
```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: t(`${slug}.meta_desc`),
  url: canonicalUrl,
  datePublished: '2025-11-01',  // or from translation data
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'OnSite Club', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'OnSite Club', url: SITE_URL },
  inLanguage: locale,
};
```

---

### N5 — Add `ContactPoint` to Organization schema

**Problem**: The Organization schema has address and social links but no `contactPoint`. Adding a ContactPoint can surface a contact method directly in Google Knowledge Panels.

**Fix**: Add to the Organization schema in `page.tsx`:
```tsx
contactPoint: {
  '@type': 'ContactPoint',
  contactType: 'customer service',
  email: 'contact@onsiteclub.ca',
  availableLanguage: ['English', 'French', 'Spanish', 'Portuguese'],
},
```

---

### N6 — Consider `next/font` size-adjust for zero CLS

**Problem**: While `display: 'swap'` is set, there can still be a slight layout shift when the web font loads and replaces the system fallback. Using `adjustFontFallback: true` (default in `next/font`) auto-generates a `size-adjust` CSS descriptor to match the fallback font metrics.

**File**: `src/app/[locale]/layout.tsx:22-33`

**Status**: `next/font/google` already applies `adjustFontFallback: true` by default. Verify this is working by checking for CLS in Chrome DevTools > Performance. No code change needed unless CLS is detected.

---

## Keyword Strategy

### Brand positioning
OnSite Club is a **construction lifestyle brand** — NOT a workwear safety brand, NOT a price-competitive retailer. The audience is construction workers (especially immigrant and Latino workers in Canada) who take pride in their trade.

### Primary keywords (target in title tags and H1s)
- `construction lifestyle brand Canada`
- `construction apparel Ontario`
- `construction tools app`
- `construction calculator app`
- `GPS time tracker construction`

### Secondary keywords (target in descriptions and content)
- `construction crew gear`
- `tradesperson apparel Canada`
- `construction worker community`
- `voice construction calculator`
- `geofence time tracking`
- `construction career Ontario`
- `construction safety certification Ontario`

### Long-tail keywords (target in learn articles)
- `how to start construction career Ontario`
- `construction safety equipment list Canada`
- `construction trades guide Ontario`
- `WHMIS certification Ontario free`
- `Working at Heights certification Ontario`
- `construction terminology glossary`

### Multilingual keyword signals
- Portuguese: `comunidade construção Canadá`, `ferramentas construção`
- Spanish: `comunidad construcción Canadá`, `herramientas construcción`
- French: `métiers construction Ontario`, `communauté construction Canada`

### Keywords to NEVER use
- cheap, affordable, budget, discount, low-cost, bargain
- wholesale, bulk, clearance, sale, deal
- Any comparison to safety-only brands (e.g., "better than Dickies")

---

## Implementation Priority Order

1. **C1** — Add `x-default` hreflang (5 min)
2. **C2** — Add `title.template` to root layout (10 min)
3. **C4** — Fix OG locale format to `language_TERRITORY` (5 min)
4. **C3** — Add legal pages to sitemap (5 min)
5. **I6** — Add `/api/` disallow to robots.txt (2 min)
6. **I1** — Fix empty alt on learn card images (5 min)
7. **I7** — Optimize meta descriptions (15 min — all 4 locales)
8. **I3** — Add BreadcrumbList schema to learn/legal pages (15 min)
9. **I4** — Fix sitemap lastModified dates (5 min)
10. **I5** — Improve product alt texts (5 min)
11. **I2** — Address Product schema mismatch (10 min)
12. **N5** — Add ContactPoint to Organization schema (5 min)
13. **N4** — Add dates to Article schema (10 min)
14. **N2** — Add image sitemaps (10 min)
15. **N1** — Add twitter-image.tsx (10 min)
16. **N3** — Add SearchAction to WebSite schema (5 min — only if search exists)

---

## Validation Checklist

After implementing all fixes, run these checks:

### Automated checks
```bash
# 1. Build succeeds
npx next build

# 2. Validate JSON-LD (copy output and paste into https://validator.schema.org/)
curl -s https://www.onsiteclub.ca/ | grep -o '<script type="application/ld+json">.*</script>'

# 3. Check robots.txt
curl -s https://www.onsiteclub.ca/robots.txt

# 4. Check sitemap.xml — verify legal pages and x-default alternates
curl -s https://www.onsiteclub.ca/sitemap.xml

# 5. Check meta tags for homepage
curl -s https://www.onsiteclub.ca/ | grep -E '<title>|<meta name="description"|hreflang|canonical|og:'

# 6. Check meta tags for learn page
curl -s https://www.onsiteclub.ca/learn/construction-steps | grep -E '<title>|<meta name="description"|hreflang|canonical'

# 7. Check French locale meta
curl -s https://www.onsiteclub.ca/fr | grep -E '<title>|hreflang|canonical'
```

### Manual checks
- [ ] Google Rich Results Test: https://search.google.com/test/rich-results (paste homepage URL)
- [ ] Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/ (paste URL, check OG image/title)
- [ ] Chrome DevTools > Lighthouse > SEO audit (score should be 95+)
- [ ] Chrome DevTools > Performance > Check CLS is under 0.1
- [ ] Verify every page has exactly one `<h1>` tag
- [ ] Verify `<html lang>` matches the locale on every page variant
- [ ] Open homepage in incognito, view source, search for `x-default` — should be present
- [ ] Open sitemap.xml, verify all legal page URLs are included
- [ ] Check that `<title>` on learn pages follows pattern: `{Page Title} | OnSite Club`

---

## Files to modify (summary)

| File | Changes |
|------|---------|
| `src/app/[locale]/layout.tsx` | Add `x-default` hreflang, `title.template`, fix OG locale, add OG locale map |
| `src/app/[locale]/page.tsx` | Add ContactPoint to Organization schema, consider removing hardcoded Product schemas |
| `src/app/[locale]/learn/[slug]/page.tsx` | Remove manual ` \| OnSite Club` from title, add BreadcrumbList schema, fix OG locale, add `x-default`, add datePublished/dateModified |
| `src/app/[locale]/legal/[slug]/page.tsx` | Remove manual ` \| OnSite Club` from title, add BreadcrumbList schema, add `x-default` |
| `src/app/sitemap.ts` | Add legal pages, add `x-default`, fix lastModified dates, add image entries |
| `src/app/robots.ts` | Add `disallow: ['/api/']` |
| `src/components/sections/LearnTeaser.tsx` | Add descriptive alt text to learn card images |
| `src/lib/constants.ts` | Improve product alt texts |
| `src/messages/en.json` | Optimize meta description |
| `src/messages/es.json` | Optimize meta description (Spanish) |
| `src/messages/fr.json` | Optimize meta description (French) |
| `src/messages/pt.json` | Optimize meta description (Portuguese) |
