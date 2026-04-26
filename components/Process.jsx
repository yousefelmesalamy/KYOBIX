const PROCESS_PHASES = [
  {
    id: '00',
    name: 'STRATEGIC AUDIT',
    label: 'Root Cause Analysis',
    duration: '2 WKS',
    output: 'Systemic Risk Register & Architecture Roadmap',
    desc: 'We perform an exhaustive audit of your current infrastructure, identifying the architectural bottlenecks that threaten your scalability. We define the high-stakes requirements that map to your commercial objectives.',
  },
  {
    id: '01',
    name: 'SPECIFICATION',
    label: 'Architectural Blueprint',
    duration: '4 WKS',
    output: 'Complete ADR Library & System Contracts',
    desc: 'We architect the entire solution before a single line of application code is written. Every major technical decision is documented as an ADR, ensuring total transparency and long-term maintainability.',
  },
  {
    id: '02',
    name: 'IMPLEMENTATION',
    label: 'Principal Engineering',
    duration: '12–24 WKS',
    output: 'Production-Grade Software Assets',
    desc: 'Led by a Principal Engineer, we build your core engines with a focus on modularity and high performance. We utilize contract-first development to ensure the implementation mirrors the architectural intent exactly.',
  },
  {
    id: '03',
    name: 'HARDENING',
    label: 'Operational Resilience',
    duration: '4 WKS',
    output: 'Precision Observability & Fail-safe Suite',
    desc: 'We subject the system to rigorous stress tests and harden its observability. We ensure your infrastructure is self-healing and can maintain performance targets under catastrophic load conditions.',
  },
  {
    id: '04',
    name: 'ADVISORY',
    label: 'Asset Handover',
    duration: 'ONGOING',
    output: 'Documented Transition & Strategic Advisory',
    desc: 'We execute a complete ownership transfer of all code and documentation to your internal team. We remain available as fractional principal advisors to ensure the system evolves with your business strategy.',
  },
];

const Process = () => {
  const [hovered, setHovered] = React.useState(2);
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);

  return (
    <section id="process" className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">HOW WE WORK</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              How every<br />
              project works.
            </h2>
            <p style={{ maxWidth: 620, fontSize: 17, color: 'var(--titanium-2)' }}>
              We eliminate the uncertainty of high-stakes engineering through a clinical, five-phase framework. 
              Our process is designed to mitigate systemic risk while delivering predictable, production-grade results.
            </p>
          </div>
        </div>

        {/* Timeline rail */}
        <div style={{ position: 'relative', marginBottom: 40 }}>
          {/* Horizontal rail — hidden on mobile */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: 28, left: 0, right: 0, height: 1,
              background: 'var(--line-2)',
            }} />
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
            gap: isMobile ? 0 : 8,
            position: 'relative',
          }}>
            {PROCESS_PHASES.map((p, i) => (
              <button
                key={p.id}
                onMouseEnter={() => setHovered(i)}
                onClick={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                style={{
                  textAlign: 'left',
                  padding: isMobile ? '16px 16px 16px 20px' : '0 4px',
                  position: 'relative',
                  cursor: 'pointer',
                  borderBottom: isMobile ? '1px solid var(--line)' : 'none',
                  borderLeft: isMobile ? `2px solid ${hovered === i ? 'var(--cobalt)' : 'transparent'}` : 'none',
                  background: isMobile && hovered === i ? 'rgba(42,83,255,0.04)' : 'transparent',
                  transition: 'all 200ms',
                }}
              >
                {!isMobile && (
                  <div style={{
                    width: 14, height: 14,
                    background: hovered === i ? 'var(--cobalt)' : 'var(--ink)',
                    border: `2px solid ${hovered === i ? 'var(--cobalt)' : 'var(--titanium-3)'}`,
                    marginLeft: 0,
                    marginBottom: 18,
                    transform: 'rotate(45deg)',
                    transition: 'all 200ms',
                  }} />
                )}
                <div className="mono" style={{
                  fontSize: 10,
                  color: hovered === i ? 'var(--cobalt)' : 'var(--titanium-3)',
                  marginBottom: 6,
                  transition: 'color 200ms',
                }}>
                  PHASE {p.id} · {p.duration}
                </div>
                <div className="display" style={{
                  fontSize: isMobile ? 18 : 22,
                  fontWeight: 500,
                  color: hovered === i ? 'var(--titanium-hi)' : 'var(--titanium-2)',
                  letterSpacing: '-0.02em',
                  transition: 'color 200ms',
                }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 13, color: 'var(--titanium-3)', marginTop: 4 }}>
                  {p.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail card */}
        <div className="framed" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 2fr' : '1fr 2fr 1fr',
          gap: isMobile ? 24 : isTablet ? 32 : 48,
          padding: isMobile ? 24 : 40,
          background: 'var(--graphite-2)',
          border: '1px solid var(--line-2)',
          minHeight: isMobile ? 'auto' : 240,
        }}>
          <span className="tick-tr" />
          <span className="tick-bl" />
          <div>
            <div className="mono" style={{ marginBottom: 10, color: 'var(--cobalt)' }}>
              PHASE {PROCESS_PHASES[hovered].id}
            </div>
            <div className="display" style={{ fontSize: isMobile ? 28 : 40, fontWeight: 500, color: 'var(--titanium-hi)' }}>
              {PROCESS_PHASES[hovered].name}
            </div>
            <div className="mono" style={{ marginTop: 10, color: 'var(--titanium-2)' }}>
              DURATION · {PROCESS_PHASES[hovered].duration}
            </div>
          </div>
          <div>
            <div className="mono" style={{ marginBottom: 14, color: 'var(--titanium-3)' }}>DESCRIPTION</div>
            <p style={{ fontSize: isMobile ? 15 : 17, color: 'var(--titanium-hi)', lineHeight: 1.55 }}>
              {PROCESS_PHASES[hovered].desc}
            </p>
          </div>
          {/* Deliverables — full-width on tablet, third col on desktop */}
          <div style={isTablet ? { gridColumn: '1 / -1' } : {}}>
            <div className="mono" style={{ marginBottom: 14, color: 'var(--titanium-3)' }}>DELIVERABLES</div>
            <p style={{ fontSize: 15, color: 'var(--titanium)' }}>
              {PROCESS_PHASES[hovered].output}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Process = Process;
