from __future__ import annotations

import os
import re
import time
from collections import defaultdict, deque

import httpx
from pydantic import BaseModel, Field, field_validator

RESEND_URL = "https://api.resend.com/emails"
EMAIL_PATTERN = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

RATE_LIMIT_COUNT = 5
RATE_LIMIT_WINDOW_SECONDS = 60 * 60
_recent_by_ip: dict[str, deque[float]] = defaultdict(deque)


class ContactMessage(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: str = Field(min_length=3, max_length=254)
    message: str = Field(min_length=1, max_length=5000)
    # Honeypot: hidden from people, filled in by naive bots.
    company: str = ""

    @field_validator("name", "message", mode="before")
    @classmethod
    def strip(cls, value: object) -> object:
        return value.strip() if isinstance(value, str) else value

    @field_validator("email", mode="before")
    @classmethod
    def valid_email(cls, value: object) -> object:
        if isinstance(value, str):
            value = value.strip()
            if not EMAIL_PATTERN.match(value):
                raise ValueError("Enter a valid email address")
        return value


class ContactNotConfigured(Exception):
    pass


def is_rate_limited(ip: str) -> bool:
    now = time.monotonic()
    recent = _recent_by_ip[ip]
    while recent and now - recent[0] > RATE_LIMIT_WINDOW_SECONDS:
        recent.popleft()
    if len(recent) >= RATE_LIMIT_COUNT:
        return True
    recent.append(now)
    return False


async def send_contact_email(msg: ContactMessage) -> None:
    api_key = os.environ.get("RESEND_API_KEY", "").strip()
    to_email = os.environ.get("CONTACT_TO_EMAIL", "").strip()
    from_email = os.environ.get("CONTACT_FROM_EMAIL", "").strip()
    if not (api_key and to_email and from_email):
        raise ContactNotConfigured

    payload = {
        "from": from_email,
        "to": [to_email],
        "reply_to": msg.email,
        "subject": f"Portfolio note from {msg.name}",
        "text": f"From: {msg.name} <{msg.email}>\n\n{msg.message}",
    }
    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.post(
            RESEND_URL,
            headers={"Authorization": f"Bearer {api_key}"},
            json=payload,
        )
        response.raise_for_status()
