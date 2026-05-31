import { getGPUTier } from "detect-gpu";
import { useState, useEffect } from "react";

// RULE 2: Performance gates (non-negotiable)
// Detect GPU tier: tier 0-1 (mobile/low) -> show static fallback image, tier 2+ -> render R3F canvas
export function useGPUTier() {
  const [tier, setTier] = useState<"high" | "low" | "unknown">("unknown");

  useEffect(() => {
    let isMounted = true;
    
    getGPUTier()
      .then((gpu) => {
        if (!isMounted) return;
        // detect-gpu returns a tier from 0 (very low) to 3 (very high)
        if (gpu.tier <= 1) {
          setTier("low");
        } else if (gpu.tier >= 2) {
          setTier("high");
        } else {
          setTier("unknown");
        }
      })
      .catch((err) => {
        console.warn("GPU detection failed, using fallback:", err);
        if (isMounted) setTier("unknown");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return tier;
}
