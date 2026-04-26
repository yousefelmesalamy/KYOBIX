const useCounter = (target, duration = 1600) => {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  const [started, setStarted] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  React.useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);
  return [v, ref];
};

const DECISIONS = [
  {
    title: 'ClickHouse over PostgreSQL for time-series',
    chosen: 'ClickHouse',
    rejected: 'PostgreSQL + TimescaleDB',
    rationale: 'At 2.4M events/hour across 14 warehouses, TimescaleDB\'s compression overhead and hypertable query planner added unacceptable P99 latency. ClickHouse\'s columnar engine cut P95 from 1.8s to 380ms.',
    outcome: 'P95 load: 380ms. Storage cost reduced 62% vs projected PostgreSQL.',
  },
  {
    title: 'WebSockets over polling for fleet state',
    chosen: 'WebSocket (socket.io)',
    rejected: 'HTTP long-polling',
    rationale: 'With 40+ vehicle events per second, polling introduced visible stutter and amplified server load by 8×. WebSocket connection fan-out with Redis pub/sub proved stable under load testing at 4× expected peak.',
    outcome: 'Event delivery latency < 120ms. Server load reduced 71% at peak.',
  },
  {
    title: 'Angular standalone components over modules',
    chosen: 'Angular 17 Standalone',
    rejected: 'NgModules',
    rationale: 'The client\'s team had an existing Angular codebase with deep NgModule patterns. Standalone components allowed gradual migration without forking, and reduced initial bundle size by 34% through tree-shaking.',
    outcome: 'Initial bundle: 187kb gzipped. LCP: 1.1s on 4G.',
  },
];

const STACK = ['Angular 17', 'TypeScript', 'RxJS', 'Node.js', 'ClickHouse', 'Redis', 'WebSocket', 'Docker', 'Kubernetes', 'OpenTelemetry', 'Prometheus', 'Grafana', 'GCP', 'Terraform'];

