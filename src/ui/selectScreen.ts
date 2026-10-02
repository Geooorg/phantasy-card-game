import type { Deck } from '../decks/types';
import { h } from './dom';

export function renderSelectScreen(
  root: HTMLElement,
  decks: Deck[],
  onPick: (deck: Deck) => void,
): void {
  const tiles = decks.map((deck) => {
    const tile = h(
      'button',
      { class: 'deck-tile', type: 'button' },
      h('img', { class: 'deck-tile__back', src: deck.back, alt: '' }),
      h('span', { class: 'deck-tile__name' }, deck.name),
      h('span', { class: 'deck-tile__desc' }, deck.description),
    );
    tile.addEventListener('click', () => onPick(deck));
    return tile;
  });

  root.replaceChildren(
    h(
      'main',
      { class: 'screen screen--select' },
      h('h1', {}, 'Fantasie-Game'),
      h('p', { class: 'lead' }, 'Wähle ein Kartenspiel und erzähle deine eigene Geschichte.'),
      h('div', { class: 'deck-grid' }, ...tiles),
    ),
  );
}
