const PROFILES = [
  {
    title: 'Scaling Startups',
    stage: 'Series A – C',
    desc: 'You have product-market fit, but your technical debt is starting to throttle your growth. We help you scale without the drift.',
    points: [
      'Establishing Architecture Decision Records (ADRs)',
      'Refactoring core engines for 10x load',
      'Implementing automated CI/CD and observability',
      'Principal-level mentorship for your growing team',
    ],
  },
  {
    title: 'Established Enterprise',
    stage: 'Legacy Modernization',
    desc: 'Slow release cycles and fragmented data silos are hindering your agility. We modernize your core without interrupting operations.',
    points: [
      'Incremental migration from monolith to services',
      'Unifying fragmented data into real-time dashboards',
      'Hardening security and compliance posture',
      'Sub-second performance optimization for global users',
    ],
  },
  {
    title: 'Mission-Critical Ops',
    stage: 'High-Volume Systems',
    desc: 'You manage real-time logistics, fintech flows, or global retail. You need systems that are bulletproof and exceptionally fast.',
    points: [
      'Low-latency data processing and telemetry',
      'High-availability infrastructure (99.99%+)',
      'Bespoke commerce and inventory logic',
      'Custom middleware for complex integrations',
    ],
  },
];

const WhoWeWorkWith = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const cols = isMobile ? 1 : isTablet ? 1 : 3;

  return (
    <section id="profiles" className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">IDEAL LEAD PROFILE</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Who we<br />
              work with.
            </h2>
            <p style={{ maxWidth: 540, fontSize: 17, color: 'var(--titanium-2)' }}>
              We specialize in complex technical problems where the cost of failure is high. 
              We are most effective when partnering with organizations in these three states.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          border: '1px solid var(--line-2)',
        }}>
          {PROFILES.map((p, i) => {
            const isLast = i === PROFILES.length - 1;
            return (
              <div key={p.title} style={{
                padding: isMobile ? 24 : 40,
                borderRight: (!isMobile && !isTablet && !isLast) ? '1px solid var(--line-2)' : 'none',
                borderBottom: (isMobile || isTablet) && !isLast ? '1px solid var(--line-2)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
              }}>
                <div>
                  <div className="mono" style={{ color: 'var(--cobalt)', marginBottom: 12 }}>{p.stage}</div>
                  <h3 className="display" style={{ fontSize: 28, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 16 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: 'var(--titanium-2)', fontSize: 15, lineHeight: 1.55 }}>
                    {p.desc}
                  </p>
                </div>

                <div style={{ flex: 1 }}>
                  <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10, marginBottom: 20 }}>TYPICAL ENGAGEMENT</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {p.points.map((point, pi) => (
                      <li key={pi} style={{
                        display: 'flex',
                        gap: 12,
                        marginBottom: 16,
                        color: 'var(--titanium)',
                        fontSize: 14,
                        lineHeight: 1.4,
                      }}>
                        <span style={{ color: 'var(--cobalt)', flexShrink: 0 }}>⊹</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: 24, borderTop: '1px solid var(--line-2)' }}>
                  <a href="#contact" className="btn" style={{ fontSize: 11, width: isMobile ? '100%' : 'auto' }}>
                    Request Intake <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

window.WhoWeWorkWith = WhoWeWorkWith;
