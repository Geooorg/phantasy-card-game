# Fantasie-Game Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine Web-App, in der man ein Deck (Kinder oder Erwachsene) wählt, 4 Startkarten bekommt und per Klick weitere Karten vom Stapel aufdeckt, um sich Geschichten auszudenken.

**Architecture:** Vite + TypeScript ohne UI-Framework. Reine Spiellogik (`src/game/`) und Deck-Einlesen (`src/decks/`) sind von der Oberfläche (`src/ui/`) getrennt und per Vitest getestet. Decks sind Ordner unter `assets/decks/<id>/`; Vite findet Karten per `import.meta.glob`, neue Dateien erscheinen ohne Codeänderung.

**Tech Stack:** Vite, TypeScript (strict), Vitest, Python 3 + PyMuPDF (nur einmalig zur Kartenextraktion).

## Global Constraints

- Spezifikation: `docs/superpowers/specs/2026-10-02-fantasie-game-design.md`
- UI-Texte auf **Deutsch**, `<html lang="de">`.
- Spielablauf: Deckauswahl → mischen → **4 Startkarten offen** → Klick auf Stapel legt die nächste Karte **rechts neben die bisherigen**.
- Bei leerem Stapel: Hinweis „Keine Karten mehr“, „Neu mischen“ wird hervorgehoben.
- Erwachsenen-Deck: 12 Aktionskarten (`open/`) sind **dauerhaft offen** und werden **nicht** gezogen.
- Decks sind Ordner: `assets/decks/<id>/{deck.json, back.png, cards/*.png, open/*.png (optional)}`. Neue Karten/Decks dürfen **keine Codeänderung** erfordern.
- Weniger als 4 Karten im Stapel: Start mit allen vorhandenen.
- Fehlendes `deck.json` / `back.png` / leeres `cards/`: klare deutsche Fehlermeldung mit Deck-Id und Dateiname.
- Kein Speichern von Spielständen, kein Mehrspieler, keine Töne, keine Metadaten pro Karte (YAGNI).
- Commit-Messages enden mit dem Trailer `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` (zweites `-m`).
- Arbeitsordner: `/Users/georg/Projekte/privat/phantasy-game` (Branch `main`). Die PDFs liegen in `source/` und werden **nicht** committet.

## Datei-Übersicht

| Datei | Verantwortung |
|---|---|
| `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore` | Projekt-Setup |
| `scripts/extract_cards.py` | Einmaliger Import: PDFs → einzelne PNGs + `deck.json` |
| `assets/decks/**` | Karten (Daten, keine Logik) |
| `src/decks/types.ts` | Typen `Card`, `Deck` |
| `src/decks/buildDecks.ts` | Reine Funktion: Glob-Ergebnisse → `Deck[]`, validiert |
| `src/decks/loader.ts` | `import.meta.glob` + `loadDecks()` |
| `src/game/shuffle.ts` | Fisher-Yates mit injizierbarem Zufall |
| `src/game/game.ts` | `newGame`, `draw` |
| `src/ui/dom.ts` | Mini-Helfer `h()` zum Bauen von DOM-Elementen |
| `src/ui/cardView.ts` | Karten-Element mit Flip |
| `src/ui/zoom.ts` | Großansicht einer Karte |
| `src/ui/selectScreen.ts` | Deckauswahl |
| `src/ui/tableScreen.ts` | Spieltisch (Stapel, Hand, Aktionsleiste) |
| `src/main.ts` | Start, Fehleranzeige, Wechsel der Screens |
| `src/styles.css` | Gestaltung |
| `README.md` | Bedienung, neue Karten/Decks hinzufügen |

---

### Task 1: Projekt-Setup

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `.gitignore`, `src/main.ts`

**Interfaces:**
- Produces: npm-Skripte `dev`, `build`, `preview`, `test`, `typecheck`; Vite-Root = Projektordner (damit `/assets/...` in `import.meta.glob` funktioniert).

- [ ] **Step 1: `package.json` anlegen**

```json
{
  "name": "fantasie-game",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  }
}
```

- [ ] **Step 2: Abhängigkeiten installieren**

Run: `npm install -D vite typescript vitest`
Expected: `package.json` enthält jetzt `devDependencies` mit den drei Paketen, `package-lock.json` und `node_modules/` existieren.

- [ ] **Step 3: `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  },
  "include": ["src", "vite.config.ts"]
}
```

- [ ] **Step 4: `vite.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: './',
  build: { assetsInlineLimit: 0 },
  test: { include: ['src/**/*.test.ts'] },
});
```

- [ ] **Step 5: `index.html`**

