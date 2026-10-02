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
