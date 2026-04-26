const useCounterAtelier = (target, duration = 1600, decimals = 0) => {
  const [v, setV] = React.useState(0);
  const ref = React.useRef(null);
  const [started, setStarted] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  React.useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started]);
  return [v, ref];
};

const ATELIER_DECISIONS = [
  {
    title: 'Shopify Hydrogen over custom storefront',
    chosen: 'Shopify Hydrogen (React)',
    rejected: 'Custom Next.js + Commerce API',
    rationale: 'The client required PCI-DSS Level 1 compliance for card processing and needed ongoing Shopify Plus features (gifting, multi-currency, B2B). A custom storefront would have added 6 weeks of compliance work with no long-term benefit.',
    outcome: 'Time-to-checkout: 2.1s globally. PCI compliance inherited from Shopify.',
  },
  {
    title: 'Sanity over Contentful for editorial control',
    chosen: 'Sanity.io (GROQ)',
    rejected: 'Contentful + REST API',
    rationale: 'The house required custom content types (look books, archival records, atelier notes) with complex cross-document references. Sanity\'s schema-first approach and GROQ query language gave the editorial team the flexibility Contentful\'s rigid content model blocked.',
    outcome: 'Editorial publish time: 4 min → 40 sec. Zero developer involvement for content changes.',
  },
  {
    title: 'Algolia NeuralSearch over default Shopify search',
    chosen: 'Algolia NeuralSearch',
    rejected: 'Shopify Predictive Search',
    rationale: 'Luxury clients search differently — by fabric, construction, occasion, and feel rather than product name. Shopify Predictive Search returned zero results for 31% of queries in testing. Algolia NeuralSearch handled semantic queries with 94% relevance at first result.',
    outcome: 'Search-to-purchase conversion: +38%. Zero-results rate: 31% → 3%.',
  },
];

const ATELIER_STACK = ['Shopify Hydrogen', 'React', 'TypeScript', 'Remix', 'Sanity.io', 'GROQ', 'Algolia NeuralSearch', 'Stripe', 'Cloudflare Workers', 'CDN edge', 'WebP/AVIF', 'OpenTelemetry', 'Vercel'];

