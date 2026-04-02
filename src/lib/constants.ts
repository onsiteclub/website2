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
    image: '/images/product-men.webp',
    alt: 'OnSite Club The Jump t-shirt with construction skyline graphic',
    variant: 'main',
  },
  {
    name: 'T-Shirt — Mascot',
    price: '$38',
    image: '/images/product-women.webp',
    alt: 'OnSite Club Mascot t-shirt with brand mascot graphic',
    variant: 'thumb',
  },
  {
    name: 'T-Shirt — Classic',
    price: '$45',
    image: '/images/product-members.webp',
    alt: 'OnSite Club Classic members-only branded t-shirt',
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

export const LEARN_SLUGS = [
  'construction-steps',
  'safety-equipment',
  'trades-guide',
  'starter-kit',
  'calculator-guide',
  'timekeeper-setup',
  'construction-terminology',
] as const;

export type LearnSlug = (typeof LEARN_SLUGS)[number];

export const SHOP_URL = 'https://shop.onsiteclub.ca';
export const DASHBOARD_URL = 'https://dashboard.onsiteclub.ca';
export const CALCULATOR_URL = 'https://calculator.onsiteclub.ca';
export const CALCULATOR_IOS_URL = 'https://apps.apple.com/us/app/onsite-calculator/id6758554794';
export const CALCULATOR_ANDROID_URL = 'https://play.google.com/store/apps/details?id=ca.onsiteclub.calculator';
export const TIMEKEEPER_URL = 'https://timekeeperweb.onsiteclub.ca';
export const TIMEKEEPER_ANDROID_URL = 'https://play.google.com/store/apps/details?id=com.onsiteclub.timekeeper&pcampaignid=web_share';
export const CHECKLIST_URL = 'https://checklist.onsiteclub.ca/self';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61574383500621';
export const FACEBOOK_COMMUNITY_URL = 'https://www.facebook.com/groups/919479544305679';
export const INSTAGRAM_URL = 'https://www.instagram.com/onsite.club/';
export const LEARN_URL = 'https://learn.onsiteclub.ca';
export const TECH_URL = 'https://tech.onsiteclub.ca';
