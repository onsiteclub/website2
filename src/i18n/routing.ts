import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr', 'es', 'pt'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // no /en prefix for default locale
  localeDetection: false, // never auto-redirect based on Accept-Language
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
