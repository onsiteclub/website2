import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import BuildProgress from '@/components/global/BuildProgress';
import CursorGlow from '@/components/global/CursorGlow';
import ScrollAssembly from '@/components/global/ScrollAssembly';
import Interactions from '@/components/global/Interactions';
import Hero from '@/components/sections/Hero';
import Tools from '@/components/sections/Tools';
import Shop from '@/components/sections/Shop';
import Pathway from '@/components/sections/Pathway';
import Community from '@/components/sections/Community';
import Contact from '@/components/sections/Contact';

const SITE_URL = 'https://www.onsiteclub.ca';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
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
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'OnSite Club',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: ['en', 'fr', 'es', 'pt'],
    },
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
      <div className="grid-overlay"></div>
      <Navbar />
      <ScrollAssembly />

      <Hero />
      <div className="connector assemble"></div>
      <div className="connector assemble"></div>
      <Tools />
      <Shop />
      <Pathway />
      <Community />
      <Contact />

      <Footer />
      <Interactions />
    </>
  );
}