```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Fantasie-Game</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 6: `.gitignore`**

```
node_modules
dist
.venv
source/
.DS_Store
*.local
```

- [ ] **Step 7: Platzhalter `src/main.ts`** (wird in Task 6 ersetzt)

```ts
const root = document.getElementById('app');
if (root) root.textContent = 'Fantasie-Game';
```

- [ ] **Step 8: Build prüfen**

Run: `npm run build`
Expected: `tsc` ohne Fehler, Vite meldet `✓ built in …` und legt `dist/` an.

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html .gitignore src/main.ts
git commit -m "chore: Vite + TypeScript + Vitest Grundgerüst" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Karten aus den PDFs extrahieren

**Files:**
- Create: `scripts/extract_cards.py`
- Create (generiert): `assets/decks/kids/{deck.json,back.png,cards/001.png … 084.png}`
- Create (generiert): `assets/decks/erwachsene/{deck.json,back.png,cards/001.png … 048.png,open/01-nimm.png … 12-denk-nach.png}`

**Interfaces:**
- Produces: die Deck-Ordnerstruktur aus den Global Constraints. Kartendateien heißen `NNN.png` (Stapel) bzw. `NN-name.png` (open); `back.png` ist der Kompass-Rücken.

Hintergrund (bereits geprüft): Jede PDF-Seite hat 12 Karten (3×4), jede als Bild-Paar (Zeichnung + Rahmen) mit einem quadratischen Rahmen-Bild von ca. 709×712 px. Wir rendern pro Karte den Bereich dieses Rahmens mit 300 dpi und Transparenz (abgerundete Ecken bleiben durchsichtig). Seitenaufbau:
- `Memory-Karten-Kids.pdf` (8 Seiten): Seiten 1–7 = 84 Karten, Seite 8 = 12× Rücken.
- `Memory-Karten-Erwachsene.pdf` (6 Seiten): Seiten 1–4 = 48 Situationen, Seite 5 = 12 Aktionskarten, Seite 6 = 12× Rücken.
- Reihenfolge der Aktionen (zeilenweise): Nimm, Geh, Benutze, Öffne, Schliesse, Gib, Sprich mit, Schau an, Drücke, Ziehe, Hör zu, Denk nach.

- [ ] **Step 1: Skript schreiben** (`scripts/extract_cards.py`)

```python
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
```

- [ ] **Step 2: Umgebung einrichten und Skript ausführen**

Run:
```bash
python3 -m venv .venv && .venv/bin/pip install pymupdf && .venv/bin/python scripts/extract_cards.py
```
Expected Ausgabe:
```
kids: 84 Karten im Stapel, Rücken gespeichert
erwachsene: 48 Karten im Stapel, Rücken gespeichert
```

- [ ] **Step 3: Anzahl und Größe prüfen**

Run:
```bash
for d in kids erwachsene; do echo "$d: $(ls assets/decks/$d/cards | wc -l) cards, $(ls assets/decks/$d/open 2>/dev/null | wc -l) open"; done; file assets/decks/kids/back.png assets/decks/erwachsene/cards/001.png
```
Expected:
```
kids: 84 cards, 0 open
erwachsene: 48 cards, 12 open
```
und für beide `file`-Zeilen `PNG image data, 708 x 71x, 8-bit/color RGBA`.

- [ ] **Step 4: Inhalt stichprobenartig ansehen**

Mit dem Read-Tool diese Dateien öffnen und prüfen:
- `assets/decks/erwachsene/cards/001.png` zeigt einen Kamin
- `assets/decks/erwachsene/open/01-nimm.png` trägt die Beschriftung „NIMM“, `open/04-oeffne.png` „ÖFFNE“, `open/12-denk-nach.png` „DENK NACH“
- `assets/decks/kids/cards/001.png` zeigt ein Segelboot
- `assets/decks/kids/back.png` zeigt den Kompass

Falls eine Zuordnung nicht stimmt: Reihenfolge-Sortierung in `card_rects` prüfen, nicht Dateien umbenennen.

- [ ] **Step 5: Commit**

```bash
git add scripts/extract_cards.py assets
git commit -m "feat: Karten aus den PDFs als Einzelbilder extrahiert" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Spiellogik (TDD)

**Files:**
- Create: `src/decks/types.ts`, `src/game/shuffle.ts`, `src/game/game.ts`
- Test: `src/game/shuffle.test.ts`, `src/game/game.test.ts`

**Interfaces:**
- Produces:
  - `interface Card { id: string; image: string }`
  - `interface Deck { id: string; name: string; description: string; back: string; cards: Card[]; open: Card[] }`
  - `type Rng = () => number` (Wert in `[0, 1)`)
  - `shuffle<T>(items: readonly T[], rng?: Rng): T[]` – liefert neue Liste, ändert die Eingabe nicht
  - `const HAND_SIZE = 4`
  - `interface Game { readonly pile: readonly Card[]; readonly hand: readonly Card[] }`
  - `newGame(deck: Pick<Deck, 'cards'>, rng?: Rng): Game`
  - `draw(game: Game): Game` – oberste Karte des Stapels rechts an die Hand; bei leerem Stapel dasselbe Objekt zurück

- [ ] **Step 1: Typen anlegen** (`src/decks/types.ts`)

```ts
export interface Card {
  id: string;
  image: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  back: string;
  cards: Card[];
  open: Card[];
}
```

- [ ] **Step 2: Failing Test für `shuffle`** (`src/game/shuffle.test.ts`)

```ts
import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('liefert alle Elemente genau einmal', () => {
    const result = shuffle([1, 2, 3, 4, 5, 6]);
    expect([...result].sort()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('verändert die Eingabe nicht', () => {
    const input = [1, 2, 3, 4];
    shuffle(input, () => 0);
    expect(input).toEqual([1, 2, 3, 4]);
  });

  it('lässt die Reihenfolge unverändert, wenn der Zufall immer das letzte Element wählt', () => {
    expect(shuffle([1, 2, 3, 4], () => 0.999)).toEqual([1, 2, 3, 4]);
  });

  it('ist bei festem Zufall (immer 0) vorhersagbar', () => {
    expect(shuffle([1, 2, 3, 4], () => 0)).toEqual([2, 3, 4, 1]);
  });

  it('kommt mit leerer und einelementiger Liste zurecht', () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(['a'])).toEqual(['a']);
  });
});
```

- [ ] **Step 3: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run src/game/shuffle.test.ts`
Expected: FAIL – `Failed to resolve import "./shuffle"`.

- [ ] **Step 4: `shuffle` implementieren** (`src/game/shuffle.ts`)

```ts
export type Rng = () => number;

