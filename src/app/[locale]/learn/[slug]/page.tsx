import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { LEARN_SLUGS, type LearnSlug } from '@/lib/constants';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import LearnCourseCards from '@/components/sections/LearnCourseCards';


const COURSE_SLUGS = ['construction-steps', 'safety-equipment', 'trades-guide', 'starter-kit'];

const SITE_URL = 'https://www.onsiteclub.ca';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LEARN_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!LEARN_SLUGS.includes(slug as LearnSlug)) return {};

  const t = await getTranslations({ locale, namespace: 'learn' });
  const title = t(`${slug}.title`);
  const description = t(`${slug}.meta_desc`);
  const canonicalPath = `/learn/${slug}`;
  const canonicalUrl =
    locale === routing.defaultLocale
      ? `${SITE_URL}${canonicalPath}`
      : `${SITE_URL}/${locale}${canonicalPath}`;

  return {
    title: `${title} | OnSite Club`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale
            ? `${SITE_URL}${canonicalPath}`
            : `${SITE_URL}/${l}${canonicalPath}`,
        ])
      ),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'OnSite Club',
      locale,
      type: 'article',
    },
  };
}

export default async function LearnArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!LEARN_SLUGS.includes(slug as LearnSlug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'learn' });
  const tc = await getTranslations({ locale, namespace: 'learn_courses' });
  const title = t(`${slug}.title`);
  const readingTime = t(`${slug}.reading_time`);

  // Course cards for the 3 main learn pages (no article content)
  const hasCourses = COURSE_SLUGS.includes(slug);
  const courses = hasCourses ? (tc.raw(slug) as Array<{ title: string; desc: string; quote: string; tags: string[]; cta: string; url: string }>) : [];

  // Article HTML content only for non-course pages
  const content = hasCourses ? '' : (t.raw(`${slug}.content`) as string);

  // Related articles: pick 2 others
  const related = LEARN_SLUGS.filter((s) => s !== slug).slice(0, 2);

  // JSON-LD Article schema
  const canonicalUrl =
    locale === routing.defaultLocale
      ? `${SITE_URL}/learn/${slug}`
      : `${SITE_URL}/${locale}/learn/${slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: t(`${slug}.meta_desc`),
    url: canonicalUrl,
    author: {
      '@type': 'Organization',
      name: 'OnSite Club',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'OnSite Club',
      url: SITE_URL,
    },
    inLanguage: locale,
  };

  return (
    <>
      <Navbar />
      <main className="learn-article">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className={hasCourses ? 'learn-container learn-container-wide' : 'learn-container'}>
          <a href={`/${locale === routing.defaultLocale ? '' : locale}#learn`} className="learn-back">
            {t('back')}
          </a>

          <header className="learn-header">
            <h1>{title}</h1>
            {!hasCourses && (
              <span className="learn-meta">
                {readingTime} {t('reading_time')}
              </span>
            )}
          </header>

          {hasCourses && courses.length > 0 && (
            <LearnCourseCards courses={courses} slug={slug} />
          )}

          {!hasCourses && content && (
            <div
              className="learn-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}

          {!hasCourses && related.length > 0 && (
            <nav className="learn-related">
              <h2>{t('related')}</h2>
              <div className="learn-related-grid">
                {related.map((relSlug) => (
                  <a
                    key={relSlug}
                    href={
                      locale === routing.defaultLocale
                        ? `/learn/${relSlug}`
                        : `/${locale}/learn/${relSlug}`
                    }
                    className="learn-related-card"
                  >
                    <h3>{t(`${relSlug}.title`)}</h3>
                    <span>
                      {t(`${relSlug}.reading_time`)} {t('reading_time')}
                    </span>
                  </a>
                ))}
              </div>
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
