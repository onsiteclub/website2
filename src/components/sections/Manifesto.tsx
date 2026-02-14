'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';

/* ── Animated counter with easeOutExpo ── */
function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useCountUp(target: number, duration = 2500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const start = useCallback(() => setStarted(true), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { start(); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [start]);

  useEffect(() => {
    if (!started) return;
    let rafId: number;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [started, target, duration]);

  return { count, ref, started };
}

const STATS = [
  { key: 'stat_members', value: 250, suffix: '+' },
  { key: 'stat_downloads', value: 1200, suffix: '+' },
  { key: 'stat_sold', value: 500, suffix: '+' },
  { key: 'stat_trades', value: 6, suffix: '' },
] as const;

export default function Manifesto() {
  const c = useTranslations('community');

  return (
    <section id="community" aria-label="Vision & Community">
      {/* ── Vision Banner ── */}
      <div className="section-label assemble">
        <span className="num">01</span> <span>{c('label')}</span>
      </div>
      <h2 className="section-title assemble delay-3">
        {c.rich('title', richTags)}
      </h2>
      <p className="section-desc assemble delay-3">{c('description')}</p>

      <div className="manifesto-banner assemble delay-3">
        <div className="manifesto-text">
          <p className="manifesto-lead">{c('manifesto_lead')}</p>
          <p className="manifesto-body">{c('manifesto_body')}</p>
        </div>
        <div className="manifesto-photos">
          <div className="manifesto-photo">
            <Image src="/images/vision1.png" alt="Worker looking at skyline" width={200} height={280} />
          </div>
          <div className="manifesto-photo">
            <Image src="/images/vision2.png" alt="Crew on site" width={200} height={280} />
          </div>
          <div className="manifesto-photo">
            <Image src="/images/vision3.png" alt="Builder at sunrise" width={200} height={280} />
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="stats-row assemble delay-3">
        {STATS.map((stat, i) => (
          <StatCard key={stat.key} value={stat.value} suffix={stat.suffix} label={c(stat.key)} delay={i * 150} />
        ))}
      </div>

    </section>
  );
}

function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const { count, ref, started } = useCountUp(value);
  return (
    <div
      className={`stat-card${started ? ' stat-card-visible' : ''}`}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="stat-number">
        {count.toLocaleString()}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
