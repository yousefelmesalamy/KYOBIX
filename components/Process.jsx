const PROCESS_PHASES = [
  {
    id: '00',
    name: 'DISCOVERY',
    label: 'Blueprint',
    duration: '1–2 WKS',
    output: 'System diagram, RFCs, risk register',
    desc: 'We interrogate the problem before proposing a solution. Stakeholder interviews, constraint mapping, architectural decision records.',
  },
  {
    id: '01',
    name: 'ARCHITECTURE',
    label: 'Design',
    duration: '2–4 WKS',
    output: 'C4 model, API contracts, data schema',
    desc: 'Formal system design documented at four levels: context, container, component, code. Every edge case named before a line is written.',
  },
  {
    id: '02',
    name: 'CONSTRUCTION',
    label: 'Build',
    duration: '8–20 WKS',
    output: 'Working system, full test coverage',
    desc: 'Iterative delivery in two-week cycles. Continuous integration, automated testing, weekly architecture reviews with your team.',
  },
  {
    id: '03',
    name: 'HARDENING',
    label: 'Scale',
    duration: '2–3 WKS',
    output: 'Performance baseline, runbooks',
    desc: 'Load testing, observability wiring, disaster recovery. We hand over a system that withstands Black Friday on day one.',
  },
  {
    id: '04',
    name: 'HANDOVER',
    label: 'Transition',
    duration: 'ONGOING',
    output: 'Documentation, team training',
    desc: 'Your team owns the system when we leave. Retained advisory available — we prefer it that way. Clean boundaries.',
  },
];

const Process = () => {
  const [hovered, setHovered] = React.useState(2);

  return (
    <section id="process" className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">§ 02 / METHOD</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              A five-phase<br />
              engagement model.
            </h2>
            <p style={{ maxWidth: 620, fontSize: 17, color: 'var(--titanium-2)' }}>
              Predictable timelines. Documented decisions. No surprises at the
              30% mark, no surprises at the 90% mark.
            </p>
          </div>
        </div>

        {/* Timeline rail */}
        <div style={{ position: 'relative', marginBottom: 40 }}>
          <div style={{
            position: 'absolute',
            top: 28, left: 0, right: 0, height: 1,
            background: 'var(--line-2)',
          }} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 8,
            position: 'relative',
          }}>
            {PROCESS_PHASES.map((p, i) => (
              <button
                key={p.id}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                style={{
                  textAlign: 'left',
                  padding: '0 4px',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 14, height: 14,
                  background: hovered === i ? 'var(--cobalt)' : 'var(--ink)',
                  border: `2px solid ${hovered === i ? 'var(--cobalt)' : 'var(--titanium-3)'}`,
                  marginLeft: 0,
                  marginBottom: 18,
                  transform: 'rotate(45deg)',
                  transition: 'all 200ms',
                }} />
                <div className="mono" style={{
                  fontSize: 10,
                  color: hovered === i ? 'var(--cobalt)' : 'var(--titanium-3)',
                  marginBottom: 6,
                  transition: 'color 200ms',
                }}>
                  PHASE {p.id} · {p.duration}
                </div>
                <div className="display" style={{
                  fontSize: 22,
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
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: 48,
          padding: 40,
          background: 'var(--graphite-2)',
          border: '1px solid var(--line-2)',
          minHeight: 240,
        }}>
          <span className="tick-tr" />
          <span className="tick-bl" />
          <div>
            <div className="mono" style={{ marginBottom: 10, color: 'var(--cobalt)' }}>
              PHASE {PROCESS_PHASES[hovered].id}
            </div>
            <div className="display" style={{ fontSize: 40, fontWeight: 500, color: 'var(--titanium-hi)' }}>
              {PROCESS_PHASES[hovered].name}
            </div>
            <div className="mono" style={{ marginTop: 10, color: 'var(--titanium-2)' }}>
              DURATION · {PROCESS_PHASES[hovered].duration}
            </div>
          </div>
          <div>
            <div className="mono" style={{ marginBottom: 14, color: 'var(--titanium-3)' }}>DESCRIPTION</div>
            <p style={{ fontSize: 17, color: 'var(--titanium-hi)', lineHeight: 1.55 }}>
              {PROCESS_PHASES[hovered].desc}
            </p>
          </div>
          <div>
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
