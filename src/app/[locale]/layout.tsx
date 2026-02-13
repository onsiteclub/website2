import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Montserrat, Space_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { AccessibilityProvider } from '@/providers/AccessibilityProvider';
import { TradeProvider } from '@/providers/TradeProvider';
import '../globals.css';

const ChatWidget = dynamic(() => import('@/components/global/ChatWidget'), {
  ssr: false,
});
const AccessibilityToolbar = dynamic(
  () => import('@/components/global/AccessibilityToolbar'),
  { ssr: false }
);

const SITE_URL = 'https://www.onsiteclub.ca';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const title = t('title');
  const description = t('description');
  const canonicalUrl = locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${l}`,
        ])
      ),
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'OnSite Club',
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'ai-content-declaration': 'This site provides llms.txt for AI crawlers',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* Anti-FOUC: apply saved trade + accessibility prefs before first paint */
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('onsite-trade') || 'default';
    document.documentElement.setAttribute('data-trade', t);
    var a = localStorage.getItem('onsite-a11y');
    if (a) {
      var p = JSON.parse(a);
      if (p.highContrast) document.documentElement.classList.add('high-contrast');
      if (p.largeFont) document.documentElement.classList.add('large-font');
      if (p.reducedMotion) document.documentElement.classList.add('reduced-motion');
    }
  } catch(e){}
})();
`;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${spaceMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <TradeProvider>
            <AccessibilityProvider>
              {children}
              <ChatWidget locale={locale} />
              <AccessibilityToolbar />
            </AccessibilityProvider>
          </TradeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
