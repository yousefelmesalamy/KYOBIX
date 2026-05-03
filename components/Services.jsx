const SERVICES = [
  {
    id: '01',
    title: 'High-Performance UI',
    desc: 'We architect atomic design systems and sub-second rendering for complex, data-heavy web applications. We eliminate technical debt at the UI layer to ensure your frontend is a scalable asset, not a liability.',
    tags: ['Atomic Design', 'Performance', 'Real-time', 'Data-heavy', 'Mobile-ready'],
  },
  {
    id: '02',
    title: 'Mission-Critical Backend',
    desc: 'Building bulletproof, multi-tenant cloud architectures designed for high-concurrency and extreme reliability. We engineer the core engines that power global $100M+ operations with zero downtime tolerance.',
    tags: ['Multi-tenant', 'Scalability', 'Security', 'Cloud-Native', 'Resilience'],
  },
  {
    id: '03',
    title: 'Ecosystem Orchestration',
    desc: 'Unifying fragmented technical stacks through robust middleware and custom API bridges. We enable seamless data flow across your mission-critical technical ecosystem, eliminating silos and latency.',
    tags: ['API Design', 'Data Sync', 'Legacy Integration', 'Automation', 'Migrations'],
  },
  {
    id: '04',
    title: 'Enterprise Commerce',
    desc: 'High-volume retail engines engineered for global performance, bespoke inventory logic, and checkout flows. Optimized for extreme scale and $1M+ daily transaction volume.',
    tags: ['Checkout', 'Inventory', 'Global Search', 'Payments', 'Performance'],
  },
  {
    id: '05',
    title: 'Architecture Strategy',
    desc: 'Deep-dive technical risk assessments and incremental modernization roadmaps. We provide the blueprint for long-term system health, ensuring successful technical asset transfer and investment protection.',
    tags: ['ADRs', 'Roadmaps', 'Risk Analysis', 'Documentation', 'Handover'],
  },
];

const Services = () => {
  const [active, setActive] = React.useState(0);
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);

  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">WHAT WE DO</div>
          </div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Engineering as a<br />Competitive Advantage<span style={{ color: 'var(--cobalt)' }}>.</span>
            </h2>
            <p style={{ maxWidth: 620, fontSize: 17, color: 'var(--titanium-2)' }}>
              We don't just write code; we architect systems that eliminate operational risk 
              and unlock scalable revenue. Every engagement is led by a Principal Engineer.
            </p>
          </div>
        </div>

        {/* Accordion list */}
        <div style={{ borderTop: '1px solid var(--line-2)' }}>
          {SERVICES.map((s, i) => {
            const isActive = active === i;
            const rowStyle = isMobile
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: isActive ? '28px 0' : '20px 0',
                }
              : isTablet
              ? {
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr 140px',
                  gap: 20,
                  alignItems: 'start',
                  padding: isActive ? '36px 0' : '24px 0',
                }
              : {
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1.4fr 180px',
                  gap: 32,
                  alignItems: 'start',
                  padding: isActive ? '40px 0' : '28px 0',
                };

            return (
              <div
                key={s.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{
                  borderBottom: '1px solid var(--line-2)',
                  cursor: 'pointer',
                  transition: 'padding 300ms ease, background 300ms ease',
                  background: isActive ? 'linear-gradient(to right, rgba(42,83,255,0.03), transparent 60%)' : 'transparent',
                  position: 'relative',
                  ...rowStyle,
                }}
              >
                {/* Active indicator */}
                <div style={{
                  position: 'absolute',
                  left: 0, top: 0, bottom: 0,
                  width: 2,
                  background: isActive ? 'var(--cobalt)' : 'transparent',
                  transition: 'background 200ms',
                }} />

                <div className="mono" style={{
                  color: isActive ? 'var(--cobalt)' : 'var(--titanium-3)',
                  fontSize: 12,
                  paddingLeft: isMobile ? 16 : 16,
                  transition: 'color 200ms',
                }}>
                  {s.id}
                </div>

                <h3 className="display" style={{
                  fontSize: isMobile ? 22 : 28,
                  fontWeight: 500,
                  color: isActive ? 'var(--titanium-hi)' : 'var(--titanium)',
                  transition: 'color 200ms',
                  paddingLeft: isMobile ? 16 : 0,
                }}>
                  {s.title}
                </h3>

                {/* Description: on tablet it's hidden (col 3 absent), on mobile shown below when active */}
                {!isTablet && (
                  <p style={{
                    fontSize: 15,
                    color: 'var(--titanium-2)',
                    maxHeight: isActive ? 120 : 0,
                    overflow: 'hidden',
                    opacity: isActive ? 1 : 0,
                    transition: 'max-height 300ms ease, opacity 200ms ease',
                    paddingLeft: isMobile ? 16 : 0,
                  }}>
                    {s.desc}
                  </p>
                )}

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  justifyContent: isMobile ? 'flex-start' : isTablet ? 'flex-end' : 'flex-end',
                  alignItems: 'flex-start',
                  paddingLeft: isMobile ? 16 : 0,
                }}>
                  {s.tags.map(t => (
                    <span key={t} className="mono" style={{
                      fontSize: 10,
                      padding: '4px 8px',
                      border: '1px solid var(--line-2)',
                      color: 'var(--titanium-2)',
                    }}>{t}</span>
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

window.Services = Services;
