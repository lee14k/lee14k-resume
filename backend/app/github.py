from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

import httpx

GRAPHQL_URL = "https://api.github.com/graphql"

CONTRIBUTIONS_QUERY = """
query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
"""


async def fetch_year(
    client: httpx.AsyncClient,
    login: str,
    year: int,
) -> list[dict[str, Any]]:
    from_dt = datetime(year, 1, 1, tzinfo=timezone.utc)
    to_dt = datetime(year, 12, 31, 23, 59, 59, tzinfo=timezone.utc)
    response = await client.post(
        GRAPHQL_URL,
        json={
            "query": CONTRIBUTIONS_QUERY,
            "variables": {
                "login": login,
                "from": from_dt.isoformat().replace("+00:00", "Z"),
                "to": to_dt.isoformat().replace("+00:00", "Z"),
            },
        },
    )
    response.raise_for_status()
    body = response.json()
    if body.get("errors"):
        raise RuntimeError(body["errors"][0].get("message", "GitHub GraphQL error"))

    user = body.get("data", {}).get("user")
    if not user:
        raise RuntimeError(f"GitHub user '{login}' not found")

    weeks = user["contributionsCollection"]["contributionCalendar"]["weeks"]
    days: list[dict[str, Any]] = []
    for week in weeks:
        for day in week["contributionDays"]:
            if day["date"].startswith(str(year)):
                days.append(
                    {
                        "date": day["date"],
                        "count": day["contributionCount"],
                    }
                )
    return days


async def fetch_contributions(
    token: str,
    login: str,
    years: int,
) -> dict[str, Any]:
    current_year = datetime.now(timezone.utc).year
    year_list = list(range(current_year - years + 1, current_year + 1))
    days_by_date: dict[str, int] = {}

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(headers=headers, timeout=30.0) as client:
        for year in year_list:
            for day in await fetch_year(client, login, year):
                days_by_date[day["date"]] = day["count"]

    days = [
        {"date": date, "count": count}
        for date, count in sorted(days_by_date.items())
    ]
    total = sum(d["count"] for d in days)
    days_with_push = sum(1 for d in days if d["count"] > 0)

    return {
        "username": login,
        "days": days,
        "total": total,
        "daysWithPush": days_with_push,
        "years": years,
    }
