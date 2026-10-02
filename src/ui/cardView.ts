import type { Card } from '../decks/types';
import { h } from './dom';

/** Eine Karte mit Vorder- und Rückseite. Verdeckt zeigt sie `backImage`, offen die Karte selbst. */
export function createCard(card: Card, backImage: string, faceDown: boolean): HTMLButtonElement {
  const back = h('img', { class: 'card__face card__face--back', src: backImage, alt: '', draggable: 'false' });
  const front = h('img', {
    class: 'card__face card__face--front',
    src: card.image,
    alt: 'Spielkarte',
    draggable: 'false',
  });
  return h(
    'button',
    {
      class: faceDown ? 'card' : 'card is-flipped',
      type: 'button',
      'aria-label': faceDown ? 'Verdeckte Karte' : 'Karte vergrößern',
    },
    h('span', { class: 'card__inner' }, back, front),
  );
}

/** Dreht eine verdeckte Karte nach `delayMs` um (die Pause lässt den Browser den Startzustand zeichnen). */
export function flipUp(el: HTMLElement, delayMs = 0): void {
  window.setTimeout(() => {
    el.classList.add('is-flipped');
    el.setAttribute('aria-label', 'Karte vergrößern');
  }, delayMs + 50);
}
