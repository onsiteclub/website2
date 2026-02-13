import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'OnSite Club — Wear What You Build';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #101215 0%, #1a1c20 50%, #101215 100%)',
          position: 'relative',
        }}
      >
        {/* Amber accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#F6C343',
          }}
        />

        {/* Grid overlay effect */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage:
              'linear-gradient(rgba(246,195,67,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(246,195,67,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Logo text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: '#F6C343',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 900,
              color: '#101215',
            }}
          >
            OS
          </div>
          <div
            style={{
              fontSize: '42px',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-1px',
            }}
          >
            OnSite Club
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: '16px',
          }}
        >
          Wear What You{' '}
          <span style={{ color: '#F6C343' }}>Build</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          Construction lifestyle brand. Gear, tools, and a crew for people who actually build.
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '24px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          <span>Apps</span>
          <span style={{ color: '#F6C343' }}>·</span>
          <span>Gear</span>
          <span style={{ color: '#F6C343' }}>·</span>
          <span>Community</span>
          <span style={{ color: '#F6C343' }}>·</span>
          <span>Ontario, Canada</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
