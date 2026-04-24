const SERVICES = [
  {
    id: '01',
    title: 'Front-End Architecture',
    desc: 'High-performance single-page applications and complex data dashboards. Deep Angular specialization with state-machine rigor.',
    tags: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'NgRx'],
  },
  {
    id: '02',
    title: 'Custom SaaS Development',
    desc: 'Resilient, purpose-built software products tailored to specific business operations and domain logic. Multi-tenant from day one.',
    tags: ['PostgreSQL', 'Node', 'Auth', 'Billing', 'Audit'],
  },
  {
    id: '03',
    title: 'Digital Infrastructure & Integration',
    desc: 'Bridging backend databases, APIs, and hardware systems with seamless interfaces. Where legacy meets contemporary.',
    tags: ['REST', 'GraphQL', 'ETL', 'Webhooks', 'Queue'],
  },
  {
    id: '04',
    title: 'Enterprise E-Commerce Systems',
    desc: 'Robust, scalable sales and inventory platforms for high-volume retail and luxury brands. Structured for six-figure cart density.',
    tags: ['Commerce', 'Inventory', 'Checkout', 'ERP', 'PIM'],
  },
  {
    id: '05',
    title: 'Technical Blueprinting',
    desc: 'High-level system design and architectural consulting for digital transformation. Decisions documented to withstand audits and acquisitions.',
    tags: ['C4', 'ADR', 'RFC', 'Threat Model', 'SLA'],
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
            <div className="eyebrow">§ 01 / SCOPE</div>
          </div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Five disciplines.<br />
              <span style={{ color: 'var(--titanium-2)' }}>One architectural practice.</span>
            </h2>
            <p style={{ maxWidth: 620, fontSize: 17, color: 'var(--titanium-2)' }}>
              We do not generalize. Each discipline below represents a dedicated practice
              with its own standards, tooling, and measurable outputs.
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
