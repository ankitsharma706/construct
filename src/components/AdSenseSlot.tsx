import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ADSENSE_CONFIG, isEligibleContentRoute } from '../lib/adGuard';

interface AdSenseSlotProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  minHeight?: number;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdSenseSlot({
  slot = 'default-editorial-slot',
  format = 'auto',
  responsive = true,
  className = '',
  minHeight = 250,
  label = 'Sponsored Architecture & Engineering Insights',
}: AdSenseSlotProps) {
  const location = useLocation();
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef<boolean>(false);

  const isAllowed = isEligibleContentRoute(location.pathname);

  useEffect(() => {
    if (!isAllowed) return;

    // Load script conditionally on eligible route
    if (typeof window !== 'undefined') {
      const existingScript = document.getElementById('adsense-active-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'adsense-active-script';
        script.src = ADSENSE_CONFIG.scriptUrl;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-ad-client', ADSENSE_CONFIG.publisherId);
        document.head.appendChild(script);
      }

      // Initialize the ad slot safely
      if (!pushedRef.current && adRef.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        } catch (e) {
          // Suppress duplicate push or dev warnings
          console.debug('[AdSenseSlot] Ad push status:', e);
        }
      }
    }
  }, [location.pathname, isAllowed]);

  // Under policy: Never render on auth, admin, 404, or unapproved views
  if (!isAllowed) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`my-12 overflow-hidden border border-espresso/10 bg-linen/50 p-4 transition-all duration-300 ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      <div className="mb-2 flex items-center justify-between border-b border-espresso/5 pb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-espresso/40">
        <span>{label}</span>
        <span className="text-gold">AdSense Partner</span>
      </div>

      <div className="flex items-center justify-center overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minHeight: `${minHeight - 40}px`, width: '100%' }}
          data-ad-client={ADSENSE_CONFIG.publisherId}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </aside>
  );
}

