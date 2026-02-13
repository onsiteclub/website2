'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
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

  return (
    <>
      <div className={`sitemap-panel${sitemapOpen ? ' open' : ''}`} id="sitemapPanel">
        <div className="sitemap-grid">
          <div className="sitemap-col">
            <h5>{s('nav_heading')}</h5>
            <a href="#home">{s('home')}</a>
            <a href="./clubroom.html">{s('clubroom')}</a>
            <a href="#contact">{s('contact')}</a>
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
            <a href="/learn/construction-steps">{s('learn_construction_steps')}</a>
            <a href="/learn/safety-equipment">{s('learn_safety_equipment')}</a>
            <a href="/learn/trades-guide">{s('learn_trades_guide')}</a>
            <a href="/learn/calculator-guide">{s('learn_calculator_guide')}</a>
            <a href="/learn/timekeeper-setup">{s('learn_timekeeper_setup')}</a>
            <a href="/learn/construction-terminology">{s('learn_terminology')}</a>
          </div>
          <div className="sitemap-col">
            <h5>{s('legal_heading')}</h5>
            <a href="./privacy.html">{s('privacy')}</a>
            <a href="./terms.html">{s('terms')}</a>
          </div>
          <div className="sitemap-col">
            <h5>{s('connect_heading')}</h5>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">{s('facebook')}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{s('instagram')}</a>
            <a href="mailto:contact@shabba.ca">{s('email_us')}</a>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-bar">
          <div className="footer-left">{f('copyright')}</div>
          <button className="footer-toggle" id="footerToggle" onClick={() => setSitemapOpen((v) => !v)}>
            {f('sitemap')}
          </button>
          <div className="footer-center">{f('tagline')}</div>
        </div>
      </footer>
    </>
  );
}
