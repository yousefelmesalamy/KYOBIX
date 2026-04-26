const TESTIMONIALS = [
  {
    quote: "Kyobix delivered the architecture review in week one and we changed nothing at handover. That's never happened before with any vendor.",
    name: "VP Engineering",
    org: "Series B Fintech · Seoul",
    init: "JK",
  },
  {
    quote: "The ADR library alone saved us six months of onboarding when we tripled the team. We still reference it in every sprint planning.",
    name: "CTO",
    org: "Logistics Platform · Berlin",
    init: "MR",
  },
  {
    quote: "LCP went from 4.2s to 0.9s globally. The commerce team hadn't seen numbers like that from any agency, ever.",
    name: "Head of Digital",
    org: "Luxury Retail · Paris",
    init: "CF",
  },
];

const Testimonials = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const cols = isMobile ? 1 : isTablet ? 1 : 3;

  return (
    <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">§ 05 / SIGNAL</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Client voice.
            </h2>
            <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--titanium-2)' }}>
              Three of the teams who have shipped with us.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          border: '1px solid var(--line-2)',
        }}>
          {TESTIMONIALS.map((t, i) => {
            const isLast = i === TESTIMONIALS.length - 1;
            return (
              <div key={i} style={{
                padding: isMobile ? 24 : 40,
                borderRight: (!isMobile && !isTablet && !isLast) ? '1px solid var(--line-2)' : 'none',
                borderBottom: (isMobile || isTablet) && !isLast ? '1px solid var(--line-2)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 28,
                transition: 'background 200ms',
                cursor: 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(42,83,255,0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Opening mark */}
                <div style={{
                  fontFamily: 'var(--f-display)',
                  fontSize: 64,
                  lineHeight: 0.7,
                  color: 'var(--cobalt)',
                  fontWeight: 300,
                  userSelect: 'none',
                }}>
                  "
                </div>

                {/* Quote */}
                <p style={{
                  fontSize: isMobile ? 16 : 18,
                  color: 'var(--titanium-hi)',
                  lineHeight: 1.65,
                  flex: 1,
                  fontStyle: 'italic',
                }}>
                  {t.quote}
                </p>

                {/* Attribution */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40,
                    border: '1px solid var(--line-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--f-display)',
                    fontSize: 14, fontWeight: 500,
                    color: 'var(--titanium-hi)',
                    flexShrink: 0,
                    position: 'relative',
                  }}>
                    {t.init}
                    <span style={{ position: 'absolute', top: -1, right: -1, width: 5, height: 5, background: 'var(--cobalt)' }} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--titanium-hi)', fontSize: 14, fontWeight: 500 }}>{t.name}</div>
                    <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>{t.org}</div>
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

window.Testimonials = Testimonials;
