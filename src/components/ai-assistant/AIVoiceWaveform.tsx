
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AIVoiceWaveformProps {
  playing: boolean;
  className?: string;
}

export function AIVoiceWaveform({ playing, className }: AIVoiceWaveformProps) {
  const [bars, setBars] = useState<number[]>([]);
  const animationRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Generate initial random heights for bars
    const initialBars = Array.from({ length: 30 }, () => Math.random() * 100);
    setBars(initialBars);
    
    let lastUpdateTime = 0;
    
    const updateBars = (timestamp: number) => {
      // Throttle updates to every ~50ms for performance
      if (timestamp - lastUpdateTime > 50) {
        lastUpdateTime = timestamp;
        
        if (playing) {
          // Create dynamic waveform when playing
          setBars(prev => prev.map(() => Math.random() * 100));
        }
      }
      
      // Continue animation loop if still playing
      if (playing) {
        animationRef.current = requestAnimationFrame(updateBars);
      }
    };
    
    if (playing) {
      animationRef.current = requestAnimationFrame(updateBars);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [playing]);
  
  return (
    <div className={cn("flex items-end justify-center h-16 gap-[2px] p-2 border rounded-md", className)}>
      {bars.map((height, index) => (
        <div
          key={index}
          className={cn(
            "w-1 rounded-t-sm transition-all duration-75",
            playing ? "bg-primary" : "bg-muted"
          )}
          style={{ 
            height: `${playing ? height : Math.min(height, 40)}%`,
            opacity: playing ? 1 : 0.5
          }}
        />
      ))}
    </div>
  );
}
