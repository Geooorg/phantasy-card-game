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

- Kartendateien müssen die Endung `.png` (kleingeschrieben) haben – andere Endungen oder Schreibweisen (z. B. `.PNG`, `.jpg`) werden ignoriert.
- **Neue Karte:** PNG in `cards/` legen (quadratisch, ca. 700×700 px, am besten mit transparenten Ecken). Fertig – sie ist im Stapel, sobald der Entwicklungsserver neu lädt bzw. nach `npm run build`.
- **Neues Deck:** neuen Ordner mit `deck.json`, `back.png` und Karten in `cards/` anlegen (mindestens 4 Karten empfohlen – bei weniger startet das Spiel mit allen vorhandenen). Es erscheint automatisch in der Auswahl.
- Fehlt etwas Wesentliches (`deck.json`, `back.png`, Karten), zeigt die App eine verständliche Fehlermeldung mit dem Ordnernamen des Decks.

## Ursprung der Karten

Die Karten wurden aus zwei PDFs extrahiert (`scripts/extract_cards.py`, benötigt PyMuPDF, siehe Kopf des Skripts). Die PDFs selbst liegen nur lokal in `source/` und gehören nicht ins Repository.
