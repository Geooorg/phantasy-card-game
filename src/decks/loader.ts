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
