import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = 'https://www.onsiteclub.ca';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const defaultLocale = routing.defaultLocale;

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [
            locale,
            locale === defaultLocale
              ? SITE_URL
              : `${SITE_URL}/${locale}`,
          ])
        ),
      },
    },
  ];
}
