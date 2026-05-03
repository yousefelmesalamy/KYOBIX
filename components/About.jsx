// ====== Shared counter utility ======
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

// ====== Data ======
const ABOUT_METRICS = [
  { label: 'YEARS OPERATING', value: 3, suffix: 'yrs', note: 'Founded Seoul, 2023.' },
  { label: 'ENGINEERS ON RETAINER', value: 6, suffix: '+', note: 'Every one a principal-grade contributor.' },
  { label: 'SYSTEMS SHIPPED', value: 23, suffix: '+', note: 'Across fintech, retail, logistics.' },
  { label: 'CLIENT RETENTION', value: 100, suffix: '%', note: 'Every engagement renewed or expanded.' },
  { label: 'AVG ENGAGEMENT VALUE', value: 280, prefix: '$', suffix: 'k', note: 'Fixed-scope and retainer combined.' },
  { label: 'ON-TIME DELIVERY', value: 97.8, decimals: 1, suffix: '%', note: 'Rolling 36-month average.' },
];

const ABOUT_PRINCIPLES = [
  {
    id: '01',
    title: 'Architecture as the Single Source of Truth',
    short: 'We write the C4 model before the first line of application code.',
    detail: 'Every system begins with an exhaustive architecture review: context diagrams, container maps, component contracts, and a formal risk register. Decisions are immutable ADRs. The codebase is a reflection of the architecture, never its source.',
  },
  {
    id: '02',
    title: 'Inherent Observability',
    short: 'Observability is a core deliverable, not a post-launch telemetry patch.',
    detail: 'Structured logging, distributed tracing, and precision SLO definitions are integrated into the initial commit. We deliver self-healing systems with comprehensive visibility, eliminating the need for tribal knowledge during a production incident.',
  },
  {
    id: '03',
    title: 'The Principal Constraint',
    short: 'Six engagements per year. Every line reviewed by a Principal Engineer.',
    detail: 'We reject the scale-at-all-costs model. Our six-engagement limit ensures that every client receives direct access to the firm\'s leadership. No juniors, no account managers, and zero dilution of quality for the sake of headcount.',
  },
  {
    id: '04',
    title: 'Domain Integrity',
    short: 'We own the complex logic gap between business requirements and system behavior.',
    detail: 'The primary failure mode in enterprise software is the accumulation of legacy complexity in the gap between intent and implementation. We specialize in domain modeling and API design that preserves business intent over decades of system evolution.',
  },
];

const TEAM = [
  { name: 'Seo-jun Pak', role: 'Principal · Architecture', loc: 'SEL', init: 'SP' },
  { name: 'Clara Ivanova', role: 'Lead · Front-End Systems', loc: 'BER', init: 'CI' },
  { name: 'Marcus Delacroix', role: 'Lead · Infrastructure', loc: 'NYC', init: 'MD' },
  { name: 'Yuki Tanaka', role: 'Design Engineer', loc: 'TYO', init: 'YT' },
  { name: 'Amara Obi', role: 'Commerce Systems', loc: 'LON', init: 'AO' },
  { name: 'Rafael Moreno', role: 'Data · Observability', loc: 'MAD', init: 'RM' },
];

const UTC_OFFSET = { SEL: '+9', TYO: '+9', NYC: '−4', LON: '+0', BER: '+1', MAD: '+1' };

