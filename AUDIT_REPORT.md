# Principal Code Review & AdSense/SEO Audit

**Audited branch:** `google_princepal_adsence_seo`
**Audited commit:** `6f9d757bc4ab149107b29415e3a38755b6ab7f46`
**Report branch:** `audit/code-review-report`  
**GitHub issues:** 45 opened, #3–#47

## Executive Summary

The branch has a valid `ads.txt` entry, a robots file and sitemap, route-level lazy loading, centralized metadata helpers, and Firestore rules that restrict administrative reads and writes. The publisher ID is consistent across the AdSense configuration and both `ads.txt` files.

The site is **not ready to be represented as AdSense- or search-ready**. AdSense loads globally and multiple times, ad units use descriptive placeholders instead of configured slot IDs, ads are eligible on contact/legal pages, a sidebar ad is inside a sticky container, and the privacy page promises consent adjustments without an implemented consent-management flow. These are configuration and policy-readiness blockers, not a prediction of Google’s approval decision.

Search indexing depends on a client-rendered Vite/React SPA: all extensionless paths receive the same static HTML shell, with route metadata updated only after hydration. The initial canonical points to the site root for every route, and the production fallbacks return `200` for unknown paths. Additional crawl-quality concerns include duplicated structured data, stale article meta tags during client navigation, and build-time `lastmod` values that make unchanged URLs appear freshly modified.

The most material engineering concerns are the split between Firestore-backed admin data and constant-backed public pages, an admin create modal that explicitly has no CRUD form, inert edit buttons, and a bootstrap action that creates duplicate documents on each run. Security review found anonymous lead creation without an abuse control, caller-selectable lead workflow status, missing field allowlists in Firestore validators, no site-wide security-header policy, and client logs containing account identifiers and provider profile data.

Performance findings are code-level risks rather than measured Core Web Vitals: production image grids omit lazy loading and responsive sources, the hero image is not explicitly prioritized, the homepage autoplays a remote video, project detail imports the Three.js viewer, Google Fonts are loaded through CSS `@import`, and fluid ad slots reserve only minimum height. Accessibility findings include labels not associated with form controls, unnamed icon controls, hover-only gallery controls, an incomplete lightbox dialog interaction, low-contrast small text, and no reduced-motion path.

The audit did not identify a committed Gemini API secret. Firebase configuration is read from `VITE_*` environment variables, and the configured AdSense publisher ID is a public identifier. No source changes were made. `npm run lint` could not run because the checkout has no installed dependencies (`tsc` was not found); no live deployment or field CWV measurements were available.

## Architecture & Code Quality

The application is a Vite/React single-page app using React Router, lazy-loaded route components, Firebase Auth/Firestore, and a custom Express/Vite server. The centralized `SEOHead` helper, route-level code splitting, and Firestore rules for admin-only data are useful foundations. The repository also includes static `ads.txt`, `robots.txt`, and sitemap assets plus a build-time sitemap generator.

The main architectural bottleneck is that these pieces do not form one publishing pipeline: the admin reads and writes Firestore while public project and journal routes read `src/constants.ts`. As a result, the admin cannot publish its changes to the site. Its create modal is explicitly a placeholder, and the visible edit controls have no handlers. Static output and client-only metadata compound the problem for crawlers and social preview bots.

The highest-risk security boundary is the intentionally public lead-create rule. Field-level checks exist, but there is no abuse throttling and the validators do not use the already-defined `hasOnlyAllowedFields` helper. Application-side error logging also includes unnecessary identity data. Type escapes in the admin and journal service weaken the data boundary, while the unused GenAI dependency and duplicate AdSense configuration add avoidable maintenance surface.

## Categorized Issue Index

All findings below are linked to their individual GitHub issues. Severity reflects the code-level impact and urgency of the finding, not an external policy enforcement decision.

