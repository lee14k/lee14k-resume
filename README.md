# Kailee Hamre — personal site

Dested-clean layout with Kailee Web Dev prototype DNA (palette, role stack, marquees, stickers). React + TypeScript frontend, FastAPI contributions API, Railway-ready Docker image.

## Local development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite proxies `/api` → `http://127.0.0.1:8000`.

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export GITHUB_TOKEN=ghp_xxx   # classic or fine-grained with read access
export GITHUB_USERNAME=lee14k
export CONTRIBUTION_YEARS=5
uvicorn app.main:app --reload --port 8000
```

Or from repo root with the package path:

```bash
cd backend
source .venv/bin/activate
PYTHONPATH=. uvicorn app.main:app --reload --port 8000
```

> Note: the Docker image imports `backend.app.main`. Locally, run from `backend/` with `app.main:app`.

### Content edits

Typed modules in `frontend/src/content/`:

- `profile.ts` — name, roles, stats, links
- `lenses.ts` — about facets
- `path.ts` — timeline (roles / education / pivots)
- `projects.ts` — project grid

Resume PDF: `frontend/public/Kailee_Hamre_Resume.pdf`

## Railway deploy

1. Create a Railway project from this repo.
2. Set variables: `GITHUB_TOKEN`, `GITHUB_USERNAME=lee14k`, `CONTRIBUTION_YEARS=5`.
3. Deploy the root `Dockerfile` (see `railway.toml`).
4. Health check: `/api/health`.

Single service serves the Vite build and `/api/contributions`.

## GitHub Pages fallback (later)

For static-only hosting, add a GitHub Action that writes `contributions.json` into `frontend/public/` on a schedule and build the Vite app without the API. Not wired in v1.

## Stack

- Frontend: Vite, React 19, TypeScript, CSS Modules
- Backend: FastAPI, httpx, 24h file cache
- Fonts: Fredoka + DM Sans
