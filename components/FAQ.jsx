const FAQS = [
  {
    q: "Who owns the IP?",
    a: "You own everything. All code, architecture documents, ADRs, and design assets transfer to you at handover. We retain no rights, no licenses, no ongoing claims. This is written into every MSA before work begins.",
  },
  {
    q: "Do you subcontract?",
    a: "Never. Every principal listed on the About page is the person who will build your system. No offshore resourcing, no white-labelling, no staffing augmentation. This is non-negotiable and documented in every contract.",
  },
  {
    q: "How do you handle NDAs?",
    a: "We sign your NDA before any scoping conversation. Mutual NDAs are our default. We can work under your standard vendor agreement — legal review typically takes two business days.",
  },
  {
    q: "What does post-delivery look like?",
    a: "We offer a standing advisory retainer for post-engagement clients — six slots, currently two available. If your goal is for your team to own the system without any key-person risk on our side, we design the handover for exactly that outcome.",
  },
  {
    q: "Can you work in our timezone?",
    a: "We have principals in UTC−4 (New York), UTC+0 (London), UTC+1 (Berlin, Madrid), and UTC+9 (Seoul, Tokyo). Meaningful overlap with any working timezone on the planet is guaranteed.",
  },
  {
    q: "What's a typical engagement timeline?",
    a: "Architecture review only: 6–10 weeks. Full system build: 14–26 weeks depending on scope. We do not take on retainer-only engagements for new clients — we need to build together first.",
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
          <div className="eyebrow">§ 08 / FAQ</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Common questions.
            </h2>
            <p style={{ maxWidth: 520, fontSize: 17, color: 'var(--titanium-2)' }}>
              What enterprise procurement asks before every engagement.
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
