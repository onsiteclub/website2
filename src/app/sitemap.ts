import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { LEARN_SLUGS } from '@/lib/constants';

const SITE_URL = 'https://www.onsiteclub.ca';

const LEGAL_SLUGS = [
  'calculator-privacy',
  'calculator-terms',
  'timekeeper-privacy',
  'timekeeper-terms',
];

function localeAlternates(path: string) {
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;
  return {
    languages: {
      ...Object.fromEntries(
        locales.map((locale) => [
          locale,
          locale === defaultLocale
            ? `${SITE_URL}${path}`
            : `${SITE_URL}/${locale}${path}`,
        ])
      ),
      'x-default': `${SITE_URL}${path}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date('2026-03-12'),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: localeAlternates(''),
    },
  ];

  // Learn articles
  for (const slug of LEARN_SLUGS) {
    entries.push({
      url: `${SITE_URL}/learn/${slug}`,
      lastModified: new Date('2026-03-12'),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: localeAlternates(`/learn/${slug}`),
    });
  }

  // Legal pages
  for (const slug of LEGAL_SLUGS) {
    entries.push({
      url: `${SITE_URL}/legal/${slug}`,
      lastModified: new Date('2026-03-12'),
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: localeAlternates(`/legal/${slug}`),
    });
  }

  return entries;
}
