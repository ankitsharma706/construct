import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;
    let lenis: Lenis | null = null;

    const stop = () => {
      cancelAnimationFrame(frameId);
      lenis?.destroy();
      lenis = null;
      lenisRef.current = null;
    };

    const start = () => {
      if (reduceMotion.matches || lenis) return;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };
      frameId = requestAnimationFrame(raf);
    };

    const updatePreference = () => {
      if (reduceMotion.matches) stop();
      else start();
    };

    updatePreference();
    reduceMotion.addEventListener('change', updatePreference);

    return () => {
      reduceMotion.removeEventListener('change', updatePreference);
      stop();
    };
  }, []);

  return <>{children}</>;
}
