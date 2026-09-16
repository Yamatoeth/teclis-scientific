import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Teclis Scientific - Precision Instruments for Interface Science';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            textAlign: 'center',
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #3b82f6, #10b981)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 24,
              letterSpacing: '-2px',
            }}
          >
            TECLIS
          </div>
          
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#94a3b8',
              marginBottom: 40,
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}
          >
            Scientific
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: '#e2e8f0',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Precision Instruments for Surface Tension Analysis, Foam Characterization & Interface Science
          </div>

          {/* Stats bar */}
          <div
            style={{
              display: 'flex',
              gap: 60,
              marginTop: 50,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#3b82f6' }}>25+</div>
              <div style={{ fontSize: 16, color: '#94a3b8' }}>Years</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#10b981' }}>100+</div>
              <div style={{ fontSize: 16, color: '#94a3b8' }}>Institutions</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#3b82f6' }}>10+</div>
              <div style={{ fontSize: 16, color: '#94a3b8' }}>Countries</div>
            </div>
          </div>
        </div>

        {/* URL footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 18,
            color: '#64748b',
          }}
        >
          www.teclis-scientific.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
