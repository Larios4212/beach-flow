import { useEffect, useRef, useState } from 'react';

/* ── Animated counter (for stat cards) ── */
export function useAnimatedCounter(end: number, duration = 800): number {
  const [value, setValue] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const start = prev.current;
    const diff = end - start;
    if (diff === 0) return;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);          // ease-out cubic
      const current = Math.round(start + diff * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
      else prev.current = end;
    }

    requestAnimationFrame(tick);
  }, [end, duration]);

  return value;
}

/* ── Live elapsed time (updates every 30s) ── */
export function useElapsedTime(startTime: string | undefined): string {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!startTime) return;
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, [startTime]);

  if (!startTime) return '';

  const diffMin = Math.floor((Date.now() - new Date(startTime).getTime()) / 60_000);
  if (diffMin < 60) return `${diffMin}m`;
  return `${Math.floor(diffMin / 60)}h ${diffMin % 60}m`;
}

/* ── Media query hook ── */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
