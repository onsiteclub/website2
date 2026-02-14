import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import BuildProgress from '@/components/global/BuildProgress';
import CursorGlow from '@/components/global/CursorGlow';
import ScrollAssembly from '@/components/global/ScrollAssembly';
import Interactions from '@/components/global/Interactions';
import Hero from '@/components/sections/Hero';
import Tools from '@/components/sections/Tools';
import Gear from '@/components/sections/Gear';
import Manifesto from '@/components/sections/Manifesto';
import LearnTeaser from '@/components/sections/LearnTeaser';
import Contact from '@/components/sections/Contact';

const SITE_URL = 'https://www.onsiteclub.ca';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    /* ── Organization ── */
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'OnSite Club',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-onsite-club-02.png`,
      },
      description:
        'Construction lifestyle brand. Gear, digital tools, and a community for people who actually build. Based in Ontario, Canada.',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Ontario',
        addressCountry: 'CA',
      },
      sameAs: [
        'https://www.instagram.com/onsite.club/',
        'https://www.facebook.com/onsiteclub',
      ],
    },
    /* ── WebSite ── */
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'OnSite Club',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['en', 'fr', 'es', 'pt'],
    },
    /* ── SoftwareApplication: Calculator ── */
    {
      '@type': 'SoftwareApplication',
      name: 'OnSite Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web, Android, iOS',
      url: 'https://calculator.onsiteclub.ca',
      description:
        'Voice-powered construction calculator. Add, split and convert inch measurements by speaking. Supports fractions, imperial/metric, and material estimation.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CAD',
        description: 'Free basic tier. Pro at CA$9.99/month for voice input and advanced features.',
      },
      author: { '@id': `${SITE_URL}/#organization` },
    },
    /* ── SoftwareApplication: Timekeeper ── */
    {
      '@type': 'SoftwareApplication',
      name: 'OnSite Timekeeper',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Android, iOS',
      url: 'https://timekeeperweb.onsiteclub.ca',
      description:
        'GPS time tracking with geofence. Workers define job site zones on a map; app auto-clocks in/out. Works offline with background tracking.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CAD',
        description: 'Free with 1 zone. Pro at CA$9.99/month for unlimited zones and PDF exports.',
      },
      author: { '@id': `${SITE_URL}/#organization` },
    },
    /* ── Products ── */
    {
      '@type': 'Product',
      name: 'T-Shirt — The Jump',
      description: "Men's construction lifestyle tee featuring a skyline graphic. Part of OnSite Club's construction workwear line.",
      image: `${SITE_URL}/images/product-men.webp`,
      brand: { '@id': `${SITE_URL}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '38.00',
        priceCurrency: 'CAD',
        availability: 'https://schema.org/InStock',
        url: 'https://shop.onsiteclub.ca',
      },
    },
    {
      '@type': 'Product',
      name: 'T-Shirt — Mascot',
      description: 'Unisex graphic tee with the OnSite Club mascot. Construction lifestyle apparel.',
      image: `${SITE_URL}/images/product-women.webp`,
      brand: { '@id': `${SITE_URL}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '38.00',
        priceCurrency: 'CAD',
        availability: 'https://schema.org/InStock',
        url: 'https://shop.onsiteclub.ca',
      },
    },
    {
      '@type': 'Product',
      name: 'T-Shirt — Classic',
      description: 'Members-only branded tee exclusive to OnSite Club members.',
      image: `${SITE_URL}/images/product-members.webp`,
      brand: { '@id': `${SITE_URL}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '45.00',
        priceCurrency: 'CAD',
        availability: 'https://schema.org/InStock',
        url: 'https://shop.onsiteclub.ca',
      },
    },
    /* ── FAQPage (expanded to 10 questions) ── */
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is OnSite Club?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OnSite Club is a construction lifestyle brand based in Ontario, Canada. We build gear, digital tools, and a community for people who work in construction.',
          },
        },
        {
          '@type': 'Question',
          name: 'What digital tools does OnSite Club offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OnSite Club offers free web apps including a voice-enabled construction calculator, a GPS-based hour tracker (Timekeeper), with a job checklist and agenda planner coming soon.',
          },
        },
        {
          '@type': 'Question',
          name: 'What certifications do construction workers need in Ontario?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ontario construction workers need Worker Health & Safety Awareness training, WHMIS 2025, Working at Heights certification, and potentially Forklift, Confined Space, First Aid, and specialized safety training depending on their role.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the OnSite Calculator work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The OnSite Calculator lets you speak construction measurements naturally (e.g., "twelve and three-eighths plus four and a half") and get instant results. It handles fractions, imperial/metric conversion, and material estimation — all hands-free.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does OnSite Timekeeper track hours?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OnSite Timekeeper uses GPS geofencing. You define your job site zones on a map, and the app automatically clocks you in when you arrive and out when you leave. It works offline and generates weekly reports.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Blades loyalty program?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Blades are OnSite Club loyalty points. Members earn Blades through purchases, engagement, and referrals, then redeem them for exclusive gear and discounts in the OnSite Shop.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is OnSite Club available in multiple languages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The OnSite Club website and tools are available in English, French, Spanish, and Portuguese to serve Canada\'s diverse construction workforce.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does OnSite Club Pro cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OnSite Club Pro is CA$9.99/month. It includes voice calculator, unlimited Timekeeper zones, full SheetChat access, and a 15% discount in the OnSite Shop. A free tier is available for basic features.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where does OnSite Club ship?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'OnSite Club ships apparel within Canada. Digital tools (Calculator, Timekeeper) are available worldwide as web apps, with iOS and Android apps coming soon.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I start a construction career in Ontario?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Start by completing free mandatory certifications (Worker Health & Safety Awareness and WHMIS) online, get your PPE, and register with construction staffing agencies. Our Learn section has a complete step-by-step guide at onsiteclub.ca/learn/construction-steps.',
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CursorGlow />
      <BuildProgress />
      <div className="grid-overlay" aria-hidden="true"></div>

      <header>
        <Navbar />
      </header>

      <ScrollAssembly />

      <main>
        <Hero />
        <Manifesto />
        <Gear />
        <Tools />
        <LearnTeaser />
        <Contact />
      </main>

      <Footer />
      <Interactions />
    </>
  );
}
