import type { TradeId } from '@/providers/TradeProvider';

type Locale = 'en' | 'fr' | 'es' | 'pt';

type TradeSection =
  | 'hero_subtitle'
  | 'shop_slogan'
  | 'welcome_toast'
  | 'membership_cta'
  | 'pathway';

type LocaleMap = Record<Locale, string>;

/**
 * Centralised per-trade content in all 4 languages.
 * Access: TRADE_CONTENT[trade][section][locale]
 */
export const TRADE_CONTENT: Record<
  TradeId,
  Partial<Record<TradeSection, LocaleMap>>
> = {
  /* ── Default (All Trades) ── */
  default: {
    hero_subtitle: {
      en: 'Tools, gear, and a crew that gets it.',
      fr: 'Outils, gear et un crew qui comprend.',
      es: 'Herramientas, equipo y un crew que entiende.',
      pt: 'Ferramentas, gear e um crew que entende.',
    },
  },

  /* ── Wood & Framing ── */
  wood: {
    hero_subtitle: {
      en: 'The backbone goes up first.',
      fr: "L'ossature se monte en premier.",
      es: 'La estructura se levanta primero.',
      pt: 'A estrutura sobe primeiro.',
    },
    shop_slogan: {
      en: 'I Frame This Country',
      fr: 'Je Charpente Ce Pays',
      es: 'Yo Enmarco Este País',
      pt: 'Eu Estruturo Este País',
    },
    welcome_toast: {
      en: 'Welcome, Framer. \u{1FA9A}',
      fr: 'Bienvenue, Charpentier. \u{1FA9A}',
      es: 'Bienvenido, Enmarcador. \u{1FA9A}',
      pt: 'Bem-vindo, Carpinteiro. \u{1FA9A}',
    },
    membership_cta: {
      en: 'Framers build the skeleton. Join yours.',
      fr: "Les charpentiers montent l'ossature. Rejoins la tienne.",
      es: 'Los enmarcadores construyen la estructura. Únete a la tuya.',
      pt: 'Carpinteiros montam a estrutura. Junte-se à sua.',
    },
    pathway: {
      en: 'From apprentice to Red Seal Carpenter.',
      fr: "D'apprenti à Charpentier Sceau Rouge.",
      es: 'De aprendiz a Carpintero Sello Rojo.',
      pt: 'De aprendiz a Carpinteiro Selo Vermelho.',
    },
  },

  /* ── Drywall & Finishing ── */
  drywall: {
    hero_subtitle: {
      en: 'Where structure becomes space.',
      fr: "Là où la structure devient espace.",
      es: 'Donde la estructura se vuelve espacio.',
      pt: 'Onde a estrutura vira espaço.',
    },
    shop_slogan: {
      en: 'Smooth Under Pressure',
      fr: 'Lisse Sous Pression',
      es: 'Liso Bajo Presión',
      pt: 'Liso Sob Pressão',
    },
    welcome_toast: {
      en: 'Welcome, Finisher. \u{1F527}',
      fr: 'Bienvenue, Finisseur. \u{1F527}',
      es: 'Bienvenido, Acabador. \u{1F527}',
      pt: 'Bem-vindo, Acabador. \u{1F527}',
    },
    membership_cta: {
      en: 'You make it look easy. We make it worth it.',
      fr: 'Tu fais paraître ça facile. On fait en sorte que ça vaille le coup.',
      es: 'Tú lo haces parecer fácil. Nosotros lo hacemos valer la pena.',
      pt: 'Você faz parecer fácil. A gente faz valer a pena.',
    },
    pathway: {
      en: 'Master the finish. Get certified.',
      fr: 'Maîtrise la finition. Obtiens ta certification.',
      es: 'Domina el acabado. Certifícate.',
      pt: 'Domine o acabamento. Certifique-se.',
    },
  },

  /* ── Electrical ── */
  electrical: {
    hero_subtitle: {
      en: 'Nothing works without you.',
      fr: 'Rien ne fonctionne sans toi.',
      es: 'Nada funciona sin ti.',
      pt: 'Nada funciona sem você.',
    },
    shop_slogan: {
      en: 'Wired Different',
      fr: 'Câblé Différemment',
      es: 'Cableado Diferente',
      pt: 'Cabeado Diferente',
    },
    welcome_toast: {
      en: 'Welcome, Sparky. \u{26A1}',
      fr: 'Bienvenue, Sparky. \u{26A1}',
      es: 'Bienvenido, Sparky. \u{26A1}',
      pt: 'Bem-vindo, Sparky. \u{26A1}',
    },
    membership_cta: {
      en: 'Power the crew.',
      fr: 'Alimente le crew.',
      es: 'Energiza al crew.',
      pt: 'Energize o crew.',
    },
    pathway: {
      en: 'Licensed to power the future.',
      fr: "Licencié pour alimenter l'avenir.",
      es: 'Licenciado para energizar el futuro.',
      pt: 'Licenciado para energizar o futuro.',
    },
  },

  /* ── Plumbing & HVAC ── */
  plumbing: {
    hero_subtitle: {
      en: 'The system nobody sees, everybody needs.',
      fr: 'Le système que personne ne voit, dont tout le monde a besoin.',
      es: 'El sistema que nadie ve, todos necesitan.',
      pt: 'O sistema que ninguém vê, todo mundo precisa.',
    },
    shop_slogan: {
      en: 'Under Pressure',
      fr: 'Sous Pression',
      es: 'Bajo Presión',
      pt: 'Sob Pressão',
    },
    welcome_toast: {
      en: 'Welcome, Pipefitter. \u{1F529}',
      fr: 'Bienvenue, Tuyauteur. \u{1F529}',
      es: 'Bienvenido, Plomero. \u{1F529}',
      pt: 'Bem-vindo, Encanador. \u{1F529}',
    },
    membership_cta: {
      en: 'Keep it flowing.',
      fr: 'Garde le flux.',
      es: 'Mantén el flujo.',
      pt: 'Mantenha o fluxo.',
    },
    pathway: {
      en: 'Certified systems. Trusted hands.',
      fr: 'Systèmes certifiés. Mains de confiance.',
      es: 'Sistemas certificados. Manos confiables.',
      pt: 'Sistemas certificados. Mãos confiáveis.',
    },
  },

  /* ── Concrete & Masonry ── */
  concrete: {
    hero_subtitle: {
      en: 'Everything stands on what you pour.',
      fr: 'Tout repose sur ce que tu coules.',
      es: 'Todo se sostiene sobre lo que viertes.',
      pt: 'Tudo se sustenta no que você concreta.',
    },
    shop_slogan: {
      en: 'Built From the Ground Up',
      fr: 'Bâti Depuis les Fondations',
      es: 'Construido Desde el Suelo',
      pt: 'Construído do Chão',
    },
    welcome_toast: {
      en: 'Welcome, Mason. \u{1F9F1}',
      fr: 'Bienvenue, Maçon. \u{1F9F1}',
      es: 'Bienvenido, Albañil. \u{1F9F1}',
      pt: 'Bem-vindo, Pedreiro. \u{1F9F1}',
    },
    membership_cta: {
      en: 'Solid crew. Solid work.',
      fr: 'Crew solide. Travail solide.',
      es: 'Crew sólido. Trabajo sólido.',
      pt: 'Crew sólido. Trabalho sólido.',
    },
    pathway: {
      en: 'Lay the foundation for your career.',
      fr: 'Pose les fondations de ta carrière.',
      es: 'Pon los cimientos de tu carrera.',
      pt: 'Coloque a fundação da sua carreira.',
    },
  },
};

/**
 * Get trade-specific text, falling back to default if the section
 * doesn't exist for the given trade.
 */
export function getTradeText(
  trade: TradeId,
  section: TradeSection,
  locale: string,
): string {
  const loc = (locale || 'en') as Locale;
  return (
    TRADE_CONTENT[trade]?.[section]?.[loc] ??
    TRADE_CONTENT.default?.[section]?.[loc] ??
    ''
  );
}
