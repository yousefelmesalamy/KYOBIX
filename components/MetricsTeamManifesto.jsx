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
            { label: 'CAPITAL RECOVERED', value: 28.4, decimals: 1, prefix: '$', suffix: 'M', note: 'Aggregate client ROI from optimized systems.' },
            { label: 'SYSTEM RESILIENCE', value: 99.999, decimals: 3, suffix: '%', note: 'Consistent mission-critical uptime targets.' },
            { label: 'TECH DEBT MITIGATED', value: 12.6, decimals: 1, prefix: '$', suffix: 'M+', note: 'Estimated legacy cost mitigation.' },
            { label: 'RETENTION RATE', value: 100, suffix: '%', note: 'Every engagement renewed or expanded.' },
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
  { name: 'Seo-jun Pak',      role: 'Principal · Architecture & Governance', loc: 'SEL',  init: 'SP' },
  { name: 'Clara Ivanova',    role: 'Principal · Systems Integrity',         loc: 'BER',  init: 'CI' },
  { name: 'Marcus Delacroix', role: 'Principal · Infrastructure & Security',  loc: 'NYC',  init: 'MD' },
  { name: 'Yuki Tanaka',      role: 'Principal · Product Engineering',        loc: 'TYO',  init: 'YT' },
  { name: 'Amara Obi',        role: 'Principal · Commerce & Logistics',       loc: 'LON',  init: 'AO' },
  { name: 'Rafael Moreno',    role: 'Principal · Observability & Data',       loc: 'MAD',  init: 'RM' },
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
  { head: 'Architectural Sovereignty', tail: 'Every system begins with a comprehensive blueprint. We eliminate technical debt before it manifests, ensuring your architecture remains a strategic asset, not a liability.' },
  { head: 'Immutable Documentation', tail: 'We deliver production-grade software accompanied by an exhaustive ADR library and system contracts, enabling your team to maintain total ownership.' },
  { head: 'Engineered Resilience', tail: 'Our systems are built for the catastrophic, not the common. We stress-test for peak traffic events to ensure your infrastructure maintains absolute stability.' },
  { head: 'Commercial Alignment', tail: 'We speak the language of the balance sheet. Every engineering decision we make is directly linked to mitigating risk or maximizing operational ROI.' },
  { head: 'The Principal-Only Promise', tail: 'You will never be handed off to a junior associate. The principal who architects your system is the one who executes the implementation.' },
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
          {TENETS.map(({ head, tail }, i) => (
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
    tag: 'LOGISTICS · ARCHITECTURE',
    client: 'Meridian Global Logistics',
    problem: 'Fragmented data across 14 global hubs caused 20% inventory slippage. The existing architecture could not scale to support real-time telemetry.',
    metrics: [
      { label: 'ANNUAL EFFICIENCY', value: 2.8, decimals: 1, prefix: '$', suffix: 'M', note: 'Operational ROI' },
      { label: 'INVENTORY SLIPPAGE', value: 92, suffix: '% reduction', note: 'Live SKU telemetry' },
      { label: 'DECISION LATENCY', value: 85, suffix: '% faster', note: 'Real-time intelligence' },
    ],
    outcome: 'Engineered a resilient Intelligence Engine that unified global hub operations into a high-fidelity operational cockpit.',
  },
  {
    tag: 'HIGH-TICKET · COMMERCE',
    client: 'Atelier Noire',
    problem: 'A legacy monolith was failing during peak global sales events, resulting in $600k/mo in abandoned revenue and brand erosion.',
    metrics: [
      { label: 'MONTHLY RECOVERY', value: 600, suffix: 'k', prefix: '$', note: 'Reclaimed revenue' },
      { label: 'CONVERSION LIFT', value: 48, suffix: '% lift', note: 'For orders >$15k' },
      { label: 'LCP IMPROVEMENT', value: 82, suffix: '%', note: '0.8s global median' },
    ],
    outcome: 'Surgically extracted the core engine into a headless, low-latency architecture optimized for high-AOV global transactions.',
  },
  {
    tag: 'FINTECH · SCALE-AT-RISK',
    client: 'Series C Fintech',
    problem: 'Hyper-growth led to massive architectural drift. Projections showed $4M+ in technical debt remediation costs within 18 months.',
    metrics: [
      { label: 'TECH DEBT MITIGATED', value: 4.2, decimals: 1, prefix: '$', suffix: 'M', note: 'Valuation protection' },
      { label: 'ENGINEERING VELOCITY', value: 4, suffix: '×', note: 'Throughput increase' },
      { label: 'ONBOARDING SAVED', value: 75, suffix: '%', note: 'Efficiency gain' },
    ],
    outcome: 'Established an Architectural Governance Framework and ADR library that enabled a 4x engineering team expansion with zero debt.',
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
