/* ═══════════════════════════════════
   Typed data — products, tools, pathway steps
   ═══════════════════════════════════ */

export interface Product {
  name: string;
  price: string;
  image: string;
  alt: string;
  variant: 'main' | 'thumb';
}

export const PRODUCTS: Product[] = [
  {
    name: 'T-Shirt — The Jump',
    price: '$38',
    image: '/images/product-men.png',
    alt: 'T-Shirt The Jump',
    variant: 'main',
  },
  {
    name: 'T-Shirt — Mascot',
    price: '$38',
    image: '/images/product-women.png',
    alt: 'T-Shirt Mascot',
    variant: 'thumb',
  },
  {
    name: 'T-Shirt — Classic',
    price: '$45',
    image: '/images/product-members.png',
    alt: 'T-Shirt Classic',
    variant: 'thumb',
  },
];

export interface PathwayStep {
  i18nKey: string;
  link: string;
  badges: string[]; // i18n keys like 'pathway.badge_mandatory'
  badgeClasses: string[]; // CSS classes like 'mandatory'
  isGovLink: boolean;
}

export const PATHWAY_STEPS: PathwayStep[] = [
  {
    i18nKey: 'step1',
    link: 'https://www.labour.gov.on.ca/english/hs/elearn/worker/foursteps.php',
    badges: ['pathway.badge_mandatory', 'pathway.badge_free', 'pathway.badge_gov'],
    badgeClasses: ['mandatory', 'free-badge', 'gov'],
    isGovLink: true,
  },
  {
    i18nKey: 'step2',
    link: 'https://aixsafety.com/new-worker-health-and-safety-awareness-training-for-ontario/',
    badges: ['pathway.badge_mandatory', 'pathway.badge_free'],
    badgeClasses: ['mandatory', 'free-badge'],
    isGovLink: true,
  },
  {
    i18nKey: 'step3',
    link: 'https://www.ontario.ca/page/health-and-safety-training',
    badges: ['pathway.badge_mandatory'],
    badgeClasses: ['mandatory'],
    isGovLink: false,
  },
  {
    i18nKey: 'step4',
    link: 'https://onlinesafetytraining.ca/',
    badges: [],
    badgeClasses: [],
    isGovLink: false,
  },
  {
    i18nKey: 'step5',
    link: 'https://www.ontario.ca/page/health-and-safety-training',
    badges: ['pathway.badge_free', 'pathway.badge_gov'],
    badgeClasses: ['free-badge', 'gov'],
    isGovLink: true,
  },
  {
    i18nKey: 'step6',
    link: 'https://www.constructionontario.ca/course-category/advanced-safety/',
    badges: [],
    badgeClasses: [],
    isGovLink: false,
  },
  {
    i18nKey: 'step7',
    link: 'https://onlinesafetytraining.ca/',
    badges: ['pathway.badge_recommended'],
    badgeClasses: ['recommended'],
    isGovLink: false,
  },
  {
    i18nKey: 'step8',
    link: 'https://www.constructionontario.ca/course-category/advanced-safety/',
    badges: ['pathway.badge_specialized'],
    badgeClasses: ['specialized'],
    isGovLink: false,
  },
];

export const SHOP_URL = 'https://shop.onsiteclub.ca';
export const DASHBOARD_URL = 'https://dashboard.onsiteclub.ca';
export const CALCULATOR_URL = 'https://calculator.onsiteclub.ca';
export const TIMEKEEPER_URL = 'https://timekeeperweb.onsiteclub.ca';
export const FACEBOOK_URL = 'https://facebook.com/onsiteclub';
export const INSTAGRAM_URL = 'https://www.instagram.com/onsite.club/';
