// Rendert die gezeichneten SVG-Karten zu PNGs in assets/decks/<deck>/cards/.
//
//   node scripts/svg-cards/render.mjs                 alle Karten
//   node scripts/svg-cards/render.mjs kids/085 ...    nur bestimmte Karten
//   node scripts/svg-cards/render.mjs --out <dir>     PNGs (und SVGs) woanders ablegen
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { cardSvg } from './lib.mjs';
import kids from './kids.mjs';
import erwachsene from './erwachsene.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const outDir = outIdx >= 0 ? path.resolve(args.splice(outIdx, 2)[1]) : null;
const only = new Set(args);

const decks = { kids, erwachsene };
let count = 0;
for (const [deck, cards] of Object.entries(decks)) {
  for (const card of cards) {
    const key = `${deck}/${card.file}`;
    if (only.size && !only.has(key)) continue;
    const svg = cardSvg(deck, card.svg, Number(card.file) * 13 + (deck === 'kids' ? 0 : 500));
    const dir = outDir ? path.join(outDir, deck) : path.join(root, 'assets/decks', deck, 'cards');
    fs.mkdirSync(dir, { recursive: true });
    if (outDir) fs.writeFileSync(path.join(dir, `${card.file}.svg`), svg);
    await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(path.join(dir, `${card.file}.png`));
    count++;
  }
}
console.log(`${count} Karte(n) gerendert${outDir ? ` nach ${outDir}` : ''}.`);
