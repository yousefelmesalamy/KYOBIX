const TIERS = [
  {
    type: 'ARCHITECTURE REVIEW',
    range: '$50k – $150k',
    duration: '6 – 10 weeks',
    featured: false,
    includes: ['C4 context + container diagrams', 'ADR library (10–20 records)', 'Risk register', 'Component contracts', 'One revision cycle', 'Handover briefing'],
  },
  {
    type: 'SYSTEM BUILD',
    range: '$150k – $900k',
    duration: '14 – 26 weeks',
    featured: true,
    includes: ['Full architecture phase', 'Implementation (front-end, back-end, infra)', 'CI/CD pipeline', 'Observability stack (logs, traces, metrics)', 'Handover + team training', 'Advisory retainer option'],
  },
  {
    type: 'ADVISORY RETAINER',
    range: '$8k – $20k / mo',
    duration: 'Ongoing',
    featured: false,
    includes: ['Monthly architecture review (2h)', 'ADR review + approvals', 'Async Q&A — 48h SLA', 'Code review (sample basis)', 'Available to post-engagement clients only'],
  },
];

const COST_FACTORS = [
  ['01', 'Integration complexity', 'Systems touching more than three external APIs, legacy ERPs, or real-time data streams require additional architecture and testing scope.'],
  ['02', 'Timeline compression', 'Sub-12-week builds for scopes over $200k require dedicated principal allocation and carry a 20% expedite fee.'],
  ['03', 'Compliance requirements', 'HIPAA, PCI-DSS, SOC 2 Type II, or FCA-regulated environments require additional documentation, threat modeling, and review cycles.'],
  ['04', 'Geographic distribution', 'Multi-region deployments with sub-100ms SLO targets across more than three regions add infrastructure architecture scope.'],
];

const SCOPING_STEPS = [
  { n: '01', title: 'Submit a brief', desc: 'Use the intake form on the main site. Two to four sentences is enough to start. We read every brief within two business days.' },
  { n: '02', title: 'Scoping call', desc: 'A 30-minute call with the principal who would lead the engagement. Free, no commitment. We scope before we quote.' },
  { n: '03', title: 'Fixed-price proposal', desc: 'A written proposal with scope, timeline, deliverables, and price — no ranges, no assumptions. Typically delivered within five business days of the scoping call.' },
];

// ====== Investment Hero ======
const InvestmentHero = () => {
  const { isMobile } = React.useContext(window.BreakpointContext);
  return (
    <section id="top" style={{
      minHeight: '60vh', paddingTop: 64,
      borderBottom: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div className="container">
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 28 : 48,
          borderBottom: '1px solid var(--line)', marginBottom: isMobile ? 28 : 48,
        }}>
          <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>INVESTMENT — KYOBIX</div>
          {!isMobile && <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>FIXED-SCOPE · NO SURPRISES · PRINCIPAL-LED</div>}
        </div>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Pricing</div>
        <h1 className="display h1" style={{ marginBottom: 24 }}>
          Transparent<br />
          by design<span style={{ color: 'var(--cobalt)' }}>.</span>
        </h1>
        <p style={{ maxWidth: 600, fontSize: isMobile ? 16 : 19, color: 'var(--titanium-2)', lineHeight: 1.6, marginBottom: 40 }}>
          Most firms obscure how engagements are scoped and what drives the final number.
          Here is exactly what determines scope — and how we get from brief to proposal in three steps.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="index.html#contact" className="btn btn-primary" style={{ fontSize: 12 }}>
            Commission a build <span className="arrow">→</span>
          </a>
          <a href="https://cal.com/kyobix" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: 12 }}>
            Book scoping call <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

