import './styles.css';
import { loadDecks } from './decks/loader';
import type { Deck } from './decks/types';
import { h } from './ui/dom';
import { renderSelectScreen } from './ui/selectScreen';
import { renderTableScreen } from './ui/tableScreen';

const root = document.getElementById('app');
if (!root) throw new Error('Element #app fehlt in index.html');
const app: HTMLElement = root;

function showError(message: string): void {
  app.replaceChildren(
    h(
      'main',
      { class: 'screen' },
      h('h1', {}, 'Fantasie-Game'),
      h('p', { class: 'error', role: 'alert' }, message),
    ),
  );
}

function start(): void {
  let decks: Deck[];
  try {
    decks = loadDecks();
  } catch (error) {
    showError(error instanceof Error ? error.message : String(error));
    return;
  }
  const showSelect = () =>
    renderSelectScreen(app, decks, (deck) => renderTableScreen(app, deck, showSelect));
  showSelect();
}

start();
