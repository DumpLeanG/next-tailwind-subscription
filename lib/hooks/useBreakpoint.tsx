import { useEffect, useState } from "react";

export const useBreakpoint = () => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return {
    isXs: width >= 0 && width < 375,
    isSm: width >= 375 && width < 768,
  };
};