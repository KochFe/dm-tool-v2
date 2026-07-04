# DM Co-Pilot V2

A Dungeon Master assistant built around the session lifecycle: prep a session, run it, log it.

- `backend/` — FastAPI + SQLAlchemy (async) + Alembic + PostgreSQL
- `frontend/` — Next.js 15 + TypeScript + Tailwind, English/German, light/dark
- Local dev: `docker compose up`
- Deploy: push to `main` → CI → `https://dmv2.kochfe.de`

Live at https://dmv2.kochfe.de.
