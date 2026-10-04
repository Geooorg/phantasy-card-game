# Fantasie-Game

Karten ziehen, Geschichten erzählen: Man wählt ein Deck (Kinder oder Erwachsene), bekommt 4 offene Startkarten und deckt per Klick auf den Stapel weitere Karten auf. Das Spiel fördert Kreativität und Fantasie – die Karten sind nur der Anstoß für die eigene Geschichte. Im Erwachsenen-Deck liegen zusätzlich die Aktionskarten (Nimm, Geh, Öffne …) dauerhaft offen.

## Starten

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # Tests + komprimierte statische Seite nach dist/
npm run serve    # dist/ lokal ausliefern: http://localhost:8765
npm run serve:lan  # wie serve, aber im lokalen Netz erreichbar (z. B. vom Tablet)
npm start        # build + serve in einem Schritt
npm test         # Tests
```

## Build und Auslieferung

`npm run build` erzeugt in `dist/` eine komplett statische Seite (läuft auch aus einem Unterordner, `base: './'`):

- **Karten:** Die PNGs werden beim Build auf eine 8-Bit-Palette reduziert (ca. −74 %, optisch kaum zu unterscheiden). Die Originale in `assets/` bleiben unverändert, auch neue Karten werden automatisch optimiert.
- **Text-Dateien** (HTML, JS, CSS) werden zusätzlich vorab als `.gz` und `.br` abgelegt.
- Ergebnis: `dist/` ist von ca. 36 MB auf ca. 12 MB geschrumpft (208 Karten).

`npm run serve` startet einen kleinen Webserver (sirv), der automatisch die kleinste passende Variante (Brotli, Gzip oder unkomprimiert) liefert. Die Dateien aus `dist/` lassen sich auch auf jedem anderen statischen Webserver (nginx, Apache, …) ablegen; für die Brotli-/Gzip-Dateien muss dieser „precompressed assets“ unterstützen, sonst wird einfach unkomprimiert geliefert.

## Hochladen (Deployment)

```bash
npm run package   # Tests + Build + Archiv fantasie-game.zip
```

`fantasie-game.zip` (ca. 11 MB) enthält den Inhalt von `dist/`. Entpacken und den Inhalt auf einen beliebigen Webspace hochladen – im Hauptverzeichnis oder in einem Unterordner (`https://example.de/spiel/`), die Pfade sind relativ. Für den Offline-Betrieb muss die Seite über **HTTPS** erreichbar sein. Die `.gz`/`.br`-Dateien werden nur von Servern genutzt, die vorkomprimierte Dateien unterstützen (nginx `gzip_static`/`brotli_static`, Caddy `precompressed`); sonst können sie ignoriert oder weggelassen werden.

## Offline-Betrieb (PWA)

Die App ist eine Progressive Web App: Beim ersten Aufruf legt ein Service Worker die gesamte App inklusive aller Karten (ca. 11 MB) im Browser-Cache ab. Danach läuft sie auch ohne Netz, und man kann sie über „Zur Startseite hinzufügen“ bzw. „Installieren“ wie eine App starten.

- **Voraussetzung:** Service Worker funktionieren nur über `https://` oder `http://localhost`. `npm run serve` (localhost) reicht für den Rechner selbst. Von einem Tablet im Netz (`serve:lan`, `http://192.168.…`) wird der Service Worker **nicht** aktiviert – dafür braucht es HTTPS (z. B. lokales Zertifikat mit mkcert oder ein Hosting mit HTTPS).
- **Updates:** Nach einem neuen Build lädt der Browser die neue Version beim nächsten Aufruf mit Netz im Hintergrund; zu sehen ist sie nach dem nächsten Neuladen bzw. App-Start.
- **Neue Karten** werden automatisch mit in den Cache aufgenommen. Die App-Icons liegen in `public/icons/` und lassen sich mit `node scripts/make-icons.mjs` neu erzeugen.

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

## Kartenverzeichnis

[`assets/KARTEN.md`](assets/KARTEN.md) listet jede Karte mit Motiv (und bei neueren Karten Stichworten) sowie die nächsten freien Nummern. Vor einer Erweiterung dort nachsehen, statt alle Bilder durchzugehen. Neue, entfernte oder umbenannte Karten dort nachtragen – `npm test` schlägt sonst fehl.

## Gezeichnete Karten (SVG)

Die Kinder-Karten ab `085` und die Erwachsenen-Karten ab `049` sind von Hand als SVG gezeichnet (`scripts/svg-cards/kids.mjs`, `scripts/svg-cards/erwachsene.mjs` und `erwachsene-2.mjs`, gemeinsame Formen und Strichstil in `lib.mjs`) und werden zu PNG gerendert:

```bash
node scripts/svg-cards/render.mjs                    # alle gezeichneten Karten nach assets/
node scripts/svg-cards/render.mjs kids/090           # einzelne Karte
node scripts/svg-cards/render.mjs --out /tmp/vorschau  # nur Vorschau, assets/ bleibt unverändert
```

## Ursprung der Karten

Die Karten wurden aus zwei PDFs extrahiert (`scripts/extract_cards.py`, benötigt PyMuPDF, siehe Kopf des Skripts). Die PDFs selbst liegen nur lokal in `source/` und gehören nicht ins Repository.
