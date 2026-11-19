import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ADSENSE_CONFIG, getConfiguredAdSlot, isEligibleContentRoute, loadAdSenseScriptSafely } from '../lib/adGuard';

interface AdSenseSlotProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  minHeight?: number;
  label?: string;
}

export default function AdSenseSlot({
  slot,
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
  const configuredSlot = getConfiguredAdSlot(slot);

  useEffect(() => {
    if (!isAllowed || !configuredSlot || typeof window === 'undefined') return;

    const initializeSlot = () => {
      if (!loadAdSenseScriptSafely(location.pathname) || pushedRef.current || !adRef.current) return;
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    };

    initializeSlot();
    window.addEventListener('construct-consent-ready', initializeSlot);
    return () => window.removeEventListener('construct-consent-ready', initializeSlot);
  }, [configuredSlot, location.pathname, isAllowed]);

  if (!isAllowed || !configuredSlot) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`my-12 overflow-hidden border border-espresso/10 bg-linen/50 p-4 ${className}`}
      style={{ height: `${minHeight + 80}px` }}
    >
      <div className="mb-2 flex items-center justify-between border-b border-espresso/5 pb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-espresso/40">
        <span>{label}</span>
        <span className="text-gold">AdSense Partner</span>
      </div>

      <div className="flex items-center justify-center overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', height: `${minHeight}px`, width: '100%' }}
          data-ad-client={ADSENSE_CONFIG.publisherId}
          data-ad-slot={configuredSlot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </aside>
  );
}
