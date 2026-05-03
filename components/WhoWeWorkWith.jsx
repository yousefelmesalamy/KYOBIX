const PROFILES = [
  {
    title: 'Hyper-growth Platforms',
    stage: 'Series B — IPO',
    desc: 'You have aggressive market traction, but your architecture is becoming a bottleneck. We stabilize your core systems to support 100x user growth without the risk of systemic collapse.',
    points: [
      'Transitioning from MVP monoliths to distributed architectures',
      'Implementing precision observability and auto-recovery',
      'Establishing Architectural Governance and ADRs',
      'Principal-led mentoring for your internal engineering leads',
    ],
  },
  {
    title: 'Strategic Enterprise',
    stage: 'Systemic Transformation',
    desc: 'Legacy systems and fragmented data silos are threatening your competitive edge. We modernize mission-critical pipelines without interrupting the revenue stream.',
    points: [
      'Incremental, zero-downtime legacy modernization',
      'Unifying disparate data silos into high-fidelity streams',
      'Hardening security posture for global regulatory compliance',
      'Sub-second latency optimization for cross-regional traffic',
    ],
  },
  {
    title: 'High-Stakes Operations',
    stage: 'Mission-Critical Infrastructure',
    desc: 'You manage real-time logistics, fintech ecosystems, or high-volume retail. You need systems that are mathematically reliable and exceptionally fast.',
    points: [
      'Engineered resilience for 99.999% availability targets',
      'High-throughput transaction and inventory engines',
      'Bespoke commerce logic and middleware orchestration',
      'Auditing and mitigating catastrophic technical risk',
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
              We specialize in engineering solutions for high-stakes environments where the cost of failure is measured in millions. 
              We are a high-conviction firm, selectively partnering with organizations facing these critical transitions.
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
