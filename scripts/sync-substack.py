#!/usr/bin/env python3
"""Refresh data/substack-fallback.json from the live hermanify Substack archive.

Public profile: https://substack.com/@hermanify
Publication API/feed: https://hermanify.substack.com
"""

from __future__ import annotations

import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "data" / "substack-fallback.json"
PUBLICATION = "hermanify"
PROFILE = "https://substack.com/@hermanify"


def fetch_json(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.loads(response.read().decode("utf-8"))


def main() -> None:
    posts = []
    offset = 0
    while True:
        batch = fetch_json(
            f"https://{PUBLICATION}.substack.com/api/v1/archive?sort=new&limit=50&offset={offset}"
        )
        if not isinstance(batch, list) or not batch:
            break
        posts.extend(batch)
        if len(batch) < 50:
            break
        offset += 50

    slim = []
    for post in posts:
        slim.append(
            {
                "id": post.get("id"),
                "title": (post.get("title") or "").strip(),
                "subtitle": (post.get("subtitle") or post.get("description") or "").strip(),
                "slug": post.get("slug"),
                "post_date": post.get("post_date"),
                "canonical_url": post.get("canonical_url")
                or f"https://{PUBLICATION}.substack.com/p/{post.get('slug')}",
                "cover_image": post.get("cover_image"),
                "type": post.get("type") or "newsletter",
                "wordcount": post.get("wordcount"),
            }
        )

    OUT.parent.mkdir(exist_ok=True)
    payload = {
        "publication": PUBLICATION,
        "profile": PROFILE,
        "url": f"https://{PUBLICATION}.substack.com",
        "feed": f"https://{PUBLICATION}.substack.com/feed",
        "synced_at": __import__("datetime").date.today().isoformat(),
        "posts": slim,
    }
    OUT.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {len(slim)} posts to {OUT}")


if __name__ == "__main__":
    main()
