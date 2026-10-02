import { h } from './dom';

/** Zeigt eine Karte groß; Klick oder Escape schließt. */
export function showZoom(image: string): void {
  const overlay = h(
    'div',
    { class: 'zoom', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Karte vergrößert' },
    h('img', { class: 'zoom__img', src: image, alt: 'Spielkarte, vergrößert' }),
  );
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') close();
  };
  function close() {
    overlay.remove();
    document.removeEventListener('keydown', onKey);
  }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  document.body.append(overlay);
}
