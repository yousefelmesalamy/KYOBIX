const PROCESS_PHASES = [
  {
    id: '00',
    name: 'DISCOVERY',
    label: 'Architecture Review',
    duration: '1–2 WKS',
    output: 'Technical roadmap & risk mitigation brief',
    desc: 'We audit your current stack, interview key stakeholders, and define the critical technical requirements that map directly to your business KPIs.',
  },
  {
    id: '01',
    name: 'DESIGN',
    label: 'Engineering Blueprint',
    duration: '2–4 WKS',
    output: 'System design & ADR library',
    desc: 'We map the full data architecture and API contracts before a single line of code is written. You receive a complete library of Architecture Decision Records (ADRs).',
  },
  {
    id: '02',
    name: 'BUILD',
    label: 'Core Implementation',
    duration: '8–20 WKS',
    output: 'Production-ready software assets',
    desc: 'Engineered for performance. We execute in two-week cycles with frequent demonstrations, ensuring the build aligns with the blueprint at every stage.',
  },
  {
    id: '03',
    name: 'VALIDATION',
    label: 'Observability Hardening',
    duration: '2–3 WKS',
    output: 'Stress tests & monitoring suite',
    desc: 'We subject the system to global load-testing and harden observability. We ensure your infrastructure handles P95 spikes without performance degradation.',
  },
  {
    id: '04',
    name: 'TRANSFER',
    label: 'Principal Advisory',
    duration: 'ONGOING',
    output: 'Documented asset transfer',
    desc: 'Full ownership transfer of all code and documentation. We remain available as fractional principal advisors to ensure your team scales successfully.',
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
              Five phases. Clear timelines. You know what's happening
              and what you're getting at every step.
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