const STACK_CAPABILITIES = [
  { category: 'FRONT-END', items: ['Angular', 'React / Next.js', 'TypeScript', 'RxJS', 'NgRx Signals', 'TanStack Query', 'D3.js', 'Three.js'] },
  { category: 'BACK-END', items: ['Node.js', 'PostgreSQL', 'Redis', 'GraphQL', 'REST / OpenAPI', 'gRPC', 'ClickHouse', 'Kafka'] },
  { category: 'INFRASTRUCTURE', items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD pipelines', 'OpenTelemetry', 'Prometheus'] },
  { category: 'COMMERCE', items: ['Shopify Hydrogen', 'Sanity CMS', 'Algolia', 'Stripe', 'PIM architecture', 'ERP integration'] },
  { category: 'ARCHITECTURE', items: ['C4 Model', 'ADR', 'Event Storming', 'Domain-Driven Design', 'CQRS', 'Saga pattern'] },
];

const VERTICALS = [
  { label: 'Enterprise SaaS', note: 'Multi-tenant platforms, billing engines, audit trails.' },
  { label: 'Fintech', note: 'Real-time data pipelines, compliance, ledger systems.' },
  { label: 'Luxury Retail', note: 'Headless commerce, PIM, high-AOV checkout flows.' },
  { label: 'Logistics', note: 'Fleet telemetry, warehouse ops, routing systems.' },
  { label: 'Healthcare', note: 'HIPAA-adjacent data flows, HL7/FHIR integration.' },
  { label: 'Media & Publishing', note: 'Editorial platforms, CDN architecture, search.' },
];

const GEO_OFFICES = [
  { city: 'Seoul', code: 'SEL', role: 'HQ · Architecture', tz: 'UTC+9' },
  { city: 'Berlin', code: 'BER', role: 'Front-End Systems', tz: 'UTC+1' },
  { city: 'New York', code: 'NYC', role: 'Infrastructure', tz: 'UTC−4' },
  { city: 'Tokyo', code: 'TYO', role: 'Design Engineering', tz: 'UTC+9' },
  { city: 'London', code: 'LON', role: 'Commerce Systems', tz: 'UTC+0' },
  { city: 'Madrid', code: 'MAD', role: 'Data · Observability', tz: 'UTC+1' },
];

const COMPARISON_ROWS = [
  { dimension: 'WHO BUILDS', kyobix: 'The principal who scoped it', typical: 'Whoever is available on the bench' },
  { dimension: 'DOCUMENTATION', kyobix: 'ADRs, C4 models, runbooks — always', typical: 'Confluence pages, if remembered' },
  { dimension: 'SUBCONTRACTING', kyobix: 'Never', typical: 'Common, often undisclosed' },
  { dimension: 'SCOPE MANAGEMENT', kyobix: 'Hard limits, set early. No surprises.', typical: 'Change orders at 80% complete' },
  { dimension: 'OBSERVABILITY', kyobix: 'First commit: metrics, traces, logs', typical: 'Added post-launch if budget remains' },
  { dimension: 'HANDOVER', kyobix: 'Your team owns it from day one', typical: 'Key-person dependency baked in' },
  { dimension: 'ENGAGEMENTS / YEAR', kyobix: 'Six maximum — by design', typical: 'As many as can be sold' },
  { dimension: 'POST-DELIVERY', kyobix: 'Advisory retainer available', typical: 'Support tickets; new SOW required' },
];

const TIMELINE_EVENTS = [
  { year: '2023', q: 'Q1', event: 'Practice founded', detail: 'Seo-jun Pak and Clara Ivanova establish Kyobix in Seoul following their exits from enterprise SaaS. Initial focus: Angular architecture retainers for fintech clients.' },
  { year: '2023', q: 'Q3', event: 'First system shipped', detail: 'K-001 delivered: the Meridian Logistics real-time fleet dashboard. 14 warehouses, 2.4M data points per hour. P95 load 380ms.' },
  { year: '2024', q: 'Q1', event: 'Infrastructure practice', detail: 'Marcus Delacroix joins as Lead Infrastructure from a Tier-1 cloud provider. DevOps and platform engineering formally added to scope.' },
  { year: '2024', q: 'Q2', event: 'Luxury retail mandate', detail: 'Atelier Noire engagement begins. Headless commerce for a Parisian couture house. Average order value €24,800. LCP 0.9s globally.' },
  { year: '2024', q: 'Q4', event: 'Team completes at six', detail: 'Yuki Tanaka, Amara Obi, and Rafael Moreno join across Tokyo, London, and Madrid. Four-timezone engineering coverage achieved.' },
  { year: '2025', q: 'Q2', event: 'Advisory retainer model', detail: 'Standing advisory offering introduced for post-engagement clients. Six slots established. All filled within the first quarter of launch.' },
  { year: '2026', q: 'Q1', event: 'v2026 platform refresh', detail: 'Internal tooling, blueprint templates, and ADR library rebuilt from the ground up. Kyobix.io relaunched. Q3 2026 engagement slate now forming.' },
];

// ====== About — Hero ======
const AboutHero = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);

  return (
    <section id="top" style={{
      minHeight: '80vh',
      paddingTop: 64,
      borderBottom: '1px solid var(--line)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      <div className="container">
        {/* Coordinate strip */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: isMobile ? 24 : 40,
          paddingBottom: isMobile ? 32 : 56,
          borderBottom: '1px solid var(--line)',
          marginBottom: isMobile ? 32 : 56,
        }}>
          <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>ABOUT — KYOBIX</div>
          {!isMobile && (
            <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>
              EST. 2023 · SEL / BER / NYC / TYO / LON / MAD
            </div>
          )}
        </div>

        {/* Headline grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '1.1fr 1fr',
          gap: isMobile ? 32 : 64,
          alignItems: 'center',
          paddingBottom: isMobile ? 48 : 80,
        }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 28 }}>High-End Software Architecture</div>
            <h1 className="display h1" style={{ marginBottom: 28 }}>
              Built on<br />
              principle<span style={{ color: 'var(--cobalt)' }}>.</span>
            </h1>
            <p style={{ maxWidth: 520, fontSize: isMobile ? 16 : 18, color: 'var(--titanium-2)', lineHeight: 1.6, marginBottom: 40 }}>
              Founded in 2023 by engineers who refused the false trade-off between craft and velocity.
              Kyobix is a boutique software architecture firm: six principals, four timezones,
              no juniors, no subcontracting. What you commission is what we build.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              gap: 0,
              paddingTop: 32,
              borderTop: '1px solid var(--line)',
            }}>
              {[
                ['EST.', '2023'],
                ['HEADCOUNT', '06'],
                ['HQ', 'GANGNAM-GU, SEOUL'],
              ].map(([k, v], i) => (
                <div key={k} style={{
                  padding: isMobile ? '16px 0' : '20px 0',
                  paddingRight: 20,
                  borderRight: i < 2 ? '1px solid var(--line)' : 'none',
                  paddingLeft: i > 0 ? 20 : 0,
                }}>
                  <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10, marginBottom: 8 }}>{k}</div>
                  <div style={{ color: 'var(--titanium-hi)', fontSize: isMobile ? 13 : 15, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Practice topology diagram */}
          {!isMobile && !isTablet && (
            <div style={{ position: 'relative' }}>
              <PracticeTopology />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const PracticeTopology = () => {
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setPhase(1), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg viewBox="0 0 480 320" width="100%" style={{ display: 'block', maxWidth: 480 }}>
      <defs>
        <pattern id="topo-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(216,220,226,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="480" height="320" fill="url(#topo-grid)" />

      {/* Frame */}
      <rect x="1" y="1" width="478" height="318" fill="none" stroke="rgba(216,220,226,0.08)" strokeWidth="1" />
      {/* Corner ticks */}
      {[[1, 1], [469, 1], [1, 309], [469, 309]].map(([cx, cy], i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx + 10} y2={cy} stroke="var(--titanium-3)" strokeWidth="1" />
          <line x1={cx} y1={cy} x2={cx} y2={cy + 10} stroke="var(--titanium-3)" strokeWidth="1" />
        </g>
      ))}

      {/* Three nodes */}
      <g>
        {/* Business Logic node */}
        <rect x="20" y="128" width="120" height="64" fill="rgba(14,17,23,0.9)" stroke="rgba(216,220,226,0.14)" strokeWidth="1" />
        <text x="80" y="152" textAnchor="middle" fill="rgba(139,144,153,0.7)" fontFamily="'Geist Mono',monospace" fontSize="9" letterSpacing="0.08em">BUSINESS</text>
        <text x="80" y="168" textAnchor="middle" fill="rgba(139,144,153,0.7)" fontFamily="'Geist Mono',monospace" fontSize="9" letterSpacing="0.08em">LOGIC</text>

        {/* Bridge node (center) */}
        <rect x="180" y="108" width="120" height="104" fill="rgba(42,83,255,0.06)" stroke="var(--cobalt)" strokeWidth="1" />
        <text x="240" y="148" textAnchor="middle" fill="var(--titanium-hi)" fontFamily="'Inter Tight',sans-serif" fontSize="14" fontWeight="500" letterSpacing="-0.02em">BRIDGE</text>
        <text x="240" y="168" textAnchor="middle" fill="rgba(42,83,255,0.9)" fontFamily="'Geist Mono',monospace" fontSize="9" letterSpacing="0.06em">KYOBIX</text>
        {/* Cobalt dot */}
        <circle cx="240" cy="108" r="3" fill="var(--cobalt)" />
        <circle cx="240" cy="108" r="8" fill="none" stroke="rgba(42,83,255,0.3)" strokeWidth="1">
          <animate attributeName="r" from="8" to="16" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Systems node */}
        <rect x="340" y="128" width="120" height="64" fill="rgba(14,17,23,0.9)" stroke="rgba(216,220,226,0.14)" strokeWidth="1" />
        <text x="400" y="152" textAnchor="middle" fill="rgba(139,144,153,0.7)" fontFamily="'Geist Mono',monospace" fontSize="9" letterSpacing="0.08em">SYSTEMS</text>
        <text x="400" y="168" textAnchor="middle" fill="rgba(139,144,153,0.7)" fontFamily="'Geist Mono',monospace" fontSize="9" letterSpacing="0.08em">LAYER</text>
      </g>

      {/* Connecting lines */}
      <line x1="140" y1="160" x2="180" y2="160" stroke="var(--titanium-3)" strokeWidth="1" strokeDasharray="4 3"
        style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 600ms ease 400ms' }} />
      <line x1="300" y1="160" x2="340" y2="160" stroke="var(--cobalt)" strokeWidth="1" strokeDasharray="4 3"
        style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 600ms ease 600ms' }} />

      {/* Arrow heads */}
      {phase >= 1 && <>
        <polygon points="178,156 184,160 178,164" fill="var(--titanium-3)" opacity="0.6" />
        <polygon points="342,156 348,160 342,164" fill="var(--cobalt)" opacity="0.8" />
      </>}

      {/* Caption */}
      <text x="240" y="300" textAnchor="middle" fill="rgba(90,95,104,0.6)" fontFamily="'Geist Mono',monospace" fontSize="8" letterSpacing="0.08em">
        FIG.02 — KYOBIX PRACTICE TOPOLOGY
      </text>
    </svg>
  );
};

// ====== About — Metrics ======
const AboutMetrics = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const compact = isMobile || isTablet;
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">PROOF</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Six numbers<br />
              <span style={{ color: 'var(--titanium-2)' }}>that matter.</span>
            </h2>
            <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--titanium-2)' }}>
              Not projections. These are measured outcomes from completed engagements.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          border: '1px solid var(--line-2)',
        }}>
          {ABOUT_METRICS.map((m, i) => {
            const isLastInRow = (i + 1) % cols === 0;
            const isLastRow = i >= ABOUT_METRICS.length - cols;
            return (
              <div key={m.label} style={{
                borderRight: isLastInRow ? 'none' : '1px solid var(--line-2)',
                borderBottom: isLastRow ? 'none' : '1px solid var(--line-2)',
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

// ====== About — Approach ======
const AboutApproach = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const [active, setActive] = React.useState(0);

  return (
    <section id="approach" className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">OUR PHILOSOPHY</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Four principles.<br />
              <span style={{ color: 'var(--titanium-2)' }}>No exceptions.</span>
            </h2>
            <p style={{ maxWidth: 560, fontSize: 17, color: 'var(--titanium-2)' }}>
              Not guidelines. Not aspirations. The constraints we impose on every engagement,
              regardless of timeline, budget, or stakeholder pressure.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line-2)' }}>
          {ABOUT_PRINCIPLES.map((p, i) => {
            const isActive = active === i;
            return (
              <div
                key={p.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  display: isMobile ? 'flex' : 'grid',
                  flexDirection: isMobile ? 'column' : undefined,
                  gridTemplateColumns: isMobile ? undefined : isTablet ? '48px 1fr' : '80px 1fr 1.6fr',
                  gap: isMobile ? 10 : 32,
                  alignItems: 'start',
                  padding: isMobile ? '24px 0' : isActive ? '40px 0' : '28px 0',
                  borderBottom: '1px solid var(--line-2)',
                  cursor: 'pointer',
                  position: 'relative',
                  background: isActive ? 'linear-gradient(to right, rgba(42,83,255,0.04), transparent 60%)' : 'transparent',
                  transition: 'padding 300ms ease, background 300ms ease',
                }}
              >
                {/* Active left indicator */}
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: 2,
                  background: isActive ? 'var(--cobalt)' : 'transparent',
                  transition: 'background 200ms',
                }} />

                {/* ID */}
                <div className="mono" style={{
                  color: isActive ? 'var(--cobalt)' : 'var(--titanium-3)',
                  fontSize: 12,
                  paddingLeft: 12,
                  paddingTop: isMobile ? 0 : 4,
                  transition: 'color 200ms',
                  flexShrink: 0,
                }}>
                  {p.id}
                </div>

                {/* Title + short desc */}
                <div>
                  <h3 className="display" style={{
                    fontSize: isMobile ? 22 : 28,
                    fontWeight: 500,
                    color: isActive ? 'var(--titanium-hi)' : 'var(--titanium)',
                    letterSpacing: '-0.02em',
                    marginBottom: 10,
                    transition: 'color 200ms',
                  }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--titanium-2)', lineHeight: 1.55 }}>
                    {p.short}
                  </p>
                  {/* Detail (always shown on mobile below short) */}
                  {(isMobile || isTablet) && (
                    <p style={{
                      fontSize: 15,
                      color: 'var(--titanium)',
                      lineHeight: 1.6,
                      maxHeight: isActive ? 200 : 0,
                      overflow: 'hidden',
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 14 : 0,
                      transition: 'max-height 350ms ease, opacity 250ms ease, margin-top 250ms ease',
                    }}>
                      {p.detail}
                    </p>
                  )}
                </div>

                {/* Detail — desktop third column */}
                {!isMobile && !isTablet && (
                  <p style={{
                    fontSize: 16,
                    color: 'var(--titanium)',
                    lineHeight: 1.6,
                    paddingTop: 4,
                    maxHeight: isActive ? 200 : 0,
                    overflow: 'hidden',
                    opacity: isActive ? 1 : 0,
                    transition: 'max-height 350ms ease, opacity 250ms ease',
                  }}>
                    {p.detail}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ====== About — Team ======
const AboutTeam = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section id="principals" className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">OUR TEAM</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Six engineers.<br />
              <span style={{ color: 'var(--titanium-2)' }}>Four timezones.</span>
            </h2>
            <p style={{ maxWidth: 620, fontSize: 17, color: 'var(--titanium-2)' }}>
              Small by design. Every engagement is led by a principal from day one through handover.
              There is no bench, no junior resourcing, no subcontracting. What you hire is what builds.
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
                    {p.loc} · UTC{UTC_OFFSET[p.loc]}
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

// ====== About — Track Record ======
const AboutTrackRecord = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const stackCols = isMobile ? 1 : isTablet ? 2 : 5;
  const gridCols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <section id="stack" className="section">
      <div className="container">
        {/* Stack capabilities */}
        <div className="section-head">
          <div className="eyebrow">CAPABILITIES</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Technical range.
            </h2>
            <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--titanium-2)' }}>
              The full stack we operate across, maintained to production-grade depth in each discipline.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${stackCols}, 1fr)`,
          border: '1px solid var(--line-2)',
          marginBottom: 72,
        }}>
          {STACK_CAPABILITIES.map((cat, i) => {
            const isLastInRow = (i + 1) % stackCols === 0 || i === STACK_CAPABILITIES.length - 1;
            return (
              <div key={cat.category} style={{
                padding: '28px 24px',
                borderRight: isLastInRow ? 'none' : '1px solid var(--line-2)',
              }}>
                <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 16 }}>{cat.category}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {cat.items.map(item => (
                    <span key={item} className="mono" style={{
                      fontSize: 10,
                      padding: '4px 8px',
                      border: '1px solid var(--line-2)',
                      color: 'var(--titanium-2)',
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Industry verticals */}
        <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 24 }}>INDUSTRY VERTICALS</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          border: '1px solid var(--line-2)',
          marginBottom: 72,
        }}>
          {VERTICALS.map((v, i) => {
            const isLastInRow = (i + 1) % gridCols === 0;
            const isLastRow = i >= VERTICALS.length - gridCols;
            return (
              <div key={v.label} style={{
                padding: isMobile ? '20px 16px' : '28px 24px',
                borderRight: isLastInRow ? 'none' : '1px solid var(--line-2)',
                borderBottom: isLastRow ? 'none' : '1px solid var(--line-2)',
              }}>
                <div className="display" style={{ fontSize: 18, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 8 }}>
                  {v.label}
                </div>
                <div style={{ fontSize: 13, color: 'var(--titanium-2)' }}>{v.note}</div>
              </div>
            );
          })}
        </div>

        {/* Geographic presence */}
        <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 24 }}>GEOGRAPHIC PRESENCE</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
          border: '1px solid var(--line-2)',
        }}>
          {GEO_OFFICES.map((g, i) => {
            const isLastInRow = (i + 1) % gridCols === 0;
            const isLastRow = i >= GEO_OFFICES.length - gridCols;
            return (
              <div key={g.code} style={{
                padding: isMobile ? '20px 16px' : '28px 24px',
                borderRight: isLastInRow ? 'none' : '1px solid var(--line-2)',
                borderBottom: isLastRow ? 'none' : '1px solid var(--line-2)',
                transition: 'background 200ms',
                cursor: 'default',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(42,83,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: 56, height: 56,
                  border: '1px solid var(--line-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--f-mono)',
                  fontSize: 14, fontWeight: 500,
                  color: 'var(--titanium-hi)',
                  letterSpacing: '0.04em',
                  position: 'relative',
                  marginBottom: 16,
                }}>
                  {g.code}
                  <span style={{ position: 'absolute', top: -1, right: -1, width: 5, height: 5, background: 'var(--cobalt)' }} />
                </div>
                <div className="display" style={{ fontSize: 18, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 4 }}>
                  {g.city}
                </div>
                <div style={{ fontSize: 13, color: 'var(--titanium-2)', marginBottom: 6 }}>{g.role}</div>
                <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>{g.tz}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ====== About — Why Kyobix ======
const AboutWhyKyobix = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const gridCols = isMobile ? '1fr' : '1.2fr 1.4fr 1.4fr';

  return (
    <section id="why" className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">WHY KYOBIX</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Why Kyobix<br />
              <span style={{ color: 'var(--titanium-2)' }}>and not a consultancy.</span>
            </h2>
            <p style={{ maxWidth: 560, fontSize: 17, color: 'var(--titanium-2)' }}>
              These distinctions come from client post-mortems of engagements with other firms before Kyobix.
              We document the difference because our clients asked us to.
            </p>
          </div>
        </div>

        <div className="framed" style={{
          border: '1px solid var(--line-2)',
          background: 'var(--graphite-2)',
        }}>
          <span className="tick-tr" />
          <span className="tick-bl" />

          {/* Header row */}
          {!isMobile && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: gridCols,
              borderBottom: '1px solid var(--line-2)',
            }}>
              <div className="mono" style={{ padding: '16px 24px', color: 'var(--titanium-3)', fontSize: 10 }}>DIMENSION</div>
              <div className="mono" style={{ padding: '16px 24px', color: 'var(--cobalt)', fontSize: 10, borderLeft: '1px solid var(--line-2)' }}>KYOBIX</div>
              <div className="mono" style={{ padding: '16px 24px', color: 'var(--titanium-3)', fontSize: 10, borderLeft: '1px solid var(--line-2)' }}>TYPICAL AGENCY / CONSULTANCY</div>
            </div>
          )}

          {/* Data rows */}
          {COMPARISON_ROWS.map((row, i) => {
            const isLast = i === COMPARISON_ROWS.length - 1;
            return (
              <div
                key={row.dimension}
                style={{
                  display: isMobile ? 'block' : 'grid',
                  gridTemplateColumns: gridCols,
                  borderBottom: isLast ? 'none' : '1px solid var(--line-2)',
                  transition: 'background 200ms',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(42,83,255,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div className="mono" style={{
                  padding: isMobile ? '16px 20px 4px' : '18px 24px',
                  color: 'var(--titanium-3)',
                  fontSize: 10,
                  alignSelf: 'center',
                }}>
                  {row.dimension}
                </div>
                <div style={{
                  padding: isMobile ? '4px 20px' : '18px 24px',
                  borderLeft: isMobile ? 'none' : '1px solid var(--line-2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 14,
                  color: 'var(--titanium-hi)',
                  fontWeight: 500,
                }}>
                  <span style={{ width: 6, height: 6, background: 'var(--cobalt)', borderRadius: '50%', flexShrink: 0 }} />
                  {row.kyobix}
                </div>
                <div style={{
                  padding: isMobile ? '4px 20px 16px 36px' : '18px 24px',
                  borderLeft: isMobile ? 'none' : '1px solid var(--line-2)',
                  fontSize: 14,
                  color: 'var(--titanium-2)',
                  alignSelf: 'center',
                }}>
                  {row.typical}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ====== About — Timeline ======
const AboutTimeline = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);

  return (
    <section id="history" className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">OUR STORY</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Three years.<br />
              <span style={{ color: 'var(--titanium-2)' }}>Seven inflections.</span>
            </h2>
            <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--titanium-2)' }}>
              Every decision that shaped the firm, in order.
            </p>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical rail */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              left: isTablet ? 108 : 156,
              top: 8,
              bottom: 8,
              width: 1,
              background: 'var(--line-2)',
            }} />
          )}

          {TIMELINE_EVENTS.map((ev, i) => (
            <div key={i} style={{
              display: isMobile ? 'block' : 'grid',
              gridTemplateColumns: isMobile ? undefined : isTablet ? '112px 32px 1fr' : '160px 32px 1fr',
              gap: isMobile ? 0 : 0,
              paddingBottom: i < TIMELINE_EVENTS.length - 1 ? (isMobile ? 32 : 48) : 0,
              position: 'relative',
            }}>
              {/* Year + Q */}
              {isMobile ? (
                <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 11, marginBottom: 8 }}>
                  {ev.year} {ev.q}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: 24, paddingTop: 4 }}>
                  <div className="display" style={{ fontSize: 20, fontWeight: 500, color: 'var(--titanium-hi)' }}>{ev.year}</div>
                  <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>{ev.q}</div>
                </div>
              )}

              {/* Diamond on rail */}
              {!isMobile && (
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 6, position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 10, height: 10,
                    background: 'var(--cobalt)',
                    transform: 'rotate(45deg)',
                    boxShadow: '0 0 8px var(--cobalt-glow)',
                  }} />
                </div>
              )}

              {/* Content */}
              <div style={{ paddingLeft: isMobile ? 0 : 24 }}>
                <div className="display" style={{
                  fontSize: isMobile ? 20 : 24,
                  fontWeight: 500,
                  color: 'var(--titanium-hi)',
                  marginBottom: 10,
                  letterSpacing: '-0.02em',
                }}>
                  {ev.event}
                </div>
                <p style={{ fontSize: 15, color: 'var(--titanium-2)', lineHeight: 1.6, maxWidth: 560 }}>
                  {ev.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ====== About — CTA ======
const AboutCTA = () => {
  const { isMobile } = React.useContext(window.BreakpointContext);

  return (
    <section id="cta" className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">GET STARTED</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Commission<br />
              <span style={{ color: 'var(--titanium-2)' }}>a build.</span>
            </h2>
            <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--titanium-2)', marginBottom: 40 }}>
              We take six engagements per year. Q3 2026 has two remaining slots.
              A principal reads every brief and replies within two business days.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="index.html#contact" className="btn btn-primary" style={{ fontSize: 12 }}>
                Commission a build <span className="arrow">→</span>
              </a>
              <a href="mailto:commission@kyobix.io" className="btn" style={{ fontSize: 12 }}>
                commission@kyobix.io
              </a>
            </div>
          </div>
        </div>

        {/* Capacity status */}
        <div style={{
          border: '1px solid var(--line-2)',
          padding: isMobile ? '20px 20px' : '28px 32px',
          maxWidth: 480,
          background: 'var(--graphite-2)',
        }}>
          <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 12 }}>CURRENT CAPACITY · Q3 2026</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, background: 'var(--ok)', borderRadius: '50%', boxShadow: '0 0 8px var(--ok)' }} />
            <span style={{ color: 'var(--titanium-hi)', fontSize: 15 }}>Accepting Q3 2026 engagements</span>
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
            {[1, 1, 1, 1, 0, 0].map((v, i) => (
              <div key={i} style={{ flex: 1, height: 6, background: v ? 'var(--cobalt)' : 'var(--line-2)' }} />
            ))}
          </div>
          <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>4 / 6 SLOTS FILLED · 2026</div>
        </div>
      </div>
    </section>
  );
};

// ====== Exports ======
window.AboutHero = AboutHero;
window.AboutMetrics = AboutMetrics;
window.AboutApproach = AboutApproach;
window.AboutTeam = AboutTeam;
window.AboutTrackRecord = AboutTrackRecord;
window.AboutWhyKyobix = AboutWhyKyobix;
window.AboutTimeline = AboutTimeline;
window.AboutCTA = AboutCTA;
