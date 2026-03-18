# OnSite Club — Pathway de Melhorias UX/UI

**Data:** Março 2026
**Escopo:** Correções de cores, navbar, animações e estrutura
**Método:** Implementar fase por fase, testar cada uma antes de avançar

---

## Visão Geral das Fases

| Fase | Nome | Risco | Impacto | Arquivos afetados |
|------|------|-------|---------|-------------------|
| 1 | Redução de animações | Baixo | Alto | 4 hooks, 1 CSS |
| 2 | Correção de cores hardcoded | Baixo | Alto | 1 CSS |
| 3 | Reestruturação do Navbar | Médio | Alto | 1 TSX, 1 CSS |
| 4 | Refinamento de hover/transitions | Baixo | Médio | 1 CSS |
| 5 | Correções estruturais (duplicações, escala) | Baixo | Médio | 1 CSS |
| 6 | Melhorias de conversão (CTA, form) | Médio | Alto | 2 TSX |

---

## FASE 1 — Redução de Animações

**Objetivo:** Reduzir de 14 para 8 sistemas de animação. Remover os que são puro efeito decorativo e simplificar os que ficam.

**Arquivos afetados:**
- `src/components/global/CursorGlow.tsx`
- `src/components/global/Interactions.tsx`
- `src/hooks/useCursorGlow.ts`
- `src/hooks/useParallaxStagger.ts`
- `src/hooks/useToolCardTilt.ts`
- `src/hooks/useIconRedraw.ts`
- `src/styles/styles.css`

### 1.1 — Remover Cursor Glow

**Por quê:** Círculo de 300px com gradiente seguindo o mouse a cada frame. Efeito puramente decorativo que consome `mousemove` no document inteiro. Ninguém clica em algo por causa do cursor glow.

**O que fazer:**

Em `src/components/global/CursorGlow.tsx`, substituir o conteúdo inteiro por:

```tsx
// Cursor glow removido — efeito decorativo sem valor funcional
export default function CursorGlow() {
  return null;
}
```

Em `src/styles/styles.css`, encontrar a classe `.cursor-glow` (por volta da linha 90) e comentar ou remover:

```css
/* REMOVIDO: cursor glow decorativo
.cursor-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-dim) 0%, transparent 70%);
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transform: translate(-50%, -50%);
}
*/
```

**Teste:** Navegar pelo site nos temas escuros (Default, Plumbing, Concrete). Confirmar que o gradiente ambar não aparece mais no mouse.

---

### 1.2 — Remover Parallax Stagger

**Por quê:** Cards que "atrasam" no scroll quando o mouse está sobre eles. Combina scroll listener + DOMMatrix + transform inline. Efeito sutil que ninguém percebe conscientemente mas que causa estranheza ("por que esse card se moveu sozinho?").

**O que fazer:**

Em `src/components/global/Interactions.tsx`, remover a importação e a chamada:

```tsx
'use client';

import { useToolCardTilt } from '@/hooks/useToolCardTilt';
import { useIconRedraw } from '@/hooks/useIconRedraw';
// REMOVIDO: import { useParallaxStagger } from '@/hooks/useParallaxStagger';
import { useShopSwap } from '@/hooks/useShopSwap';

export default function Interactions() {
  useToolCardTilt();   // será removido na etapa 1.3
  useIconRedraw();     // será removido na etapa 1.4
  // REMOVIDO: useParallaxStagger();
  useShopSwap('productShowcase');
  return null;
}
```

Em `src/styles/styles.css`, remover ou comentar a classe `.parallax-lagging` (por volta da linha 2524):

```css
/* REMOVIDO: parallax stagger
.parallax-lagging {
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) !important;
}
*/
```

**Teste:** Fazer scroll com o mouse sobre tool cards e social cards. Confirmar que os cards ficam estáveis durante o scroll.

---

### 1.3 — Remover Tool Card 3D Tilt

**Por quê:** Perspective 3D com ±6 graus de rotação seguindo `mousemove` por card. Quando combinado com hover translateY(-4px) + parallax stagger, cria uma experiência "nervosa". Individualmente é bonito; junto com tudo, é noise.

**O que fazer:**

Em `src/components/global/Interactions.tsx`, remover a importação e a chamada:

```tsx
'use client';

// REMOVIDO: import { useToolCardTilt } from '@/hooks/useToolCardTilt';
import { useIconRedraw } from '@/hooks/useIconRedraw';
import { useShopSwap } from '@/hooks/useShopSwap';

export default function Interactions() {
  // REMOVIDO: useToolCardTilt();
  useIconRedraw();  // será removido na etapa 1.4
  useShopSwap('productShowcase');
  return null;
}
```

