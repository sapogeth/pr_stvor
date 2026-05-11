"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string; // e.g. "~14 ms"
};

/* Extracts the numeric part and animates from a larger number down to it */
export function AnimatedCounter({ value }: Props) {
  const [display, setDisplay] = useState<string>("");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const match = value.match(/(\d+)/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = parseInt(match[1], 10);
    const start = target * 16; // count down from ~16x
    const duration = 1200; // ms
    const startTime = performance.now();

    function frame(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start - (start - target) * eased);
      setDisplay(value.replace(/\d+/, String(current)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      }
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return <span>{display || value}</span>;
}