/** Fisher-Yates. Gibt eine neue, gemischte Liste zurück. */
export function shuffle<T>(items: readonly T[], rng: Rng = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
```

- [ ] **Step 5: Test erneut laufen lassen, muss bestehen**

Run: `npx vitest run src/game/shuffle.test.ts`
Expected: PASS (5 Tests).

- [ ] **Step 6: Failing Test für `newGame` und `draw`** (`src/game/game.test.ts`)

```ts
import { describe, expect, it } from 'vitest';
import type { Card } from '../decks/types';
import { draw, HAND_SIZE, newGame } from './game';

const makeCards = (n: number): Card[] =>
  Array.from({ length: n }, (_, i) => ({ id: `c${i + 1}`, image: `/c${i + 1}.png` }));

const ids = (cards: readonly Card[]) => cards.map((c) => c.id);

// rng nahe 1 wählt immer das letzte Element -> Reihenfolge bleibt wie im Deck
const noShuffle = () => 0.999;

describe('newGame', () => {
  it('gibt 4 Startkarten aus und lässt den Rest im Stapel', () => {
    const game = newGame({ cards: makeCards(10) }, noShuffle);
    expect(HAND_SIZE).toBe(4);
    expect(ids(game.hand)).toEqual(['c1', 'c2', 'c3', 'c4']);
    expect(ids(game.pile)).toEqual(['c5', 'c6', 'c7', 'c8', 'c9', 'c10']);
  });

  it('mischt das Deck', () => {
    const game = newGame({ cards: makeCards(5) }, () => 0);
    expect(ids(game.hand)).toEqual(['c2', 'c3', 'c4', 'c5']);
    expect(ids(game.pile)).toEqual(['c1']);
  });

  it('startet mit allen Karten, wenn das Deck kleiner als 4 ist', () => {
    const game = newGame({ cards: makeCards(3) }, noShuffle);
    expect(game.hand).toHaveLength(3);
    expect(game.pile).toHaveLength(0);
  });

  it('ändert das Deck nicht', () => {
    const cards = makeCards(6);
    newGame({ cards }, () => 0);
    expect(ids(cards)).toEqual(['c1', 'c2', 'c3', 'c4', 'c5', 'c6']);
  });
});

describe('draw', () => {
  it('legt die oberste Stapelkarte rechts an die Hand', () => {
    const game = newGame({ cards: makeCards(6) }, noShuffle);
    const next = draw(game);
    expect(ids(next.hand)).toEqual(['c1', 'c2', 'c3', 'c4', 'c5']);
    expect(ids(next.pile)).toEqual(['c6']);
  });

  it('verändert das alte Spiel nicht', () => {
    const game = newGame({ cards: makeCards(6) }, noShuffle);
    draw(game);
    expect(game.hand).toHaveLength(4);
    expect(game.pile).toHaveLength(2);
  });

  it('gibt bei leerem Stapel dasselbe Spiel zurück', () => {
    const game = newGame({ cards: makeCards(4) }, noShuffle);
    expect(draw(game)).toBe(game);
  });

  it('zieht nie eine Karte doppelt', () => {
    let game = newGame({ cards: makeCards(20) });
    while (game.pile.length > 0) game = draw(game);
    expect(game.hand).toHaveLength(20);
    expect(new Set(ids(game.hand)).size).toBe(20);
  });
});
```

- [ ] **Step 7: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run src/game/game.test.ts`
Expected: FAIL – `Failed to resolve import "./game"`.

- [ ] **Step 8: `game.ts` implementieren**

```ts
import type { Card, Deck } from '../decks/types';
import { shuffle, type Rng } from './shuffle';

export const HAND_SIZE = 4;

export interface Game {
  readonly pile: readonly Card[];
  readonly hand: readonly Card[];
}

/** Mischt das Deck, gibt HAND_SIZE Karten offen aus, der Rest ist der Stapel. */
export function newGame(deck: Pick<Deck, 'cards'>, rng: Rng = Math.random): Game {
  const shuffled = shuffle(deck.cards, rng);
  return { hand: shuffled.slice(0, HAND_SIZE), pile: shuffled.slice(HAND_SIZE) };
}

/** Legt die oberste Stapelkarte rechts an die Hand. Bei leerem Stapel: unverändert. */
export function draw(game: Game): Game {
  const [next, ...rest] = game.pile;
  if (!next) return game;
  return { hand: [...game.hand, next], pile: rest };
}
```

- [ ] **Step 9: Alle Tests laufen lassen**

Run: `npm test`
Expected: PASS – 2 Testdateien, 13 Tests.

- [ ] **Step 10: Commit**

```bash
git add src/decks/types.ts src/game
git commit -m "feat: Spiellogik mit Mischen, Startkarten und Ziehen" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Decks einlesen (TDD)

**Files:**
- Create: `src/decks/buildDecks.ts`, `src/decks/loader.ts`
- Test: `src/decks/buildDecks.test.ts`, `src/decks/loader.test.ts`

**Interfaces:**
- Consumes: `Card`, `Deck` aus `src/decks/types.ts`.
- Produces:
  - `buildDecks(metaFiles: Record<string, unknown>, imageFiles: Record<string, string>): Deck[]` – Schlüssel sind Vite-Pfade wie `/assets/decks/kids/cards/001.png`, Werte bei Bildern die URL. Sortiert Decks nach Name (deutsch), Karten nach Dateiname (natürliche Reihenfolge). Wirft `Error` mit deutscher Meldung bei fehlendem `deck.json`, `back.png`, leerem `cards/` oder fehlendem `name`.
  - `loadDecks(): Deck[]` – nutzt `import.meta.glob` über `/assets/decks/*/…`.

- [ ] **Step 1: Failing Tests für `buildDecks`** (`src/decks/buildDecks.test.ts`)

```ts
import { describe, expect, it } from 'vitest';
import { buildDecks } from './buildDecks';

const meta = {
  '/assets/decks/kids/deck.json': { name: 'Kinder', description: 'Bilder zum Erzählen' },
};

const images = {
  '/assets/decks/kids/back.png': '/kids-back.png',
  '/assets/decks/kids/cards/010.png': '/k10.png',
  '/assets/decks/kids/cards/002.png': '/k2.png',
  '/assets/decks/kids/cards/001.png': '/k1.png',
};

describe('buildDecks', () => {
  it('baut ein Deck mit Name, Beschreibung, Rücken und sortierten Karten', () => {
    const [deck] = buildDecks(meta, images);
    expect(deck).toEqual({
      id: 'kids',
      name: 'Kinder',
      description: 'Bilder zum Erzählen',
      back: '/kids-back.png',
      cards: [
        { id: '001', image: '/k1.png' },
        { id: '002', image: '/k2.png' },
        { id: '010', image: '/k10.png' },
      ],
      open: [],
    });
  });

  it('liest optionale open-Karten in Dateinamen-Reihenfolge', () => {
    const [deck] = buildDecks(meta, {
      ...images,
      '/assets/decks/kids/open/02-geh.png': '/geh.png',
      '/assets/decks/kids/open/01-nimm.png': '/nimm.png',
    });
    expect(deck.open.map((c) => c.id)).toEqual(['01-nimm', '02-geh']);
  });

  it('sortiert mehrere Decks nach Name', () => {
    const decks = buildDecks(
      {
        ...meta,
        '/assets/decks/erw/deck.json': { name: 'Erwachsene' },
      },
      {
        ...images,
        '/assets/decks/erw/back.png': '/erw-back.png',
        '/assets/decks/erw/cards/001.png': '/e1.png',
      },
    );
    expect(decks.map((d) => d.name)).toEqual(['Erwachsene', 'Kinder']);
    expect(decks[0].description).toBe('');
  });

  it('meldet ein fehlendes deck.json', () => {
    expect(() => buildDecks({}, images)).toThrow(/Deck "kids".*deck\.json/);
  });

  it('meldet einen fehlenden Rücken', () => {
    const { '/assets/decks/kids/back.png': _back, ...withoutBack } = images;
    expect(() => buildDecks(meta, withoutBack)).toThrow(/Deck "kids".*back\.png/);
  });

  it('meldet einen leeren cards-Ordner', () => {
    expect(() =>
      buildDecks(meta, { '/assets/decks/kids/back.png': '/kids-back.png' }),
    ).toThrow(/Deck "kids".*cards\//);
  });

  it('meldet ein deck.json ohne name', () => {
    expect(() =>
      buildDecks({ '/assets/decks/kids/deck.json': { description: 'x' } }, images),
    ).toThrow(/Deck "kids".*"name"/);
  });
});
```

- [ ] **Step 2: Test laufen lassen, muss fehlschlagen**

Run: `npx vitest run src/decks/buildDecks.test.ts`
Expected: FAIL – `Failed to resolve import "./buildDecks"`.

- [ ] **Step 3: `buildDecks` implementieren** (`src/decks/buildDecks.ts`)

```ts
import type { Card, Deck } from './types';

const META_PATH = /^\/assets\/decks\/([^/]+)\/deck\.json$/;
const IMAGE_PATH = /^\/assets\/decks\/([^/]+)\/(?:(back)\.png|(cards|open)\/([^/]+)\.png)$/;

interface Parts {
  back?: string;
  cards: Card[];
  open: Card[];
}

const natural = (a: string, b: string) => a.localeCompare(b, 'de', { numeric: true });

function readMeta(id: string, data: unknown): { name: string; description: string } {
  const record = typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {};
  const { name, description } = record;
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error(`Deck "${id}": deck.json braucht ein Feld "name"`);
  }
  return { name, description: typeof description === 'string' ? description : '' };
}

/** Baut die Decks aus den Ergebnissen von `import.meta.glob`. */
export function buildDecks(
  metaFiles: Record<string, unknown>,
  imageFiles: Record<string, string>,
): Deck[] {
  const metas = new Map<string, unknown>();
  for (const [path, data] of Object.entries(metaFiles)) {
    const match = META_PATH.exec(path);
    if (match) metas.set(match[1], data);
  }

  const parts = new Map<string, Parts>();
  for (const [path, url] of Object.entries(imageFiles)) {
    const match = IMAGE_PATH.exec(path);
    if (!match) continue;
    const [, id, back, folder, stem] = match;
    const deck = parts.get(id) ?? { cards: [], open: [] };
    parts.set(id, deck);
    if (back) deck.back = url;
    else if (folder === 'cards') deck.cards.push({ id: stem, image: url });
    else deck.open.push({ id: stem, image: url });
  }

  const ids = new Set([...metas.keys(), ...parts.keys()]);
  const decks = [...ids].map((id): Deck => {
    if (!metas.has(id)) throw new Error(`Deck "${id}": deck.json fehlt`);
    const { name, description } = readMeta(id, metas.get(id));
    const p = parts.get(id);
    if (!p?.back) throw new Error(`Deck "${id}": back.png fehlt`);
    if (p.cards.length === 0) throw new Error(`Deck "${id}": keine Karten in cards/ gefunden`);
    const byId = (a: Card, b: Card) => natural(a.id, b.id);
    return {
      id,
      name,
      description,
      back: p.back,
      cards: [...p.cards].sort(byId),
      open: [...p.open].sort(byId),
    };
  });

  return decks.sort((a, b) => a.name.localeCompare(b.name, 'de'));
}
```

- [ ] **Step 4: Test erneut laufen lassen, muss bestehen**

Run: `npx vitest run src/decks/buildDecks.test.ts`
Expected: PASS (7 Tests).

- [ ] **Step 5: `loader.ts` schreiben**

```ts
import { buildDecks } from './buildDecks';
import type { Deck } from './types';

// Vite ersetzt die Globs beim Build; neue Dateien unter assets/decks/ werden automatisch erkannt.
const metaFiles = import.meta.glob('/assets/decks/*/deck.json', {
  eager: true,
  import: 'default',
});

const imageFiles = import.meta.glob<string>(
  ['/assets/decks/*/back.png', '/assets/decks/*/cards/*.png', '/assets/decks/*/open/*.png'],
  { eager: true, import: 'default', query: '?url' },
);

export function loadDecks(): Deck[] {
  return buildDecks(metaFiles, imageFiles);
}
```

- [ ] **Step 6: Integritätstest für die mitgelieferten Decks** (`src/decks/loader.test.ts`)

Dieser Test darf **keine festen Kartenanzahlen** prüfen, damit neue Karten ihn nicht brechen.

```ts
import { describe, expect, it } from 'vitest';
import { loadDecks } from './loader';

describe('mitgelieferte Decks', () => {
  const decks = loadDecks();

  it('enthalten Kinder- und Erwachsenen-Deck', () => {
    const ids = decks.map((d) => d.id);
    expect(ids).toContain('kids');
    expect(ids).toContain('erwachsene');
  });

  it.each(decks.map((d) => [d.id, d] as const))('%s: Rücken, genug Karten, eindeutige Ids', (_id, deck) => {
    expect(deck.back).toBeTruthy();
    expect(deck.cards.length).toBeGreaterThanOrEqual(4);
    const all = [...deck.cards, ...deck.open].map((c) => `${c.id}:${c.image}`);
    expect(new Set(all).size).toBe(all.length);
    expect(new Set(deck.cards.map((c) => c.id)).size).toBe(deck.cards.length);
  });

  it('Erwachsene haben dauerhaft offene Aktionskarten', () => {
    const erwachsene = decks.find((d) => d.id === 'erwachsene');
    expect(erwachsene?.open.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 7: Alle Tests und Typecheck**

Run: `npm test && npm run typecheck`
Expected: alle Tests PASS, `tsc` ohne Ausgabe. Falls `import.meta.glob` im Test keine Bilder findet, prüfen, dass `assets/` im Projekt-Root liegt (Vite-Root) und dass die Pfade mit `/assets/` beginnen.

- [ ] **Step 8: Commit**

```bash
git add src/decks
git commit -m "feat: Decks aus assets/decks automatisch einlesen und validieren" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Oberfläche – Gerüst, Gestaltung, Deckauswahl

**Files:**
- Create: `src/ui/dom.ts`, `src/ui/cardView.ts`, `src/ui/zoom.ts`, `src/ui/selectScreen.ts`, `src/styles.css`
- Modify: `src/main.ts` (Platzhalter ersetzen)

**Interfaces:**
- Consumes: `Deck`, `Card` (Task 3), `loadDecks()` (Task 4).
- Produces:
  - `h(tag, attrs?, ...children)` – erzeugt ein Element; `attrs` sind Strings, `children` Nodes oder Text
  - `createCard(card: Card, backImage: string, faceDown: boolean): HTMLButtonElement` – Klasse `card`, mit `is-flipped` wenn offen
  - `flipUp(el: HTMLElement, delayMs?: number): void` – dreht eine verdeckte Karte nach `delayMs` um
  - `showZoom(image: string): void` – Großansicht, schließt per Klick oder Escape
  - `renderSelectScreen(root: HTMLElement, decks: Deck[], onPick: (deck: Deck) => void): void`
  - In `main.ts` wird `renderTableScreen(root, deck, onBack)` aus Task 6 erwartet; bis dahin zeigt ein Platzhalter-Screen den Deck-Namen.

- [ ] **Step 1: `src/ui/dom.ts`**

```ts
/** Baut ein DOM-Element: h('button', { class: 'btn' }, 'Text', childNode). */
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: Array<Node | string>
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
  el.append(...children);
  return el;
}
```

- [ ] **Step 2: `src/ui/cardView.ts`**

```ts
import type { Card } from '../decks/types';
import { h } from './dom';

/** Eine Karte mit Vorder- und Rückseite. Verdeckt zeigt sie `backImage`, offen die Karte selbst. */
export function createCard(card: Card, backImage: string, faceDown: boolean): HTMLButtonElement {
  const back = h('img', { class: 'card__face card__face--back', src: backImage, alt: '', draggable: 'false' });
  const front = h('img', {
    class: 'card__face card__face--front',
    src: card.image,
    alt: 'Spielkarte',
    draggable: 'false',
  });
  return h(
    'button',
    {
      class: faceDown ? 'card' : 'card is-flipped',
      type: 'button',
      'aria-label': 'Karte vergrößern',
    },
    h('span', { class: 'card__inner' }, back, front),
  );
}

/** Dreht eine verdeckte Karte nach `delayMs` um (die Pause lässt den Browser den Startzustand zeichnen). */
export function flipUp(el: HTMLElement, delayMs = 0): void {
  window.setTimeout(() => el.classList.add('is-flipped'), delayMs + 50);
}
```

- [ ] **Step 3: `src/ui/zoom.ts`**

```ts
import { h } from './dom';

/** Zeigt eine Karte groß; Klick oder Escape schließt. */
export function showZoom(image: string): void {
  const overlay = h(
    'div',
    { class: 'zoom', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Karte vergrößert' },
    h('img', { class: 'zoom__img', src: image, alt: 'Spielkarte, vergrößert' }),
  );
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close();
  };
  function close() {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  document.body.append(overlay);
}
```

- [ ] **Step 4: `src/ui/selectScreen.ts`**

```ts
import type { Deck } from '../decks/types';
import { h } from './dom';

export function renderSelectScreen(
  root: HTMLElement,
  decks: Deck[],
  onPick: (deck: Deck) => void,
): void {
  const tiles = decks.map((deck) => {
    const tile = h(
      'button',
      { class: 'deck-tile', type: 'button' },
      h('img', { class: 'deck-tile__back', src: deck.back, alt: '' }),
      h('span', { class: 'deck-tile__name' }, deck.name),
      h('span', { class: 'deck-tile__desc' }, deck.description),
    );
    tile.addEventListener('click', () => onPick(deck));
    return tile;
  });

  root.replaceChildren(
    h(
      'main',
      { class: 'screen screen--select' },
      h('h1', {}, 'Fantasie-Game'),
      h('p', { class: 'lead' }, 'Wähle ein Kartenspiel und erzähle deine eigene Geschichte.'),
      h('div', { class: 'deck-grid' }, ...tiles),
    ),
  );
}
```

- [ ] **Step 5: `src/styles.css`** (enthält auch die Stile für Task 6)

```css
:root {
  --paper: #f6efe2;
  --paper-dark: #ebe1cc;
  --ink: #2b2a28;
  --ink-soft: #6b665c;
  --accent: #b9552f;
  --accent-dark: #8f3f20;
  --shadow: 0 6px 14px rgba(43, 42, 40, 0.22);
  --card-w: clamp(104px, 15vw, 190px);
  --small-card-w: clamp(56px, 7.2vw, 100px);
  font-family: Georgia, 'Iowan Old Style', 'Palatino Linotype', serif;
  color: var(--ink);
  background: var(--paper);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--paper);
}

button {
  font: inherit;
  color: inherit;
}

.screen {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 20px 32px;
}

h1 {
  margin: 0 0 0.25em;
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: 0.02em;
}

.error {
  color: #8f1d1d;
  font-weight: 700;
}

/* Deckauswahl */
.screen--select {
  padding-top: 6vh;
  text-align: center;
}

.lead {
  margin: 0 0 2rem;
  color: var(--ink-soft);
  font-size: 1.15rem;
}

.deck-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.deck-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: min(300px, 80vw);
  padding: 20px;
  border: 2px solid var(--ink);
  border-radius: 18px;
  background: #fffaf0;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
}

.deck-tile:hover,
.deck-tile:focus-visible {
  transform: translateY(-4px) rotate(-1deg);
  box-shadow: 0 12px 22px rgba(43, 42, 40, 0.28);
}

.deck-tile__back {
  width: 150px;
  height: auto;
  filter: drop-shadow(0 4px 6px rgba(43, 42, 40, 0.28));
}

.deck-tile__name {
  font-size: 1.5rem;
  font-weight: 700;
}

.deck-tile__desc {
  color: var(--ink-soft);
}

/* Spieltisch */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.topbar h2 {
  margin: 0;
  font-size: 1.3rem;
}

.btn {
  padding: 10px 18px;
  border: 2px solid var(--ink);
  border-radius: 999px;
  background: #fffaf0;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}

.btn:hover {
  background: var(--paper-dark);
}

.btn--highlight {
  border-color: var(--accent-dark);
  background: var(--accent);
  color: #fff;
  font-weight: 700;
}

.btn--highlight:hover {
  background: var(--accent-dark);
}

.open-bar {
  --card-w: var(--small-card-w);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  padding: 10px;
  border-radius: 14px;
  background: var(--paper-dark);
}

.table {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.pile-wrap {
  position: sticky;
  top: 12px;
  flex: none;
  width: var(--card-w);
  text-align: center;
}

.pile-hint {
  margin: 8px 0 0;
  color: var(--ink-soft);
}

.hand {
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 16px;
}

/* Karten */
.card {
  width: var(--card-w);
  padding: 0;
  border: 0;
  background: none;
  aspect-ratio: 708 / 713;
  perspective: 900px;
  cursor: zoom-in;
  filter: drop-shadow(0 4px 6px rgba(43, 42, 40, 0.28));
}

.card__inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.is-flipped .card__inner {
  transform: rotateY(180deg);
}

.card__face {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.card__face--front {
  transform: rotateY(180deg);
}

/* Stapel */
.pile {
  position: relative;
  width: var(--card-w);
  padding: 0;
  border: 0;
  background: none;
  aspect-ratio: 708 / 713;
  cursor: pointer;
  transition: transform 0.1s;
}

.pile:hover:not(:disabled) {
  transform: translateY(-3px);
}

.pile__img {
  display: block;
  width: 100%;
  height: 100%;
  filter: drop-shadow(3px 3px 0 #d9ceb8) drop-shadow(6px 6px 0 #c9bda4);
}

.pile__count {
  position: absolute;
  right: -8px;
  bottom: -8px;
  min-width: 2em;
  padding: 0.15em 0.5em;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-weight: 700;
}

.pile--empty {
  border: 3px dashed var(--ink-soft);
  border-radius: 14px;
  cursor: default;
}

.pile--empty .pile__img {
  opacity: 0.15;
  filter: none;
}

.pile--empty .pile__count {
  display: none;
}

/* Großansicht */
.zoom {
  position: fixed;
  inset: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(30, 28, 24, 0.75);
  cursor: zoom-out;
}

.zoom__img {
  width: min(92vw, 92vh);
  height: auto;
  filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.5));
}

@media (max-width: 640px) {
  :root {
    --card-w: 42vw;
    --small-card-w: 22vw;
  }

  .table {
    flex-direction: column;
    gap: 20px;
  }

  .hand {
    gap: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .card__inner,
  .deck-tile,
  .pile {
    transition: none;
  }
}
```

- [ ] **Step 6: `src/main.ts` ersetzen**

```ts
import './styles.css';
import { loadDecks } from './decks/loader';
import type { Deck } from './decks/types';
import { h } from './ui/dom';
import { renderSelectScreen } from './ui/selectScreen';

const root = document.getElementById('app');
if (!root) throw new Error('Element #app fehlt in index.html');
const app: HTMLElement = root;

function showError(message: string): void {
  app.replaceChildren(
    h(
      'main',
      { class: 'screen' },
      h('h1', {}, 'Fantasie-Game'),
      h('p', { class: 'error', role: 'alert' }, message),
    ),
  );
}

// Platzhalter bis Task 6: zeigt nur den gewählten Deck-Namen.
function showTable(deck: Deck, onBack: () => void): void {
  const back = h('button', { class: 'btn', type: 'button' }, 'Zurück');
  back.addEventListener('click', onBack);
  app.replaceChildren(h('main', { class: 'screen' }, h('h2', {}, deck.name), back));
}

function start(): void {
  let decks: Deck[];
  try {
    decks = loadDecks();
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
    return;
  }
  const showSelect = () => renderSelectScreen(app, decks, (deck) => showTable(deck, showSelect));
  showSelect();
}

start();
```

- [ ] **Step 7: Typecheck und Build**

Run: `npm run build`
Expected: `tsc` ohne Fehler, Vite `✓ built`.

- [ ] **Step 8: Im Browser prüfen**

Run: `npm run dev` und die ausgegebene URL (meist http://localhost:5173) öffnen.
Erwartet:
- Überschrift „Fantasie-Game“, darunter zwei Kacheln „Erwachsene“ und „Kinder“ (alphabetisch) mit Kompass-Rücken, Name und Beschreibung.
- Hover hebt eine Kachel leicht an.
- Klick auf eine Kachel zeigt den Platzhalter mit Deck-Name und „Zurück“; „Zurück“ führt zur Auswahl.
- Keine Fehler in der Browser-Konsole.

- [ ] **Step 9: Commit**

```bash
git add src index.html
git commit -m "feat: Deckauswahl, Kartenansicht, Zoom und Gestaltung" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Spieltisch

**Files:**
- Create: `src/ui/tableScreen.ts`
- Modify: `src/main.ts` (Platzhalter `showTable` entfernen, `renderTableScreen` verwenden)

**Interfaces:**
- Consumes: `newGame`, `draw`, `Game` (Task 3); `Deck`, `Card` (Task 3); `createCard`, `flipUp` (Task 5); `showZoom` (Task 5); `h` (Task 5).
- Produces: `renderTableScreen(root: HTMLElement, deck: Deck, onBack: () => void): void`

Verhalten: Beim Start werden 4 Karten nacheinander (180 ms Versatz) umgedreht. Klick auf den Stapel legt die nächste Karte rechts an. „Neu mischen“ beginnt eine neue Runde. Bei leerem Stapel: Stapel deaktiviert und gestrichelt, Hinweis „Keine Karten mehr“, „Neu mischen“ hervorgehoben. Klick auf eine offene Karte zeigt sie groß.

- [ ] **Step 1: `src/ui/tableScreen.ts`**

```ts
import type { Card, Deck } from '../decks/types';
import { draw, newGame, type Game } from '../game/game';
import { createCard, flipUp } from './cardView';
import { h } from './dom';
import { showZoom } from './zoom';

const DEAL_STAGGER_MS = 180;

export function renderTableScreen(root: HTMLElement, deck: Deck, onBack: () => void): void {
  let game: Game = newGame(deck);

  const hand = h('div', { class: 'hand', 'aria-live': 'polite' });
  const pileCount = h('span', { class: 'pile__count' });
  const pile = h(
    'button',
    { class: 'pile', type: 'button' },
    h('img', { class: 'pile__img', src: deck.back, alt: '' }),
    pileCount,
  );
  const emptyHint = h('p', { class: 'pile-hint' }, 'Keine Karten mehr');
  const shuffleButton = h('button', { class: 'btn', type: 'button' }, 'Neu mischen');
  const backButton = h('button', { class: 'btn', type: 'button' }, 'Zurück');

  function addToHand(card: Card, delayMs: number): void {
    const el = createCard(card, deck.back, true);
    el.addEventListener('click', () => showZoom(card.image));
    hand.append(el);
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    flipUp(el, delayMs);
  }

  function updatePile(): void {
    const left = game.pile.length;
    pileCount.textContent = String(left);
    pile.disabled = left === 0;
    pile.classList.toggle('pile--empty', left === 0);
    pile.setAttribute(
      'aria-label',
      left === 0 ? 'Der Stapel ist leer' : `Karte ziehen, noch ${left} im Stapel`,
    );
    emptyHint.hidden = left !== 0;
    shuffleButton.classList.toggle('btn--highlight', left === 0);
  }

  function startRound(): void {
    game = newGame(deck);
    hand.replaceChildren();
    game.hand.forEach((card, i) => addToHand(card, i * DEAL_STAGGER_MS));
    updatePile();
  }

  function drawCard(): void {
    const next = game.pile[0];
    if (!next) return;
    game = draw(game);
    addToHand(next, 0);
    updatePile();
  }

  pile.addEventListener('click', drawCard);
  shuffleButton.addEventListener('click', startRound);
  backButton.addEventListener('click', onBack);

  const openBar =
    deck.open.length > 0
      ? h(
          'section',
          { class: 'open-bar', 'aria-label': 'Aktionen' },
          ...deck.open.map((card) => {
            const el = createCard(card, deck.back, false);
            el.addEventListener('click', () => showZoom(card.image));
            return el;
          }),
        )
      : null;

  root.replaceChildren(
    h(
      'main',
      { class: 'screen screen--table' },
      h('header', { class: 'topbar' }, backButton, h('h2', {}, deck.name), shuffleButton),
      ...(openBar ? [openBar] : []),
      h('div', { class: 'table' }, h('div', { class: 'pile-wrap' }, pile, emptyHint), hand),
    ),
  );

  startRound();
}
```

- [ ] **Step 2: `src/main.ts` anpassen** – Import ergänzen, Platzhalter ersetzen

Import hinzufügen (neben den anderen Imports):

```ts
import { renderTableScreen } from './ui/tableScreen';
```

Die Funktion `showTable` komplett löschen und in `start()` ersetzen:

```ts
  const showSelect = () =>
    renderSelectScreen(app, decks, (deck) => renderTableScreen(app, deck, showSelect));
```

`start()` ist danach:

```ts
function start(): void {
  let decks: Deck[];
  try {
    decks = loadDecks();
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
    return;
  }
  const showSelect = () =>
    renderSelectScreen(app, decks, (deck) => renderTableScreen(app, deck, showSelect));
  showSelect();
}
```

- [ ] **Step 3: Typecheck, Tests, Build**

Run: `npm run typecheck && npm test && npm run build`
Expected: kein Fehler, alle Tests PASS, Vite `✓ built`.

- [ ] **Step 4: Manuelle Prüfung im Browser** (`npm run dev`)

**Kinder:**
- Nach Klick auf „Kinder“ liegt links der Stapel mit Kompass und Zähler **80** (84 − 4), rechts drehen sich nacheinander 4 Karten um.
- Klick auf den Stapel: neue Karte erscheint **rechts neben den vorhandenen**, dreht sich um, Zähler sinkt um 1.
- Keine Aktionsleiste zu sehen.
- Weiter klicken, bis die Reihe umbricht: Karten bilden eine zweite Zeile, die Seite scrollt zur neuen Karte.
- Klick auf eine offene Karte: Großansicht; Klick daneben oder Escape schließt.
- „Neu mischen“: Hand wird neu ausgegeben (4 neue Karten), Zähler wieder 80.
- „Zurück“: Deckauswahl.

**Erwachsene:**
- Oben liegt die Aktionsleiste mit 12 offenen Karten (NIMM … DENK NACH), Klick zeigt sie groß.
- Zähler zeigt **44** (48 − 4). Die Aktionskarten tauchen **nie** im Stapel auf.

**Stapel leer** (Erwachsene sind mit 44 Klicks am schnellsten leer; alternativ in der Browser-Konsole `document.querySelector('.pile')` wiederholt klicken):
- Stapel wird gestrichelt und deaktiviert, Hinweis „Keine Karten mehr“, Knopf „Neu mischen“ ist orange hervorgehoben.

**Handy-Breite** (Browser auf < 640 px Breite ziehen): Stapel steht über der Hand, 2 Karten pro Zeile, Aktionsleiste umbricht auf mehrere Zeilen.

**Fehlerfall:** `assets/decks/kids/back.png` kurz umbenennen, Seite neu laden → Seite zeigt rot `Deck "kids": back.png fehlt`. Datei danach zurückbenennen.

- [ ] **Step 5: Commit**

```bash
git add src/ui/tableScreen.ts src/main.ts
git commit -m "feat: Spieltisch mit Stapel, Hand, Aktionsleiste und Neu mischen" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: README und Abschlusskontrolle

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: alles aus Task 1–6.

- [ ] **Step 1: `README.md`**

````markdown
# Fantasie-Game

Karten ziehen, Geschichten erzählen: Man wählt ein Deck (Kinder oder Erwachsene), bekommt 4 offene Startkarten und deckt per Klick auf den Stapel weitere Karten auf. Das Spiel fördert Kreativität und Fantasie – die Karten sind nur der Anstoß für die eigene Geschichte. Im Erwachsenen-Deck liegen zusätzlich die Aktionskarten (Nimm, Geh, Öffne …) dauerhaft offen.

## Starten

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # statische Seite nach dist/
npm run preview  # gebautes Ergebnis ansehen
npm test         # Tests
```

## Neue Karten hinzufügen

Jedes Deck ist ein Ordner unter `assets/decks/<deck-id>/`:

```
deck.json    { "name": "Anzeigename", "description": "Kurzbeschreibung" }
back.png     Kartenrücken
cards/       Karten des Stapels (*.png) – werden gemischt und gezogen
open/        optional: immer offene Karten (*.png), Reihenfolge nach Dateiname
```

- **Neue Karte:** PNG in `cards/` legen (quadratisch, ca. 700×700 px, am besten mit transparenten Ecken). Fertig – sie ist im Stapel, sobald der Entwicklungsserver neu lädt bzw. nach `npm run build`.
- **Neues Deck:** neuen Ordner mit `deck.json`, `back.png` und mindestens 4 Karten in `cards/` anlegen. Es erscheint automatisch in der Auswahl.
- Fehlt etwas Wesentliches (`deck.json`, `back.png`, Karten), zeigt die App eine verständliche Fehlermeldung mit dem Deck-Namen.

## Ursprung der Karten

Die Karten wurden aus zwei PDFs extrahiert (`scripts/extract_cards.py`, benötigt PyMuPDF, siehe Kopf des Skripts). Die PDFs selbst liegen nur lokal in `source/` und gehören nicht ins Repository.
````

- [ ] **Step 2: Vollständige Kontrolle**

Run: `npm run typecheck && npm test && npm run build`
Expected: alles grün.

Run: `git status --short`
Expected: nur `README.md` neu; `source/`, `node_modules/`, `dist/`, `.venv/` tauchen nicht auf.

- [ ] **Step 3: Erweiterbarkeit praktisch prüfen**

1. `cp assets/decks/kids/cards/001.png assets/decks/kids/cards/085.png` und `npm run dev` neu starten (oder neu laden): Kinder-Deck zeigt Zähler **81** (85 − 4).
2. `rm assets/decks/kids/cards/085.png` – Zähler wieder 80.
3. Keine Codeänderung war nötig.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: README mit Bedienung und Anleitung für neue Karten" -m "Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```
