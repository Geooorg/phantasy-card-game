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
