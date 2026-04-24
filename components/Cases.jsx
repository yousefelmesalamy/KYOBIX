const CASES = [
  {
    id: 'K-001',
    client: 'Meridian Logistics Corp',
    sector: 'Enterprise Tech · Inventory',
    title: 'Real-time fleet & inventory intelligence',
    summary: 'A complex data visualization dashboard unifying 14 warehouses, 2,400 SKUs, and live fleet telemetry into a single operational cockpit.',
    stack: ['Angular 17', 'NgRx Signals', 'D3', 'ClickHouse', 'WebSocket'],
    stats: [
      ['Dashboard load', '380ms', 'p95'],
      ['Data points live', '2.4M', '/hr'],
      ['Decision latency', '−67%', 'vs. legacy'],
    ],
    kind: 'dashboard',
  },
  {
    id: 'K-002',
    client: 'Atelier Noire',
    sector: 'Luxury Retail · E-Commerce',
    title: 'Couture e-commerce architecture',
    summary: 'A headless commerce platform for a luxury house — bespoke PIM, atelier-to-client logistics, and a checkout engineered for six-figure carts.',
    stack: ['Next.js', 'Shopify Hydrogen', 'Sanity', 'Algolia', 'Stripe'],
    stats: [
      ['Avg. order value', '$18,400', 'AOV'],
      ['LCP', '0.9s', 'global median'],
      ['Conversion lift', '+41%', 'YoY'],
    ],
    kind: 'ecommerce',
  },
];

