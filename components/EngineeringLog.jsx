const ARTICLES = [
  {
    slug: 'architectural-sovereignty',
    title: 'Architectural Sovereignty: The ADR Discipline',
    date: '2026-03-18',
    tag: 'PROCESS',
    readTime: '9 min',
    excerpt: 'Code is ephemeral; architecture is foundational. We detail why every strategic decision must be captured in an immutable ADR library before implementation, and how this prevents architectural drift in high-growth environments.',
  },
  {
    slug: 'economic-rigor',
    title: 'Economic Rigor: Why we cap at six engagements per year',
    date: '2026-02-04',
    tag: 'OPERATIONS',
    readTime: '6 min',
    excerpt: 'The consulting industry is plagued by a volume-first mindset that dilutes senior expertise. We explain the mathematical necessity of our six-engagement ceiling and why direct Principal ownership is the only way to mitigate catastrophic technical risk.',
  },
  {
    slug: 'legacy-transformation-framework',
    title: 'Modernizing the Monolith: A Zero-Risk Framework',
    date: '2026-01-12',
    tag: 'ENGINEERING',
    readTime: '12 min',
    excerpt: 'Strategic modernization is not a rewrite—it is a surgical extraction. We share our framework for incremental legacy transformation that preserves revenue integrity while enabling systemic agility.',
  },
];

const TAG_COLORS = {
  PROCESS: 'rgba(42,83,255,0.15)',
  OPERATIONS: 'rgba(62,213,152,0.12)',
  ENGINEERING: 'rgba(216,220,226,0.08)',
};

const EngineeringLogHero = () => {
  const { isMobile } = React.useContext(window.BreakpointContext);
  return (
    <section id="top" style={{ paddingTop: 64, borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 28 : 48, borderBottom: '1px solid var(--line)', marginBottom: isMobile ? 28 : 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>ENGINEERING LOG — KYOBIX</div>
          {!isMobile && <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>{ARTICLES.length} ENTRIES</div>}
        </div>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Engineering Log</div>
        <h1 className="display h1" style={{ marginBottom: 24 }}>
          Systemic<br />
          <span style={{ color: 'var(--titanium-2)' }}>Integrity.</span>
        </h1>
        <p style={{ maxWidth: 580, fontSize: isMobile ? 16 : 19, color: 'var(--titanium-2)', lineHeight: 1.6, paddingBottom: isMobile ? 40 : 64 }}>
          Architectural insights, operational post-mortems, and engineering perspectives from the Kyobix principals. 
          We share our findings only when they offer a distinct strategic advantage.
        </p>
      </div>
    </section>
  );
};

const EngineeringLogList = () => {
  const { isMobile } = React.useContext(window.BreakpointContext);
  const [hovered, setHovered] = React.useState(null);

  return (
    <section className="section">
      <div className="container">
        <div style={{ borderTop: '1px solid var(--line-2)' }}>
          {ARTICLES.map((article, i) => {
            const isLast = i === ARTICLES.length - 1;
            const isHovered = hovered === i;
            return (
              <div
                key={article.slug}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: isMobile ? 'block' : 'grid',
                  gridTemplateColumns: '140px 1fr 80px',
                  gap: 32,
                  alignItems: 'start',
                  padding: isMobile ? '24px 0' : '32px 0',
                  borderBottom: isLast ? 'none' : '1px solid var(--line-2)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 200ms',
                }}
              >
                {/* Active cobalt left bar */}
                <div style={{
                  position: 'absolute', left: -1, top: 0, bottom: 0, width: 2,
                  background: isHovered ? 'var(--cobalt)' : 'transparent',
                  transition: 'background 180ms',
                }} />

                {/* Date + tag */}
                <div style={{ paddingLeft: 12 }}>
                  <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10, marginBottom: 8 }}>
                    {article.date}
                  </div>
                  <span className="mono" style={{
                    fontSize: 9, padding: '3px 8px',
                    background: TAG_COLORS[article.tag] || 'rgba(216,220,226,0.06)',
                    color: article.tag === 'PROCESS' ? 'var(--cobalt)' : article.tag === 'OPERATIONS' ? 'var(--ok)' : 'var(--titanium-2)',
                    border: '1px solid var(--line-2)',
                  }}>
                    {article.tag}
                  </span>
                </div>

                {/* Title + excerpt */}
                <div style={{ paddingLeft: isMobile ? 12 : 0, marginTop: isMobile ? 12 : 0 }}>
                  <div className="display" style={{
                    fontSize: isMobile ? 20 : 26,
                    fontWeight: 500,
                    color: isHovered ? 'var(--titanium-hi)' : 'var(--titanium)',
                    letterSpacing: '-0.02em',
                    marginBottom: 10,
                    transition: 'color 180ms',
                  }}>
                    {article.title}
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--titanium-2)', lineHeight: 1.6, maxWidth: 600 }}>
                    {article.excerpt}
                  </p>
                </div>

                {/* Read time */}
                <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10, textAlign: isMobile ? 'left' : 'right', paddingLeft: isMobile ? 12 : 0, marginTop: isMobile ? 10 : 0 }}>
                  {article.readTime} read
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 64, padding: '28px 32px', border: '1px solid var(--line-2)', background: 'var(--graphite-2)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 8 }}>PUBLISHING CADENCE</div>
            <p style={{ fontSize: 15, color: 'var(--titanium-2)' }}>We publish when we have something worth saying. No newsletter, no schedule. Follow via RSS or check back.</p>
          </div>
          <a href="index.html#contact" className="btn" style={{ fontSize: 11, flexShrink: 0 }}>
            Engage with Kyobix <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

window.EngineeringLogHero = EngineeringLogHero;
window.EngineeringLogList = EngineeringLogList;
