import { useEffect } from 'react';

interface TcfConsentData {
  eventStatus?: string;
  listenerId?: number;
}

declare global {
  interface Window {
    __tcfapi?: (
      command: 'addEventListener' | 'removeEventListener' | 'displayConsentUi',
      version: 2,
      callback: (data: TcfConsentData, success: boolean) => void,
      parameter?: number,
    ) => void;
  }
}

export function openConsentPreferences(): void {
  if (!window.__tcfapi) {
    console.error('Consent preferences are unavailable because the configured CMP is not ready.');
    return;
  }

  window.__tcfapi('displayConsentUi', 2, (_data, success) => {
    if (!success) {
      console.error('The configured CMP could not open its consent preferences.');
    }
  });
}

export const isConsentManagerConfigured = Boolean(import.meta.env.VITE_FUNDING_CHOICES_SCRIPT_URL);

export default function ConsentManager() {
  useEffect(() => {
    const scriptUrl = import.meta.env.VITE_FUNDING_CHOICES_SCRIPT_URL;
    if (!scriptUrl) return;

    let attempts = 0;
    let listenerId: number | undefined;
    let retryTimer: number | undefined;
    let cancelled = false;

    const listenForConsent = () => {
      if (cancelled) return;
      if (!window.__tcfapi) {
        attempts += 1;
        if (attempts < 25) {
          retryTimer = window.setTimeout(listenForConsent, 200);
        } else {
          console.error('Funding Choices loaded without exposing the IAB TCF consent API.');
        }
        return;
      }

      window.__tcfapi('addEventListener', 2, (data, success) => {
        if (!success) {
          console.error('Funding Choices failed to report consent status.');
          return;
        }
        listenerId = data.listenerId;
        if (data.eventStatus === 'tcloaded' || data.eventStatus === 'useractioncomplete') {
          window.__constructConsentReady = true;
          window.dispatchEvent(new Event('construct-consent-ready'));
        }
      });
    };

    let script = document.querySelector<HTMLScriptElement>('script[data-funding-choices]');
    if (!script) {
      script = document.createElement('script');
      script.async = true;
      script.src = scriptUrl;
      script.dataset.fundingChoices = 'true';
      script.onerror = () => {
        console.error('Funding Choices failed to load; advertising remains disabled.');
      };
      script.onload = listenForConsent;
      document.head.appendChild(script);
    } else {
      listenForConsent();
    }

    return () => {
      cancelled = true;
      if (retryTimer !== undefined) window.clearTimeout(retryTimer);
      if (listenerId !== undefined && window.__tcfapi) {
        window.__tcfapi('removeEventListener', 2, () => undefined, listenerId);
      }
    };
  }, []);

  return null;
}
