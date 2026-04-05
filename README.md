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
    Create a `.env` file in the root directory and populate it with your Firebase credentials:
    ```env
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

## ADMINISTRATIVE PROTOCOL
To grant **Master Clearance** to a new email address, update the `MASTER_EMAILS` array in `src/context/AuthContext.tsx`.

```tsx

```

## LICENSE
**CONSTRUCT** Proprietary Structural Engineering Logic. All designs and engineering briefs are property of Construct Global Group.

---
*Engineering for the ages.*
