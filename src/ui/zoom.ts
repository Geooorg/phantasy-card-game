import { h } from './dom';

let open: HTMLElement | null = null;

/** Zeigt eine Karte groß; Klick oder Escape schließt. */
export function showZoom(image: string): void {
  if (open) return;
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
    open = null;
    document.removeEventListener('keydown', onKey);
  }
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', onKey);
  document.body.append(overlay);
  open = overlay;
}
