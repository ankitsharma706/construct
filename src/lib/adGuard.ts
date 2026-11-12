/**
 * AdSense Route Guard & Policy Compliance Engine
 * Prevents Google-served ads on screens without publisher content
 * (e.g., /login, /admin, /dashboard, error pages, blank loading screens)
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ADSENSE_CONFIG = {
  publisherId: 'ca-pub-4318712038607459',
  cleanPubId: 'pub-4318712038607459',
  scriptUrl: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4318712038607459',
} as const;

// Routes where ads are strictly forbidden by AdSense policy
const RESTRICTED_ROUTES = [
  /^\/login(\/.*)?$/,
  /^\/admin(\/.*)?$/,
  /^\/auth(\/.*)?$/,
  /^\/signup(\/.*)?$/,
  /^\/reset-password(\/.*)?$/,
  /^\/dashboard(\/.*)?$/,
  /^\/profile(\/.*)?$/,
  /^\/settings(\/.*)?$/,
  /^\/404(\/.*)?$/,
  /^\/500(\/.*)?$/,
  /^\/maintenance(\/.*)?$/,
];

// Content-rich editorial routes where ads are compliant
const APPROVED_EDITORIAL_ROUTES = [
  /^\/$/,
  /^\/journal(\/.*)?$/,
  /^\/projects(\/.*)?$/,
  /^\/about(\/.*)?$/,
  /^\/services(\/.*)?$/,
  /^\/contact(\/.*)?$/,
  /^\/privacy-policy(\/.*)?$/,
  /^\/terms-of-service(\/.*)?$/,
];

/**
 * Returns true if the path is an authenticated, administrative, error, or utility route
 * that MUST NOT display ads under Google AdSense publisher policies.
 */
export function isRestrictedAdRoute(pathname: string): boolean {
  return RESTRICTED_ROUTES.some((regex) => regex.test(pathname));
}

/**
 * Returns true if the route has substantial editorial publisher content
 * and is approved for ad rendering.
 */
export function isEligibleContentRoute(pathname: string): boolean {
  if (isRestrictedAdRoute(pathname)) {
    return false;
  }
  return APPROVED_EDITORIAL_ROUTES.some((regex) => regex.test(pathname));
}

/**
 * Safely loads the Google AdSense script only on eligible, content-rich views.
 * If user transitions to a restricted route (/admin, /login), ad initialization is halted.
 */
export function loadAdSenseScriptSafely(currentPathname: string): boolean {
  if (typeof window === 'undefined') return false;

  // Never load on restricted routes
  if (!isEligibleContentRoute(currentPathname)) {
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

  try {
    window.adsbygoogle = window.adsbygoogle || [];
    if (isRestrictedAdRoute(pathname)) {
      // Pause ad requests on restricted / non-content screens
      (window.adsbygoogle as any).pauseAdRequests = 1;
    } else if (isEligibleContentRoute(pathname)) {
      // Resume ad requests on eligible editorial content
      (window.adsbygoogle as any).pauseAdRequests = 0;
    }
  } catch (e) {
    // Graceful fallback
  }
}

/**
 * React hook to synchronize AdSense route state automatically
 */
export function useAdSenseRouteSync(): void {
  const location = useLocation();

  useEffect(() => {
    syncAdSenseRoute(location.pathname);
  }, [location.pathname]);
}
