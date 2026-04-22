// ====== Metrics / Counters ======
const useCounter = (target, duration = 1600, start = 0) => {
  const [v, setV] = React.useState(start);
  const ref = React.useRef(null);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(start + (target - start) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  return [v, ref];
};

const Metric = ({ label, value, suffix, prefix, decimals = 0, note }) => {
  const [v, ref] = useCounter(value);
  const display = prefix ? `${prefix}${v.toFixed(decimals)}` : v.toFixed(decimals);
  return (
    <div ref={ref} style={{ padding: '40px 32px', position: 'relative' }}>
      <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 16 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <div className="display" style={{ fontSize: 72, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
          {display}
        </div>
        <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 14 }}>{suffix}</div>
      </div>
      {note && <div style={{ marginTop: 12, fontSize: 13, color: 'var(--titanium-2)' }}>{note}</div>}
    </div>
  );
};

const Metrics = () => (
  <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
    <div className="container">
      <div className="section-head">
        <div className="eyebrow">§ 04 / PROOF</div>
        <div>
          <h2 className="display h2">
            Measured<br />output.
          </h2>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        border: '1px solid var(--line-2)',
      }}>
        <div style={{ borderRight: '1px solid var(--line-2)' }}>
          <Metric label="SYSTEMS SHIPPED" value={23} suffix="+" note="Across fintech, retail, logistics." />
        </div>
        <div style={{ borderRight: '1px solid var(--line-2)' }}>
          <Metric label="MEDIAN P95 LOAD" value={0.42} decimals={2} suffix="s" note="Below industry benchmark by 3.1×." />
        </div>
        <div style={{ borderRight: '1px solid var(--line-2)' }}>
          <Metric label="UPTIME SLA MET" value={99.98} decimals={2} suffix="%" note="Rolling 12-month average." />
        </div>
        <div>
          <Metric label="CLIENT RETENTION" value={100} suffix="%" note="Every engagement renewed or expanded." />
        </div>
      </div>
    </div>
  </section>
);

// ====== Team ======
const TEAM = [
  { name: 'Seo-jun Pak',      role: 'Principal · Architecture',       loc: 'SEL',  init: 'SP' },
  { name: 'Clara Ivanova',    role: 'Lead · Front-End Systems',       loc: 'BER',  init: 'CI' },
  { name: 'Marcus Delacroix', role: 'Lead · Infrastructure',          loc: 'NYC',  init: 'MD' },
  { name: 'Yuki Tanaka',      role: 'Design Engineer',                loc: 'TYO',  init: 'YT' },
  { name: 'Amara Obi',        role: 'Commerce Systems',               loc: 'LON',  init: 'AO' },
  { name: 'Rafael Moreno',    role: 'Data · Observability',           loc: 'MAD',  init: 'RM' },
];

const Team = () => (
  <section id="team" className="section" style={{ background: 'var(--graphite)' }}>
    <div className="container">
      <div className="section-head">
        <div className="eyebrow">§ 05 / PRACTICE</div>
        <div>
          <h2 className="display h2" style={{ marginBottom: 20 }}>
            Six engineers.<br />
            <span style={{ color: 'var(--titanium-2)' }}>Four timezones.</span>
          </h2>
          <p style={{ maxWidth: 620, fontSize: 17, color: 'var(--titanium-2)' }}>
            Small by design. Every engagement is led by a principal; there is no
            bench, no junior resourcing, no subcontracting. What you hire is what builds.
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
        border: '1px solid var(--line-2)',
      }}>
        {TEAM.map((p, i) => (
          <div key={p.name} style={{
            padding: '32px 28px',
            borderRight: (i % 3 !== 2) ? '1px solid var(--line-2)' : 'none',
            borderBottom: i < 3 ? '1px solid var(--line-2)' : 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            minHeight: 220,
            justifyContent: 'space-between',
            transition: 'background 200ms',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(42,83,255,0.04)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              width: 64, height: 64,
              border: '1px solid var(--line-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--f-display)',
              fontSize: 22, fontWeight: 500,
              color: 'var(--titanium-hi)',
              letterSpacing: '-0.02em',
              position: 'relative',
            }}>
              {p.init}
              <span style={{
                position: 'absolute', top: -1, right: -1, width: 6, height: 6,
                background: 'var(--cobalt)',
              }} />
            </div>
            <div>
              <div className="display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 6 }}>
                {p.name}
              </div>
              <div style={{ color: 'var(--titanium-2)', fontSize: 14, marginBottom: 12 }}>
                {p.role}
              </div>
              <div className="mono" style={{ color: 'var(--titanium-3)' }}>
                {p.loc} · UTC{p.loc === 'SEL' ? '+9' : p.loc === 'TYO' ? '+9' : p.loc === 'NYC' ? '−4' : p.loc === 'MAD' ? '+1' : p.loc === 'BER' ? '+1' : '+0'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ====== Manifesto ======
const TENETS = [
  ['We refuse the false dichotomy', 'between speed and craft. Disciplined engineering is faster.'],
  ['We document decisions', 'as rigorously as we write code. The why outlives the what.'],
  ['We build for the audit', 'not the demo. Observability, not optics.'],
  ['We say no early', 'and often. Scope that violates physics is not scope.'],
  ['We own the boundary', 'between business logic and systems — that is the bridge.'],
];

const Manifesto = () => (
  <section id="manifesto" className="section">
    <div className="container">
      <div className="section-head">
        <div className="eyebrow">§ 06 / DOCTRINE</div>
        <div>
          <h2 className="display h2">
            Five<br />
            commitments.
          </h2>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        borderTop: '1px solid var(--line-2)',
      }}>
        {TENETS.map(([head, tail], i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '80px 1fr 1.6fr',
            gap: 32,
            padding: '40px 0',
            borderBottom: '1px solid var(--line-2)',
            alignItems: 'start',
          }}>
            <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 13 }}>
              0{i+1} /05
            </div>
            <div className="display" style={{ fontSize: 30, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              {head}
            </div>
            <div style={{ fontSize: 18, color: 'var(--titanium-2)', lineHeight: 1.45, paddingTop: 6 }}>
              {tail}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

window.Metrics = Metrics;
window.Team = Team;
window.Manifesto = Manifesto;
