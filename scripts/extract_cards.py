"""Extrahiert die Einzelkarten aus den Quell-PDFs nach assets/decks/.

Einmalig auszuführen (aus dem Projektordner):
    python3 -m venv .venv && .venv/bin/pip install pymupdf
    .venv/bin/python scripts/extract_cards.py

Überschreibt gleichnamige Karten-Dateien, lässt andere Dateien unberührt.
deck.json wird nur angelegt, wenn es noch fehlt.
"""
import json
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "source"
OUT = ROOT / "assets" / "decks"
DPI = 300
CARDS_PER_PAGE = 12

OPEN_NAMES = [
    "nimm", "geh", "benutze", "oeffne", "schliesse", "gib",
    "sprich-mit", "schau-an", "druecke", "ziehe", "hoer-zu", "denk-nach",
]

DECKS = {
    "kids": {
        "pdf": "Memory-Karten-Kids.pdf",
        "draw_pages": 7,
        "open_pages": 0,
        "name": "Kinder",
        "description": "Bunte Bilder von Booten, Tieren und Schätzen – erzähle, was passiert.",
    },
    "erwachsene": {
        "pdf": "Memory-Karten-Erwachsene.pdf",
        "draw_pages": 4,
        "open_pages": 1,
        "name": "Erwachsene",
        "description": "Situationen und Aktionen für eigene Geschichten.",
    },
}


def card_rects(page):
    """Rechtecke der 12 Karten einer Seite, zeilenweise von links oben."""
    rects = [
        page.get_image_rects(img[0])[0]
        for img in page.get_images(full=True)
        if abs(img[2] - img[3]) <= 4 and img[2] >= 700
    ]
    if len(rects) != CARDS_PER_PAGE:
        raise SystemExit(
            f"Seite {page.number + 1}: {len(rects)} statt {CARDS_PER_PAGE} Karten gefunden"
        )
    return sorted(rects, key=lambda r: (round(r.y0 / 50), r.x0))


def save(page, rect, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    page.get_pixmap(dpi=DPI, clip=rect, alpha=True).save(str(target))


def extract_deck(deck_id, cfg):
    doc = pymupdf.open(SOURCE / cfg["pdf"])
    expected_pages = cfg["draw_pages"] + cfg["open_pages"] + 1
    if len(doc) != expected_pages:
        raise SystemExit(f"{cfg['pdf']}: {len(doc)} Seiten, erwartet {expected_pages}")

    deck_dir = OUT / deck_id
    n = 0
    for i in range(cfg["draw_pages"]):
        page = doc[i]
        for rect in card_rects(page):
            n += 1
            save(page, rect, deck_dir / "cards" / f"{n:03d}.png")

    if cfg["open_pages"]:
        page = doc[cfg["draw_pages"]]
        for i, rect in enumerate(card_rects(page)):
            save(page, rect, deck_dir / "open" / f"{i + 1:02d}-{OPEN_NAMES[i]}.png")

    back_page = doc[len(doc) - 1]
    save(back_page, card_rects(back_page)[0], deck_dir / "back.png")

    meta = deck_dir / "deck.json"
    if not meta.exists():
        meta.write_text(
            json.dumps(
                {"name": cfg["name"], "description": cfg["description"]},
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
    print(f"{deck_id}: {n} Karten im Stapel, Rücken gespeichert")


if __name__ == "__main__":
    for deck_id, cfg in DECKS.items():
        extract_deck(deck_id, cfg)
