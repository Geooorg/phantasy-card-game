// Erzeugt die App-Icons (PWA) aus dem Kompass-Kartenrücken. Einmalig ausführen: node scripts/make-icons.mjs
import sharp from 'sharp';

const SOURCE = 'assets/decks/kids/back.png';
const OUT = 'public/icons';
const PAPER = '#f6efe2';

/** Quadratisches Icon: Kompass auf Papierfarbe; `content` = Anteil der Kantenlänge, den die Karte einnimmt. */
async function icon(file, size, content) {
  const inner = Math.round(size * content);
  const card = await sharp(SOURCE).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
    .composite([{ input: card, gravity: 'center' }])
    .png({ palette: true })
    .toFile(`${OUT}/${file}`);
  console.log(file);
}

await icon('icon-192.png', 192, 0.86);
await icon('icon-512.png', 512, 0.86);
await icon('icon-maskable-512.png', 512, 0.6); // maskable: Inhalt innerhalb der sicheren Zone (80 %)
await icon('apple-touch-icon.png', 180, 0.86);
