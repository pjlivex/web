# Deploy the Campus Vibe frontend to Vercel

## Important
Vercel hosts this React/Vite frontend. It does **not** run the Spring Boot + MySQL backend from this ZIP. Deploy the backend separately (for example to a Java-capable host) and provision a MySQL database.

## Deploy
1. Extract this frontend folder (or use this frontend-only ZIP).
2. In Vercel, create a project from the frontend folder/repository. Set **Root Directory** to `frontend` if deploying the full repository. If you upload this frontend-only project, use the project root.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`. Install command: `npm install`.
4. In Vercel → Settings → Environment Variables, add `VITE_API_URL` with the backend base URL, for example `https://your-backend.example.com` (no trailing `/api`).
5. Redeploy after setting the environment variable.

Do not set `VITE_API_URL` to `localhost` for a public deployment; visitors' browsers would try to connect to their own computers. The backend must allow requests from your Vercel domain via CORS.

Local development: copy `.env.example` to `.env` and set `VITE_API_URL=http://localhost:8080`, then run `npm install` and `npm run dev`.
