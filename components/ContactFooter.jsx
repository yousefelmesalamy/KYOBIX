// ====== Quick Inquiry form ======
const QuickInquiry = () => {
  const [quick, setQuick] = React.useState({ name: '', email: '', need: '' });
  const [quickSent, setQuickSent] = React.useState(false);
  const { isMobile } = React.useContext(window.BreakpointContext);

  const updateQuick = (k) => (e) => setQuick({ ...quick, [k]: e.target.value });

  const submitQuick = (e) => {
    e.preventDefault();
    setQuickSent(true);
  };

  if (quickSent) {
    return (
      <div style={{
        border: '1px solid var(--line-2)',
        background: 'var(--graphite-2)',
        padding: isMobile ? 24 : 32,
        marginBottom: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}>
        <span style={{ width: 8, height: 8, background: 'var(--ok)', borderRadius: '50%', boxShadow: '0 0 8px var(--ok)', flexShrink: 0 }} />
        <div>
          <div style={{ color: 'var(--titanium-hi)', fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Received.</div>
          <div style={{ color: 'var(--titanium-2)', fontSize: 14 }}>A principal will reply within two business days.</div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submitQuick} style={{
      border: '1px solid var(--line-2)',
      background: 'var(--graphite-2)',
      padding: isMobile ? 24 : 32,
      marginBottom: 40,
      position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
        <div className="mono" style={{ color: 'var(--titanium-3)' }}>QUALIFIED INQUIRY · 30 SECONDS</div>
        <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>Response time: &lt; 24h for high-intent queries</div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1.2fr auto',
        gap: isMobile ? 16 : 14,
        alignItems: 'end',
      }}>
        <div>
          <label className="mono" style={{ color: 'var(--titanium-3)', display: 'block', marginBottom: 8, fontSize: 10 }}>NAME & COMPANY</label>
          <input
            value={quick.name}
            onChange={updateQuick('name')}
            placeholder="Jane Smith, Acme Inc."
            required
            style={{
              width: '100%', background: 'transparent', border: 'none',
              borderBottom: '1px solid var(--titanium-3)', color: 'var(--titanium-hi)',
              padding: '10px 0', fontFamily: 'var(--f-body)', fontSize: 14, outline: 'none',
              transition: 'border-color 150ms',
            }}
            onFocus={e => e.target.style.borderBottomColor = 'var(--cobalt)'}
            onBlur={e => e.target.style.borderBottomColor = 'var(--titanium-3)'}
          />
        </div>
        <div>
          <label className="mono" style={{ color: 'var(--titanium-3)', display: 'block', marginBottom: 8, fontSize: 10 }}>EMAIL</label>
          <input
            value={quick.email}
            onChange={updateQuick('email')}
            placeholder="name@company.com"
            type="email"
            required
            style={{
              width: '100%', background: 'transparent', border: 'none',
              borderBottom: '1px solid var(--titanium-3)', color: 'var(--titanium-hi)',
              padding: '10px 0', fontFamily: 'var(--f-body)', fontSize: 14, outline: 'none',
              transition: 'border-color 150ms',
            }}
            onFocus={e => e.target.style.borderBottomColor = 'var(--cobalt)'}
            onBlur={e => e.target.style.borderBottomColor = 'var(--titanium-3)'}
          />
        </div>
        <div>
          <label className="mono" style={{ color: 'var(--titanium-3)', display: 'block', marginBottom: 8, fontSize: 10 }}>WHAT ARE YOU LOOKING FOR?</label>
          <input
            value={quick.need}
            onChange={updateQuick('need')}
            placeholder="E.g. SaaS architecture, commerce platform, advisory"
            style={{
              width: '100%', background: 'transparent', border: 'none',
              borderBottom: '1px solid var(--titanium-3)', color: 'var(--titanium-hi)',
              padding: '10px 0', fontFamily: 'var(--f-body)', fontSize: 14, outline: 'none',
              transition: 'border-color 150ms',
            }}
            onFocus={e => e.target.style.borderBottomColor = 'var(--cobalt)'}
            onBlur={e => e.target.style.borderBottomColor = 'var(--titanium-3)'}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ padding: '12px 20px', fontSize: 11, whiteSpace: 'nowrap' }}>
          Submit for Review <span className="arrow">→</span>
        </button>
      </div>
    </form>
  );
};

// ====== Contact / Engagement form ======
const Contact = () => {
  const [form, setForm] = React.useState({
    org: '', contact: '', sector: 'Enterprise', scope: 'Front-End Architecture',
    timeline: 'Q3 2026', budget: '$150k–$400k', brief: '',
  });
  const [sent, setSent] = React.useState(false);
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--graphite)' }}>
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">GET STARTED</div>
          <div>
            <h2 className="display h2" style={{ marginBottom: 20 }}>
              Request an<br />
              intake review<span style={{ color: 'var(--cobalt)' }}>.</span>
            </h2>
            <p style={{ maxWidth: 560, fontSize: 17, color: 'var(--titanium-2)' }}>
              Describe your architecture challenges. Every submission is reviewed by a 
              Principal Engineer. We reply to high-intent inquiries within two business days.
            </p>
          </div>
        </div>

        <QuickInquiry />

        <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 16, fontSize: 10 }}>
          OR SUBMIT A DETAILED BRIEF
        </div>

        <div style={{
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1.2fr' : '1fr 1.4fr',
          border: '1px solid var(--line-2)',
          background: 'var(--graphite-2)',
        }}>
          {/* Left meta */}
          <div style={{
            padding: isMobile ? 24 : 40,
            borderRight: isMobile ? 'none' : '1px solid var(--line-2)',
            borderBottom: isMobile ? '1px solid var(--line-2)' : 'none',
          }}>
            <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 32 }}>INTAKE FORM · K-FORM-01</div>

            <div style={{ marginBottom: 28 }}>
              <div className="mono" style={{ marginBottom: 8, color: 'var(--titanium-3)' }}>DIRECT</div>
              <a href="mailto:commission@kyobix.io" style={{ color: 'var(--titanium-hi)', fontSize: 18, borderBottom: '1px solid var(--cobalt)' }}>
                commission@kyobix.io
              </a>
            </div>
            <div style={{ marginBottom: 28 }}>
              <div className="mono" style={{ marginBottom: 8, color: 'var(--titanium-3)' }}>ADVISORY</div>
              <a href="mailto:advisory@kyobix.io" style={{ color: 'var(--titanium-hi)', fontSize: 18, borderBottom: '1px solid var(--line-2)' }}>
                advisory@kyobix.io
              </a>
            </div>
            <div style={{ marginBottom: 28 }}>
              <div className="mono" style={{ marginBottom: 8, color: 'var(--titanium-3)' }}>CALL</div>
              <div style={{ color: 'var(--titanium-hi)', fontSize: 18 }}>+20 1092720768</div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <div className="mono" style={{ marginBottom: 8, color: 'var(--titanium-3)' }}>ATELIER</div>
              <div style={{ color: 'var(--titanium)', fontSize: 15, lineHeight: 1.5 }}>
                42F, Parnas Tower<br />
                521 Teheran-ro, Gangnam-gu<br />
                Seoul 06164, KR
              </div>
            </div>

            <div style={{ marginBottom: 28, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              <div className="mono" style={{ marginBottom: 10, color: 'var(--titanium-3)' }}>BOOK A CALL</div>
               <a
                href="https://cal.com/kyobix/30min?overlayCalendar=true"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: 11 }}
              >
                Schedule Technical Audit <span className="arrow">→</span>
              </a>
              <div className="mono" style={{ marginTop: 8, fontSize: 10, color: 'var(--titanium-3)' }}>
                PRINCIPAL-LED · TECHNICAL AUDIT · MISSION CRITICAL
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 10 }}>CURRENT CAPACITY</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, background: 'var(--ok)', borderRadius: '50%', boxShadow: '0 0 8px var(--ok)' }} />
                <span style={{ color: 'var(--titanium-hi)' }}>Accepting Q3 2026 engagements</span>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
                {[1,1,1,1,0,0].map((v, i) => (
                  <div key={i} style={{ flex: 1, height: 6, background: v ? 'var(--cobalt)' : 'var(--line-2)' }} />
                ))}
              </div>
              <div className="mono" style={{ color: 'var(--titanium-3)', marginTop: 8, fontSize: 10 }}>4 / 6 SLOTS FILLED · 2026</div>
            </div>
          </div>

          {/* Right form */}
          <form onSubmit={submit} style={{ padding: isMobile ? 24 : 40, position: 'relative' }}>
            {sent && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'var(--graphite-2)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                gap: 20,
                zIndex: 2,
                padding: 24,
              }}>
                <div style={{ width: 40, height: 40, position: 'relative' }}>
                  <span style={{ position: 'absolute', inset: 0, display: 'block' }}>
                    <svg viewBox="0 0 40 40" width="40" height="40">
                      <line x1="5" y1="5" x2="35" y2="35" stroke="var(--titanium-hi)" strokeWidth="2" />
                      <line x1="35" y1="5" x2="5" y2="35" stroke="var(--cobalt)" strokeWidth="2" />
                    </svg>
                  </span>
                </div>
                <div className="display" style={{ fontSize: 28, color: 'var(--titanium-hi)', textAlign: 'center' }}>Transmission received.</div>
                <div style={{ color: 'var(--titanium-2)', textAlign: 'center', maxWidth: 360 }}>
                  A principal will reply to your brief within two business days. Reference: <span className="mono" style={{ color: 'var(--cobalt)' }}>K-{Date.now().toString().slice(-6)}</span>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <Field label="ORGANIZATION" value={form.org} onChange={update('org')} placeholder="Company or principal" />
              <Select label="SECTOR" value={form.sector} onChange={update('sector')}
                options={['Enterprise SaaS','Luxury Retail','Fintech','Logistics','Healthcare','Other']} />
              <Select label="SCOPE" value={form.scope} onChange={update('scope')}
                options={SERVICES.map(s => s.title)} />
              <Select label="TIMELINE" value={form.timeline} onChange={update('timeline')}
                options={['Q3 2026','Q4 2026','Q1 2027','Exploratory']} />
              <Select label="INVESTMENT RANGE" value={form.budget} onChange={update('budget')}
                options={['$150k–$400k','$400k–$900k','$900k–$2.5M+','Advisory retainer']} />
              <Field label="PREFERRED CONTACT" value={form.contact} onChange={update('contact')} placeholder="name@company.com" />
            </div>

            <div style={{ marginBottom: 32 }}>
              <label className="mono" style={{ color: 'var(--titanium-3)', display: 'block', marginBottom: 8 }}>
                PROJECT BRIEF
              </label>
              <textarea
                value={form.brief}
                onChange={update('brief')}
                placeholder="What are you bridging? Describe the business problem and any constraints we should know about."
                rows={5}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid var(--line-2)',
                  borderBottom: '1px solid var(--titanium-3)',
                  color: 'var(--titanium-hi)',
                  padding: '14px 16px',
                  fontFamily: 'var(--f-body)',
                  fontSize: 15,
                  resize: 'vertical',
                  outline: 'none',
                  transition: 'border-color 150ms',
                }}
                onFocus={e => e.target.style.borderBottomColor = 'var(--cobalt)'}
                onBlur={e => e.target.style.borderBottomColor = 'var(--titanium-3)'}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>
                ⊹ Encrypted · PGP available on request
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '16px 28px' }}>
                Submit Brief for Principal Review <span className="arrow">→</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="mono" style={{ color: 'var(--titanium-3)', display: 'block', marginBottom: 8 }}>
      {label}
    </label>
    <input
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--titanium-3)',
        color: 'var(--titanium-hi)',
        padding: '12px 0',
        fontFamily: 'var(--f-body)',
        fontSize: 15,
        outline: 'none',
        transition: 'border-color 150ms',
      }}
      onFocus={e => e.target.style.borderBottomColor = 'var(--cobalt)'}
      onBlur={e => e.target.style.borderBottomColor = 'var(--titanium-3)'}
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="mono" style={{ color: 'var(--titanium-3)', display: 'block', marginBottom: 8 }}>
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--titanium-3)',
        color: 'var(--titanium-hi)',
        padding: '12px 0',
        fontFamily: 'var(--f-body)',
        fontSize: 15,
        outline: 'none',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M1 1l4 4 4-4' stroke='%238B9099' fill='none' stroke-width='1.2'/></svg>")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right center',
      }}
    >
      {options.map(o => <option key={o} value={o} style={{ background: 'var(--graphite-2)' }}>{o}</option>)}
    </select>
  </div>
);

