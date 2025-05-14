
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);
    
    // Set initial value
    updateMatches();
    
    // Setup listeners for changes
    media.addEventListener("change", updateMatches);
    
    // Clean up
    return () => {
      media.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
}

// Add the useIsMobile hook that was missing
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}
