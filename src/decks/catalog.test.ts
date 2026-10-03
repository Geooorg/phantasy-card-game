import { describe, expect, it } from 'vitest';
import catalog from '/assets/KARTEN.md?raw';

// Kartenverzeichnis assets/KARTEN.md muss zu den Dateien passen, damit man für Erweiterungen
// nicht alle Bilder neu anschauen muss.
const images = Object.keys(import.meta.glob('/assets/decks/*/{cards,open}/*.png'));

/** Liest „deck/ordner/datei.png“ aus den Tabellen des Verzeichnisses. */
function listed(markdown: string): string[] {
  const result: string[] = [];
  let deck = '';
  let folder = '';
  for (const line of markdown.split('\n')) {
    const deckMatch = /^## .*\(`([^`]+)`\)/.exec(line);
    if (deckMatch) deck = deckMatch[1];
    const folderMatch = /^### (\w+)\//.exec(line);
    if (folderMatch) folder = folderMatch[1];
    const row = /^\| ([^|]+\.png) \|/.exec(line);
    if (row) result.push(`/assets/decks/${deck}/${folder}/${row[1].trim()}`);
  }
  return result;
}

describe('Kartenverzeichnis assets/KARTEN.md', () => {
  const entries = listed(catalog);

  it('führt jede Kartendatei auf', () => {
    expect(images.filter((path) => !entries.includes(path))).toEqual([]);
  });

  it('enthält keine Einträge ohne Datei und keine doppelten', () => {
    expect(entries.filter((path) => !images.includes(path))).toEqual([]);
    expect(new Set(entries).size).toBe(entries.length);
  });
});
