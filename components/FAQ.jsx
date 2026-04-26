const FAQS = [
  {
    q: "Who owns the IP?",
    a: "You do. Full ownership of all code, architecture documents, and assets is transferred to you at handover. We retain no licenses or ongoing claims. This is a non-negotiable standard in our contracts.",
  },
  {
    q: "Do you use junior developers?",
    a: "No. Every line of code and every architectural decision is made by a Principal-level engineer. We do not use offshore teams, juniors, or temporary freelancers. You are hiring expertise, not headcount.",
  },
  {
    q: "How do you handle confidentiality?",
    a: "We sign your NDA before any deep-dive scoping. As we often handle core business logic and trade secrets, security and confidentiality are baked into our operational process.",
  },
  {
    q: "What happens after delivery?",
    a: "Our goal is for your team to be entirely self-sufficient. We provide a complete handover library. If you require ongoing strategic guidance, we offer a principal-level advisory retainer.",
  },
  {
    q: "Can you work within our stack?",
    a: "We are technology-agnostic but performance-obsessed. While we have deep expertise in modern ecosystems, our primary focus is on the underlying architecture and business logic that drives results.",
  },
  {
    q: "What is your typical project timeline?",
    a: "Architecture strategy and risk reviews take 6–10 weeks. Full-scale engineering of core systems typically ranges from 4 to 6 months. We do not rush critical infrastructure.",
  },
  {
    q: "What is your engagement model?",
    a: "We work on a fixed-fee basis for defined engineering deliverables or a recurring monthly retainer for advisory. We do not provide hourly staff augmentation or general 'body shopping.'",
  },
];

const FAQItem = ({ item, isOpen, onToggle, isLast }) => {
  return (
    <div style={{
      borderBottom: isLast ? 'none' : '1px solid var(--line-2)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 2,
        background: isOpen ? 'var(--cobalt)' : 'transparent',
        transition: 'background 200ms',
      }} />
      <button
        onClick={onToggle}
        style={{
          width: '100%', textAlign: 'left',
          display: 'grid',
          gridTemplateColumns: '1fr 24px',
          gap: 16,
          alignItems: 'center',
          padding: isOpen ? '24px 0 12px 16px' : '20px 0 20px 16px',
          background: isOpen ? 'rgba(42,83,255,0.03)' : 'transparent',
          transition: 'padding 250ms ease, background 200ms',
          cursor: 'pointer',
          border: 'none',
        }}
      >
        <div className="display" style={{
          fontSize: 18,
          fontWeight: 500,
          color: isOpen ? 'var(--titanium-hi)' : 'var(--titanium)',
          letterSpacing: '-0.01em',
          transition: 'color 200ms',
        }}>
          {item.q}
        </div>
        <div style={{
          width: 20, height: 20,
          border: '1px solid var(--line-2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transform: isOpen ? 'rotate(45deg)' : 'none',
          transition: 'transform 250ms ease',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="5" y1="1" x2="5" y2="9" stroke="var(--titanium-3)" strokeWidth="1.2"/>
            <line x1="1" y1="5" x2="9" y2="5" stroke="var(--titanium-3)" strokeWidth="1.2"/>
          </svg>
        </div>
      </button>
      <div style={{
        maxHeight: isOpen ? 200 : 0,
        overflow: 'hidden',
        opacity: isOpen ? 1 : 0,
        transition: 'max-height 300ms ease, opacity 220ms ease',
        paddingLeft: 16,
        paddingRight: 40,
        paddingBottom: isOpen ? 24 : 0,
      }}>
        <p style={{ fontSize: 15, color: 'var(--titanium-2)', lineHeight: 1.65 }}>
          {item.a}
        </p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const [open, setOpen] = React.useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  const half = Math.ceil(FAQS.length / 2);
  const leftCol = FAQS.slice(0, half);
  const rightCol = FAQS.slice(half);

  return (
    <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">FAQ</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Common questions.
            </h2>
            <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--titanium-2)' }}>
              Questions we hear most from teams evaluating us.
            </p>
          </div>
        </div>

        {isMobile || isTablet ? (
          <div style={{ border: '1px solid var(--line-2)' }}>
            {FAQS.map((item, i) => (
              <FAQItem key={i} item={item} isOpen={open === i} onToggle={() => toggle(i)} isLast={i === FAQS.length - 1} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--line-2)' }}>
            <div style={{ borderRight: '1px solid var(--line-2)' }}>
              {leftCol.map((item, i) => (
                <FAQItem key={i} item={item} isOpen={open === i} onToggle={() => toggle(i)} isLast={i === leftCol.length - 1} />
              ))}
            </div>
            <div>
              {rightCol.map((item, i) => {
                const globalIdx = i + half;
                return (
                  <FAQItem key={globalIdx} item={item} isOpen={open === globalIdx} onToggle={() => toggle(globalIdx)} isLast={i === rightCol.length - 1} />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

window.FAQ = FAQ;
