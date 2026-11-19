/**
 * AdSense Route Guard & Policy Compliance Engine
 * Prevents Google-served ads on screens without publisher content
 * (e.g., /login, /admin, /dashboard, error pages, blank loading screens)
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ADSENSE_CONFIG = {
  publisherId: import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-4318712038607459',
  scriptUrl: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${import.meta.env.VITE_ADSENSE_PUBLISHER_ID || 'ca-pub-4318712038607459'}`,
} as const;

const AD_SLOT_IDS: Record<string, string | undefined> = {
  'projects-directory-top': import.meta.env.VITE_ADSENSE_SLOT_PROJECTS_DIRECTORY,
  'project-detail-mid': import.meta.env.VITE_ADSENSE_SLOT_PROJECT_DETAIL,
  'journal-feed-ad': import.meta.env.VITE_ADSENSE_SLOT_JOURNAL_FEED,
  'article-mid-content': import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_MID,
  'sidebar-editorial-unit': import.meta.env.VITE_ADSENSE_SLOT_ARTICLE_SIDEBAR,
};

declare global {
  interface Window {
    __constructConsentReady?: boolean;
    adsbygoogle?: AdSenseQueue;
  }
}

export interface AdSenseQueue extends Array<Record<string, unknown>> {
  pauseAdRequests?: number;
}

export function getConfiguredAdSlot(slotKey: string): string | undefined {
  const slotId = AD_SLOT_IDS[slotKey];
  if (!slotId) return undefined;
  if (!/^\d+$/.test(slotId)) {
    console.error(`AdSense slot ${slotKey} must be a numeric unit ID; that placement is disabled.`);
    return undefined;
  }
  return slotId;
}

/**
 * Returns true if the path is an authenticated, administrative, error, or utility route
 * that MUST NOT display ads under Google AdSense publisher policies.
 */
export function isRestrictedAdRoute(pathname: string): boolean {
  return /^\/(admin|login|auth|signup|reset-password|dashboard|profile|settings|404|500|maintenance)(\/|$)/.test(pathname);
}

/**
 * Returns true if the route has substantial editorial publisher content
 * and is approved for ad rendering.
 */
export function isEligibleContentRoute(pathname: string): boolean {
  if (isRestrictedAdRoute(pathname)) {
    return false;
  }
  return pathname === '/' ||
    pathname === '/about' ||
    pathname === '/services' ||
    pathname === '/projects' ||
    pathname === '/journal' ||
    /^\/(projects|journal)\/[^/]+$/.test(pathname);
}

/**
 * Safely loads the Google AdSense script only on eligible, content-rich views.
 * If user transitions to a restricted route (/admin, /login), ad initialization is halted.
 */
export function loadAdSenseScriptSafely(currentPathname: string): boolean {
  if (typeof window === 'undefined') return false;

  // Never load on restricted routes
  if (!isEligibleContentRoute(currentPathname) || !window.__constructConsentReady) {
    return false;
  }

  const existingScript = document.getElementById('adsense-active-script');
  if (existingScript) return true;

  try {
    const script = document.createElement('script');
    script.id = 'adsense-active-script';
    script.src = ADSENSE_CONFIG.scriptUrl;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-ad-client', ADSENSE_CONFIG.publisherId);
    script.onerror = () => console.error('AdSense failed to load; the configured ad slot was not initialized.');
    document.head.appendChild(script);
    return true;
  } catch (err) {
    console.warn('[AdSense Guard] Failed to inject ad script:', err);
    return false;
  }
}

/**
 * Synchronize route state with Google AdSense Auto-Ads request pausing.
 * Automatically halts auto-ads when navigating to /admin, /login, or error pages.
 */
export function syncAdSenseRoute(pathname: string): void {
  if (typeof window === 'undefined') return;

  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.pauseAdRequests =
    isEligibleContentRoute(pathname) && window.__constructConsentReady ? 0 : 1;
}

/**
 * React hook to synchronize AdSense route state automatically
 */
export function useAdSenseRouteSync(): void {
  const location = useLocation();

  useEffect(() => {
    const sync = () => syncAdSenseRoute(location.pathname);
    sync();
    window.addEventListener('construct-consent-ready', sync);
    return () => window.removeEventListener('construct-consent-ready', sync);
  }, [location.pathname]);
}
