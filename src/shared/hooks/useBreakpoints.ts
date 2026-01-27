import { useEffect, useMemo, useState } from "react";

export const useBreakpoints = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const { isMobile, isTablet, isDesktop } = useMemo(() => {
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
    };
  }, [width]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return {
    width,
    isMobile,
    isTablet,
    isDesktop,
  };
};
