const EngineeringLogApp = () => {
  const bp = window.useBreakpoints();

  React.useEffect(() => {
    document.getElementById('loader')?.classList.add('hidden');
  }, []);

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
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
    document.querySelectorAll('.section').forEach(el => { el.classList.add('reveal'); obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <window.BreakpointContext.Provider value={bp}>
      <div ref={progressRef} className="progress-bar" />
      <Nav />
      <main>
        <EngineeringLogHero />
        <EngineeringLogList />
      </main>
      <Footer />
    </window.BreakpointContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<EngineeringLogApp />);
