const BreakpointContext = React.createContext({});
window.BreakpointContext = BreakpointContext;

const useBreakpoints = () => {
  const getState = () => {
    const w = window.innerWidth;
    return {
      isMobile:       w <= 480,
      isTablet:       w > 480  && w <= 768,
      isSmallDesktop: w > 768  && w <= 1024,
      isDesktop:      w > 1024,
    };
  };
  const [bp, setBp] = React.useState(getState);
  React.useEffect(() => {
    const handler = () => setBp(getState());
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return bp;
};
window.useBreakpoints = useBreakpoints;
