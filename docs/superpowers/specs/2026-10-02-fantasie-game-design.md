# Fantasie-Game – Design

Datum: 2026-10-02

## Ziel

Eine kleine Web-App, die Kreativität und Fantasie von Kindern und Erwachsenen fördert:
Man zieht zufällig Bildkarten und erzählt sich anhand der offen liegenden Karten eigene Geschichten.

## Ablauf

1. **Deckauswahl:** Kinder oder Erwachsene.
2. Das Deck wird gemischt.
3. Der Spieler bekommt **4 Karten**, offen nebeneinander.
4. Per Klick auf den **Stapel** wird die nächste Karte aufgedeckt und **rechts neben die bisherigen Karten** gelegt.
5. Ist der Stapel leer, ist die Runde zu Ende. „Neu mischen“ startet eine neue Runde im selben Deck.

Bei den **Erwachsenen** liegen zusätzlich die 12 Aktionskarten (Nimm, Geh, Benutze, Öffne, Schliesse, Gib, Sprich mit, Schau an, Drücke, Ziehe, Hör zu, Denk nach) **dauerhaft offen** daneben. Sie werden nicht gezogen. Der Ablauf ist ansonsten identisch.

## Kartenmaterial

Quelle: zwei PDFs (`source/Memory-Karten-Kids.pdf`, `source/Memory-Karten-Erwachsene.pdf`), je 12 Karten pro Seite.
Die Karten werden einzeln als PNG extrahiert (ca. 700×710 px, transparente abgerundete Ecken), der Kompass-Rücken einmal pro Deck.

| Deck | Stapel | Immer offen | Rücken |
|---|---|---|---|
| Kinder | 84 Karten | – | Kompass |
| Erwachsene | 48 Situationen | 12 Aktionen | Kompass |

## Technik

Vite + TypeScript ohne UI-Framework, Vitest für Tests. Ausgabe ist eine statische Seite.

### Erweiterbarkeit

Jedes Deck ist ein Ordner, neue Karten sind einfach neue Dateien:

```
assets/decks/
  <deck-id>/
    deck.json      { "name": "…", "description": "…" }
    back.png       Kartenrücken
    cards/         Stapel zum Ziehen (*.png)
    open/          optional: immer offene Karten (*.png)
```

- Vite liest `assets/decks/*/` per `import.meta.glob` ein. Eine neue Karte = eine Datei in `cards/`. Ein neues Deck = ein neuer Ordner, es erscheint automatisch in der Auswahl.
- Dateinamen bestimmen nur die Sortierung der `open/`-Karten, im Stapel wird gemischt.
- Der Text steht in den Bildern, es gibt keine Beschriftungsdaten.

### Spiellogik (`src/game/`, ohne UI-Abhängigkeit)

- `shuffle(cards, rng)` – Fisher-Yates, Zufallsquelle injizierbar.
- `newGame(deck, rng)` – mischt, gibt 4 Karten als Hand aus, Rest = Stapel.
- `draw(game)` – oberste Karte rechts an die Hand; bei leerem Stapel keine Änderung.
- Zustand `{ pile, hand }`, wird nicht gespeichert (Neuladen = neue Runde).

### Oberfläche (Deutsch, Querformat bevorzugt, auf dem Handy nutzbar)

1. **Deckauswahl:** große Kachel pro Deck mit Rücken, Name, Beschreibung.
2. **Spieltisch:**
   - Stapel links (Kompass-Rücken, Zähler der Restkarten); Klick deckt auf, Flip-Animation.
   - Hand daneben, wächst nach rechts, bricht bei Platzmangel in eine weitere Zeile um (kein Scrollen).
   - Aktionsleiste (nur Erwachsene), kleiner, immer sichtbar.
   - Knöpfe „Neu mischen“ und „Zurück“. Bei leerem Stapel: leerer Platz, Hinweis „Keine Karten mehr“, „Neu mischen“ hervorgehoben.
3. **Zoom:** Klick auf eine offene Karte zeigt sie groß, erneuter Klick schließt.

### Fehlerfälle

- Fehlendes `deck.json` oder `back.png`: Build/Start meldet das Deck und die fehlende Datei klar.
- Weniger als 4 Karten im Stapel: Start mit allen vorhandenen.

## Tests

Vitest: Spiellogik (4 Startkarten, keine Duplikate, leerer Stapel, Mischen mit festem Zufall) und Deck-Einlesen.
Die Oberfläche wird manuell im Browser geprüft.

## Nicht im Umfang (YAGNI)

Speichern von Spielständen, Mehrspieler, Kartenbeschriftungen/Metadaten pro Karte, Töne, Karten entfernen oder umsortieren.

## Hinweis zu `source/`

Die Original-PDFs (ca. 36 MB) liegen in `source/` und sind Quelle für die Extraktion, nicht Teil der App.
