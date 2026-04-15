# AMSH Institutional Portal - Production Deployment Guide

This guide is optimized for deployment via **Plesk** or **cPanel** control panels where terminal (SSH) access may be limited.

## 📦 Package Contents
1.  `frontend/`: The Next.js standalone application.
2.  `backend/`: The Express API and Database layer.
3.  `AMSH_FIX_DATABASE.sql`: Crucial SQL fix for the staff directory.

---

## 🚀 Step 1: Backend Deployment (API)
1.  Upload the `backend/` folder to your server (usually your API subdomain's root).
2.  In your **Plesk/cPanel Node.js Selector**:
    *   Set **Document Root** to the `public` folder (or just `/` if not using Nginx static serving).
    *   Set **Application Root** to the `backend` folder.
    *   Set **Application Startup File** to `dist/index.js`.
3.  **Critical - Database Setup**:
    *   Find the **"NPM Install"** button in your control panel and click it.
    *   This will automatically install dependencies and generate the **Prisma Client** on the server.
4.  **Database Connection**:
    *   If you haven't yet, create a MySQL database in your panel.
    *   Open the `.env` file in the `backend/` folder and update `DATABASE_URL` with your production credentials.
    *   Import `AMSH_FIX_DATABASE.sql` using **phpMyAdmin**.

---

## 🌐 Step 2: Frontend Deployment (Website)
1.  Upload the `frontend/` folder to your main domain's root.
2.  In your **Node.js Selector**:
    *   Set **Application Root** to the `frontend` folder.
    *   Set **Application Startup File** to `server.js`.
3.  Click **"NPM Install"** (if available) or simply restart the app.
    *   The frontend is "Standalone," meaning it has most dependencies already bundled.

---

## 🛠 Troubleshooting Errors

### 502 Bad Gateway
*   This usually means the app is still starting or crashed.
*   Check the **Node.js Logs** in your panel.
*   Ensure `DATABASE_URL` and `JWT_SECRET` are set in the `.env` file.

### 404 Image Not Found
*   Always request images through the main domain (e.g., `amsh.gov.et/uploads/...`).
*   The system now tunnels these requests automatically to keep them working even through firewalls.

### CORS Errors
*   This package is now configured to use a **Relative Proxy**. 
*   Ensure your `frontend/.env.production` has `NEXT_PUBLIC_API_URL=/api`. (The provided package already has this).

---
**Institutional Support**: If you encounter configuration mismatches, refer to the `AMSH_FIX_DATABASE.sql` script for table structure corrections.