const MeridianCase = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const [p95, p95ref] = useCounter(380);
  const [uptime, uptimeref] = useCounter(99.97, 2000);
  const [warehouses, wref] = useCounter(14);
  const [events, eref] = useCounter(2.4, 1400);

  return (
    <>
      {/* Hero */}
      <section id="top" style={{ minHeight: '70vh', paddingTop: 64, borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container">
          <div style={{ paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 28 : 48, borderBottom: '1px solid var(--line)', marginBottom: isMobile ? 28 : 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>K-001 / MERIDIAN LOGISTICS — CASE STUDY</div>
            {!isMobile && <a href="../index.html#work" className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>← All case studies</a>}
          </div>
          <div className="mono" style={{ color: 'var(--cobalt)', marginBottom: 16 }}>LOGISTICS · 2023</div>
          <h1 className="display h1" style={{ marginBottom: 24 }}>
            Meridian<br />
            <span style={{ color: 'var(--titanium-2)' }}>Fleet Intelligence.</span>
          </h1>
          <p style={{ maxWidth: 620, fontSize: isMobile ? 16 : 19, color: 'var(--titanium-2)', lineHeight: 1.6 }}>
            Real-time fleet telemetry dashboard for 14 warehouses across Southeast Asia.
            2.4 million data points per hour. P95 load 380ms.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', border: '1px solid var(--line-2)' }}>
            {[
              { ref: p95ref, val: p95, label: 'P95 LOAD', suffix: 'ms', dec: 0 },
              { ref: uptimeref, val: uptime, label: 'UPTIME', suffix: '%', dec: 2 },
              { ref: wref, val: warehouses, label: 'WAREHOUSES', suffix: '', dec: 0 },
              { ref: eref, val: events, label: 'EVENTS / HOUR', suffix: 'M', dec: 1 },
            ].map((m, i) => (
              <div key={m.label} ref={m.ref} style={{ padding: isMobile ? '24px 16px' : '36px 28px', borderRight: i < 3 ? '1px solid var(--line-2)' : 'none' }}>
                <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 12 }}>{m.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <div className="display" style={{ fontSize: isMobile ? 36 : 56, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
                    {m.val.toFixed(m.dec)}
                  </div>
                  <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 13 }}>{m.suffix}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief */}
      <section className="section" style={{ background: 'var(--graphite)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">§ 01 / BRIEF</div>
            <div>
              <h2 className="display h2" style={{ marginBottom: 20 }}>The problem.</h2>
              <p style={{ fontSize: 17, color: 'var(--titanium-2)', lineHeight: 1.7, maxWidth: 680, marginBottom: 16 }}>
                Meridian Logistics operated 14 warehouses across Southeast Asia with no unified real-time visibility into fleet state. Operations managers worked from stale spreadsheets updated every 15 minutes by manual radio check-ins. Vehicles frequently sat idle for hours before the control center was aware.
              </p>
              <p style={{ fontSize: 17, color: 'var(--titanium-2)', lineHeight: 1.7, maxWidth: 680, marginBottom: 16 }}>
                Two prior attempts to build a dashboard had failed — one abandoned after 8 months due to performance issues at scale, one delivered but never adopted because the UI latency made it unusable during peak operations.
              </p>
              <p style={{ fontSize: 17, color: 'var(--titanium-2)', lineHeight: 1.7, maxWidth: 680 }}>
                The brief to Kyobix: a real-time fleet dashboard that is still fast when every vehicle is moving at once, that operations managers will actually use, and that the internal team can maintain without our involvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture diagram */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">§ 02 / ARCHITECTURE</div>
            <div><h2 className="display h2" style={{ marginBottom: 16 }}>System topology.</h2></div>
          </div>
          <div style={{ border: '1px solid var(--line-2)', padding: isMobile ? 20 : 40, background: 'var(--graphite-2)' }}>
            <svg viewBox="0 0 700 280" width="100%" style={{ display: 'block' }}>
              <defs>
                <pattern id="m-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(216,220,226,0.04)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="700" height="280" fill="url(#m-grid)"/>
              {/* Nodes */}
              {[
                { x: 20,  y: 100, w: 110, h: 50, label: 'VEHICLE\nSENSORS', color: 'rgba(216,220,226,0.08)' },
                { x: 180, y: 80,  w: 120, h: 70, label: 'NODE.JS\nWEBSOCKET', color: 'rgba(42,83,255,0.1)', accent: true },
                { x: 350, y: 80,  w: 120, h: 70, label: 'REDIS\nPUB/SUB', color: 'rgba(216,220,226,0.06)' },
                { x: 520, y: 60,  w: 120, h: 50, label: 'CLICKHOUSE\nTIME-SERIES', color: 'rgba(62,213,152,0.08)' },
                { x: 520, y: 130, w: 120, h: 50, label: 'ANGULAR\nDASHBOARD', color: 'rgba(42,83,255,0.08)' },
              ].map((n, i) => (
                <g key={i}>
                  <rect x={n.x} y={n.y} width={n.w} height={n.h} fill={n.color} stroke={n.accent ? 'rgba(42,83,255,0.4)' : 'rgba(216,220,226,0.12)'} strokeWidth="1"/>
                  {n.label.split('\n').map((line, li) => (
                    <text key={li} x={n.x + n.w/2} y={n.y + 20 + li * 16} textAnchor="middle" fill="rgba(200,205,212,0.7)" fontFamily="'Geist Mono',monospace" fontSize="9" letterSpacing="0.06em">{line}</text>
                  ))}
                </g>
              ))}
              {/* Arrows */}
              <line x1="130" y1="125" x2="178" y2="115" stroke="rgba(139,144,153,0.4)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="300" y1="115" x2="348" y2="115" stroke="rgba(42,83,255,0.5)" strokeWidth="1.5"/>
              <line x1="470" y1="100" x2="518" y2="90" stroke="rgba(62,213,152,0.4)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="470" y1="125" x2="518" y2="150" stroke="rgba(42,83,255,0.4)" strokeWidth="1"/>
              {/* Labels */}
              <text x="350" y="260" textAnchor="middle" fill="rgba(90,95,104,0.5)" fontFamily="'Geist Mono',monospace" fontSize="8" letterSpacing="0.08em">FIG.03 — MERIDIAN LOGISTICS SYSTEM TOPOLOGY · K-001</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ADR Decisions */}
      <section className="section" style={{ background: 'var(--graphite)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">§ 03 / DECISIONS</div>
            <div><h2 className="display h2" style={{ marginBottom: 16 }}>Architecture decisions.</h2>
            <p style={{ maxWidth: 480, fontSize: 17, color: 'var(--titanium-2)' }}>Three key choices with their rationale, documented as ADRs.</p></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, border: '1px solid var(--line-2)' }}>
            {DECISIONS.map((d, i) => (
              <div key={i} className="framed" style={{ padding: isMobile ? 24 : 36, borderBottom: i < DECISIONS.length-1 ? '1px solid var(--line-2)' : 'none', background: 'var(--graphite-2)' }}>
                {i === 0 && <span className="tick-tr"/>}
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 32 }}>
                  <div>
                    <div className="mono" style={{ color: 'var(--cobalt)', marginBottom: 12, fontSize: 10 }}>ADR-{String(i+1).padStart(3,'0')}</div>
                    <div className="display" style={{ fontSize: isMobile ? 18 : 22, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 16 }}>{d.title}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                      <span className="mono" style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(42,83,255,0.1)', color: 'var(--cobalt)', border: '1px solid rgba(42,83,255,0.2)' }}>✓ {d.chosen}</span>
                      <span className="mono" style={{ fontSize: 10, padding: '3px 8px', border: '1px solid var(--line-2)', color: 'var(--titanium-3)' }}>✗ {d.rejected}</span>
                    </div>
                  </div>
                  <div>
                    <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 10 }}>RATIONALE</div>
                    <p style={{ fontSize: 14, color: 'var(--titanium-2)', lineHeight: 1.6, marginBottom: 16 }}>{d.rationale}</p>
                    <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 8 }}>OUTCOME</div>
                    <p style={{ fontSize: 14, color: 'var(--ok)', lineHeight: 1.5 }}>{d.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">§ 04 / STACK</div>
            <div><h2 className="display h2">Technologies used.</h2></div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {STACK.map(s => (
              <span key={s} className="mono" style={{ fontSize: 11, padding: '6px 12px', border: '1px solid var(--line-2)', color: 'var(--titanium-2)' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--graphite)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Next engagement</div>
            <h2 className="display h3" style={{ marginBottom: 12 }}>Commission a build like this.</h2>
            <p style={{ fontSize: 16, color: 'var(--titanium-2)', maxWidth: 400 }}>Two slots remaining for Q3 2026.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
            <a href="../index.html#contact" className="btn btn-primary" style={{ fontSize: 12 }}>Commission a build <span className="arrow">→</span></a>
            <a href="../index.html#work" className="btn" style={{ fontSize: 12 }}>All case studies</a>
          </div>
        </div>
      </section>
    </>
  );
};

window.MeridianCase = MeridianCase;