// ====== Engagement Tiers ======
const InvestmentTiers = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">ENGAGEMENT TIERS</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 16 }}>Engagement types.</h2>
            <p style={{ maxWidth: 480, fontSize: 17, color: 'var(--titanium-2)' }}>
              Three ways to work with us. All are fixed-scope and fixed-price.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(3, 1fr)',
          border: '1px solid var(--line-2)',
        }}>
          {TIERS.map((tier, i) => {
            const isLast = i === TIERS.length - 1;
            return (
              <div key={tier.type} className={tier.featured ? 'framed' : ''} style={{
                padding: isMobile ? 24 : 36,
                borderRight: (!isMobile && !isTablet && !isLast) ? '1px solid var(--line-2)' : 'none',
                borderBottom: (isMobile || isTablet) && !isLast ? '1px solid var(--line-2)' : 'none',
                background: tier.featured ? 'rgba(42,83,255,0.04)' : 'transparent',
                position: 'relative',
              }}>
                {tier.featured && <span className="tick-tr" />}
                {tier.featured && (
                  <div className="mono" style={{
                    position: 'absolute', top: 0, left: 36,
                    background: 'var(--cobalt)', color: '#fff',
                    fontSize: 9, padding: '3px 10px', letterSpacing: '0.1em',
                  }}>
                    MOST COMMON
                  </div>
                )}
                <div className="mono" style={{ color: tier.featured ? 'var(--cobalt)' : 'var(--titanium-3)', marginBottom: 20, marginTop: tier.featured ? 16 : 0 }}>
                  {tier.type}
                </div>
                <div className="display" style={{ fontSize: isMobile ? 28 : 34, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.03em', marginBottom: 8 }}>
                  {tier.range}
                </div>
                <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 28 }}>
                  DURATION · {tier.duration}
                </div>
                <div style={{ borderTop: '1px solid var(--line-2)', paddingTop: 24 }}>
                  <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 14 }}>INCLUDES</div>
                  {tier.includes.map(item => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                      <span style={{ width: 6, height: 6, background: 'var(--cobalt)', borderRadius: '50%', marginTop: 6, flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: 'var(--titanium-2)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ====== Cost Factors ======
const InvestmentFactors = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  return (
    <section className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">COST FACTORS</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 16 }}>What drives cost.</h2>
            <p style={{ maxWidth: 480, fontSize: 17, color: 'var(--titanium-2)' }}>
              Four variables that move the number. Everything else is fixed.
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--line-2)' }}>
          {COST_FACTORS.map(([id, factor, explanation]) => (
            <div key={id} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : isTablet ? '40px 1fr' : '60px 1fr 1.8fr',
              gap: isMobile ? 8 : 32,
              padding: isMobile ? '20px 0' : '36px 0',
              borderBottom: '1px solid var(--line-2)',
              alignItems: 'start',
            }}>
              <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 12 }}>{id}</div>
              <div className="display" style={{ fontSize: isMobile ? 20 : 26, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.02em' }}>
                {factor}
              </div>
              <p style={{ fontSize: isMobile ? 14 : 16, color: 'var(--titanium-2)', lineHeight: 1.6, paddingTop: isMobile ? 0 : 4 }}>
                {explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ====== Scoping Process ======
const InvestmentProcess = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">SCOPING PROCESS</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 16 }}>How scoping works.</h2>
            <p style={{ maxWidth: 480, fontSize: 17, color: 'var(--titanium-2)' }}>
              From brief to fixed-price proposal in three steps.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : `repeat(${SCOPING_STEPS.length}, 1fr)`,
          border: '1px solid var(--line-2)',
          position: 'relative',
        }}>
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 44, left: '16.66%', right: '16.66%', height: 1,
              background: 'var(--line-2)',
              pointerEvents: 'none',
            }} />
          )}
          {SCOPING_STEPS.map((step, i) => {
            const isLast = i === SCOPING_STEPS.length - 1;
            return (
              <div key={step.n} style={{
                padding: isMobile ? 24 : 36,
                borderRight: !isMobile && !isLast ? '1px solid var(--line-2)' : 'none',
                borderBottom: isMobile && !isLast ? '1px solid var(--line-2)' : 'none',
              }}>
                <div style={{
                  width: 14, height: 14,
                  background: i === 1 ? 'var(--cobalt)' : 'var(--ink)',
                  border: `2px solid ${i === 1 ? 'var(--cobalt)' : 'var(--titanium-3)'}`,
                  transform: 'rotate(45deg)',
                  marginBottom: 24,
                  boxShadow: i === 1 ? '0 0 12px var(--cobalt-glow)' : 'none',
                }} />
                <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10, marginBottom: 8 }}>
                  STEP {step.n}
                </div>
                <div className="display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 12 }}>
                  {step.title}
                </div>
                <p style={{ fontSize: 14, color: 'var(--titanium-2)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ====== Investment CTA ======
const InvestmentCTA = () => {
  const { isMobile } = React.useContext(window.BreakpointContext);
  return (
    <section className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">GET STARTED</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Ready to scope<br />
              <span style={{ color: 'var(--titanium-2)' }}>your build.</span>
            </h2>
            <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--titanium-2)', marginBottom: 36 }}>
              Q3 2026 has two remaining slots. Submit a brief or book a free scoping call — a principal responds within two business days.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="index.html#contact" className="btn btn-primary" style={{ fontSize: 12 }}>
                Submit a brief <span className="arrow">→</span>
              </a>
              <a href="https://cal.com/kyobix/30min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="btn" style={{ fontSize: 12 }}>
                Book 30-min call <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        <div style={{
          border: '1px solid var(--line-2)', padding: isMobile ? '20px 20px' : '28px 32px',
          maxWidth: 480, background: 'var(--graphite-2)',
        }}>
          <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 12 }}>CURRENT CAPACITY · Q3 2026</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ width: 8, height: 8, background: 'var(--ok)', borderRadius: '50%', boxShadow: '0 0 8px var(--ok)' }} />
            <span style={{ color: 'var(--titanium-hi)', fontSize: 15 }}>Accepting Q3 2026 engagements</span>
          </div>
          <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
            {[1,1,1,1,0,0].map((v, i) => (
              <div key={i} style={{ flex: 1, height: 6, background: v ? 'var(--cobalt)' : 'var(--line-2)' }} />
            ))}
          </div>
          <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>4 / 6 SLOTS FILLED · 2026</div>
        </div>
      </div>
    </section>
  );
};

window.InvestmentHero = InvestmentHero;
window.InvestmentTiers = InvestmentTiers;
window.InvestmentFactors = InvestmentFactors;
window.InvestmentProcess = InvestmentProcess;
window.InvestmentCTA = InvestmentCTA;
