const Hero = () => {
  const [coords, setCoords] = React.useState({ x: 50, y: 50 });
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);

  React.useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setCoords({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="top" style={{
      position: 'relative',
      minHeight: '100vh',
      paddingTop: 64,
      overflow: 'hidden',
      borderBottom: '1px solid var(--line)',
    }}>
      {/* Column guides */}
      {!isMobile && (
        <div className="col-guides" style={{ height: '100%' }}>
          {Array.from({length: 12}).map((_,i) => <div key={i} />)}
        </div>
      )}

      {/* Parallax gradient orb */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at ${coords.x}% ${coords.y}%, rgba(42,83,255,0.10), transparent 40%)`,
        pointerEvents: 'none',
        transition: 'background 400ms ease',
      }} />

      <div className="container" style={{
        position: 'relative',
        paddingTop: isMobile ? 40 : 80,
        paddingBottom: isMobile ? 32 : 40,
        minHeight: 'calc(100vh - 64px)',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        gap: isMobile ? 32 : 48,
      }}>
        {/* Top coordinate strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span className="mono">§ 00 / INDEX — KYOBIX.ARCHITECTURE</span>
          {!isMobile && (
            <span className="mono" style={{ color: 'var(--titanium-3)' }}>
              LAT 37.5665°N  LON 126.9780°E  ·  EST. 2026
            </span>
          )}
        </div>

        {/* Headline + X bridge */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: (isMobile || isTablet) ? '1fr' : '1.2fr 1fr',
          gap: isMobile ? 32 : 48,
          alignItems: 'center',
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 32 }}>
              <span>High-End Software Architecture</span>
            </div>
            <h1 className="display h1" style={{ marginBottom: 32 }}>
              Engineering<br />
              the Digital<br />
              <span style={{ position: 'relative', display: 'inline-block' }}>
                Bridge<span style={{
                  color: 'var(--cobalt)',
                  display: 'inline-block',
                  marginLeft: '0.1em',
                }}>.</span>
              </span>
            </h1>
            <p style={{
              fontSize: isMobile ? 16 : 18,
              lineHeight: 1.5,
              color: 'var(--titanium-2)',
              maxWidth: 520,
              marginBottom: 40,
            }}>
              We architect the exact connection point where complex business logic meets
              seamless, high-performance software. Precision systems for enterprise scale.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact" className="btn btn-primary">
                Commission a build <span className="arrow">→</span>
              </a>
              <a href="#work" className="btn">
                View casework
              </a>
            </div>
          </div>

          {!isMobile && <XBridge />}
        </div>

        {/* Bottom strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: isMobile ? 20 : 32,
          paddingTop: 32,
          borderTop: '1px solid var(--line)',
        }}>
          {[
            ['SERVICES', '05 disciplines'],
            ['SPECIALIZATION', 'Angular · SaaS · E-commerce'],
            ['DELIVERY', 'Blueprint → Build → Scale'],
            ['ENGAGEMENT', 'Fixed scope · Retainer · Advisory'],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 6 }}>{k}</div>
              <div style={{ color: 'var(--titanium-hi)', fontSize: 14 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ The X Bridge — hero centerpiece ============
const XBridge = () => {
  const [phase, setPhase] = React.useState(0); // 0 = pre, 1 = drawing, 2 = settled

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 200);
    const t2 = setTimeout(() => setPhase(2), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      position: 'relative',
      aspectRatio: '1 / 1',
      width: '100%',
      maxWidth: 560,
      marginLeft: 'auto',
    }}>
      {/* Scaffolding grid */}
      <svg viewBox="0 0 500 500" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="bp" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(216,220,226,0.05)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="cobaltGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A6DFF" />
            <stop offset="100%" stopColor="#2A53FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect width="500" height="500" fill="url(#bp)" />

        {/* Frame corners */}
        {[[20,20,'tl'],[480,20,'tr'],[20,480,'bl'],[480,480,'br']].map(([cx,cy,id])=>(
          <g key={id} stroke="var(--titanium-3)" strokeWidth="1" fill="none">
            <line x1={cx - 8 * (id.includes('r') ? -1 : 1)} y1={cy} x2={cx} y2={cy} />
            <line x1={cx} y1={cy - 8 * (id.includes('b') ? -1 : 1)} x2={cx} y2={cy} />
          </g>
        ))}

        {/* Coordinate labels */}
        <text x="20" y="12" fill="var(--titanium-3)" fontFamily="var(--f-mono)" fontSize="8" letterSpacing="1">A1</text>
        <text x="468" y="12" fill="var(--titanium-3)" fontFamily="var(--f-mono)" fontSize="8" letterSpacing="1">B2</text>
        <text x="20" y="496" fill="var(--titanium-3)" fontFamily="var(--f-mono)" fontSize="8" letterSpacing="1">C1</text>
        <text x="468" y="496" fill="var(--titanium-3)" fontFamily="var(--f-mono)" fontSize="8" letterSpacing="1">D2</text>

        {/* Center crosshair ring */}
        <circle cx="250" cy="250" r="80" fill="none" stroke="var(--line-2)" strokeWidth="1" strokeDasharray="2 4" style={{
          transformOrigin: '250px 250px',
          animation: 'spin 40s linear infinite',
        }} />
        <circle cx="250" cy="250" r="140" fill="none" stroke="var(--line)" strokeWidth="1" />

        {/* Titanium slash (A→D) */}
        <line
          x1="60" y1="60" x2="440" y2="440"
          stroke="var(--titanium-hi)"
          strokeWidth="3"
          strokeLinecap="square"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={phase === 0 ? 100 : 0}
          style={{ transition: 'stroke-dashoffset 1100ms cubic-bezier(.6,0,.2,1)' }}
        />

        {/* Cobalt slash (B→C) — crosses on top, slight glow */}
        <line
          x1="440" y1="60" x2="60" y2="440"
          stroke="url(#cobaltGrad)"
          strokeWidth="3"
          strokeLinecap="square"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={phase === 0 ? 100 : 0}
          filter={phase === 2 ? 'url(#glow)' : undefined}
          style={{
            transition: 'stroke-dashoffset 1100ms cubic-bezier(.6,0,.2,1) 400ms',
          }}
        />

        {/* Endpoints */}
        {[[60,60],[440,60],[60,440],[440,440]].map(([cx,cy],i) => (
          <g key={i} style={{ opacity: phase === 2 ? 1 : 0, transition: 'opacity 400ms ease 1600ms' }}>
            <circle cx={cx} cy={cy} r="4" fill="var(--ink)" stroke={i === 1 || i === 2 ? 'var(--cobalt)' : 'var(--titanium-hi)'} strokeWidth="1.5"/>
          </g>
        ))}

        {/* Center node */}
        <g style={{ opacity: phase === 2 ? 1 : 0, transition: 'opacity 600ms ease 1400ms' }}>
          <circle cx="250" cy="250" r="6" fill="var(--cobalt)" />
          <circle cx="250" cy="250" r="12" fill="none" stroke="var(--cobalt)" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" from="6" to="28" dur="2.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.7" to="0" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Edge labels */}
        <g fill="var(--titanium-3)" fontFamily="var(--f-mono)" fontSize="9" letterSpacing="1" style={{ opacity: phase === 2 ? 1 : 0, transition: 'opacity 400ms ease 1800ms' }}>
          <text x="70" y="54">BUSINESS.LOGIC</text>
          <text x="320" y="54">DATA.LAYER</text>
          <text x="60" y="458">INTERFACE</text>
          <text x="350" y="458">INFRASTRUCTURE</text>
          <text x="258" y="246">⊹ BRIDGE</text>
        </g>
      </svg>

      {/* Corner ticks label */}
      <div style={{
        position: 'absolute',
        bottom: -28,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--titanium-3)' }}>FIG.01 — KYOBIX BRIDGE TOPOLOGY</span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--titanium-3)' }}>RENDERED · v2026.04</span>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

window.Hero = Hero;
window.XBridge = XBridge;