**Teste:** Hover sobre tool cards. Confirmar que os cards não inclinam mais em 3D, apenas sobem ligeiramente (o `translateY(-4px)` do CSS continua por enquanto).

---

### 1.4 — Remover SVG Icon Redraw on Hover

**Por quê:** Os ícones SVG dos tool cards já se desenham quando entram no viewport (scroll reveal — o draw inicial fica). Redesenhar a cada hover é repetitivo. Na primeira vez impressiona; na quinta, cansa.

**O que fazer:**

Em `src/components/global/Interactions.tsx`, versão final após todas as remoções:

```tsx
'use client';

import { useShopSwap } from '@/hooks/useShopSwap';

/**
 * Invisible component that activates interactive behaviors.
 * Simplified: only product showcase swap remains.
 */
export default function Interactions() {
  useShopSwap('productShowcase');
  return null;
}
```

**Teste:** Hover sobre tool cards e pathway trigger. O ícone SVG deve permanecer desenhado (estático), sem re-animar.

---

### 1.5 — Simplificar Assembly Animation (remover blur)

**Por quê:** A classe `.assemble` anima 3 propriedades simultaneamente: `opacity`, `transform` e `filter: blur(5px)`. Blur é a propriedade CSS mais cara em rendering — força repaint de toda a área do elemento. Sem blur, o assembly fica leve e rápido. A percepção de "montagem" se mantém com fade + translate.

**O que fazer:**

Em `src/styles/styles.css`, encontrar a classe `.assemble` (por volta da linha 547):

ANTES:
```css
.assemble {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.9s ease;
  filter: blur(5px);
}
```

DEPOIS:
```css
.assemble {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
```

E a classe `.assemble.visible`:

ANTES:
```css
.assemble.visible {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1);
  filter: blur(0);
}
```

DEPOIS:
```css
.assemble.visible {
  opacity: 1;
  transform: translateY(0) translateX(0) scale(1);
}
```

Mudanças:
- Removido `filter: blur(5px)` → economia de rendering
- Reduzido `translateY(40px)` → `translateY(24px)` — menos dramático, mais sutil
- Reduzido duração de `0.9s` → `0.5s` — mais rápido, menos "lento de carregar"
- Removido `filter 0.9s ease` da transition — não precisa mais

Também ajustar as variantes:

ANTES:
```css
.assemble.from-left { transform: translateX(-50px) translateY(0); }
.assemble.from-right { transform: translateX(50px) translateY(0); }
.assemble.from-scale { transform: scale(0.9); }
```

DEPOIS:
```css
.assemble.from-left { transform: translateX(-30px) translateY(0); }
.assemble.from-right { transform: translateX(30px) translateY(0); }
.assemble.from-scale { transform: scale(0.95); }
```

**Teste:** Scroll pela página inteira. Elementos devem aparecer com fade + slide sutil, sem blur. A transição deve parecer mais rápida e leve.

---

### 1.6 — Simplificar Ken Burns do Hero

**Por quê:** O efeito Ken Burns (zoom lento de 25s em loop infinito) roda para sempre, mesmo quando o hero não está mais visível. Trocar para uma única animação de entrada que para.

**O que fazer:**

Em `src/styles/styles.css`, encontrar o `@keyframes ken-burns` (por volta da linha 752):

ANTES:
```css
.hero-bg img,
.hero-bg-img {
  ...
  animation: ken-burns 25s ease-in-out infinite alternate;
}

@keyframes ken-burns {
  0% { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.03) translate(-0.5%, 0); }
}
```

DEPOIS:
```css
.hero-bg img,
.hero-bg-img {
  ...
  animation: ken-burns 20s ease-out forwards;
}

@keyframes ken-burns {
  0% { transform: scale(1.03); }
  100% { transform: scale(1); }
}
```

Mudanças:
- De `infinite alternate` (oscila para sempre) para `forwards` (roda uma vez e para)
- De zoom-in para zoom-out (começa maior, acomoda) — mais cinematográfico
- Removido translate lateral — simplifica o efeito

**Teste:** Carregar a homepage. A imagem do hero deve fazer um zoom-out sutil uma vez e parar. Não deve continuar oscilando.

---

### Resultado da Fase 1

