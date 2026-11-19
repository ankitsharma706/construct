# CONSTRUCT | Structural Engineering & Architectural Design

![CONSTRUCT Header](https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000)

## THE VISION
**CONSTRUCT** is a high-fidelity digital infrastructure platform designed for advanced structural engineering and architectural excellence. This platform serves as both a high-fidelity portfolio and a technical Command Center for real-time project management and engineering deep-dives.

## ARCHITECTURE
The system is built on a **Local-First / Cloud-Sync Hybrid** architecture, ensuring zero-latency performance while maintaining robust administrative capabilities.

### CORE TECHNOLOGY STACK
*   **FRAMEWORK**: [Vite](https://vitejs.dev/) + [React 18](https://reactjs.org/)
*   **STYLING**: Vanilla CSS + [Motion](https://motion.dev/) (Advanced Framer-Motion animations)
*   **BACKEND**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
*   **VISUALS**: [Model-Viewer](https://modelviewer.dev/) (3D Structural Interaction)
*   **ICONS**: [Lucide-React](https://lucide.dev/)

## KEY FEATURES
*   **ARCHIVAL HYDRATION**: The platform prioritizes high-fidelity local constants for instant, high-performance rendering of the engineering portfolio.
*   **CONTROL TOWER**: A secure administrative dashboard with identity-based "Personnel Mapping," allowing authorized engineers to manage their assigned assets.
*   **IMMERISVE NARRATIVES**: Deep-dive journalism integrated with technical briefs and performance metrics for every case study.
*   **IDENTITY VAULT**: Master Clearance protocol for absolute administrative access, bypassing database latency for authorized personnel.

## SETUP & DEPLOYMENT

### PREREQUISITES
*   Node.js (v18+)
*   NPM or Yarn
*   Firebase Project

### LOCAL INITIALIZATION
1.  **Clone the infrastructure**:
    ```bash
    git clone [repository-url]
    cd construct-main
    ```

2.  **Synchronize dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Copy `.env.example` to `.env.local` and populate the Firebase settings. Set the canonical production origin in `VITE_SITE_URL` before building:
    ```env
    VITE_SITE_URL=https://your-production-domain.example
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4.  **Execute Development Environment**:
    ```bash
    npm run dev
    ```

### ADS, CONSENT, AND PUBLIC FORM SECURITY

* Create and publish a Google Funding Choices message in AdSense Privacy & messaging. Copy the exact generated script URL to `VITE_FUNDING_CHOICES_SCRIPT_URL`. The site waits for the CMP's IAB TCF consent signal before loading AdSense; if the CMP URL is not configured or does not load, ads stay disabled. Consent preferences can be reopened from the footer and Privacy Policy.
* Configure each real AdSense ad-unit ID in the corresponding `VITE_ADSENSE_SLOT_*` setting. Empty slot settings intentionally render no ad unit; descriptive placement keys are never sent as production slot IDs.
* Register the website with Firebase App Check using reCAPTCHA v3, set `VITE_FIREBASE_APPCHECK_SITE_KEY`, and enable App Check enforcement for Cloud Firestore in the Firebase console. Public lead submission fails closed until the client key is configured; console enforcement is also required to reject forged direct API requests. Deploy `firestore.rules` with the Firebase CLI.
* `npm run build` prerenders route-specific metadata and content for checked-in records and published Firestore records (when the Firebase project ID and API key are available at build time). Rebuild and redeploy after publishing Firestore content so new detail URLs are prerendered on static hosts. Unknown URLs return a 404; `/admin` and `/login` remain app-shell routes.

## ADMINISTRATIVE PROTOCOL
To grant **Master Clearance** to a new email address, update the `MASTER_EMAILS` array in `src/context/AuthContext.tsx`.

```tsx

```

## LICENSE
**CONSTRUCT** Proprietary Structural Engineering Logic. All designs and engineering briefs are property of Construct Global Group.

---
*Engineering for the ages.*
