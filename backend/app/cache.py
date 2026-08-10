from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Any

CACHE_DIR = Path(__file__).resolve().parent.parent / "cache"
CACHE_FILE = CACHE_DIR / "contributions.json"
TTL_SECONDS = 60 * 60 * 24


def read_cache() -> dict[str, Any] | None:
    if not CACHE_FILE.exists():
        return None
    try:
        payload = json.loads(CACHE_FILE.read_text())
    except (json.JSONDecodeError, OSError):
        return None
    synced_at = payload.get("syncedAt")
    if not isinstance(synced_at, (int, float)):
        return None
    if time.time() - synced_at > TTL_SECONDS:
        return None
    return payload


def write_cache(payload: dict[str, Any]) -> None:
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    CACHE_FILE.write_text(json.dumps(payload))
