// ====== Metrics / Counters ======
const useCounter = (target, duration = 1600, start = 0) => {
  const [v, setV] = React.useState(start);
  const ref = React.useRef(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(start + (target - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  return [v, ref];
};

const Metric = ({ label, value, suffix, prefix, decimals = 0, note, compact }) => {
  const [v, ref] = useCounter(value);
  const display = prefix ? `${prefix}${v.toFixed(decimals)}` : v.toFixed(decimals);
  return (
    <div ref={ref} style={{ padding: compact ? '28px 20px' : '40px 32px', position: 'relative' }}>
      <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 16 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <div className="display" style={{ fontSize: compact ? 48 : 72, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
          {display}
        </div>
        <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 14 }}>{suffix}</div>
      </div>
      {note && <div style={{ marginTop: 12, fontSize: 13, color: 'var(--titanium-2)' }}>{note}</div>}
    </div>
  );
};

const Metrics = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const compact = isMobile || isTablet;

  const cols = isMobile ? 1 : isTablet ? 2 : 4;

  return (
    <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">BY THE NUMBERS</div>
          <div>
            <h2 className="display h2">
              Results<br />that matter.
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          border: '1px solid var(--line-2)',
        }}>
          {[
            { label: 'CAPITAL SECURED', value: 14.2, decimals: 1, prefix: '$', suffix: 'M', note: 'Aggregate client ROI recovered.' },
            { label: 'SYSTEM RESILIENCE', value: 99.99, decimals: 2, suffix: '%', note: 'Consistent mission-critical uptime.' },
            { label: 'TECH DEBT WIPED', value: 8.4, decimals: 1, prefix: '$', suffix: 'M+', note: 'Estimated legacy cost mitigation.' },
            { label: 'RETENTION RATE', value: 100, suffix: '%', note: 'Every engagement renewed.' },
          ].map((m, i) => {
            const isLastInRow = cols === 4 ? i === 3 : cols === 2 ? i % 2 === 1 : true;
            const isFirstRow = cols === 2 ? i < 2 : false;
            return (
              <div key={m.label} style={{
                borderRight: isLastInRow ? 'none' : '1px solid var(--line-2)',
                borderBottom: (isMobile && i < 3) || (isTablet && isFirstRow) ? '1px solid var(--line-2)' : 'none',
              }}>
                <Metric {...m} compact={compact} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ====== Team ======
const TEAM = [
  { name: 'Seo-jun Pak',      role: 'Principal · Architecture',       loc: 'SEL',  init: 'SP' },
  { name: 'Clara Ivanova',    role: 'Lead · Front-End Systems',       loc: 'BER',  init: 'CI' },
  { name: 'Marcus Delacroix', role: 'Lead · Infrastructure',          loc: 'NYC',  init: 'MD' },
  { name: 'Yuki Tanaka',      role: 'Design Engineer',                loc: 'TYO',  init: 'YT' },
  { name: 'Amara Obi',        role: 'Commerce Systems',               loc: 'LON',  init: 'AO' },
  { name: 'Rafael Moreno',    role: 'Data · Observability',           loc: 'MAD',  init: 'RM' },
];

const Team = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section id="team" className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">OUR TEAM</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Senior principals.<br />
              <span style={{ color: 'var(--titanium-2)' }}>No handovers.</span>
            </h2>
            <p style={{ maxWidth: 620, fontSize: 17, color: 'var(--titanium-2)' }}>
              The engineer who scopes your project is the one who builds it.
              Small by design, senior by default. No juniors, no outsourcing, no friction.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 0,
          border: '1px solid var(--line-2)',
        }}>
          {TEAM.map((p, i) => {
            const isLastInRow = i % cols === cols - 1;
            const isLastRow = i >= TEAM.length - cols;
            return (
              <div key={p.name} style={{
                padding: isMobile ? '24px 20px' : '32px 28px',
                borderRight: isLastInRow ? 'none' : '1px solid var(--line-2)',
                borderBottom: isLastRow ? 'none' : '1px solid var(--line-2)',
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                minHeight: isMobile ? 'auto' : 220,
                justifyContent: 'space-between',
                transition: 'background 200ms',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(42,83,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: 64, height: 64,
                  border: '1px solid var(--line-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--f-display)',
                  fontSize: 22, fontWeight: 500,
                  color: 'var(--titanium-hi)',
                  letterSpacing: '-0.02em',
                  position: 'relative',
                }}>
                  {p.init}
                  <span style={{
                    position: 'absolute', top: -1, right: -1, width: 6, height: 6,
                    background: 'var(--cobalt)',
                  }} />
                </div>
                <div>
                  <div className="display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 6 }}>
                    {p.name}
                  </div>
                  <div style={{ color: 'var(--titanium-2)', fontSize: 14, marginBottom: 12 }}>
                    {p.role}
                  </div>
                  <div className="mono" style={{ color: 'var(--titanium-3)' }}>
                    {p.loc} · UTC{p.loc === 'SEL' ? '+9' : p.loc === 'TYO' ? '+9' : p.loc === 'NYC' ? '−4' : p.loc === 'MAD' ? '+1' : p.loc === 'BER' ? '+1' : '+0'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ====== Manifesto ======
const TENETS = [
  ['We plan before we build', 'Every system starts with a comprehensive blueprint. This eliminates architectural drift and technical debt before it happens.'],
  ['We document everything', 'We deliver working software plus the internal documentation (ADRs, schemas, flowcharts) your team needs to own it forever.'],
  ['We build for real load', 'Our systems are stress-tested for your peak traffic events. We build for production stability, not for demo-day optics.'],
  ['We communicate with precision', 'No jargon, no fluff. We provide weekly high-fidelity reports that link technical progress directly to business objectives.'],
  ['The Principal-Only Guarantee', 'You will never be handed off to a junior associate or account manager. The principal who architects your system is the one who executes it.'],
];

const Manifesto = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);

  return (
    <section id="manifesto" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">OUR COMMITMENTS</div>
          <div>
            <h2 className="display h2">
              Engineering<br />
              standards.
            </h2>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          borderTop: '1px solid var(--line-2)',
        }}>
          {TENETS.map(([head, tail], i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '48px 1fr 1.4fr' : '80px 1fr 1.6fr',
              gap: isMobile ? 12 : 32,
              padding: isMobile ? '24px 0' : '40px 0',
              borderBottom: '1px solid var(--line-2)',
              alignItems: 'start',
            }}>
              <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 13 }}>
                0{i+1} /05
              </div>
              <div className="display" style={{ fontSize: isMobile ? 22 : 30, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                {head}
              </div>
              <div style={{ fontSize: isMobile ? 15 : 18, color: 'var(--titanium-2)', lineHeight: 1.45, paddingTop: isMobile ? 0 : 6 }}>
                {tail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ====== Client Results / ROI ======
const CLIENT_RESULTS = [
  {
    tag: 'LOGISTICS · INTELLIGENCE',
    client: 'Meridian Global Logistics',
    problem: 'Fragmented data across 14 global hubs was causing 20% inventory slippage and massive manual overhead.',
    metrics: [
      { label: 'ANNUAL EFFICIENCY', value: 1.2, decimals: 1, prefix: '$', suffix: 'M', note: 'Operational ROI' },
      { label: 'INVENTORY SLIPPAGE', value: 20, suffix: '% reduction', note: 'Live SKU telemetry' },
      { label: 'DECISION LATENCY', value: 67, suffix: '% faster', note: 'Real-time intelligence' },
    ],
    outcome: 'Engineered an Intelligence Engine unifying 2,400 SKUs into a high-performance operational cockpit.',
  },
  {
    tag: 'HIGH-TICKET · E-COMMERCE',
    client: 'Atelier Noire',
    problem: 'Legacy monolithic architecture was failing during peak global sales, costing $400k/mo in abandoned carts.',
    metrics: [
      { label: 'MONTHLY RECOVERY', value: 400, suffix: 'k', prefix: '$', note: 'Reclaimed revenue' },
      { label: 'CONVERSION LIFT', value: 41, suffix: '% lift', note: 'For orders >$10k' },
      { label: 'LCP IMPROVEMENT', value: 78, suffix: '%', note: '0.9s global median' },
    ],
    outcome: 'Custom Headless Commerce Engine optimized for high-AOV transactions and global stability.',
  },
  {
    tag: 'FINTECH · GOVERNANCE',
    client: 'Series B Fintech',
    problem: 'Rapid team scaling led to architecture drift and $2M+ in projected maintenance and technical debt.',
    metrics: [
      { label: 'TECH DEBT MITIGATED', value: 2.4, decimals: 1, prefix: '$', suffix: 'M', note: 'Valuation protection' },
      { label: 'ENGINEERING VELOCITY', value: 3, suffix: '×', note: 'Productivity increase' },
      { label: 'ONBOARDING SAVED', value: 80, suffix: '%', note: 'Efficiency gain' },
    ],
    outcome: 'Established a Technical Governance Framework that scaled the engineering team 3× without debt.',
  },
];

const ResultMetric = ({ metric: m, isLast }) => {
  const [v, ref] = useCounter(m.value, 1200);
  const display = m.prefix ? `${m.prefix}${v.toFixed(m.decimals || 0)}` : v.toFixed(m.decimals || 0);
  return (
    <div ref={ref} style={{
      padding: '16px 18px',
      borderBottom: isLast ? 'none' : '1px solid var(--line-2)',
    }}>
      <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10, marginBottom: 8 }}>{m.label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <div className="display" style={{ fontSize: 36, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          {display}
        </div>
        {m.suffix && <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 12 }}>{m.suffix}</div>}
      </div>
      <div style={{ fontSize: 12, color: 'var(--titanium-2)', marginTop: 6 }}>{m.note}</div>
    </div>
  );
};

const ClientResults = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const cols = isMobile ? 1 : isTablet ? 1 : 3;

  return (
    <section className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">CLIENT OUTCOMES</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Real results<span style={{ color: 'var(--titanium-2)' }}>.</span>
            </h2>
            <p style={{ maxWidth: 560, fontSize: 17, color: 'var(--titanium-2)' }}>
              What our clients gained — measured in production, not projections.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          border: '1px solid var(--line-2)',
        }}>
          {CLIENT_RESULTS.map((r, ri) => {
            const isLast = ri === CLIENT_RESULTS.length - 1;
            return (
              <div key={r.tag} style={{
                padding: isMobile ? 24 : 32,
                borderRight: (!isMobile && !isTablet && !isLast) ? '1px solid var(--line-2)' : 'none',
                borderBottom: (isMobile || isTablet) && !isLast ? '1px solid var(--line-2)' : 'none',
                background: 'var(--graphite-2)',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                transition: 'background 200ms',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(42,83,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--graphite-2)'}
              >
                <div>
                  <div className="mono" style={{ color: 'var(--cobalt)', marginBottom: 10 }}>{r.tag}</div>
                  <div className="display" style={{ fontSize: isMobile ? 22 : 26, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 8 }}>
                    {r.client}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--titanium-2)', lineHeight: 1.5 }}>{r.problem}</p>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 0,
                  border: '1px solid var(--line-2)',
                }}>
                  {r.metrics.map((m, mi) => {
                    const isLastMetric = mi === r.metrics.length - 1;
                    return (
                      <ResultMetric key={m.label} metric={m} isLast={isLastMetric} />
                    );
                  })}
                </div>

                <div style={{
                  paddingTop: 16,
                  borderTop: '1px solid var(--line-2)',
                  fontSize: 14,
                  color: 'var(--titanium)',
                  lineHeight: 1.5,
                }}>
                  {r.outcome}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

window.Metrics = Metrics;
window.Team = Team;
window.Manifesto = Manifesto;
window.ClientResults = ClientResults;
