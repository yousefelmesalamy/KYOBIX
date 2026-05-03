const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [time, setTime] = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isMobile, isTablet } = React.useContext(window.BreakpointContext);
  const isMobileNav = isMobile || isTablet;
  const isAboutPage = window.location.pathname.includes('about');
  const isInvestmentPage = window.location.pathname.includes('investment');
  const pagePrefix = (isAboutPage || isInvestmentPage) ? 'index.html' : '';

  const navigate = (href) => (e) => {
    if (!href.includes('.html') && !href.includes('index.html')) return;
    e.preventDefault();
    document.body.classList.add('page-out');
    setTimeout(() => { window.location.href = href; }, 260);
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const utc = d.toISOString().slice(11, 19);
      setTime(utc + ' UTC');
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Close menu on resize to desktop
  React.useEffect(() => {
    if (!isMobileNav) setMenuOpen(false);
  }, [isMobileNav]);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || menuOpen ? 'rgba(7,9,12,0.92)' : 'transparent',
      backdropFilter: scrolled || menuOpen ? 'blur(16px) saturate(120%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all 250ms ease',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <a href={isAboutPage || isInvestmentPage ? 'index.html' : '#top'} onClick={navigate(isAboutPage || isInvestmentPage ? 'index.html' : '')} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoMark size={20} />
          <span style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 600,
            letterSpacing: '0.02em',
            fontSize: 15,
            color: 'var(--titanium-hi)',
          }}>KYOBIX</span>
        </a>

        {/* Desktop nav */}
        {!isMobileNav && (
          <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
            {[
              ['Services',   `${pagePrefix}#services`],
              ['Process',    `${pagePrefix}#process`],
              ['Work',       `${pagePrefix}#work`],
              ['Manifesto',  `${pagePrefix}#manifesto`],
              ['About',      'about.html'],
              ['Investment', 'investment.html'],
            ].map(([label, href]) => (
              <a key={href} href={href} onClick={navigate(href)} className="mono" style={{
                fontSize: 11,
                color: 'var(--titanium-2)',
                transition: 'color 150ms',
              }} onMouseEnter={e => e.currentTarget.style.color = 'var(--titanium-hi)'}
                 onMouseLeave={e => e.currentTarget.style.color = 'var(--titanium-2)'}>
                {label}
              </a>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {!isMobileNav && (
            <span className="mono" style={{ fontSize: 10, color: 'var(--titanium-3)' }}>
              {time}
            </span>
          )}
          {!isMobileNav && (
            <a href="https://cal.com/kyobix/30min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 11 }}>
              Schedule a Call <span className="arrow">→</span>
            </a>
          )}

          {/* Hamburger button */}
          {isMobileNav && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                width: 36, height: 36,
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center',
                gap: 5, background: 'transparent', border: 'none',
                cursor: 'pointer', padding: 0,
              }}
            >
              <span style={{
                display: 'block', width: 22, height: 1.5,
                background: 'var(--titanium-hi)',
                transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                transition: 'transform 220ms ease',
              }} />
              <span style={{
                display: 'block', width: 22, height: 1.5,
                background: 'var(--titanium-hi)',
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 150ms ease',
              }} />
              <span style={{
                display: 'block', width: 22, height: 1.5,
                background: 'var(--titanium-hi)',
                transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                transition: 'transform 220ms ease',
              }} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileNav && menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0,
          background: 'rgba(7,9,12,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--line-2)',
          padding: '24px var(--gutter) 32px',
          zIndex: 99,
          display: 'flex', flexDirection: 'column',
        }}>
          {[
            ['Services',   `${pagePrefix}#services`],
            ['Process',    `${pagePrefix}#process`],
            ['Work',       `${pagePrefix}#work`],
            ['Manifesto',  `${pagePrefix}#manifesto`],
            ['About',      'about.html'],
            ['Investment', 'investment.html'],
          ].map(([label, href]) => (
            <a key={href} href={href}
              onClick={(e) => { setMenuOpen(false); navigate(href)(e); }}
              className="mono"
              style={{
                fontSize: 13, color: 'var(--titanium-2)',
                padding: '18px 0',
                borderBottom: '1px solid var(--line)',
                display: 'block',
                transition: 'color 150ms',
              }}>
              {label}
              </a>
            ))}
            <a href="https://cal.com/kyobix/30min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
            style={{ marginTop: 24, alignSelf: 'flex-start', fontSize: 11 }}>
            Initiate strategic review <span className="arrow">→</span>
          </a>
        </div>
      )}
    </header>
  );
};

const LogoMark = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: 'block' }}>
    <line x1="3" y1="3" x2="21" y2="21" stroke="var(--titanium-hi)" strokeWidth="2" />
    <line x1="21" y1="3" x2="3" y2="21" stroke="var(--cobalt)" strokeWidth="2" />
  </svg>
);

window.Nav = Nav;
window.LogoMark = LogoMark;
