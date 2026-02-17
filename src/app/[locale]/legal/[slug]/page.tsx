import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';

const LEGAL_SLUGS = [
  'calculator-privacy',
  'calculator-terms',
  'timekeeper-privacy',
  'timekeeper-terms',
] as const;

type LegalSlug = (typeof LEGAL_SLUGS)[number];

const SITE_URL = 'https://www.onsiteclub.ca';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LEGAL_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!LEGAL_SLUGS.includes(slug as LegalSlug)) return {};

  const t = await getTranslations({ locale, namespace: 'legal' });
  const title = t(`${slug}.title`);

  return {
    title: `${title} | OnSite Club`,
    robots: { index: true, follow: true },
    alternates: {
      canonical:
        locale === routing.defaultLocale
          ? `${SITE_URL}/legal/${slug}`
          : `${SITE_URL}/${locale}/legal/${slug}`,
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!LEGAL_SLUGS.includes(slug as LegalSlug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'legal' });
  const title = t(`${slug}.title`);
  const content = t.raw(`${slug}.content`) as string;
  const updated = t(`${slug}.updated`);

  return (
    <>
      <Navbar />
      <main className="learn-article">
        <article className="learn-container">
          <a
            href={`/${locale === routing.defaultLocale ? '' : locale}#contact`}
            className="learn-back"
          >
            {t('back')}
          </a>

          <header className="learn-header">
            <h1>{title}</h1>
            <span className="learn-meta">{updated}</span>
          </header>

          <div
            className="learn-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