// ====== Footer ======
const Footer = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const isAboutPage = window.location.pathname.includes('about');

  const wordmarkSize = isMobile
    ? 'clamp(44px, 15vw, 80px)'
    : isTablet
    ? 'clamp(72px, 18vw, 140px)'
    : 'clamp(100px, 22vw, 340px)';

  const footerCols = isMobile
    ? '1fr 1fr'
    : isTablet
    ? 'repeat(3, 1fr)'
    : '2fr 1fr 1fr 1fr 1fr';

  return (
    <footer style={{ borderTop: '1px solid var(--line)', padding: isMobile ? '48px 0 32px' : '80px 0 40px', position: 'relative' }}>
      <div className="container">
        {/* Giant wordmark */}
        <div style={{
          fontFamily: 'var(--f-display)',
          fontSize: wordmarkSize,
          fontWeight: 500,
          letterSpacing: '-0.04em',
          lineHeight: 0.85,
          color: 'var(--titanium-hi)',
          marginBottom: isMobile ? 32 : 60,
          whiteSpace: isMobile || isTablet ? 'normal' : 'nowrap',
          display: 'flex',
          alignItems: 'center',
        }}>
          <span>KYOBI</span>
          <span style={{
            color: 'var(--cobalt)',
            textShadow: '0 0 40px rgba(42,83,255,0.4)',
            display: 'inline-block',
          }}>X</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: footerCols,
          gap: 32,
          paddingTop: 40,
          borderTop: '1px solid var(--line-2)',
        }}>
          {/* Brand column — spans full width on mobile/tablet */}
          <div style={isMobile || isTablet ? { gridColumn: '1 / -1' } : {}}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <LogoMark size={18} />
              <span style={{ fontFamily: 'var(--f-display)', fontWeight: 600, color: 'var(--titanium-hi)' }}>KYOBIX</span>
            </div>
            <p style={{ color: 'var(--titanium-2)', fontSize: 14, maxWidth: 380, marginBottom: 20 }}>
              We build the software systems that businesses run on.
              Senior engineers, clear timelines, no outsourcing.
            </p>
            <div className="mono" style={{ color: 'var(--titanium-3)' }}>
              © 2026 Kyobix Pte. Ltd. · All systems reserved.
            </div>
          </div>

          {[
            ['PRACTICE', [['Services', isAboutPage?'index.html#services':'#services'],['Process', isAboutPage?'index.html#process':'#process'],['Casework', isAboutPage?'index.html#work':'#work'],['Manifesto', isAboutPage?'index.html#manifesto':'#manifesto'],['Investment','investment.html']]],
            ['COMPANY', [['About','about.html'],['Careers','#'],['Press','#'],['Contact', isAboutPage?'index.html#contact':'#contact']]],
            ['RESOURCES', [['Engineering log','engineering-log.html'],['Blueprints','#'],['Glossary','#'],['Reading list','#']]],
            ['LEGAL', [['MSA template','#'],['Security','#'],['Privacy','#'],['Terms','#']]],
          ].map(([head, items]) => (
            <div key={head}>
              <div className="mono" style={{ marginBottom: 18, color: 'var(--titanium-3)' }}>{head}</div>
              {items.map(([label, href]) => (
                <div key={label} style={{ marginBottom: 10 }}>
                  <a href={href} style={{ color: 'var(--titanium)', fontSize: 14 }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--titanium-hi)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--titanium)'}>
                    {label}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 40,
          paddingTop: 20,
          borderTop: '1px solid var(--line)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <div className="mono" style={{ color: 'var(--titanium-3)' }}>
            KYOBIX.IO · v2026.04 · BUILD 0042
          </div>
          <div className="mono" style={{ color: 'var(--titanium-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, background: 'var(--ok)', borderRadius: '50%' }} />
            ALL SYSTEMS NOMINAL
          </div>
        </div>
      </div>
    </footer>
  );
};

window.Contact = Contact;
window.Footer = Footer;
