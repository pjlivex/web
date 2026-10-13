# CAMPUS VIBE 2026 — College Festival Management System

This repository contains a React/Vite frontend and a Spring Boot/MySQL backend.

## Quickest way to preview / deploy the UI

The frontend includes a **demo mode** so the UI can be used without a deployed API. It stores demo accounts, registrations, events, and approval statuses in that browser's localStorage. This is useful for a college demo, but it is not shared database storage.

1. Upload the extracted repository to GitHub.
2. In Vercel, import the GitHub repository.
3. Set **Root Directory** to `frontend`.
4. Framework preset: **Vite**; Build command: `npm run build`; Output directory: `dist`.
5. Leave `VITE_API_URL` unset for demo mode. Redeploy after changing environment variables.

Demo logins (passwords are case-sensitive):

| Role | Email | Password |
|---|---|---|
| Admin | admin@campusvibe.com | Admin@123 |
| Student | student@campusvibe.com | Student@123 |
| Coordinator | coordinator@campusvibe.com | Coord@123 |
| Judge | judge@campusvibe.com | Judge@123 |

## Run frontend locally

```bash
cd frontend
npm install
npm run dev
```

## Use a real backend

Deploy the Spring Boot app and MySQL database to a Java-capable host. Set `VITE_API_URL` in Vercel to the deployed backend origin, without `/api` at the end, e.g. `https://your-api-host.example.com`. Ensure Spring Security/CORS permits the Vercel domain and API routes match `frontend/src/services/api.js`. Redeploy the frontend.

## Backend

The `src/` directory contains the Spring Boot API project and `database.sql` contains database setup. Configure database credentials through environment variables rather than committing production secrets. Run with Java/Maven using the instructions in `src/main/resources/application.properties` and the Maven wrapper.

## Important limits

Demo mode data is local to each browser and can be reset by clearing site data. A Vercel static deployment does not run Spring Boot or MySQL. For multi-user persistent functionality, deploy the backend and database separately and configure `VITE_API_URL`. Review and test all API endpoints before production use.
