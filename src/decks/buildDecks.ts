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
