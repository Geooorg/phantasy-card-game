# Fantasie-Game

Karten ziehen, Geschichten erzählen: Man wählt ein Deck (Kinder oder Erwachsene), bekommt 4 offene Startkarten und deckt per Klick auf den Stapel weitere Karten auf. Das Spiel fördert Kreativität und Fantasie – die Karten sind nur der Anstoß für die eigene Geschichte. Im Erwachsenen-Deck liegen zusätzlich die Aktionskarten (Nimm, Geh, Öffne …) dauerhaft offen.

## Starten

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # Tests + komprimierte statische Seite nach dist/
npm run serve    # dist/ lokal ausliefern: http://localhost:8080
npm run serve:lan  # wie serve, aber im lokalen Netz erreichbar (z. B. vom Tablet)
npm start        # build + serve in einem Schritt
npm test         # Tests
```

## Build und Auslieferung

`npm run build` erzeugt in `dist/` eine komplett statische Seite (läuft auch aus einem Unterordner, `base: './'`):

- **Karten:** Die PNGs werden beim Build auf eine 8-Bit-Palette reduziert (ca. −74 %, optisch kaum zu unterscheiden). Die Originale in `assets/` bleiben unverändert, auch neue Karten werden automatisch optimiert.
- **Text-Dateien** (HTML, JS, CSS) werden zusätzlich vorab als `.gz` und `.br` abgelegt.
- Ergebnis: `dist/` ist von ca. 17 MB auf ca. 4,6 MB geschrumpft.

`npm run serve` startet einen kleinen Webserver (sirv), der automatisch die kleinste passende Variante (Brotli, Gzip oder unkomprimiert) liefert. Die Dateien aus `dist/` lassen sich auch auf jedem anderen statischen Webserver (nginx, Apache, …) ablegen; für die Brotli-/Gzip-Dateien muss dieser „precompressed assets“ unterstützen, sonst wird einfach unkomprimiert geliefert.

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
