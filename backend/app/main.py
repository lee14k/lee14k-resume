from __future__ import annotations

import os
import time
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .cache import read_cache, write_cache
from .contact import ContactMessage, ContactNotConfigured, is_rate_limited, send_contact_email
from .github import fetch_contributions

app = FastAPI(title="lee14k portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

STATIC_DIR = Path(os.environ.get("STATIC_DIR", Path(__file__).resolve().parents[2] / "frontend" / "dist"))


@app.get("/api/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/contributions")
async def contributions() -> dict:
    cached = read_cache()
    if cached is not None:
        return cached

    token = os.environ.get("GITHUB_TOKEN", "").strip()
    login = os.environ.get("GITHUB_USERNAME", "lee14k").strip() or "lee14k"
    years = int(os.environ.get("CONTRIBUTION_YEARS", "5"))

    if not token:
        raise HTTPException(
            status_code=503,
            detail="GITHUB_TOKEN is not configured",
        )

    try:
        data = await fetch_contributions(token=token, login=login, years=years)
    except Exception as exc:  # noqa: BLE001 — surface as API error for v1
        raise HTTPException(status_code=502, detail=str(exc)) from exc

    payload = {**data, "syncedAt": int(time.time())}
    write_cache(payload)
    return payload


@app.post("/api/contact")
async def contact(msg: ContactMessage, request: Request) -> dict[str, str]:
    if msg.company:
        return {"status": "sent"}

    # Railway's proxy puts the real client first in X-Forwarded-For.
    forwarded = request.headers.get("x-forwarded-for", "")
    ip = forwarded.split(",")[0].strip() or (request.client.host if request.client else "unknown")
    if is_rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many messages. Try again later.")

    try:
        await send_contact_email(msg)
    except ContactNotConfigured as exc:
        raise HTTPException(status_code=503, detail="Contact form is not configured") from exc
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(status_code=502, detail="Could not send message") from exc

    return {"status": "sent"}


if STATIC_DIR.exists():
    assets_dir = STATIC_DIR / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}")
    async def spa(full_path: str) -> FileResponse:
        candidate = STATIC_DIR / full_path
        if full_path and candidate.is_file():
            return FileResponse(candidate)
        return FileResponse(STATIC_DIR / "index.html")