const AtelierCase = () => {
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const [lcp, lcpref] = useCounterAtelier(0.9, 1800, 1);
  const [aov, aovref] = useCounterAtelier(24800, 2200);
  const [conv, convref] = useCounterAtelier(38, 1600);
  const [search, searchref] = useCounterAtelier(94, 1400);

  return (
    <>
      {/* Hero */}
      <section id="top" style={{ minHeight: '70vh', paddingTop: 64, borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="container">
          <div style={{ paddingTop: isMobile ? 24 : 40, paddingBottom: isMobile ? 28 : 48, borderBottom: '1px solid var(--line)', marginBottom: isMobile ? 28 : 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>K-004 / ATELIER NOIRE — CASE STUDY</div>
            {!isMobile && <a href="../index.html#work" className="mono" style={{ color: 'var(--titanium-3)', fontSize: 10 }}>← All case studies</a>}
          </div>
          <div className="mono" style={{ color: 'var(--cobalt)', marginBottom: 16 }}>LUXURY RETAIL · 2024</div>
          <h1 className="display h1" style={{ marginBottom: 24 }}>
            Atelier<br />
            <span style={{ color: 'var(--titanium-2)' }}>Noire Commerce.</span>
          </h1>
          <p style={{ maxWidth: 620, fontSize: isMobile ? 16 : 19, color: 'var(--titanium-2)', lineHeight: 1.6 }}>
            Headless commerce for a Parisian couture house. Average order value €24,800.
            LCP 0.9s globally. Search-to-purchase conversion up 38%.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', border: '1px solid var(--line-2)' }}>
            {[
              { ref: lcpref, val: lcp, label: 'LCP GLOBAL', suffix: 's', dec: 1 },
              { ref: aovref, val: aov, label: 'AVG ORDER VALUE', prefix: '€', suffix: '', dec: 0 },
              { ref: convref, val: conv, label: 'CONV. UPLIFT', suffix: '%', dec: 0 },
              { ref: searchref, val: search, label: 'SEARCH RELEVANCE', suffix: '%', dec: 0 },
            ].map((m, i) => (
              <div key={m.label} ref={m.ref} style={{ padding: isMobile ? '24px 16px' : '36px 28px', borderRight: i < 3 ? '1px solid var(--line-2)' : 'none' }}>
                <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 12 }}>{m.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  {m.prefix && <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 18, marginRight: 2 }}>{m.prefix}</div>}
                  <div className="display" style={{ fontSize: isMobile ? 36 : 56, fontWeight: 500, color: 'var(--titanium-hi)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
                    {m.val.toFixed(m.dec)}
                  </div>
                  <div className="mono" style={{ color: 'var(--cobalt)', fontSize: 13 }}>{m.suffix}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brief */}
      <section className="section" style={{ background: 'var(--graphite)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">§ 01 / BRIEF</div>
            <div>
              <h2 className="display h2" style={{ marginBottom: 20 }}>The problem.</h2>
              <p style={{ fontSize: 17, color: 'var(--titanium-2)', lineHeight: 1.7, maxWidth: 680, marginBottom: 16 }}>
                Atelier Noire is a Parisian couture house with average order values above €24,000. Their existing Shopify Basic storefront loaded in 6.8s on Paris broadband and was completely unusable in the Asia-Pacific markets they were expanding into.
              </p>
              <p style={{ fontSize: 17, color: 'var(--titanium-2)', lineHeight: 1.7, maxWidth: 680, marginBottom: 16 }}>
                The editorial team — managing look books, atelier journals, and archival records spanning 40 years — was entirely dependent on developer availability to publish content. Average publish time was 4 hours.
              </p>
              <p style={{ fontSize: 17, color: 'var(--titanium-2)', lineHeight: 1.7, maxWidth: 680 }}>
                The brief: rebuild the commerce experience as headless, achieve sub-1s LCP globally, give the editorial team full autonomy, and preserve the brand's ultra-luxury positioning at every interaction point.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">§ 02 / ARCHITECTURE</div>
            <div><h2 className="display h2" style={{ marginBottom: 16 }}>System topology.</h2></div>
          </div>
          <div style={{ border: '1px solid var(--line-2)', padding: isMobile ? 20 : 40, background: 'var(--graphite-2)' }}>
            <svg viewBox="0 0 700 260" width="100%" style={{ display: 'block' }}>
              <defs>
                <pattern id="a-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(216,220,226,0.04)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="700" height="260" fill="url(#a-grid)"/>
              {[
                { x: 20,  y: 90,  w: 110, h: 50, label: 'SANITY\nCMS', color: 'rgba(216,220,226,0.06)' },
                { x: 20,  y: 160, w: 110, h: 50, label: 'SHOPIFY\nPLUS', color: 'rgba(216,220,226,0.06)' },
                { x: 185, y: 75,  w: 130, h: 80, label: 'HYDROGEN\nREACT REMIX', color: 'rgba(42,83,255,0.08)', accent: true },
                { x: 375, y: 90,  w: 120, h: 50, label: 'CLOUDFLARE\nWORKERS', color: 'rgba(216,220,226,0.06)' },
                { x: 375, y: 160, w: 120, h: 50, label: 'ALGOLIA\nNEURALSEARCH', color: 'rgba(62,213,152,0.06)' },
                { x: 555, y: 100, w: 120, h: 70, label: 'CDN EDGE\n50+ NODES', color: 'rgba(42,83,255,0.06)' },
              ].map((n, i) => (
                <g key={i}>
                  <rect x={n.x} y={n.y} width={n.w} height={n.h} fill={n.color} stroke={n.accent ? 'rgba(42,83,255,0.35)' : 'rgba(216,220,226,0.1)'} strokeWidth="1"/>
                  {n.label.split('\n').map((line, li) => (
                    <text key={li} x={n.x + n.w/2} y={n.y + 20 + li * 16} textAnchor="middle" fill="rgba(200,205,212,0.65)" fontFamily="'Geist Mono',monospace" fontSize="9" letterSpacing="0.06em">{line}</text>
                  ))}
                </g>
              ))}
              <line x1="130" y1="112" x2="183" y2="112" stroke="rgba(139,144,153,0.3)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="130" y1="182" x2="183" y2="140" stroke="rgba(139,144,153,0.3)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="315" y1="112" x2="373" y2="112" stroke="rgba(42,83,255,0.4)" strokeWidth="1.5"/>
              <line x1="315" y1="130" x2="373" y2="182" stroke="rgba(62,213,152,0.3)" strokeWidth="1" strokeDasharray="4 3"/>
              <line x1="495" y1="112" x2="553" y2="130" stroke="rgba(42,83,255,0.35)" strokeWidth="1.5"/>
              <text x="350" y="240" textAnchor="middle" fill="rgba(90,95,104,0.5)" fontFamily="'Geist Mono',monospace" fontSize="8" letterSpacing="0.08em">FIG.04 — ATELIER NOIRE COMMERCE TOPOLOGY · K-004</text>
            </svg>
          </div>
        </div>
      </section>

      {/* Decisions */}
      <section className="section" style={{ background: 'var(--graphite)' }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">§ 03 / DECISIONS</div>
            <div><h2 className="display h2" style={{ marginBottom: 16 }}>Architecture decisions.</h2></div>
          </div>
          <div style={{ border: '1px solid var(--line-2)' }}>
            {ATELIER_DECISIONS.map((d, i) => (
              <div key={i} style={{ padding: isMobile ? 24 : 36, borderBottom: i < ATELIER_DECISIONS.length-1 ? '1px solid var(--line-2)' : 'none', background: 'var(--graphite-2)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 32 }}>
                  <div>
                    <div className="mono" style={{ color: 'var(--cobalt)', marginBottom: 12, fontSize: 10 }}>ADR-{String(i+1).padStart(3,'0')}</div>
                    <div className="display" style={{ fontSize: isMobile ? 18 : 22, fontWeight: 500, color: 'var(--titanium-hi)', marginBottom: 16 }}>{d.title}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span className="mono" style={{ fontSize: 10, padding: '3px 8px', background: 'rgba(42,83,255,0.1)', color: 'var(--cobalt)', border: '1px solid rgba(42,83,255,0.2)' }}>✓ {d.chosen}</span>
                      <span className="mono" style={{ fontSize: 10, padding: '3px 8px', border: '1px solid var(--line-2)', color: 'var(--titanium-3)' }}>✗ {d.rejected}</span>
                    </div>
                  </div>
                  <div>
                    <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 10 }}>RATIONALE</div>
                    <p style={{ fontSize: 14, color: 'var(--titanium-2)', lineHeight: 1.6, marginBottom: 16 }}>{d.rationale}</p>
                    <div className="mono" style={{ color: 'var(--titanium-3)', marginBottom: 8 }}>OUTCOME</div>
                    <p style={{ fontSize: 14, color: 'var(--ok)' }}>{d.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">§ 04 / STACK</div>
            <div><h2 className="display h2">Technologies used.</h2></div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {ATELIER_STACK.map(s => (
              <span key={s} className="mono" style={{ fontSize: 11, padding: '6px 12px', border: '1px solid var(--line-2)', color: 'var(--titanium-2)' }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--graphite)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 20, alignItems: isMobile ? 'flex-start' : 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Next engagement</div>
            <h2 className="display h3" style={{ marginBottom: 12 }}>Commission a build like this.</h2>
            <p style={{ fontSize: 16, color: 'var(--titanium-2)', maxWidth: 400 }}>Two slots remaining for Q3 2026.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
            <a href="../index.html#contact" className="btn btn-primary" style={{ fontSize: 12 }}>Commission a build <span className="arrow">→</span></a>
            <a href="../index.html#work" className="btn" style={{ fontSize: 12 }}>All case studies</a>
          </div>
        </div>
      </section>
    </>
  );
};

window.AtelierCase = AtelierCase;
