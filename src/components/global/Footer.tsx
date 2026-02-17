'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import {
  SHOP_URL,
  DASHBOARD_URL,
  CALCULATOR_URL,
  TIMEKEEPER_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from '@/lib/constants';

export default function Footer() {
  const s = useTranslations('sitemap');
  const f = useTranslations('footer');
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  /* Build href for section anchors — on homepage scroll, on other pages navigate home */
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <>
      <div className={`sitemap-panel${sitemapOpen ? ' open' : ''}`} id="sitemapPanel" role="navigation" aria-label="Sitemap">
        <div className="sitemap-grid">
          <div className="sitemap-col">
            <h5>{s('nav_heading')}</h5>
            <Link href="/">{s('home')}</Link>
            <a href={sectionHref('#tools')}>{s('tools_link')}</a>
            <a href={sectionHref('#gear')}>{s('gear_link')}</a>
            <a href={sectionHref('#contact')}>{s('contact')}</a>
          </div>
          <div className="sitemap-col">
            <h5>{s('shop_heading')}</h5>
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">{s('all_products')}</a>
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">{s('men')}</a>
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">{s('women')}</a>
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">{s('members_only')}</a>
          </div>
          <div className="sitemap-col">
            <h5>{s('tools_heading')}</h5>
            <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer">{s('member_hub')}</a>
            <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer">{s('calculator')}</a>
            <a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer">{s('timekeeper')}</a>
          </div>
          <div className="sitemap-col">
            <h5>{s('learn_heading')}</h5>
            <Link href="/learn/construction-steps">{s('learn_construction_steps')}</Link>
            <Link href="/learn/safety-equipment">{s('learn_safety_equipment')}</Link>
            <Link href="/learn/trades-guide">{s('learn_trades_guide')}</Link>
            <Link href="/learn/calculator-guide">{s('learn_calculator_guide')}</Link>
            <Link href="/learn/timekeeper-setup">{s('learn_timekeeper_setup')}</Link>
            <Link href="/learn/construction-terminology">{s('learn_terminology')}</Link>
          </div>
          <div className="sitemap-col">
            <h5>{s('legal_heading')}</h5>
            <h6 className="sitemap-sub">{s('calculator')}</h6>
            <a href={`${CALCULATOR_URL}/privacy`} target="_blank" rel="noopener noreferrer">{s('privacy')}</a>
            <a href={`${CALCULATOR_URL}/terms`} target="_blank" rel="noopener noreferrer">{s('terms')}</a>
            <h6 className="sitemap-sub">{s('timekeeper')}</h6>
            <a href={`${TIMEKEEPER_URL}/privacy`} target="_blank" rel="noopener noreferrer">{s('privacy')}</a>
            <a href={`${TIMEKEEPER_URL}/terms`} target="_blank" rel="noopener noreferrer">{s('terms')}</a>
          </div>
          <div className="sitemap-col">
            <h5>{s('connect_heading')}</h5>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">{s('facebook')}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{s('instagram')}</a>
            <a href="mailto:contact@onsiteclub.ca">{s('email_us')}</a>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-bar">
          <div className="footer-left">{f('copyright')}</div>
          <button
            className="footer-toggle"
            id="footerToggle"
            onClick={() => setSitemapOpen((v) => !v)}
            aria-label="Toggle sitemap"
            aria-expanded={sitemapOpen}
            aria-controls="sitemapPanel"
          >
            {f('sitemap')}
          </button>
          <div className="footer-center">{f('tagline')}</div>
        </div>
      </footer>
    </>
  );
}
