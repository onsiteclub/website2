import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { LEARN_SLUGS } from '@/lib/constants';

const SITE_URL = 'https://www.onsiteclub.ca';

function localeAlternates(path: string) {
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [
        locale,
        locale === defaultLocale
          ? `${SITE_URL}${path}`
          : `${SITE_URL}/${locale}${path}`,
      ])
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Homepage
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: localeAlternates(''),
    },
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

  return entries;
}