| Métrica | Antes | Depois |
|---------|-------|--------|
| Sistemas de animação | 14 | 8 |
| Event listeners globais de mouse | 3 (cursorglow + tilt + parallax) | 0 |
| Scroll listeners | 3 | 2 (progress bar + hero fade) |
| Propriedades animadas no assembly | 3 (opacity + transform + filter) | 2 (opacity + transform) |
| Ken Burns | Loop infinito | Uma vez, 20s |

---

## FASE 2 — Correção de Cores Hardcoded

**Objetivo:** Substituir todas as cores fixas (#fff, #F6C343, #000, #999, rgba(0,0,0,...)) por CSS variables, para que o sistema de temas funcione end-to-end.

**Arquivo afetado:** `src/styles/styles.css`

### 2.1 — Search Bar no Nav

**Problema:** Background branco fixo, cor de texto cinza fixo. Nos temas escuros, a search bar fica como um bloco branco estranho.

ANTES (linhas ~176-216):
```css
.nav-search-bar {
  ...
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  ...
  color: #999;
}

.nav-search-bar svg {
  ...
  color: #999;
}

.nav-search-input::placeholder {
  color: #999;
}
```

DEPOIS:
```css
.nav-search-bar {
  ...
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  ...
  color: var(--text-secondary);
}

.nav-search-bar svg {
  ...
  color: var(--text-muted);
}

.nav-search-input::placeholder {
  color: var(--text-muted);
}
```

**Teste:** Trocar entre todos os 6 temas. A search bar deve se adaptar ao fundo de cada tema.

---

### 2.2 — Hero Section (botões e texto)

**Problema:** O hero usa cores fixas que ignoram o tema. No tema Wood (light, marrom), os botões continuam amarelos. No Electrical (light, azul), idem. Isso quebra a promessa do sistema de temas.

> **Nota importante:** O texto do hero PRECISA ser branco em todos os temas porque há uma foto por trás. Mas os botões e highlight devem respeitar o tema.

ANTES (linhas ~714, 771, 803-844):
```css
.hero h1 span.highlight {
  color: #F6C343;
}

.hero h1 {
  ...
  color: #fff;
}

.hero-btn-primary {
  background: #F6C343;
  color: #000;
  ...
}

.hero-btn-ghost {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  ...
}

.hero-btn-ghost:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: #fff;
}

.hero-btn-primary:hover {
  box-shadow: 0 8px 30px rgba(246, 195, 67, 0.4);
}
```

DEPOIS:
```css
.hero h1 span.highlight {
  color: var(--accent);
}

.hero h1 {
  ...
  color: #fff;   /* MANTER: precisa ser branco sobre foto */
}

.hero-btn-primary {
  background: var(--accent);
  color: var(--accent-text);
  ...
}

.hero-btn-ghost {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.6);
  ...
}

.hero-btn-ghost:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: #fff;
}

.hero-btn-primary:hover {
  box-shadow: 0 8px 30px var(--accent-glow);
}
```

Mudanças:
- Highlight: `#F6C343` → `var(--accent)` — agora muda por trade
- Btn primary: `#F6C343` → `var(--accent)`, `#000` → `var(--accent-text)`
- Hover shadow: hardcoded → `var(--accent-glow)`
- Ghost button: **MANTER branco** — está sobre foto, precisa contrastar
- Hero h1 color: **MANTER branco** — mesmo motivo

**Teste:** Com tema Wood, o botão primário do hero deve ser marrom (#C4722A). Com Electrical, deve ser azul (#2563EB). Com Default, continua ambar.

---

### 2.3 — Gear Cards

**Problema:** Background branco fixo, borda e sombra com cores fixas. Nos temas escuros, os gear cards parecem "buracos brancos" na página.

ANTES (linhas ~906-916):
```css
.gear-card {
  ...
  background: #fff;
  border-radius: 16px;
  ...
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

DEPOIS:
```css
.gear-card {
  ...
  background: var(--bg-card);
  border-radius: var(--border-radius);
  ...
  border: 1px solid var(--border);
  box-shadow: 0 2px 8px var(--shadow-color);
}
```

Também corrigir o background do image container:

ANTES (linha ~928):
```css
.gear-card-image {
  ...
  background: #f5f5f5;
}
```

DEPOIS:
```css
.gear-card-image {
  ...
  background: var(--bg-secondary);
}
```

**Teste:** Com tema Default (dark), os gear cards devem ter fundo escuro (#1C2128) com borda sutil. Com tema Wood (light), fundo branco. O border-radius também deve mudar (16px → 4px em Wood, 2px em Concrete, etc.).

---

### 2.4 — Chat Widget

**Problema:** O chat widget usa #F6C343 hardcoded em vários lugares.

ANTES (linhas ~3058-3059, 3114-3115, 3159, 3173, 3191):
```css
.chat-fab { background: #F6C343; color: #101215; }
.chat-header { background: #F6C343; color: #101215; }
.chat-msg-user .chat-msg-content { background: #F6C343; color: #101215; }
.chat-msg-assistant .chat-msg-content { border-left: 2px solid #F6C343; }
.chat-chip { border: 1px solid #F6C343; color: #F6C343; }
```

DEPOIS:
```css
.chat-fab { background: var(--accent); color: var(--accent-text); }
.chat-header { background: var(--accent); color: var(--accent-text); }
.chat-msg-user .chat-msg-content { background: var(--accent); color: var(--accent-text); }
.chat-msg-assistant .chat-msg-content { border-left: 2px solid var(--accent); }
.chat-chip { border: 1px solid var(--accent); color: var(--accent); }
```

Também as animações do chat-fab:

ANTES:
```css
@keyframes chat-pulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(246,195,67,0.4); }
  50% { box-shadow: 0 4px 30px rgba(246,195,67,0.7), 0 0 0 8px rgba(246,195,67,0.15); }
}
```

DEPOIS:
```css
@keyframes chat-pulse {
  0%, 100% { box-shadow: 0 4px 20px var(--accent-glow); }
  50% { box-shadow: 0 4px 30px var(--accent-glow), 0 0 0 8px var(--accent-dim); }
}
```

**Teste:** Com tema Electrical, o chat bubble deve ser azul. Com Plumbing, teal. Com Concrete, marrom.

---

### 2.5 — Mobile Float Buttons

ANTES (linhas ~2990-3006):
```css
.hero-float-btn {
  ...
  background: rgba(246, 195, 67, 0.85);
  ...
  color: #000;
}
.hero-float-btn:hover {
  background: rgba(246, 195, 67, 1);
}
```

DEPOIS:
```css
.hero-float-btn {
  ...
  background: rgba(var(--accent-rgb), 0.85);
  ...
  color: var(--accent-text);
}
.hero-float-btn:hover {
  background: var(--accent);
}
```

---

### 2.6 — Nav Tool Buttons

ANTES (linhas ~337-339):
```css
.nav-tool-btn {
  ...
  background: rgba(246, 195, 67, 0.15);
  ...
  border: 1px solid rgba(246, 195, 67, 0.3);
}

.nav-tool-btn:hover {
  background: rgba(246, 195, 67, 0.3);
  border-color: rgba(246, 195, 67, 0.5);
}
```

DEPOIS:
```css
.nav-tool-btn {
  ...
  background: var(--accent-dim);
  ...
  border: 1px solid rgba(var(--accent-rgb), 0.3);
}

.nav-tool-btn:hover {
  background: rgba(var(--accent-rgb), 0.3);
  border-color: rgba(var(--accent-rgb), 0.5);
}
```

**Teste:** Com todos os temas, os botões Calculator/Timekeeper no nav devem usar a cor de acento do tema ativo.

---

### Resultado da Fase 2

Após esta fase, trocar de tema deve mudar **tudo** — hero, gear, nav, chat, buttons. Não deve sobrar nenhum elemento amarelo (#F6C343) quando o tema é Electrical (azul) ou Concrete (marrom).

---

## FASE 3 — Reestruturação do Navbar

**Objetivo:** Tornar a navegação visível em desktop sem necessidade de clicar no hamburger. Reduzir a poluição de elementos.

**Arquivos afetados:**
- `src/components/global/Navbar.tsx`
- `src/styles/styles.css`

### 3.1 — Layout Proposto (Desktop)

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]   Home  Shop  Tools  Learn  Contact   [🔍] [🌐] [CTA] │
└─────────────────────────────────────────────────────────────┘
```

Mudanças:
- **Links visíveis inline** — Home, Shop, Tools, Learn, Contact ficam visíveis na barra
- **Hamburger removido em desktop** — Só aparece em mobile (<768px)
- **Calculator/Timekeeper removidos do nav** — Já estão na seção Tools e no menu mobile
- **Search vira ícone** — Clica e abre o dropdown (como já faz no mobile)

### 3.2 — Mudanças no Navbar.tsx

Substituir o conteúdo inteiro do `Navbar.tsx` por esta versão:

```tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname, routing } from '@/i18n/routing';
import { CALCULATOR_URL, TIMEKEEPER_URL } from '@/lib/constants';
import SearchDropdown from '@/components/global/SearchDropdown';

const TradeSelector = dynamic(() => import('@/components/global/TradeSelector'), { ssr: false });

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeTradeSelector = useCallback(() => setTradeOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handler = () => setTradeOpen(true);
    document.addEventListener('open-trade-selector', handler);
    return () => document.removeEventListener('open-trade-selector', handler);
  }, []);

  const handleLangSelect = (lang: string) => {
    setLangOpen(false);
    if (lang !== locale) router.replace(pathname, { locale: lang });
  };

  useEffect(() => {
    if (!langOpen && !searchOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (langOpen && !target.closest('.lang-dropdown-wrapper')) setLangOpen(false);
      if (searchOpen && !target.closest('.search-wrapper')) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [langOpen, searchOpen]);

  const isHome = pathname === '/';
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const handleNavClick = () => closeMenu();

  return (
    <>
      <nav id="mainNav" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="logo" aria-label="OnSite Club home">
          <Image src="/images/logo-onsite-club-02.png" alt="OnSite Club" width={150} height={40} priority />
        </Link>

        {/* Desktop nav links — visíveis em desktop, escondidos em mobile */}
        <ul className="nav-links">
          <li><Link href="/" onClick={handleNavClick}>{t('home')}</Link></li>
          <li>
            <a href="https://shop.onsiteclub.ca" target="_blank" rel="noopener noreferrer">
              {t('shop')}
            </a>
          </li>
          <li><a href={sectionHref('#tools')}>{t('tools')}</a></li>
          <li><Link href="/learn/construction-steps">{t('learn')}</Link></li>
          <li><a href={sectionHref('#contact')}>{t('contact')}</a></li>
        </ul>

        {/* Right side: search + lang + CTA */}
        <div className="nav-actions">
          {/* Search icon */}
          <div className="search-wrapper" ref={searchRef}>
            <button
              className={`nav-search-btn${searchOpen ? ' nav-search-btn-active' : ''}`}
              onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 100); }}
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            {searchOpen && (
              <div className="search-panel">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="search-panel-input"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
            )}
            <SearchDropdown
              open={searchOpen}
              query={searchQuery}
              onClose={() => { setSearchOpen(false); setSearchQuery(''); }}
            />
          </div>

          {/* Language */}
          <div className="lang-dropdown-wrapper">
            <button
              className="lang-toggle"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Change language"
              aria-expanded={langOpen}
            >
              <svg className="lang-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="lang-code">{locale.toUpperCase()}</span>
            </button>
            {langOpen && (
              <ul className="lang-dropdown" role="listbox" aria-label="Language">
                {routing.locales.map((loc) => (
                  <li key={loc}>
                    <button
                      className={`lang-option${loc === locale ? ' lang-option-active' : ''}`}
                      role="option"
                      aria-selected={loc === locale}
                      onClick={() => handleLangSelect(loc)}
                    >
                      {loc.toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* CTA */}
          <a
            href="https://dashboard.onsiteclub.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            {t('member_area')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`nav-menu-btn${menuOpen ? ' nav-menu-btn-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="navDropdown"
        >
          <svg className="nav-menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`nav-overlay${menuOpen ? ' nav-overlay-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile dropdown */}
      <div
        id="navDropdown"
        className={`nav-dropdown${menuOpen ? ' nav-dropdown-open' : ''}`}
        role="navigation"
        aria-label="Main menu"
      >
        <ul className="nav-dropdown-links">
          <li><Link href="/" onClick={handleNavClick}>{t('home')}</Link></li>
          <li>
            <a href="https://shop.onsiteclub.ca" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
              {t('shop')}
            </a>
          </li>
          <li><a href={sectionHref('#tools')} onClick={handleNavClick}>{t('tools')}</a></li>
          <li><Link href="/learn/construction-steps" onClick={handleNavClick}>{t('learn')}</Link></li>
          <li><a href={sectionHref('#contact')} onClick={handleNavClick}>{t('contact')}</a></li>
        </ul>

        <div className="nav-dropdown-extras">
          <div className="nav-dropdown-divider" />
          <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="nav-dropdown-tool" onClick={handleNavClick}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
            </svg>
            Calculator
          </a>
          <a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer" className="nav-dropdown-tool" onClick={handleNavClick}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Timekeeper
          </a>
          <div className="nav-dropdown-divider" />
          <a
            href="https://dashboard.onsiteclub.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-dropdown-cta"
            onClick={handleNavClick}
          >
            {t('member_area')}
          </a>
        </div>
      </div>

      <TradeSelector open={tradeOpen} onClose={closeTradeSelector} />
    </>
  );
}
```

### 3.3 — Novos Estilos CSS para o Nav

Em `src/styles/styles.css`, substituir toda a seção NAV (linhas ~106-541) pelos estilos abaixo. Manter o restante do CSS inalterado.

```css
/* ═══════════════════════════════════
   NAV — REESTRUTURADO
   ═══════════════════════════════════ */
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  padding: 0 40px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(20px);
  background: var(--nav-bg);
  box-shadow: var(--nav-shadow);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, background 0.3s;
}

nav.scrolled {
  background: var(--nav-bg-scrolled);
  box-shadow: var(--nav-shadow-scrolled);
  border-bottom-color: var(--border);
}

.logo {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.logo img {
  height: 32px;
  width: auto;
  display: block;
}

/* ── Desktop inline links ── */
.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li a {
  display: block;
  padding: 8px 14px;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.nav-links li a:hover {
  color: var(--text-primary);
  background: rgba(var(--text-primary-rgb), 0.05);
}

/* ── Right actions ── */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

/* Search icon button */
.nav-search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.nav-search-btn:hover,
.nav-search-btn-active {
  border-color: var(--accent);
  color: var(--accent);
}

/* Search panel (floats below icon) */
.search-wrapper {
  position: relative;
}

.search-panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 360px;
  padding: 8px 12px;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 24px var(--shadow-color);
  z-index: 110;
}

.search-panel-input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-primary);
  padding: 6px 4px;
}

.search-panel-input::placeholder {
  color: var(--text-muted);
}

/* CTA button */
.nav-cta {
  background: var(--accent);
  color: var(--accent-text);
  padding: 8px 20px;
  font-weight: 700;
  font-size: 0.75rem;
  font-family: var(--font-mono);
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.2s, transform 0.2s;
}

.nav-cta:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

/* Mobile hamburger — hidden on desktop */
.nav-menu-btn {
  display: none;
  align-items: center;
  background: none;
  border: none;
  color: var(--text-secondary);
  padding: 8px;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-menu-btn:hover,
.nav-menu-btn-active {
  color: var(--accent);
}

.nav-menu-icon { flex-shrink: 0; }

/* Overlay */
.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(var(--bg-primary-rgb), 0.5);
  z-index: 98;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.nav-overlay-visible {
  opacity: 1;
  pointer-events: auto;
}

/* Mobile dropdown panel */
.nav-dropdown {
  position: fixed;
  top: 56px;
  left: 16px;
  right: 16px;
  z-index: 99;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 8px;
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: opacity 0.2s, transform 0.2s;
  box-shadow: 0 12px 40px var(--shadow-color);
}
.nav-dropdown-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.nav-dropdown-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.nav-dropdown-links li a {
  display: block;
  padding: 12px 16px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}
.nav-dropdown-links li a:hover {
  background: var(--accent-dim);
  color: var(--accent);
}

.nav-dropdown-extras { display: block; }

.nav-dropdown-divider {
  height: 1px;
  background: var(--border);
  margin: 6px 8px;
}

.nav-dropdown-tool {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  color: var(--text-secondary);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.15s, color 0.15s;
}

.nav-dropdown-tool:hover {
  background: var(--accent-dim);
  color: var(--accent);
}

.nav-dropdown-cta {
  display: block;
  margin: 4px 8px 8px;
  padding: 12px 16px;
  background: var(--accent);
  color: var(--accent-text);
  font-weight: 700;
  font-size: 0.8rem;
  font-family: var(--font-mono);
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border-radius: 8px;
  transition: background 0.3s;
}

.nav-dropdown-cta:hover {
  background: var(--accent-hover);
}
```

### 3.4 — Responsivo (substituir o bloco mobile)

No media query `@media (max-width: 768px)`, substituir as regras do nav:

```css
@media (max-width: 768px) {
  nav { padding: 0 16px; gap: 6px; }

  /* Hide desktop links */
  .nav-links { display: none; }

  /* Show hamburger */
  .nav-menu-btn { display: flex; order: 4; }

  /* Simplify right actions */
  .nav-actions { gap: 4px; }
  .nav-cta { display: none; }
  .lang-toggle { padding: 0 6px; border: none; }
  .lang-code { display: none; }

  /* Search adjustments */
  .search-panel { position: fixed; left: 16px; right: 16px; width: auto; }

  /* ... (restante do responsivo mantém igual) */
}
```

**Teste:**
- Desktop (>768px): Links Home/Shop/Tools/Learn/Contact visíveis inline. Sem hamburger. Sem botões Calculator/Timekeeper. Search é um ícone.
- Mobile (<768px): Só logo + ícones (lang, search, hamburger). Links + tools + CTA dentro do dropdown.

---

## FASE 4 — Refinamento de Hover/Transitions

**Objetivo:** Reduzir o número de elementos que "se movem" no hover. Manter translateY apenas em CTAs e cards primários.

**Arquivo afetado:** `src/styles/styles.css`

### 4.1 — Regra geral: menos translateY

Remover `transform: translateY(-Npx)` dos seguintes seletores hover, mantendo apenas mudanças de cor/borda:

```css
/* ANTES — tudo sobe no hover */
.gear-card:hover { transform: translateY(-4px); ... }
.review-card:hover { transform: translateY(-4px); ... }
.social-card:hover { transform: translateY(-4px); ... }
.learn-teaser-card:hover { transform: translateY(-4px); ... }
.stat-card-visible:hover { transform: translateY(-4px); }
.contact-social-card:hover { transform: translateY(-4px); ... }
.starter-kit-card:hover { transform: translateY(-4px); ... }
.nav-cta:hover { transform: translateY(-1px); }
.nav-tool-btn:hover { transform: translateY(-1px); }

/* DEPOIS — só CTA buttons e tool cards sobem */
.gear-card:hover { transform: none; ... }
.review-card:hover { transform: none; ... }
.social-card:hover { transform: none; ... }
.learn-teaser-card:hover { transform: none; ... }
.stat-card-visible:hover { transform: none; }
.contact-social-card:hover { transform: none; ... }
.starter-kit-card:hover { transform: none; ... }
.nav-cta:hover { transform: translateY(-1px); }  /* MANTER — é CTA */
```

Manter `translateY` apenas em:
- `.tool-card:hover` — cards de ferramentas são o foco principal
- `.hero-btn-primary:hover` e `.hero-btn-ghost:hover` — CTAs do hero
- `.btn-primary:hover` — botões de ação

### 4.2 — Simplificar transitions globais dos cards

ANTES:
```css
.tool-card,
.gear-card,
.social-card {
  will-change: transform;
  transition: border-color 0.4s, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s, opacity 0.4s, filter 0.4s;
}
```

DEPOIS:
```css
.tool-card,
.gear-card,
.social-card {
  transition: border-color 0.2s, box-shadow 0.2s;
}
```

Mudanças:
- Removido `will-change: transform` — sem translateY, não precisa
- Removido `transform` e `filter` da transition — não anima mais
- Reduzido duração de 0.4s → 0.2s — mais responsivo

**Teste:** Hover sobre cards. Deve mudar apenas borda e sombra, sem "subir". Somente tool cards e botões CTA mantêm o lift.

---

## FASE 5 — Correções Estruturais

**Objetivo:** Limpar duplicações CSS e padronizar escala tipográfica.

**Arquivo afetado:** `src/styles/styles.css`

### 5.1 — Remover `.btn-secondary` duplicado

Há duas definições de `.btn-secondary` (linhas ~651 e ~672). Manter apenas uma:

```css
.btn-secondary {
  display: inline-block;
  background: transparent;
  color: var(--text-primary);
  padding: 16px 36px;
  border: var(--border-width) solid var(--border);
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  letter-spacing: 0.5px;
  transition: transform 0.3s, border-color 0.3s, color 0.3s, background 0.3s;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-dim);
}
```

Deletar a segunda ocorrência inteira (linhas ~672-689).

### 5.2 — Padronizar escala de font-size

O site usa 14+ tamanhos diferentes abaixo de 1rem. Não vou pedir para trocar todos agora (seria muito invasivo), mas registrar as categorias para referência futura:

| Token | Tamanho | Uso |
|-------|---------|-----|
| `--text-xs` | 0.55rem | Badges, micro labels |
| `--text-sm` | 0.7rem | Tags, meta info, mono labels |
| `--text-base` | 0.85rem | Body text, descriptions, links |
| `--text-md` | 0.95rem | Cards, subtitles |
| `--text-lg` | 1.1rem | Section subtitles, card titles |
| `--text-xl` | clamp(2rem, 4vw, 3rem) | Section headings |
| `--text-hero` | clamp(2.4rem, 5vw, 3.8rem) | Hero title |

> **Nota:** Não implementar agora. Registrar como referência para futuras decisões. A escala atual funciona, só é difícil de manter.

---

## FASE 6 — Melhorias de Conversão

**Objetivo:** Corrigir o formulário de contato e adicionar capture no "Coming Soon".

### 6.1 — Formulário de contato

**Problema atual:** O form usa `mailto:` que abre o client de email nativo. Em mobile sem email configurado, não funciona.

**Solução ideal:** Criar um endpoint `/api/contact/route.ts` com envio via Resend, SendGrid ou similar.

**Solução mínima (sem backend):** Usar Formspree, Getform ou similar — só trocar o `action` e `method` do form. Zero código backend.

Exemplo com Formspree (alterar em `Contact.tsx`):

```tsx
<form
  action="https://formspree.io/f/SEU_ID"
  method="POST"
  className="contact-form"
>
```

### 6.2 — Coming Soon → Email Capture

Em `Tools.tsx`, o card do Agenda mostra "Coming Soon" mas não captura interesse. Adicionar um campo de email simples:

```tsx
{/* No card coming-soon do Agenda */}
<div className="tool-notify">
  <input
    type="email"
    placeholder="Email for early access"
    className="tool-notify-input"
  />
  <button className="tool-notify-btn">Notify me</button>
</div>
```

CSS correspondente:
```css
.tool-notify {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.tool-notify-input {
  flex: 1;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.8rem;
  outline: none;
}

.tool-notify-input:focus {
  border-color: var(--accent);
}

.tool-notify-btn {
  padding: 8px 16px;
  background: var(--accent);
  color: var(--accent-text);
  border: none;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}
```

> **Nota:** Ambas as soluções desta fase precisam de integração com serviço externo. Implementar quando decidir qual serviço usar.

---

## Ordem de Implementação Recomendada

```
Fase 1 (animações)     ← Começar aqui. Menor risco, maior alívio visual.
  │
  ├── 1.1 Cursor Glow         ✦ 2 min
  ├── 1.2 Parallax Stagger    ✦ 2 min
  ├── 1.3 Tool Card Tilt      ✦ 1 min
  ├── 1.4 Icon Redraw         ✦ 1 min
  ├── 1.5 Assembly blur       ✦ 3 min
  └── 1.6 Ken Burns           ✦ 2 min
        │
        ▼ TESTAR ── scroll pela página inteira, verificar que está mais calmo
        │
Fase 2 (cores)
  │
  ├── 2.1 Search bar          ✦ 2 min
  ├── 2.2 Hero buttons        ✦ 3 min
  ├── 2.3 Gear cards          ✦ 2 min
  ├── 2.4 Chat widget         ✦ 3 min
  ├── 2.5 Float buttons       ✦ 1 min
  └── 2.6 Nav tool buttons    ✦ 1 min
        │
        ▼ TESTAR ── trocar entre os 6 temas, tudo deve acompanhar
        │
Fase 3 (navbar)              ← Maior mudança. Testar bem.
  │
  ├── 3.1-3.2 Novo Navbar.tsx ✦ 10 min
  ├── 3.3 Novos estilos CSS   ✦ 10 min
  └── 3.4 Responsivo          ✦ 5 min
        │
        ▼ TESTAR ── desktop: links visíveis? mobile: hamburger funciona?
        │
Fase 4 (hover)
  │
  ├── 4.1 Remover translateY  ✦ 5 min
  └── 4.2 Simplificar cards   ✦ 2 min
        │
        ▼ TESTAR ── hover em tudo, só CTAs e tool cards devem "subir"
        │
Fase 5 (estrutura)
  │
  ├── 5.1 btn-secondary fix   ✦ 1 min
  └── 5.2 Escala tipográfica  ✦ Apenas documentação
        │
        ▼ TESTAR ── build limpo, sem erros
        │
Fase 6 (conversão)           ← Depende de serviço externo
  │
  ├── 6.1 Contact form        ✦ 15 min (com Formspree)
  └── 6.2 Coming Soon capture ✦ 10 min
```

---

## Checklist Final Pós-Implementação

- [ ] Scroll pela página inteira — sem blur, sem card se movendo sozinho
- [ ] Trocar entre os 6 temas — tudo acompanha (hero, gear, chat, nav)
- [ ] Desktop: 5 links visíveis no nav sem clicar em nada
- [ ] Mobile: hamburger funciona, links + tools + CTA no dropdown
- [ ] Hover: só CTAs e tool cards levantam. Cards normais só mudam borda
- [ ] Ken Burns: zoom-out uma vez e para
- [ ] Chat widget: cor acompanha o tema
- [ ] Build sem erros: `npm run build`
- [ ] Acessibilidade: reduzir motion ainda funciona
- [ ] 4 idiomas: nav funciona em EN, FR, ES, PT
