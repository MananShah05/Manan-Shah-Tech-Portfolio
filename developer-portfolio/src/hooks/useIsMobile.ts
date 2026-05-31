import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    }
    return false;
  });

  useEffect(() => {
    // Check if the device is mobile (no hover and coarse pointer)
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    
    // Update on changes (e.g., orientation change or devtools toggle)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    // Modern browsers support addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return isMobile;
}
