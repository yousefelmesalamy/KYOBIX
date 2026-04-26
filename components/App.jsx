const App = () => {
  const bp = window.useBreakpoints();

  // Hide loader on mount
  React.useEffect(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, []);

  // Cursor
  const dotRef = React.useRef(null);
  const ringRef = React.useRef(null);
  React.useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    let rx = 0, ry = 0, x = 0, y = 0;
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = x + 'px';
        dotRef.current.style.top = y + 'px';
      }
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const onOver = (e) => {
      if (e.target.closest('a, button, input, select, textarea, [role=button]')) {
        ringRef.current?.classList.add('hover');
      } else {
        ringRef.current?.classList.remove('hover');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  // Reading progress bar
  const progressRef = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (progressRef.current) progressRef.current.style.width = Math.min(pct * 100, 100) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sticky CTA
  const [showSticky, setShowSticky] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      setShowSticky(window.scrollY / document.body.scrollHeight > 0.40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveals
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.section').forEach(el => {
      el.classList.add('reveal');
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const showCursor = bp.isDesktop || bp.isSmallDesktop;

  return (
    <window.BreakpointContext.Provider value={bp}>
      <div ref={progressRef} className="progress-bar" />
      {showCursor && <div ref={dotRef} className="cursor-dot" />}
      {showCursor && <div ref={ringRef} className="cursor-ring" />}
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhoWeWorkWith />
        <Process />
        <CaseStudies />
        <Metrics />
        <Testimonials />
        <ClientResults />
        <Manifesto />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      {showSticky && (
        <a href="https://cal.com/kyobix/30min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 150,
          fontSize: 11, padding: '10px 18px',
          boxShadow: '0 0 24px var(--cobalt-glow)',
          animation: 'page-in 300ms ease both',
        }}>
          Schedule Technical Audit <span className="arrow">→</span>
        </a>
      )}
    </window.BreakpointContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
