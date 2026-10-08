import type { Card, Deck } from '../decks/types';
import { shuffle, type Rng } from './shuffle';

export const HAND_SIZE = 4;

export interface Game {
  readonly pile: readonly Card[];
  readonly hand: readonly Card[];
}

/** Mischt das Deck, gibt HAND_SIZE Karten offen aus, der Rest ist der Stapel. */
export function newGame(deck: Pick<Deck, 'cards'>, rng: Rng = Math.random): Game {
  const shuffled = shuffle(deck.cards, rng);
  return { hand: shuffled.slice(0, HAND_SIZE), pile: shuffled.slice(HAND_SIZE) };
}

/** Hängt die oberste Stapelkarte hinten an die Hand (die Anzeige zeigt sie vorn). Bei leerem Stapel: unverändert. */
export function draw(game: Game): Game {
  const [next, ...rest] = game.pile;
  if (!next) return game;
  return { hand: [...game.hand, next], pile: rest };
}
