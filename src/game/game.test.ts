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
