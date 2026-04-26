const AboutApp = () => {
  const bp = window.useBreakpoints();

  // Hide loader on mount
  React.useEffect(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, []);

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
        <AboutHero />
        <AboutMetrics />
        <AboutApproach />
        <AboutTrackRecord />
        <AboutWhyKyobix />
        <AboutTimeline />
        <AboutCTA />
      </main>
      <Footer />
    </window.BreakpointContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AboutApp />);
