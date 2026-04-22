const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [time, setTime] = React.useState('');

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

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(7,9,12,0.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px) saturate(120%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all 250ms ease',
    }}>
      <div className="container" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoMark size={20} />
          <span style={{
            fontFamily: 'var(--f-display)',
            fontWeight: 600,
            letterSpacing: '0.02em',
            fontSize: 15,
            color: 'var(--titanium-hi)',
          }}>KYOBIX</span>
        </a>

        <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
          {[
            ['Services', '#services'],
            ['Process', '#process'],
            ['Work', '#work'],
            ['Manifesto', '#manifesto'],
            ['Team', '#team'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="mono" style={{
              fontSize: 11,
              color: 'var(--titanium-2)',
              transition: 'color 150ms',
            }} onMouseEnter={e => e.currentTarget.style.color = 'var(--titanium-hi)'}
               onMouseLeave={e => e.currentTarget.style.color = 'var(--titanium-2)'}>
              {label}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--titanium-3)' }}>
            {time}
          </span>
          <a href="#contact" className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 11 }}>
            Engage <span className="arrow">→</span>
          </a>
        </div>
      </div>
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
