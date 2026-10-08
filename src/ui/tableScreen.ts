import type { Card, Deck } from '../decks/types';
import { draw, newGame, type Game } from '../game/game';
import { createCard, flipUp } from './cardView';
import { h } from './dom';
import { showZoom } from './zoom';

const DEAL_STAGGER_MS = 180;

export function renderTableScreen(root: HTMLElement, deck: Deck, onBack: () => void): void {
  let game: Game = newGame(deck);

  const hand = h('div', { class: 'hand', 'aria-live': 'polite' });
  const pileCount = h('span', { class: 'pile__count' });
  const pile = h(
    'button',
    { class: 'pile', type: 'button' },
    h('img', { class: 'pile__img', src: deck.back, alt: '' }),
    pileCount,
  );
  const emptyHint = h('p', { class: 'pile-hint' }, 'Keine Karten mehr');
  const shuffleButton = h('button', { class: 'btn', type: 'button' }, 'Neu mischen');
  const backButton = h('button', { class: 'btn', type: 'button' }, 'Zurück');

  function addToHand(card: Card, delayMs: number): void {
    const el = createCard(card, deck.back, true);
    el.addEventListener('click', () => {
      if (el.classList.contains('is-flipped')) showZoom(card.image);
    });
    // Neueste Karte steht vorn (oben links), damit man nach dem Ziehen nicht scrollen muss.
    hand.prepend(el);
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    flipUp(el, delayMs);
  }

  function updatePile(): void {
    const left = game.pile.length;
    pileCount.textContent = String(left);
    pile.disabled = left === 0;
    pile.classList.toggle('pile--empty', left === 0);
    pile.setAttribute(
      'aria-label',
      left === 0 ? 'Der Stapel ist leer' : `Karte ziehen, noch ${left} im Stapel`,
    );
    emptyHint.hidden = left !== 0;
    shuffleButton.classList.toggle('btn--highlight', left === 0);
  }

  function startRound(): void {
    game = newGame(deck);
    hand.replaceChildren();
    game.hand.forEach((card, i) => addToHand(card, i * DEAL_STAGGER_MS));
    updatePile();
  }

  function drawCard(): void {
    const next = game.pile[0];
    if (!next) return;
    game = draw(game);
    addToHand(next, 0);
    updatePile();
  }

  pile.addEventListener('click', drawCard);
  shuffleButton.addEventListener('click', startRound);
  backButton.addEventListener('click', onBack);

  const openBar =
    deck.open.length > 0
      ? h(
          'section',
          { class: 'open-bar', 'aria-label': 'Aktionen' },
          ...deck.open.map((card) => {
            const el = createCard(card, deck.back, false);
            el.addEventListener('click', () => showZoom(card.image));
            return el;
          }),
        )
      : null;

  root.replaceChildren(
    h(
      'main',
      { class: 'screen screen--table' },
      h('header', { class: 'topbar' }, backButton, h('h2', {}, deck.name), shuffleButton),
      ...(openBar ? [openBar] : []),
      h('div', { class: 'table' }, h('div', { class: 'pile-wrap' }, pile, emptyHint), hand),
    ),
  );

  startRound();
}