const CaseStudies = () => {
  const [active, setActive] = React.useState(0);
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const c = CASES[active];

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">§ 03 / CASEWORK</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 32, flexWrap: 'wrap' }}>
            <h2 className="display h2">
              Two representative<br />builds.
            </h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {CASES.map((cs, i) => (
                <button
                  key={cs.id}
                  onClick={() => setActive(i)}
                  className="mono"
                  style={{
                    fontSize: 11,
                    padding: '10px 14px',
                    border: `1px solid ${active === i ? 'var(--titanium)' : 'var(--line-2)'}`,
                    color: active === i ? 'var(--titanium-hi)' : 'var(--titanium-2)',
                    background: active === i ? 'rgba(216,220,226,0.04)' : 'transparent',
                    transition: 'all 180ms',
                  }}
                >
                  {cs.id}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Case header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1.2fr' : '1fr 1fr',
          gap: isMobile ? 24 : 48,
          paddingBottom: 40,
          borderBottom: '1px solid var(--line-2)',
          marginBottom: 40,
        }}>
          <div>
            <div className="mono" style={{ marginBottom: 14, color: 'var(--cobalt)' }}>
              {c.id} · {c.sector}
            </div>
            <div className="display" style={{ fontSize: isMobile ? 32 : 48, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 12, letterSpacing: '-0.03em' }}>
              {c.client}
            </div>
            <div style={{ fontSize: isMobile ? 18 : 22, color: 'var(--titanium-2)', lineHeight: 1.35 }}>
              {c.title}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 16, color: 'var(--titanium-2)', marginBottom: 24, maxWidth: 520 }}>
              {c.summary}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {c.stack.map(s => (
                <span key={s} className="mono" style={{
                  fontSize: 10,
                  padding: '5px 10px',
                  border: '1px solid var(--line-2)',
                  color: 'var(--titanium-2)',
                }}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Mockup */}
        <div className="framed" style={{
          border: '1px solid var(--line-2)',
          background: 'var(--graphite)',
          padding: isMobile ? 12 : 20,
          position: 'relative',
        }}>
          <span className="tick-tr" />
          <span className="tick-bl" />
          {c.kind === 'dashboard'
            ? <DashboardMock c={c} isMobile={isMobile} isTablet={isTablet} />
            : <CommerceMock c={c} isMobile={isMobile} isTablet={isTablet} />
          }
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 0,
          marginTop: 40,
          border: '1px solid var(--line-2)',
        }}>
          {c.stats.map(([label, val, unit], i) => (
            <div key={i} style={{
              padding: '32px 28px',
              borderRight: isMobile ? 'none' : i < 2 ? '1px solid var(--line-2)' : 'none',
              borderBottom: isMobile && i < 2 ? '1px solid var(--line-2)' : 'none',
            }}>
              <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 12 }}>{label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <div className="display" style={{ fontSize: isMobile ? 36 : 52, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.03em' }}>
                  {val}
                </div>
                <div className="mono" style={{ color: 'var(--cobalt)' }}>{unit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ===== Dashboard mockup =====
const DashboardMock = ({ c, isMobile, isTablet }) => {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1600);
    return () => clearInterval(id);
  }, []);

  const lineData = React.useMemo(() => {
    const n = 60;
    return Array.from({length: n}, (_, i) => {
      const base = 50 + Math.sin(i * 0.3 + tick * 0.2) * 18;
      const noise = Math.sin(i * 1.3) * 6;
      return Math.max(8, Math.min(92, base + noise));
    });
  }, [tick]);

  const linePath = React.useMemo(() => {
    const w = 560, h = 180;
    return lineData.map((v, i) => {
      const x = (i / (lineData.length - 1)) * w;
      const y = h - (v / 100) * h;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  }, [lineData]);

  const areaPath = linePath + ` L 560 180 L 0 180 Z`;

  if (isMobile) {
    return (
      <div style={{ fontFamily: 'var(--f-mono)', color: 'var(--titanium)', background: 'var(--ink)', border: '1px solid var(--line)' }}>
        {/* Chrome */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontSize: 10, color: 'var(--titanium-2)' }}>meridian.ops ▸ inventory ▸ live</div>
          <div style={{ fontSize: 10, color: 'var(--ok)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)', boxShadow: '0 0 8px var(--ok)' }} />
            LIVE
          </div>
        </div>
        {/* 2-col KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: 12, marginBottom: 0 }}>
          {[
            ['INVENTORY', '$24.8M', 'var(--ok)'],
            ['ON-TIME', '98.4%', 'var(--ok)'],
            ['IN TRANSIT', '1,847 SKU', 'var(--titanium-2)'],
            ['STOCKOUTS', '3', 'var(--danger)'],
          ].map(([l, v, col], i) => (
            <div key={i} style={{ border: '1px solid var(--line)', padding: 10 }}>
              <div style={{ fontSize: 9, color: 'var(--titanium-3)', marginBottom: 6 }}>{l}</div>
              <div style={{ fontSize: 18, color: col, fontFamily: 'var(--f-display)', fontWeight: 500 }}>{v}</div>
            </div>
          ))}
        </div>
        {/* Chart */}
        <div style={{ border: '1px solid var(--line)', margin: 12, padding: 12 }}>
          <div style={{ fontSize: 10, color: 'var(--titanium-hi)', marginBottom: 8 }}>THROUGHPUT · 60min rolling</div>
          <svg viewBox="0 0 560 120" style={{ width: '100%', height: 100, display: 'block' }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--cobalt)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--cobalt)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#areaGm)" />
            <path d={linePath} fill="none" stroke="var(--cobalt)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: 'var(--f-mono)',
      color: 'var(--titanium)',
      background: 'var(--ink)',
      border: '1px solid var(--line)',
    }}>
      {/* App chrome */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--titanium-3)' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--titanium-3)' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--titanium-3)' }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--titanium-2)' }}>meridian.ops ▸ inventory ▸ live</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 10 }}>
          <span style={{ color: 'var(--ok)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)', boxShadow: '0 0 8px var(--ok)' }} />
            LIVE · 2.4M/hr
          </span>
          <span style={{ color: 'var(--titanium-3)' }}>T+{String(tick).padStart(4,'0')}s</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: isTablet ? '1fr' : '180px 1fr', minHeight: isTablet ? 'auto' : 540 }}>
        {/* Sidebar — hidden on tablet */}
        {!isTablet && (
          <div style={{
            borderRight: '1px solid var(--line)',
            padding: '16px 14px',
            fontSize: 11,
          }}>
            {['OVERVIEW','FLEET','INVENTORY','WAREHOUSES','FORECAST','ALERTS','ACCOUNT'].map((it, i) => (
              <div key={it} style={{
                padding: '10px 10px',
                marginBottom: 2,
                color: i === 2 ? 'var(--titanium-hi)' : 'var(--titanium-2)',
                background: i === 2 ? 'var(--graphite-2)' : 'transparent',
                borderLeft: i === 2 ? '2px solid var(--cobalt)' : '2px solid transparent',
                display: 'flex', justifyContent: 'space-between',
              }}>
                <span>{it}</span>
                {i === 2 && <span style={{ color: 'var(--cobalt)' }}>◉</span>}
                {i === 5 && <span style={{ color: 'var(--danger)', fontSize: 9 }}>3</span>}
              </div>
            ))}
            <div style={{ marginTop: 28, padding: 10, border: '1px solid var(--line)', fontSize: 10, color: 'var(--titanium-3)' }}>
              <div style={{ marginBottom: 6 }}>SYSTEM · NOMINAL</div>
              <div style={{ color: 'var(--titanium-2)' }}>14 warehouses</div>
              <div style={{ color: 'var(--titanium-2)' }}>2,412 SKUs</div>
              <div style={{ color: 'var(--titanium-2)' }}>87 vehicles</div>
            </div>
          </div>
        )}

        {/* Main */}
        <div style={{ padding: 20 }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
            {[
              ['INVENTORY VALUE', '$24.8M', '+2.4%', 'var(--ok)'],
              ['IN TRANSIT', '1,847 SKU', '−0.2%', 'var(--titanium-2)'],
              ['STOCKOUTS', '3', '+1', 'var(--danger)'],
              ['ON-TIME RATE', '98.4%', '+0.8%', 'var(--ok)'],
            ].map(([l,v,d,col], i) => (
              <div key={i} style={{ border: '1px solid var(--line)', padding: 12 }}>
                <div style={{ fontSize: 9, color: 'var(--titanium-3)', marginBottom: 8 }}>{l}</div>
                <div style={{ fontSize: 22, color: 'var(--titanium-hi)', fontFamily: 'var(--f-display)', fontWeight: 500, letterSpacing: '-0.02em' }}>{v}</div>
                <div style={{ fontSize: 10, color: col, marginTop: 4 }}>▲ {d}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ border: '1px solid var(--line)', padding: 16, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: 'var(--titanium-hi)' }}>THROUGHPUT · 60min rolling</div>
              <div style={{ display: 'flex', gap: 12, fontSize: 9 }}>
                <span style={{ color: 'var(--titanium-2)' }}><span style={{color: 'var(--cobalt)'}}>●</span> UNITS/MIN</span>
                <span style={{ color: 'var(--titanium-3)' }}><span style={{color: 'var(--titanium-3)'}}>●</span> BASELINE</span>
              </div>
            </div>
            <svg viewBox="0 0 560 180" style={{ width: '100%', height: 180, display: 'block' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--cobalt)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--cobalt)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25,0.5,0.75].map(y => (
                <line key={y} x1="0" y1={180*y} x2="560" y2={180*y} stroke="var(--line)" strokeDasharray="2 3" />
              ))}
              <path d={areaPath} fill="url(#areaG)" />
              <path d={linePath} fill="none" stroke="var(--cobalt)" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Warehouse grid + Table — hidden on tablet for space */}
          {!isTablet && (
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 12 }}>
              <div style={{ border: '1px solid var(--line)', padding: 14 }}>
                <div style={{ fontSize: 11, color: 'var(--titanium-hi)', marginBottom: 12 }}>WAREHOUSE CAPACITY</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {Array.from({length: 14}).map((_, i) => {
                    const v = ((Math.sin(i * 0.9) + 1) / 2);
                    const col = v > 0.8 ? 'var(--danger)' : v > 0.6 ? 'var(--cobalt)' : 'var(--titanium-3)';
                    return (
                      <div key={i} style={{ aspectRatio: '1.1', background: col, opacity: 0.3 + v * 0.7, position: 'relative' }}>
                        <span style={{ position: 'absolute', top: 4, left: 4, fontSize: 8, color: 'var(--ink)', fontWeight: 600 }}>
                          W{String(i+1).padStart(2,'0')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{ border: '1px solid var(--line)' }}>
                <div style={{ fontSize: 11, color: 'var(--titanium-hi)', padding: '12px 14px', borderBottom: '1px solid var(--line)' }}>LIVE ALERTS</div>
                {[
                  ['CRITICAL', 'W07 · SKU-8820 low stock', '00:04'],
                  ['WARN', 'Route A12 delayed 14min', '00:18'],
                  ['WARN', 'W03 humidity above threshold', '00:42'],
                  ['INFO', 'Reorder triggered SKU-1194', '01:03'],
                ].map(([lv, msg, t], i) => (
                  <div key={i} style={{ display: 'flex', padding: '9px 14px', borderBottom: i < 3 ? '1px solid var(--line)' : 'none', fontSize: 10, gap: 10 }}>
                    <span style={{ color: lv === 'CRITICAL' ? 'var(--danger)' : lv === 'WARN' ? '#F5B949' : 'var(--titanium-2)', minWidth: 54 }}>{lv}</span>
                    <span style={{ color: 'var(--titanium)', flex: 1 }}>{msg}</span>
                    <span style={{ color: 'var(--titanium-3)' }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ===== Commerce mockup =====
const CommerceMock = ({ c, isMobile, isTablet }) => {
  return (
    <div style={{
      fontFamily: 'var(--f-body)',
      background: '#F5F2EC',
      color: '#1C1A17',
      minHeight: isMobile ? 'auto' : 560,
      position: 'relative',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '14px 16px' : '18px 32px',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
      }}>
        {!isMobile && <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.15em' }}>FR · EUR · €</div>}
        <div style={{
          fontFamily: 'var(--f-display)',
          fontSize: isMobile ? 16 : 22,
          letterSpacing: '0.24em',
          fontWeight: 400,
        }}>ATELIER NOIRE</div>
        <div style={{ display: 'flex', gap: isMobile ? 12 : 20, fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em' }}>
          {!isMobile && <span>SEARCH</span>}
          {!isMobile && <span>ACCOUNT</span>}
          <span>BAG (2)</span>
        </div>
      </div>

      {/* Nav — hidden on mobile */}
      {!isMobile && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, padding: '14px 32px', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: 12, letterSpacing: '0.08em' }}>
          {['ATELIER','COUTURE','READY-TO-WEAR','ACCESSORIES','FRAGRANCE','JOURNAL','APPOINTMENT'].map(n => (
            <span key={n}>{n}</span>
          ))}
        </div>
      )}

      {/* Hero split */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', minHeight: isMobile ? 'auto' : 360 }}>
        {/* Editorial */}
        <div style={{
          padding: isMobile ? '28px 20px' : '56px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: isMobile ? 20 : 0,
          position: 'relative',
        }}>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em' }}>COLLECTION № 12 · SPRING 2026</div>
          <div>
            <div style={{
              fontFamily: 'var(--f-display)',
              fontSize: isMobile ? 36 : isTablet ? 48 : 68,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontWeight: 400,
              marginBottom: 24,
            }}>
              <em style={{ fontStyle: 'italic', fontWeight: 300 }}>La</em> Dentelle,<br />
              reconstructed.
            </div>
            <div style={{ fontSize: 14, maxWidth: 380, color: '#3a3632', marginBottom: 24 }}>
              Thirty-two pieces hand-finished in the atelier. Measured and fitted in-person or via private video consultation.
            </div>
            <div style={{ display: 'flex', gap: 12, fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em', flexWrap: 'wrap' }}>
              <span style={{ padding: '12px 18px', background: '#1C1A17', color: '#F5F2EC' }}>VIEW COLLECTION →</span>
              <span style={{ padding: '12px 18px', border: '1px solid #1C1A17' }}>BOOK FITTING</span>
            </div>
          </div>
          {!isMobile && (
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.15em', color: '#7a7570' }}>
              FIG.I — <em>Robe N° 08</em> · Soie sauvage, dentelle de Calais
            </div>
          )}
        </div>
        {/* Image placeholder */}
        <div style={{
          background: 'linear-gradient(135deg, #d4c9b8 0%, #8a7f6f 60%, #3a342c 100%)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? 200 : 'auto',
        }}>
          <div style={{ position: 'absolute', inset: 24, border: '1px solid rgba(255,255,255,0.25)' }} />
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 36, right: 36,
              fontFamily: 'var(--f-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.8)',
            }}>PLATE · N° 08 / 32</div>
          )}
          <div style={{
            position: 'absolute', bottom: 24, left: 24, right: 24,
            display: 'flex', justifyContent: 'space-between',
            fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.8)',
          }}>
            <span>€ 24 800</span>
            {!isMobile && <span>MADE-TO-ORDER · 6–8 WKS</span>}
          </div>
        </div>
      </div>

      {/* Product rail */}
      <div style={{ padding: isMobile ? '24px 16px' : '40px 32px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.2em', marginBottom: 6 }}>THE EDIT</div>
            <div style={{ fontFamily: 'var(--f-display)', fontSize: isMobile ? 22 : 32, letterSpacing: '-0.02em' }}>Recently commissioned</div>
          </div>
          <div style={{ fontFamily: 'var(--f-mono)', fontSize: 10, letterSpacing: '0.12em' }}>01 / 04 →</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: (isMobile || isTablet) ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16 }}>
          {[
            ['N° 12', 'Manteau en cachemire', '€ 8 400'],
            ['N° 17', 'Robe de soirée', '€ 14 200'],
            ['N° 23', 'Tailleur jupe', '€ 6 900'],
            ['N° 29', 'Veste structurée', '€ 9 600'],
          ].map(([n, name, price], i) => (
            <div key={n}>
              <div style={{
                aspectRatio: '3/4',
                background: ['#c9bdaa','#a89580','#6b6055','#3a342c'][i],
                marginBottom: 10,
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 10, left: 10,
                  fontFamily: 'var(--f-mono)', fontSize: 9, letterSpacing: '0.15em',
                  color: i > 1 ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)',
                }}>{n}</div>
              </div>
              <div style={{ fontSize: 12, marginBottom: 2 }}>{name}</div>
              <div style={{ fontFamily: 'var(--f-mono)', fontSize: 11, color: '#5a554f' }}>{price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.CaseStudies = CaseStudies;