| Category | Issue | Severity | File path(s) |
|---|---|---:|---|
| AdSense | [#3 — Consolidate the duplicate AdSense script loaders](https://github.com/ankitsharma706/construct/issues/3) | High | `index.html`; `src/components/AdSenseSlot.tsx` |
| AdSense | [#4 — Keep the global script off restricted SPA routes](https://github.com/ankitsharma706/construct/issues/4) | High | `index.html`; `src/lib/adGuard.ts` |
| AdSense | [#5 — Replace descriptive strings with configured ad slot IDs](https://github.com/ankitsharma706/construct/issues/5) | High | `src/components/AdSenseSlot.tsx`; `src/pages/Journal.tsx`; `src/pages/ProjectList.tsx`; `src/pages/ProjectPage.tsx`; `src/pages/JournalDetail.tsx` |
| AdSense | [#6 — Exclude contact and legal pages from the ad allowlist](https://github.com/ankitsharma706/construct/issues/6) | Medium | `src/lib/adGuard.ts` |
| AdSense | [#7 — Implement consent management promised by the privacy page](https://github.com/ankitsharma706/construct/issues/7) | High | `src/pages/PrivacyPolicy.tsx`; `src/App.tsx` |
| SEO | [#8 — Remove duplicate AdSense account metadata](https://github.com/ankitsharma706/construct/issues/8) | Low | `index.html` |
| SEO | [#9 — Render route-specific content and metadata before client hydration](https://github.com/ankitsharma706/construct/issues/9) | High | `index.html`; `src/main.tsx`; `src/lib/seo.ts` |
| SEO | [#10 — Emit a route-specific canonical in the initial HTML](https://github.com/ankitsharma706/construct/issues/10) | High | `index.html`; `src/lib/seo.ts`; `vercel.json` |
| SEO | [#11 — Clear article metadata when navigating to non-article routes](https://github.com/ankitsharma706/construct/issues/11) | Medium | `src/lib/seo.ts` |
| SEO | [#12 — Avoid duplicating organization and website JSON-LD on every route](https://github.com/ankitsharma706/construct/issues/12) | Medium | `index.html`; `src/lib/seo.ts` |
| SEO | [#13 — Use content modification dates instead of the build date in sitemap entries](https://github.com/ankitsharma706/construct/issues/13) | Medium | `scripts/generate-seo.ts` |
| SEO | [#14 — Return an HTTP 404 for unmatched routes](https://github.com/ankitsharma706/construct/issues/14) | High | `server.ts`; `vercel.json`; `src/pages/NotFound.tsx` |
| Performance | [#15 — Use responsive image sources throughout production pages](https://github.com/ankitsharma706/construct/issues/15) | Medium | `src/components/OptimizedImage.tsx`; `src/pages/ProjectList.tsx`; `src/pages/Journal.tsx` |
| Performance | [#16 — Lazy-load below-the-fold portfolio card images](https://github.com/ankitsharma706/construct/issues/16) | Medium | `src/pages/ProjectList.tsx` |
| AdSense | [#17 — Prevent the article sidebar ad from sticking during scroll](https://github.com/ankitsharma706/construct/issues/17) | Medium | `src/pages/JournalDetail.tsx` |
| Performance | [#18 — Reserve the rendered height of responsive ad units](https://github.com/ankitsharma706/construct/issues/18) | Medium | `src/components/AdSenseSlot.tsx` |
| Performance | [#19 — Lazy-load the journal archive images](https://github.com/ankitsharma706/construct/issues/19) | Medium | `src/pages/Journal.tsx` |
| Performance | [#20 — Defer non-hero images on journal detail pages](https://github.com/ankitsharma706/construct/issues/20) | Medium | `src/pages/JournalDetail.tsx` |
| Performance | [#21 — Prioritize the homepage LCP hero image](https://github.com/ankitsharma706/construct/issues/21) | High | `src/components/Hero.tsx` |
| Performance | [#22 — Avoid autoplaying the large background video on every visit](https://github.com/ankitsharma706/construct/issues/22) | Medium | `src/pages/Home.tsx` |
| Performance | [#23 — Defer the Three.js viewer until a project model is needed](https://github.com/ankitsharma706/construct/issues/23) | Medium | `src/pages/ProjectPage.tsx`; `src/components/ModelViewer.tsx` |
| Performance | [#24 — Remove the render-blocking Google Fonts CSS import](https://github.com/ankitsharma706/construct/issues/24) | Medium | `src/index.css` |
| Security | [#25 — Add abuse protection to public Firestore lead submissions](https://github.com/ankitsharma706/construct/issues/25) | High | `firestore.rules` |
| Security | [#26 — Force newly submitted leads to start in the new state](https://github.com/ankitsharma706/construct/issues/26) | Medium | `firestore.rules` |
| Security | [#27 — Enforce an allowlist of Firestore document fields](https://github.com/ankitsharma706/construct/issues/27) | Medium | `firestore.rules` |
| Security | [#28 — Apply baseline security headers to all site responses](https://github.com/ankitsharma706/construct/issues/28) | High | `vercel.json`; `netlify.toml`; `server.ts` |
| Security | [#29 — Redact user identity data from Firestore error logs](https://github.com/ankitsharma706/construct/issues/29) | Medium | `src/services/firebaseService.ts` |
| Admin | [#30 — Implement the advertised create-entry workflow](https://github.com/ankitsharma706/construct/issues/30) | High | `src/pages/AdminDashboard.tsx` |
| Admin | [#31 — Wire project and journal edit actions to an edit flow](https://github.com/ankitsharma706/construct/issues/31) | High | `src/pages/AdminDashboard.tsx` |
| Admin | [#32 — Make the database bootstrap operation idempotent](https://github.com/ankitsharma706/construct/issues/32) | Medium | `src/pages/AdminDashboard.tsx`; `src/services/firebaseService.ts` |
| Architecture | [#33 — Publish Firestore-managed content on public project and journal routes](https://github.com/ankitsharma706/construct/issues/33) | High | `src/pages/ProjectList.tsx`; `src/pages/ProjectPage.tsx`; `src/pages/Journal.tsx`; `src/pages/JournalDetail.tsx`; `src/pages/AdminDashboard.tsx` |
| UX | [#34 — Show a recoverable error when contact submission fails](https://github.com/ankitsharma706/construct/issues/34) | Medium | `src/pages/Contact.tsx` |
| Code Quality | [#35 — Move the login redirect out of the render path](https://github.com/ankitsharma706/construct/issues/35) | Medium | `src/pages/Login.tsx` |
| TypeScript | [#36 — Replace any-typed admin state with Firebase and record types](https://github.com/ankitsharma706/construct/issues/36) | Low | `src/pages/AdminDashboard.tsx` |
| TypeScript | [#37 — Type journal service payloads instead of using any](https://github.com/ankitsharma706/construct/issues/37) | Medium | `src/services/firebaseService.ts` |
| Performance | [#38 — Remove the unused Google GenAI dependency](https://github.com/ankitsharma706/construct/issues/38) | Low | `package.json`; `vite.config.ts` |
| Accessibility | [#39 — Associate contact form labels with their controls](https://github.com/ankitsharma706/construct/issues/39) | Medium | `src/pages/Contact.tsx` |
| Accessibility | [#40 — Give the mobile navigation toggle an accessible name and state](https://github.com/ankitsharma706/construct/issues/40) | Medium | `src/components/Navbar.tsx` |
| Accessibility | [#41 — Add accessible names to project gallery controls](https://github.com/ankitsharma706/construct/issues/41) | Medium | `src/components/ProjectGallery.tsx` |
| Accessibility | [#42 — Keep gallery controls visible when focused by keyboard](https://github.com/ankitsharma706/construct/issues/42) | Medium | `src/components/ProjectGallery.tsx` |
| Accessibility | [#43 — Implement the fullscreen gallery as a keyboard-operable dialog](https://github.com/ankitsharma706/construct/issues/43) | Medium | `src/components/ProjectGallery.tsx` |
| Accessibility | [#44 — Name icon-only project and journal actions in the admin](https://github.com/ankitsharma706/construct/issues/44) | Medium | `src/pages/AdminDashboard.tsx` |
| Accessibility | [#45 — Add meaningful alternatives to admin record thumbnails](https://github.com/ankitsharma706/construct/issues/45) | Low | `src/pages/AdminDashboard.tsx` |
| Accessibility | [#46 — Raise contrast of small muted labels on light backgrounds](https://github.com/ankitsharma706/construct/issues/46) | Medium | `src/pages/About.tsx`; `src/pages/Contact.tsx`; `src/index.css` |
| Accessibility | [#47 — Respect prefers-reduced-motion for smooth scrolling and animations](https://github.com/ankitsharma706/construct/issues/47) | Medium | `src/components/SmoothScroll.tsx`; `src/index.css` |

## Prioritization Roadmap

### Phase 1 — AdSense and Security Blockers

1. Consolidate and route-gate AdSense loading; configure real slot IDs and remove ads from contact/legal routes.
2. Implement the consent flow described by the privacy policy and review the sticky sidebar placement and slot-size reservation.
3. Add abuse controls and a strict schema to public lead writes; force new submissions into the `new` state.
4. Apply baseline security headers and minimize identity data in client-side error logs.
5. Complete the admin create/edit workflows before presenting Firestore as the public publishing system.

### Phase 2 — SEO and Core Web Vitals

1. Return route-specific crawlable HTML and canonical/metadata; ensure unknown paths return HTTP 404.
2. Remove duplicate/stale structured and social metadata and publish accurate sitemap modification dates.
3. Use responsive image sources, lazy-load offscreen images, and prioritize the homepage LCP asset.
4. Reduce initial work from autoplay video, the 3D viewer, external font loading, and variable-size ad slots.

### Phase 3 — Code Quality and Accessibility

1. Make database bootstrap idempotent, type the journal/admin data boundaries, and remove unused dependencies.
2. Surface recoverable contact errors and move navigation side effects out of render.
3. Associate form labels, name icon-only controls, provide keyboard-operable gallery/dialog behavior, and add image alternatives.
4. Meet text-contrast requirements and honor reduced-motion preferences.

---

This report documents code-level evidence and remediation criteria; it does not claim that any specific Google AdSense application or search ranking outcome is guaranteed.
