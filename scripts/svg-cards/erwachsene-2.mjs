// Gezeichnete Karten für das Erwachsenen-Deck, zweite Serie (Nummern ab 073).
import { cloud, flame, star, sparkle, bird, person, dashed, rotated } from './lib.mjs';
import { G, car, fir, bareTree, rng } from './erwachsene.mjs';

const D = '#2e2e2e';

/** Gruppe mit eigenem Koordinatensystem; Strichstärke bleibt optisch gleich. */
const local = (x, y, s, inner, flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" stroke-width="${(4.5 / s).toFixed(2)}">${inner}</g>`;

/** Weinglas, Fuß bei (x,y). */
const glass = (x, y, wine = true) => `
  <path d="M${x - 24} ${y - 118} Q${x - 28} ${y - 70} ${x} ${y - 64} Q${x + 28} ${y - 70} ${x + 24} ${y - 118} Z"/>
  ${wine ? `<path fill="url(#dark)" stroke-width="3" d="M${x - 26} ${y - 92} Q${x - 24} ${y - 70} ${x} ${y - 67} Q${x + 24} ${y - 70} ${x + 26} ${y - 92} Z"/>` : ''}
  <path fill="none" d="M${x} ${y - 64} V${y - 8}"/><ellipse cx="${x}" cy="${y - 6}" rx="20" ry="5"/>`;

/** Flasche, Boden bei (x,y). */
const bottle = (x, y) => `
  <path fill="url(#dark)" d="M${x - 22} ${y} V${y - 110} Q${x - 22} ${y - 135} ${x - 8} ${y - 145} V${y - 178} H${x + 8} V${y - 145} Q${x + 22} ${y - 135} ${x + 22} ${y - 110} V${y} Z"/>
  <rect x="${x - 16}" y="${y - 90}" width="32" height="40" stroke-width="3"/>`;

/** Bein für Pferd/Hund: oben bei (x, top), Länge len, gedreht um a Grad. */
const leg = (x, top, len, w, a, fill = '#fff') =>
  `<path fill="${fill}" transform="rotate(${a} ${x + w / 2} ${top})" d="M${x} ${top} L${x + 1} ${top + len} L${x + w + 1} ${top + len} L${x + w} ${top} Z M${x + 1} ${top + len - 12} H${x + w + 1}"/>`;

/** Pferd von der Seite (nach rechts), Fußpunkt (x,y). */
function horse(x, y, s, { flip = false, gallop = false, rider = false, fill = '#fff' } = {}) {
  const [f1, f2, b1, b2] = gallop ? [-42, -18, 38, 18] : [0, 5, 0, -5];
  return local(x, y, s, `
    ${leg(200, -112, 108, 16, f2, G)} ${leg(86, -112, 108, 16, b2, G)}
    <path fill="none" stroke-width="7" d="M46 -146 C18 -132, 12 -92, 22 ${gallop ? -100 : -56}"/>
    <path fill="${fill}" d="M45 -150 C70 -168, 150 -165, 185 -160 L215 -215 L232 -238 L240 -258 L246 -236 L282 -196 Q290 -184 276 -180 L246 -190 L222 -150 C220 -120, 205 -105, 185 -105 L70 -105 C48 -105, 38 -125, 45 -150 Z"/>
    <path fill="url(#dark)" stroke-width="3" d="M186 -162 L212 -218 L230 -240 L226 -212 L204 -170 Z"/>
    <circle cx="250" cy="-220" r="4" fill="${D}"/><circle cx="278" cy="-188" r="2.5" fill="${D}"/>
    ${leg(176, -112, 108, 16, f1, fill)} ${leg(60, -112, 108, 16, b1, fill)}
    ${rider ? `
    <path fill="none" stroke-width="11" d="M135 -172 L152 -130 L146 -100"/>
    <path fill="url(#hatchg)" d="M118 -238 Q140 -246 162 -236 L168 -168 L116 -168 Z"/>
    <path fill="none" stroke-width="7" d="M158 -222 L205 -192"/><path fill="none" stroke-width="2.5" d="M205 -192 L262 -196"/>
    <circle cx="142" cy="-264" r="20"/><path fill="${D}" d="M120 -266 Q142 -294 164 -266 Z"/>` : ''}`, flip);
}

/** Wolf von der Seite (nach rechts), Fußpunkt (x,y). */
const wolf = (x, y, s, { flip = false, rotate = 0 } = {}) =>
  `<g transform="rotate(${rotate} ${x} ${y})">${local(x, y, s, `
    <path fill="url(#dark)" d="M52 -92 C25 -88, 12 -62, 6 -40 C26 -54, 42 -62, 56 -70 Z"/>
    <path fill="none" stroke-width="9" d="M72 -60 L68 0 M164 -60 L162 0"/>
    <path fill="url(#dark)" d="M50 -95 C80 -112, 150 -112, 175 -102 L195 -128 L200 -154 L213 -130 L224 -124 L252 -102 L254 -92 L222 -86 L202 -72 L182 -52 L62 -56 C45 -60, 42 -80, 50 -95 Z"/>
    <path fill="none" stroke-width="9" d="M92 -58 L98 0 M180 -58 L186 0"/>
    <path fill="#fff" stroke-width="2" d="M210 -116 L226 -112 L212 -108 Z"/>`, flip)}</g>`;

/** Hund von der Seite (nach rechts), Fußpunkt (x,y). */
const dog = (x, y, s, flip = false) => local(x, y, s, `
  <path fill="none" stroke-width="7" d="M22 -55 Q6 -76 14 -96"/>
  <path fill="none" stroke-width="8" d="M50 -34 L52 0 M108 -36 L110 0"/>
  <path fill="url(#hatchg)" d="M20 -40 Q20 -62 40 -63 L100 -63 Q112 -62 113 -55 L113 -40 Q112 -32 100 -32 L35 -32 Q20 -32 20 -40 Z"/>
  <path fill="none" stroke-width="8" d="M35 -34 L35 0 M95 -34 L95 0"/>
  <circle cx="120" cy="-78" r="21"/>
  <path d="M132 -84 L154 -79 Q158 -68 148 -66 L130 -68 Z"/><circle cx="153" cy="-76" r="3" fill="${D}"/>
  <path fill="url(#dark)" stroke-width="3" d="M110 -92 Q98 -80 104 -60 Q116 -70 116 -90 Z"/>
  <circle cx="126" cy="-84" r="3" fill="${D}"/>`, flip);

/** Pistole, Griff bei (x,y), zeigt nach rechts. */
const pistol = (x, y, s = 1, flip = false) => local(x, y, s, `
  <path fill="${D}" d="M0 -18 H72 V-4 H32 L26 26 H8 L14 -4 H0 Z"/><path fill="none" stroke-width="4" d="M18 -4 Q22 12 34 -4"/>`, flip);

/** Hut (Fedora) auf einem Kopf mit Mittelpunkt (cx,cy) und Radius r. */
const hat = (cx, cy, r) => `
  <path fill="url(#dark)" d="M${cx - r * 0.85} ${cy - r * 0.55} L${cx - r * 0.7} ${cy - r * 1.45} Q${cx} ${cy - r * 1.75} ${cx + r * 0.7} ${cy - r * 1.45} L${cx + r * 0.85} ${cy - r * 0.55} Z"/>
  <ellipse cx="${cx}" cy="${cy - r * 0.55}" rx="${r * 1.5}" ry="${r * 0.28}" fill="url(#dark)"/>`;

/** Sieben-Segment-Ziffern, z. B. „00:07“. */
function digits(text, x, y, w = 34, h = 60) {
  const map = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
  const t = 7;
  let out = '';
  for (const ch of text) {
    if (ch === ':') {
      out += `<circle cx="${x + 6}" cy="${y + h * 0.3}" r="4"/><circle cx="${x + 6}" cy="${y + h * 0.7}" r="4"/>`;
      x += 18;
      continue;
    }
    const seg = {
      a: [x + 4, y, w - 8, t], b: [x + w - t, y + 4, t, h / 2 - 6], c: [x + w - t, y + h / 2 + 2, t, h / 2 - 6],
      d: [x + 4, y + h - t, w - 8, t], e: [x, y + h / 2 + 2, t, h / 2 - 6], f: [x, y + 4, t, h / 2 - 6], g: [x + 4, y + h / 2 - t / 2, w - 8, t],
    };
    for (const k of map[ch]) out += `<rect x="${seg[k][0]}" y="${seg[k][1]}" width="${seg[k][2]}" height="${seg[k][3]}" rx="2"/>`;
    x += w + 10;
  }
  return `<g fill="${D}" stroke="none">${out}</g>`;
}

/** Augenmaske (Maskenball/Einbrecher) über Kopf (cx,cy) mit Radius r. */
const mask = (cx, cy, r, fill = D) =>
  `<path fill="${fill}" stroke-width="2.5" d="M${cx - r * 1.05} ${cy - r * 0.25} Q${cx} ${cy - r * 0.55} ${cx + r * 1.05} ${cy - r * 0.25} Q${cx + r * 0.9} ${cy + r * 0.25} ${cx + r * 0.35} ${cy + r * 0.15} Q${cx} ${cy} ${cx - r * 0.35} ${cy + r * 0.15} Q${cx - r * 0.9} ${cy + r * 0.25} ${cx - r * 1.05} ${cy - r * 0.25} Z"/>
   <ellipse cx="${cx - r * 0.42}" cy="${cy - r * 0.12}" rx="${r * 0.2}" ry="${r * 0.11}" fill="#fff" stroke="none"/><ellipse cx="${cx + r * 0.42}" cy="${cy - r * 0.12}" rx="${r * 0.2}" ry="${r * 0.11}" fill="#fff" stroke="none"/>`;

/** Lichtkegel (Taschenlampe, Scheinwerfer). */
const beam = (x1, y1, x2a, y2a, x2b, y2b) =>
  `<path fill="#fff" fill-opacity="0.85" stroke-width="3" stroke-dasharray="12 9" d="M${x1} ${y1} L${x2a} ${y2a} L${x2b} ${y2b} Z"/>`;

/** Fledermaus-/Krähen-Silhouette. */
const crow = (x, y, s = 1) =>
  `<path fill="${D}" stroke-width="2" transform="translate(${x} ${y}) scale(${s})" d="M-34 -4 Q-18 -18 -4 -4 L0 -10 L4 -4 Q18 -18 34 -4 Q16 -8 4 4 L0 8 L-4 4 Q-16 -8 -34 -4 Z"/>`;

/** Gezackter Blitz von (x,y) nach unten. */
const bolt = (x, y, s = 1) =>
  `<path fill="#fff" transform="translate(${x} ${y}) scale(${s})" d="M0 0 L-30 70 L-5 70 L-35 140 L30 50 L5 50 L30 0 Z"/>`;

const snowfall = (seed, n, yMax = 520) => {
  const r = rng(seed);
  return Array.from({ length: n }, () =>
    `<circle cx="${(40 + r() * 630).toFixed(0)}" cy="${(40 + r() * (yMax - 40)).toFixed(0)}" r="${(2.5 + r() * 4).toFixed(1)}" stroke-width="2.5"/>`).join('');
};

export default [
  {
    file: '073',
    title: 'Weinverkostung',
    tags: 'Wein, Verkostung, Weinkeller, Gläser, Genuss',
    svg: `
  <path fill="none" d="M50 440 V210 Q355 40 660 210 V440"/>
  <path fill="none" stroke-width="3" d="M150 150 L170 190 M260 95 L270 135 M355 80 V120 M450 95 L440 135 M560 150 L540 190"/>
  ${[[115, 390], [210, 390], [162, 300], [500, 390], [595, 390], [548, 300]].map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="47" fill="url(#hatchg)"/><circle cx="${x}" cy="${y}" r="33"/><circle cx="${x}" cy="${y}" r="8" fill="${G}"/>`).join('')}
  <rect x="50" y="440" width="610" height="22" fill="url(#hatchg)"/>
  <path d="M60 462 H650 L640 640 H70 Z"/>
  <path fill="none" stroke-width="3" d="M150 462 Q160 560 140 640 M355 462 V640 M560 462 Q550 560 570 640"/>
  ${glass(215, 440)} ${glass(300, 440)} ${glass(520, 440, false)}
  ${bottle(410, 440)}
  <path fill="${G}" d="M560 440 h90 v-10 h-90 Z"/>
  <path fill="#fff" stroke-width="3" d="M575 430 L600 400 L620 430 Z M615 430 L630 410 L645 430 Z"/>
  ${[[110, 410], [124, 424], [96, 424], [110, 438], [138, 410], [82, 410]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="url(#hatch)" stroke-width="3"/>`).join('')}
  <path fill="none" stroke-width="3" d="M110 400 Q115 385 128 382"/>`,
  },
  {
    file: '074',
    title: 'Lasertag',
    tags: 'Lasertag, Spiel, Dunkelheit, Laser, Team',
    svg: `
  <rect x="10" y="10" width="690" height="690" fill="url(#dark)" stroke="none"/>
  <path fill="#fff" d="M50 380 H230 V610 H50 Z"/><path fill="none" stroke-width="3" d="M50 450 H230 M50 530 H230 M140 380 V610"/>
  <path fill="#fff" d="M450 470 H660 V610 H450 Z"/><path fill="#fff" d="M560 250 H660 V470 H560 Z"/>
  <path fill="none" stroke-width="3" d="M450 540 H660 M610 250 V470"/>
  <path fill="#fff" d="M20 610 H690 V700 H20 Z"/>
  ${person(285, 610, 240, { fill: 'url(#hatchg)', arms: 'M314 456 L380 448 M250 456 L330 470' })}
  <rect x="350" y="436" width="56" height="18" rx="4" fill="${D}"/>
  <circle cx="285" cy="440" r="7" fill="#fff"/>
  ${person(520, 470, 190, { fill: 'url(#hatch)', arms: 'M494 350 L440 372 M546 350 L470 382' })}
  <rect x="404" y="364" width="48" height="16" rx="4" fill="${D}"/>
  <circle cx="520" cy="355" r="6" fill="#fff"/>
  <path fill="none" stroke-width="11" d="M406 444 L640 140 M404 368 L120 250"/>
  <path fill="none" stroke="#fff" stroke-width="5" d="M406 444 L640 140 M404 368 L120 250"/>
  ${[[640, 140], [120, 250]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="#fff"/>`).join('')}
  <path fill="none" stroke="#fff" stroke-width="4" d="M650 110 l16 -16 M670 140 h20 M100 230 l-14 -14 M95 262 l-18 6"/>`,
  },
  {
    file: '075',
    title: 'Beachvolleyball',
    tags: 'Beachvolleyball, Strand, Sport, Sommer, Spiel',
    svg: `
  <circle cx="600" cy="100" r="40"/>
  <path fill="url(#hatch)" d="M20 250 H690 V280 H20 Z"/>
  <path fill="none" stroke-width="3.5" d="M80 120 Q90 180 82 250 M82 122 q-40 -10 -60 20 M82 122 q40 -14 70 10 M82 122 q-20 -30 -50 -30 M82 122 q24 -30 56 -24"/>
  ${person(290, 420, 150, { fill: 'url(#hatch)', arms: 'up' })}
  <path fill="none" d="M80 290 V560 M630 290 V560"/>
  <rect x="80" y="290" width="550" height="16" fill="#fff"/>
  <path fill="none" stroke-width="2.5" d="${Array.from({ length: 25 }, (_, i) => `M${102 + i * 22} 306 V360`).join(' ')} M80 324 H630 M80 342 H630 M80 360 H630"/>
  <path fill="${G}" d="M20 520 Q200 500 360 515 T690 505 L690 700 L20 700 Z"/>
  <path fill="none" stroke-width="3" d="M120 600 q10 -6 20 0 M400 640 q10 -6 20 0 M560 580 q10 -6 20 0"/>
  ${person(380, 560, 250, { fill: 'url(#hatchg)', arms: 'M406 400 L440 300 M354 400 L330 330', legs: false })}
  <path fill="none" d="M368 500 L340 560 M392 500 L420 545 L400 575"/>
  <circle cx="455" cy="230" r="34"/>
  <path fill="none" stroke-width="3.5" d="M425 220 Q455 200 485 225 M440 258 Q450 230 470 200"/>
  <path fill="none" stroke-width="3.5" d="M500 190 l20 -14 M505 230 h24"/>`,
  },
  {
    file: '076',
    title: 'Angeln am Steg',
    tags: 'Angeln, See, Fisch, Steg, Ruhe',
    svg: `
  <path d="M110 80 A36 36 0 1 0 146 136 A28 28 0 1 1 110 80 Z" stroke-width="3.5"/>
  <path fill="url(#hatch)" d="M20 360 Q120 300 220 340 Q320 290 420 340 L420 400 L20 400 Z"/>
  <path fill="${G}" d="M20 400 H690 V700 H20 Z" stroke="none"/>
  <path fill="none" d="M20 400 Q60 390 100 400 T180 400 T260 400 T340 400 T420 400 T500 400 T580 400 T660 400 T740 400"/>
  <path fill="none" d="M60 400 V520 M200 400 V540 M320 400 V520"/>
  <rect x="30" y="378" width="320" height="22" fill="url(#hatchg)"/>
  <path fill="none" stroke-width="3" d="M90 378 V400 M150 378 V400 M210 378 V400 M270 378 V400"/>
  <path d="M60 378 L64 340 L100 340 L104 378 Z"/>
  <path fill="none" stroke-width="8" d="M250 380 L280 410 L275 450 M268 380 L300 405 L298 445"/>
  <path fill="url(#hatchg)" d="M225 300 Q250 292 275 300 L282 382 L222 382 Z"/>
  <circle cx="252" cy="270" r="26"/><path fill="${D}" d="M226 268 Q252 236 278 268 Z"/><path fill="none" stroke-width="6" d="M220 266 H284"/>
  <path fill="none" d="M270 320 L300 330"/>
  <path fill="none" stroke-width="5" d="M298 334 Q420 180 560 150"/>
  <path fill="none" stroke-width="2" d="M560 150 L560 392 M560 410 V478"/>
  <ellipse cx="560" cy="400" rx="9" ry="12" fill="url(#hatch)" stroke-width="3"/>
  <path fill="none" stroke-width="3" d="M560 478 q-10 10 0 18 q8 4 10 -6"/>
  <path fill="url(#dark)" d="M650 560 C620 520, 520 510, 460 540 L420 520 L428 556 L414 590 L462 572 C520 600, 620 600, 650 560 Z"/>
  <path fill="#fff" d="M645 548 L610 556 L645 566 Z"/>
  <circle cx="620" cy="545" r="5" fill="#fff" stroke="none"/>
  <path fill="#fff" stroke-width="3" d="M150 600 q20 -12 40 0 l14 -10 v20 l-14 -10 q-20 12 -40 0"/>
  <circle cx="590" cy="500" r="5"/><circle cx="600" cy="478" r="4"/>`,
  },
  {
    file: '077',
    title: 'Wald mit Wölfen',
    tags: 'Wölfe, Wald, Nacht, Vollmond, Gefahr',
    svg: `
  <circle cx="420" cy="170" r="105"/>
  ${sparkle(120, 80, 7)} ${sparkle(640, 90, 8)} ${sparkle(200, 170, 6)}
  ${fir(80, 470, 330, 'url(#dark)')} ${fir(170, 520, 260, 'url(#dark)')} ${fir(620, 480, 320, 'url(#dark)')} ${fir(540, 520, 220, 'url(#dark)')}
  <path fill="url(#hatchg)" d="M300 470 Q330 400 400 395 Q470 400 500 470 Z"/>
  ${wolf(330, 412, 1.0, { rotate: -28 })}
  <path fill="${G}" d="M20 470 Q200 450 360 470 T690 460 L690 700 L20 700 Z"/>
  ${wolf(90, 640, 1.1)}
  ${wolf(620, 610, 0.9, { flip: true })}
  ${[[200, 380], [235, 382], [480, 560], [508, 562]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#fff" stroke-width="2.5"/>`).join('')}
  <path fill="none" stroke-width="3" d="M300 300 l-10 -18 M318 290 l-4 -22 M336 296 l6 -20"/>`,
  },
  {
    file: '078',
    title: 'Banküberfall mit Pistole',
    tags: 'Überfall, Pistole, Bank, Bedrohung, Krimi',
    svg: `
  <circle cx="600" cy="100" r="36"/><path fill="none" stroke-width="4" d="M600 100 V76 M600 100 L616 108"/>
  <path fill="none" d="M300 60 H500"/><path fill="${G}" d="M330 60 h140 v40 h-140 Z"/>
  ${person(480, 440, 280, { fill: 'url(#hatchg)', arms: 'up', legs: false })}
  <path fill="none" stroke-width="4" d="M425 230 q-6 12 0 18 M540 230 q6 12 0 18"/>
  <circle cx="470" cy="200" r="4" fill="${D}"/><circle cx="492" cy="200" r="4" fill="${D}"/><ellipse cx="481" cy="222" rx="7" ry="9"/>
  <path fill="none" stroke-width="3" d="M300 170 V420 M660 170 V420 M300 170 H660 M330 200 L380 150 M600 260 L650 210"/>
  <rect x="40" y="420" width="630" height="28" fill="url(#hatchg)"/>
  <path d="M40 448 H670 V700 H40 Z" fill="url(#hatch)"/>
  <path fill="#fff" stroke-width="3" d="M560 420 h60 v-14 h-60 Z M565 406 h50 v-14 h-50 Z"/>
  ${person(170, 760, 470, { fill: 'url(#dark)', arms: 'M240 430 L360 395', legs: false })}
  <path fill="${D}" d="M117 360 Q120 300 170 300 Q222 300 225 360 Q170 346 117 360 Z"/>
  <path fill="${D}" d="M115 372 Q170 360 226 372 L226 396 Q170 386 115 396 Z"/>
  <ellipse cx="195" cy="385" rx="12" ry="6" fill="#fff" stroke="none"/>
  ${pistol(352, 400, 1.15)}
  <path fill="none" stroke-width="4" d="M450 390 l16 -12 M455 410 h22"/>`,
  },
  {
    file: '079',
    title: 'Ausritt',
    tags: 'Pferd, Reiten, Galopp, Natur, Freiheit',
    svg: `
  <circle cx="590" cy="110" r="38"/> ${cloud(90, 150, 130)} ${bird(320, 110)} ${bird(360, 135, 0.8)}
  <path fill="url(#hatch)" d="M20 330 Q150 260 300 310 Q450 250 690 320 L690 360 L20 360 Z"/>
  <path fill="${G}" d="M20 360 H690 V700 H20 Z" stroke="none"/>
  <path fill="none" d="M20 360 H690"/>
  ${fir(90, 400, 140, 'url(#hatchg)')} ${fir(640, 390, 120, 'url(#hatchg)')}
  <path fill="#fff" d="M360 700 C380 620, 300 560, 380 470 C400 450, 440 440, 470 420 L520 420 C480 450, 450 470, 440 500 C410 580, 480 640, 470 700 Z"/>
  ${horse(140, 590, 1.35, { gallop: true, rider: true })}
  <path fill="none" stroke-width="4" d="M120 520 h-40 M130 560 h-50 M150 470 h-36"/>
  ${cloud(120, 600, 60, `fill="${G}"`)}`,
  },
  {
    file: '080',
    title: 'Bauernhof mit Pferd und Hund',
    tags: 'Bauernhof, Pferd, Hund, Scheune, Land',
    svg: `
  <circle cx="610" cy="90" r="34"/> ${bird(470, 90)} ${bird(510, 110, 0.8)}
  <path fill="url(#hatch)" d="M330 230 L470 130 L610 230 Z"/>
  <rect x="345" y="230" width="250" height="250" fill="url(#hatchg)"/>
  <path fill="#fff" d="M420 480 V340 H520 V480 Z"/><path fill="none" d="M420 340 L520 480 M520 340 L420 480"/>
  <path fill="#fff" d="M445 300 h50 v28 h-50 Z"/>
  <circle cx="160" cy="210" r="90" fill="url(#hatch)"/><path fill="url(#hatchg)" d="M145 290 L140 480 L180 480 L172 290 Z"/>
  <path fill="${G}" d="M20 480 H690 V700 H20 Z" stroke="none"/><path fill="none" d="M20 480 H690"/>
  ${horse(60, 560, 1.15)}
  <path fill="none" stroke-width="6" d="M30 430 H330 M30 490 H330"/>
  <path fill="none" stroke-width="10" d="M50 410 V580 M190 410 V580 M320 410 V580"/>
  <path fill="#fff" d="M560 560 Q560 470 620 470 Q680 470 680 560 Z"/><path fill="none" stroke-width="3" d="M580 500 q20 -8 40 0 M600 530 q20 -8 40 0 M575 545 q20 -8 40 0"/>
  ${dog(360, 590, 1.1)}
  <path fill="none" stroke-width="3" d="M60 630 l-4 -16 M70 630 l4 -18 M480 640 l-4 -16 M490 640 l4 -18"/>`,
  },
  {
    file: '081',
    title: 'Sauna',
    tags: 'Sauna, Hitze, Entspannung, Dampf, Holz',
    svg: `
  <path fill="url(#hatchg)" stroke="none" d="M20 20 H690 V690 H20 Z"/>
  <path fill="none" stroke-width="2.5" d="${Array.from({ length: 12 }, (_, i) => `M20 ${60 + i * 50} H690`).join(' ')}"/>
  <rect x="470" y="80" width="150" height="230" fill="#fff"/><rect x="510" y="110" width="70" height="90" fill="url(#hatch)"/>
  <circle cx="595" cy="200" r="8"/>
  <path fill="#fff" d="M120 90 h70 v20 l-25 30 l25 30 v20 h-70 v-20 l25 -30 l-25 -30 Z"/>
  <path fill="url(#dark)" stroke-width="2.5" d="M135 175 L175 175 L155 160 Z"/>
  <rect x="40" y="420" width="420" height="30" fill="#fff"/><rect x="40" y="540" width="520" height="30" fill="#fff"/>
  <path fill="none" d="M60 450 V540 M440 450 V540 M60 570 V650 M540 570 V650"/>
  ${person(170, 470, 210, { fill: '#fff', arms: 'M146 340 L130 400 M194 340 L210 400', legs: false })}
  <path fill="url(#hatch)" d="M134 400 H206 L212 430 H128 Z"/>
  ${person(330, 470, 200, { fill: '#fff', arms: 'M352 345 L380 300 L340 300', legs: false })}
  <path fill="url(#hatch)" d="M296 402 H364 L370 430 H290 Z"/>
  <path fill="none" stroke-width="3" d="M150 300 q4 8 0 14 M318 312 q4 8 0 14"/>
  <rect x="560" y="480" width="110" height="170" fill="#fff"/><path fill="url(#dark)" d="M560 480 h110 v40 h-110 Z"/>
  ${[[575, 470], [600, 466], [628, 470], [655, 466], [588, 452], [618, 450], [645, 452]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="15" ry="10" fill="${G}" stroke-width="3"/>`).join('')}
  <path d="M600 650 L606 600 L654 600 L660 650 Z"/><path fill="none" stroke-width="5" d="M630 600 L600 560"/>
  ${cloud(560, 400, 90, 'fill="#fff" fill-opacity="0.9"')} ${cloud(470, 320, 70, 'fill="#fff" fill-opacity="0.9"')}
  <path fill="none" stroke-width="3" d="M590 330 q-10 -20 6 -36 M620 340 q-10 -20 6 -36"/>`,
  },
  {
    file: '082',
    title: 'Zeitbombe',
    tags: 'Bombe, Countdown, Kabel, Entschärfen, Spannung',
    svg: `
  ${[150, 230, 310, 390, 470].map((x, i) => `<rect x="${x}" y="${330 + (i % 2) * 10}" width="76" height="270" rx="12" fill="url(#hatchg)"/>`).join('')}
  <path fill="url(#dark)" d="M140 400 H560 V440 H140 Z M140 520 H560 V560 H140 Z"/>
  <rect x="220" y="220" width="270" height="140" rx="10"/>
  <rect x="240" y="245" width="230" height="90" fill="${G}"/>
  ${digits('00:07', 255, 260)}
  <path fill="none" stroke-width="7" d="M300 220 Q280 120 180 140 Q100 160 140 330"/>
  <path fill="none" stroke-width="12" d="M410 220 Q440 110 540 150 Q610 180 560 340"/>
  <path fill="none" stroke="#fff" stroke-width="5" d="M410 220 Q440 110 540 150 Q610 180 560 340"/>
  <path fill="none" stroke-width="7" d="M355 220 Q360 150 330 110"/>
  <path fill="url(#hatchg)" d="M640 60 L610 140 L590 132 L618 52 Z M600 80 L640 152 L622 162 L582 90 Z"/>
  <circle cx="612" cy="114" r="9"/>
  <path fill="none" stroke-width="4" d="M310 190 l-10 -16 M400 190 l10 -16 M200 300 l-16 -6"/>`,
  },
  {
    file: '083',
    title: 'Verfolgung über die Dächer',
    tags: 'Verfolgung, Dächer, Nacht, Sprung, Flucht',
    svg: `
  <circle cx="560" cy="110" r="50"/> ${sparkle(120, 80, 7)} ${sparkle(380, 70, 6)}
  <path fill="url(#hatch)" d="M20 330 H120 V260 H200 V300 H300 V230 H380 V320 H470 V280 H560 V340 H690 V400 H20 Z"/>
  <path fill="url(#hatchg)" d="M20 440 L240 440 L240 700 L20 700 Z"/>
  <path fill="url(#hatchg)" d="M400 470 L690 470 L690 700 L400 700 Z"/>
  ${[[60, 500], [140, 500], [60, 590], [140, 590], [450, 530], [540, 530], [630, 530], [450, 620], [630, 620]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="44" height="54" fill="${i % 3 ? '#fff' : G}" stroke-width="3.5"/>`).join('')}
  <path fill="none" stroke-width="6" d="M20 440 H240 M400 470 H690"/>
  <rect x="560" y="400" width="40" height="70" fill="url(#hatchg)"/>
  <path fill="none" stroke-width="3.5" d="M180 440 V360 M160 380 H200 M168 400 H192"/>
  ${beam(165, 330, 300, 330, 330, 500)}
  <g transform="rotate(-25 320 400)">${person(320, 480, 180, { fill: 'url(#hatch)', arms: 'M347 365 L400 345 M293 365 L250 390' })}</g>
  <path fill="none" stroke-width="4" d="M262 430 h-30 M258 460 h-36 M270 490 h-30"/>
  ${person(90, 440, 170, { fill: 'url(#dark)', arms: 'M112 333 L160 330 M68 333 L56 380' })}`,
  },
  {
    file: '084',
    title: 'Geheime Übergabe im Park',
    tags: 'Spionage, Übergabe, Umschlag, Park, Geheimnis',
    svg: `
  <circle cx="560" cy="200" r="100" fill="url(#hatch)"/><path fill="url(#hatchg)" d="M545 290 L540 520 L580 520 L572 290 Z"/>
  <path fill="none" d="M110 520 V170 Q110 140 140 140"/><path fill="${G}" d="M125 140 h44 l-8 22 h-28 Z"/>
  <path fill="none" stroke-width="3" stroke-dasharray="8 8" d="M135 166 L100 260 M158 166 L190 260"/>
  ${person(240, 520, 230, { fill: 'url(#dark)', arms: 'M214 368 L240 430 M266 368 L300 420', legs: false })}
  ${hat(240, 327, 28)}
  <rect x="180" y="350" width="110" height="80" fill="#fff" transform="rotate(-6 235 390)"/>
  <path fill="none" stroke-width="3" transform="rotate(-6 235 390)" d="M190 368 H280 M190 385 H250 M260 385 H280 M190 400 H280 M190 415 H240"/>
  ${person(470, 520, 230, { fill: 'url(#hatchg)', arms: 'M444 368 L410 420 M496 368 L510 430', legs: false })}
  ${hat(470, 327, 28)}
  <rect x="120" y="440" width="440" height="20" fill="url(#hatchg)"/>
  <rect x="120" y="470" width="440" height="18" fill="url(#hatchg)"/>
  <path fill="none" d="M150 488 V560 M530 488 V560 M150 460 V470 M530 460 V470"/>
  <path d="M340 440 L346 420 L400 424 L394 440 Z"/><path fill="none" stroke-width="3" d="M346 420 L372 434 L400 424"/>
  <path fill="none" d="M20 560 H690"/>
  <circle cx="640" cy="380" r="16" fill="#fff"/><path fill="${D}" d="M620 368 h40 v14 h-40 Z"/>
  <path fill="none" stroke-width="3" d="M628 360 l-6 -12 M650 360 l6 -12"/>`,
  },
  {
    file: '085',
    title: 'Verhör',
    tags: 'Verhör, Polizei, Lampe, Verdächtiger, Krimi',
    svg: `
  <path fill="url(#hatchg)" stroke="none" d="M20 20 H690 V690 H20 Z"/>
  <rect x="440" y="110" width="220" height="150" fill="url(#dark)"/>
  <path fill="none" stroke="#fff" stroke-width="3" d="M470 240 L540 130 M520 250 L600 125"/>
  <path fill="none" d="M300 20 V100"/><path fill="${G}" d="M260 100 h80 l20 30 h-120 Z"/>
  <path fill="#fff" stroke-width="3" stroke-dasharray="12 9" d="M250 130 L350 130 L520 520 L80 520 Z"/>
  ${person(200, 520, 250, { fill: 'url(#hatch)', arms: 'M176 365 L200 440 M224 365 L260 440', legs: false })}
  <path fill="none" stroke-width="4" d="M188 328 q6 -4 12 0 M206 328 q6 -4 12 0 M150 300 q-8 10 -2 18"/>
  ${person(440, 560, 330, { fill: 'url(#dark)', arms: 'M406 352 L380 450 M474 352 L470 450' })}
  <rect x="60" y="450" width="480" height="20" fill="#fff"/>
  <path fill="none" d="M90 470 V640 M510 470 V640"/>
  <path fill="url(#hatchg)" d="M300 450 L312 430 L380 432 L372 450 Z"/>
  <path d="M120 450 V420 H150 V450 Z"/><path fill="none" stroke-width="3" d="M125 410 q-6 -12 2 -22"/>
  <path fill="none" d="M20 640 H690"/>`,
  },
  {
    file: '086',
    title: 'Pokerrunde',
    tags: 'Poker, Karten, Glücksspiel, Einsatz, Bluff',
    svg: `
  <path fill="none" d="M355 20 V120"/><path fill="${G}" d="M290 120 h130 l30 40 h-190 Z"/>
  <path fill="#fff" stroke-width="3" stroke-dasharray="12 9" d="M290 160 L420 160 L560 380 L150 380 Z"/>
  ${person(120, 480, 300, { fill: 'url(#dark)', legs: false, arms: 'M80 310 L140 390' })}
  ${hat(120, 278, 34)}
  ${person(590, 480, 300, { fill: 'url(#hatch)', legs: false, arms: 'M630 310 L560 380' })}
  ${person(355, 390, 220, { fill: 'url(#hatchg)', legs: false, arms: 'none' })}
  <ellipse cx="355" cy="480" rx="330" ry="120" fill="url(#hatchg)"/>
  <ellipse cx="355" cy="480" rx="300" ry="100"/>
  ${[[240, 470], [270, 490], [420, 500], [455, 475]].map(([x, y], i) => Array.from({ length: 3 + i }, (_, k) =>
    `<ellipse cx="${x}" cy="${y - k * 9}" rx="20" ry="7" fill="${(k + i) % 2 ? '#fff' : G}" stroke-width="3"/>`).join('')).join('')}
  <g transform="rotate(-12 330 540)"><rect x="300" y="500" width="56" height="80" rx="6"/><path fill="${D}" d="M328 520 C318 534, 310 540, 318 550 C322 556, 328 554, 328 550 L324 564 H332 L328 550 C328 554, 334 556, 338 550 C346 540, 338 534, 328 520 Z" stroke="none"/></g>
  <g transform="rotate(14 400 540)"><rect x="372" y="500" width="56" height="80" rx="6" fill="url(#hatch)"/></g>
  <path fill="none" stroke-width="3" d="M520 420 q-8 -20 6 -36 q12 -16 0 -32"/><ellipse cx="530" cy="430" rx="24" ry="8"/>`,
  },
  {
    file: '087',
    title: 'Kletterer an der Felswand',
    tags: 'Klettern, Felswand, Seil, Abgrund, Mut',
    svg: `
  ${cloud(40, 620, 200, `fill="${G}"`)} ${cloud(240, 660, 160, `fill="${G}"`)} ${bird(150, 200)} ${bird(200, 240, 0.8)}
  <path fill="url(#hatchg)" d="M360 20 L690 20 L690 700 L300 700 L340 600 L310 520 L360 420 L330 330 L380 240 L350 140 Z"/>
  <path fill="none" stroke-width="3.5" d="M420 100 L470 160 L450 220 M500 300 L560 330 M420 470 L480 500 L470 560 M600 200 L640 260 M560 620 L620 650"/>
  <path fill="#fff" d="M470 120 H600 V140 H470 Z"/>
  ${person(540, 120, 120, { fill: 'url(#hatch)', arms: 'M530 50 L500 90 M550 50 L520 100' })}
  <circle cx="480" cy="140" r="6" fill="${D}"/>
  <path fill="none" stroke-width="3" d="M480 140 Q420 260 395 390"/>
  <g transform="rotate(10 395 470)">${person(395, 520, 170, { fill: 'url(#hatchg)', arms: 'M375 402 L365 340 M415 402 L440 430' })}</g>
  <path fill="none" stroke-width="5" d="M378 520 L420 540 M400 525 L360 560"/>
  <path fill="url(#dark)" d="M300 560 L320 550 L328 570 L306 576 Z M270 620 L285 612 L292 628 L276 632 Z"/>
  <path fill="none" stroke-width="3" d="M325 530 v-14 M300 600 v-12"/>`,
  },
  {
    file: '088',
    title: 'Rettungsboot auf offener See',
    tags: 'Schiffbruch, Rettungsboot, Sturm, Meer, Überleben',
    svg: `
  ${cloud(30, 160, 260, 'fill="url(#dark)"')} ${cloud(320, 140, 280, 'fill="url(#dark)"')}
  ${rotated(560, 230, 10, '<line x1="560" y1="200" x2="560" y2="175" stroke-width="3.5"/>')}
  <circle cx="560" cy="230" r="14" fill="#fff"/>
  <path fill="none" stroke-width="3" stroke-dasharray="6 8" d="M560 250 Q590 340 620 420"/>
  <path fill="url(#hatchg)" d="M140 360 L250 240 L300 270 L200 390 Z"/>
  <path fill="none" stroke-width="3.5" d="M170 340 L270 250 M230 280 V220"/>
  <path fill="#fff" d="M20 400 Q100 360 180 400 Q260 350 340 400 Q420 360 500 400 Q580 350 690 400 L690 700 L20 700 Z"/>
  <g transform="rotate(-8 355 480)">
    <path fill="url(#hatchg)" d="M200 470 H520 L490 530 H230 Z"/>
    <path fill="none" stroke-width="3.5" d="M215 495 H505"/>
    ${person(280, 480, 120, { fill: 'url(#hatch)', legs: false, arms: 'M268 403 L250 360' })}
    ${person(360, 480, 115, { fill: 'url(#dark)', legs: false })}
    ${person(440, 480, 120, { fill: 'url(#hatch)', legs: false, arms: 'M452 403 L500 430' })}
  </g>
  <path fill="#fff" d="M20 520 Q90 490 160 525 Q140 480 200 480 Q250 500 230 540 L230 700 L20 700 Z"/>
  <path fill="#fff" d="M460 560 Q530 500 600 540 Q580 500 640 495 Q690 510 690 560 L690 700 L460 700 Z"/>
  <path fill="none" stroke-width="3.5" d="M60 600 q30 -18 60 0 M300 620 q30 -18 60 0 M540 630 q30 -18 60 0"/>`,
  },
  {
    file: '089',
    title: 'Fallschirmsprung',
    tags: 'Fallschirm, Sprung, Flugzeug, Höhe, Mut',
    svg: `
  <path fill="#fff" d="M60 110 L250 100 Q280 104 280 118 Q270 132 240 134 L80 134 Z"/>
  <path fill="url(#hatchg)" d="M150 104 L190 60 L210 60 L195 104 Z M150 130 L200 175 L218 172 L200 130 Z"/>
  <path fill="url(#hatchg)" d="M70 112 L50 80 L80 80 L95 110 Z"/>
  <path fill="none" stroke-width="3" d="M120 116 h10 M150 116 h10 M180 116 h10 M210 116 h10"/>
  <g transform="rotate(20 330 270)">${person(330, 330, 150, { fill: 'url(#hatch)', arms: 'M310 224 L262 200 M350 224 L398 200' })}</g>
  <path fill="none" stroke-width="3.5" d="M290 180 l-6 -20 M330 170 v-22 M370 180 l6 -20"/>
  <path fill="url(#hatchg)" d="M420 300 Q520 200 620 300 Q600 290 580 300 Q560 290 540 300 Q520 290 500 300 Q480 290 460 300 Q440 290 420 300 Z"/>
  <path fill="none" stroke-width="3" d="M500 300 Q505 250 520 225 M540 300 Q535 250 520 225"/>
  <path fill="none" stroke-width="2.5" d="M422 300 L510 400 M480 298 L512 400 M560 298 L528 400 M618 300 L530 400"/>
  ${person(520, 470, 90, { fill: 'url(#dark)', arms: 'M508 404 L510 400 M532 404 L530 400' })}
  ${cloud(80, 390, 160)} ${cloud(450, 560, 120)}
  <path fill="none" stroke-width="3.5" d="M20 600 Q355 560 690 600"/>
  <path fill="none" stroke-width="3" d="M80 600 L60 700 M200 588 L180 700 M330 582 L340 700 M470 585 L500 700 M600 594 L650 700 M30 640 Q355 610 690 650"/>
  <path fill="url(#hatch)" stroke-width="3" d="M210 640 L330 625 L338 700 L200 700 Z M480 640 L600 650 L630 700 L500 700 Z"/>`,
  },
  {
    file: '090',
    title: 'Eingestürzte Brücke',
    tags: 'Brücke, Einsturz, Auto, Abgrund, Bremsen',
    svg: `
  <path d="M100 100 A32 32 0 1 0 132 150 A24 24 0 1 1 100 100 Z" stroke-width="3.5"/> ${sparkle(600, 90, 7)}
  <path fill="url(#hatch)" d="M20 380 L180 380 L200 700 L20 700 Z"/>
  <path fill="url(#hatch)" d="M560 380 L690 380 L690 700 L540 700 Z"/>
  <path fill="${G}" d="M200 640 Q355 610 540 640 L540 700 L200 700 Z"/>
  <path fill="none" stroke-width="3.5" d="M240 660 q20 -10 40 0 M400 670 q20 -10 40 0"/>
  <path fill="url(#hatchg)" d="M20 380 H330 L320 396 L345 404 L325 420 H20 Z"/>
  <path fill="url(#hatchg)" d="M440 386 L460 372 L470 390 L690 380 V420 H460 Z"/>
  <path fill="none" d="M120 420 V700 M600 420 V700"/>
  <path fill="url(#hatchg)" d="M360 470 L400 450 L410 480 L372 496 Z M400 560 L428 548 L436 572 L408 580 Z"/>
  <path fill="none" stroke-width="3" d="M380 440 v-16 M420 530 v-14"/>
  ${car(80, 382, 200)}
  <path fill="none" stroke-width="3.5" stroke-dasharray="10 8" d="M282 340 L460 300 M282 360 L460 380"/>
  <path fill="none" stroke-width="5" d="M30 400 H90 M40 410 H96"/>
  <path fill="url(#hatchg)" d="M600 380 V300"/><path fill="#fff" d="M570 300 L600 250 L630 300 Z"/><path fill="none" stroke-width="5" d="M600 268 V286"/><circle cx="600" cy="294" r="3" fill="${D}"/>
  <path fill="none" stroke-width="4" d="M290 300 l14 -16 M298 330 h20"/>`,
  },
  {
    file: '091',
    title: 'Hubschrauber mit Suchscheinwerfer',
    tags: 'Hubschrauber, Suche, Nacht, Scheinwerfer, Flucht',
    svg: `
  <rect x="10" y="10" width="690" height="690" fill="url(#hatchg)" stroke="none"/>
  <path fill="none" stroke-width="6" d="M330 80 H660"/><path fill="none" d="M495 80 V100"/>
  <path fill="#fff" d="M430 160 Q430 100 500 100 L560 104 Q600 110 600 150 L590 180 L450 180 Q430 178 430 160 Z"/>
  <path fill="url(#hatch)" d="M445 150 Q448 115 490 112 L490 150 Z"/>
  <path fill="#fff" d="M600 130 L680 120 L680 140 L600 152 Z"/><path fill="none" d="M680 105 V150"/>
  <path fill="none" d="M460 180 L450 200 H580 M540 180 L550 200"/>
  <path fill="#fff" fill-opacity="0.95" stroke-width="3" stroke-dasharray="12 9" d="M480 185 L250 620 L540 650 Z"/>
  ${fir(90, 620, 260, 'url(#dark)')} ${fir(190, 640, 200, 'url(#dark)')} ${fir(620, 640, 240, 'url(#dark)')}
  ${fir(360, 620, 150, 'url(#hatch)')}
  <path fill="#fff" d="M20 620 Q200 600 360 625 T690 615 L690 700 L20 700 Z"/>
  ${person(150, 625, 130, { fill: 'url(#dark)', head: G, arms: 'M136 550 L130 590 M164 550 L170 590' })}
  <path fill="none" stroke-width="4" d="M600 70 l14 -12 M340 60 l-14 -10"/>`,
  },
  {
    file: '092',
    title: 'Waldbrand',
    tags: 'Feuer, Wald, Brand, Feuerwehr, Rauch',
    svg: `
  ${cloud(60, 220, 220, `fill="${G}"`)} ${cloud(300, 170, 260, `fill="${G}"`)} ${cloud(500, 230, 180, `fill="${G}"`)}
  ${fir(110, 500, 260)} ${fir(240, 480, 230)} ${fir(400, 500, 260)} ${fir(560, 490, 220)}
  ${flame(110, 430, 150)} ${flame(250, 420, 130)} ${flame(400, 430, 160)} ${flame(565, 440, 120)}
  ${flame(110, 430, 80, 'stroke-width="3"')} ${flame(400, 430, 90, 'stroke-width="3"')}
  <path fill="${G}" d="M20 500 H690 V700 H20 Z" stroke="none"/><path fill="none" d="M20 500 H690"/>
  ${flame(180, 520, 70)} ${flame(320, 515, 60)} ${flame(480, 520, 70)}
  ${person(600, 640, 200, { fill: 'url(#hatchg)', arms: 'M574 492 L540 520 M626 492 L560 520' })}
  <path fill="${D}" d="M574 470 Q600 436 626 470 Z"/><path fill="none" stroke-width="6" d="M568 470 H632"/>
  <path fill="none" stroke-width="12" d="M545 522 L515 512"/>
  <path fill="none" stroke-width="10" d="M600 640 Q620 680 690 670"/>
  <path fill="none" stroke-width="4" stroke-dasharray="12 10" d="M510 510 Q440 430 380 480 M510 514 Q450 470 410 520 M510 506 Q430 380 340 440"/>`,
  },
  {
    file: '093',
    title: 'Einbrecher auf der Leiter',
    tags: 'Einbruch, Leiter, Nacht, Fenster, Kamera',
    svg: `
  <circle cx="120" cy="110" r="46"/> ${sparkle(240, 70, 6)}
  <path fill="url(#hatchg)" d="M260 20 H690 V600 H260 Z"/>
  <path fill="none" stroke-width="2.5" d="${Array.from({ length: 11 }, (_, i) => `M260 ${70 + i * 50} H690`).join(' ')}"/>
  <rect x="380" y="140" width="160" height="150" fill="url(#dark)"/>
  <path fill="#fff" d="M380 140 L330 160 L330 270 L380 290 Z"/>
  <rect x="440" y="380" width="160" height="130" fill="#fff"/><path fill="none" d="M520 380 V510 M440 445 H600"/>
  <path fill="none" stroke-width="7" d="M250 600 L360 230 M300 600 L410 230"/>
  <path fill="none" stroke-width="5" d="${Array.from({ length: 9 }, (_, i) => `M${261 + i * 12} ${563 - i * 40} H${311 + i * 12}`).join(' ')}"/>
  ${person(350, 460, 200, { fill: 'url(#dark)', arms: 'M376 312 L395 260 M324 312 L290 290' })}
  <path fill="${D}" d="M326 292 Q350 254 374 292 Z"/>
  ${''}
  <path fill="#fff" d="M300 330 Q250 330 250 380 Q250 420 290 420 Q320 410 316 360 Z"/>
  <path fill="none" stroke-width="3" d="M300 330 L318 314"/>
  <path fill="#fff" d="M640 40 H690 V70 H650 Z"/><path fill="${G}" d="M600 60 L650 48 L656 76 L606 86 Z"/>
  <circle cx="606" cy="74" r="6" fill="${D}"/>
  <path fill="none" stroke-width="3" stroke-dasharray="8 8" d="M600 74 L380 380 M604 84 L470 420"/>
  <path fill="none" d="M20 600 H690"/>
  ${''}`,
  },
  {
    file: '094',
    title: 'Anruf um Mitternacht',
    tags: 'Telefon, Mitternacht, Anruf, Schreck, Nacht',
    svg: `
  <rect x="440" y="70" width="210" height="190" fill="url(#hatchg)"/><rect x="456" y="86" width="178" height="158"/>
  <path d="M590 120 A28 28 0 1 0 610 168 A22 22 0 1 1 590 120 Z" stroke-width="3.5"/>
  <path fill="url(#hatchg)" d="M20 330 H80 V600 H20 Z"/>
  <path fill="url(#hatch)" d="M80 430 H420 V540 H80 Z"/>
  <ellipse cx="140" cy="420" rx="60" ry="22"/>
  <path fill="url(#hatchg)" d="M180 420 Q220 330 270 320 L300 330 L300 430 Z"/>
  <circle cx="250" cy="290" r="34"/>
  <path fill="none" stroke-width="4" d="M236 282 a5 5 0 1 0 0.1 0 M262 282 a5 5 0 1 0 0.1 0 M240 310 q10 8 20 0"/>
  <path fill="none" stroke-width="3.5" d="M210 250 l-12 -14 M250 240 v-18 M290 250 l12 -14"/>
  <rect x="440" y="440" width="210" height="160" fill="url(#hatchg)"/>
  <path fill="none" d="M440 500 H650 M530 470 H560"/>
  <path fill="${G}" d="M470 440 L480 395 L560 395 L570 440 Z"/>
  <path fill="#fff" d="M470 400 Q470 370 520 372 Q570 370 570 400 L550 405 L548 392 H492 L490 405 Z"/>
  <circle cx="520" cy="420" r="11" fill="#fff"/>
  <path fill="none" stroke-width="4" d="M455 380 l-16 -12 M450 410 h-20 M585 380 l16 -12 M590 410 h20"/>
  <rect x="580" y="398" width="66" height="42" rx="6" fill="#fff"/>
  ${digits('0000', 586, 408, 10, 22).replace(/rx="2"/g, 'rx="1"')}
  <path fill="none" d="M20 600 H690"/>`,
  },
  {
    file: '095',
    title: 'Maskenball',
    tags: 'Maskenball, Masken, Ball, Geheimnis, Dolch',
    svg: `
  <path fill="none" d="M355 20 V70"/>
  <path fill="#fff" d="M270 90 Q355 140 440 90 L420 70 H290 Z"/>
  ${[290, 330, 380, 420].map((x) => `<path fill="none" stroke-width="3" d="M${x} 100 V122"/><circle cx="${x}" cy="128" r="6"/>`).join('')}
  ${[70, 640].map((x) => `<rect x="${x - 28}" y="120" width="56" height="440" fill="url(#hatchg)"/><rect x="${x - 38}" y="100" width="76" height="24"/><rect x="${x - 38}" y="556" width="76" height="24"/>`).join('')}
  <path fill="url(#hatchg)" d="M180 600 L260 360 L310 360 L380 600 Z"/>
  ${person(285, 420, 200, { fill: 'url(#hatchg)', arms: 'M262 290 L230 250', legs: false })}
  <path fill="none" stroke-width="4" d="M230 250 L240 216"/>
  ${mask(285, 254, 30)}
  <path fill="url(#dark)" d="M250 225 Q285 195 320 225 Q300 214 285 214 Q270 214 250 225 Z"/>
  ${person(450, 600, 330, { fill: 'url(#dark)', arms: 'M416 390 L390 460 M484 390 L540 480' })}
  ${mask(450, 330, 40, '#fff')}
  <path fill="none" stroke-width="3" d="M414 318 Q450 300 486 318"/>
  <path fill="#fff" d="M536 470 L560 560 L548 562 L528 474 Z"/><path fill="none" stroke-width="6" d="M524 470 L548 466"/>
  <path fill="none" d="M20 600 H690"/>
  <path fill="none" stroke-width="3" d="M30 640 L130 600 M120 690 L260 600 M330 700 L420 600 M520 700 L560 600 M640 690 L640 600"/>`,
  },
  {
    file: '096',
    title: 'Spuren im Schnee',
    tags: 'Fußspuren, Schnee, Hütte, Nacht, Rätsel',
    svg: `
  <circle cx="130" cy="110" r="44"/>
  ${snowfall(7, 45, 360)}
  <path fill="url(#hatch)" d="M20 330 L160 220 L260 300 L380 190 L520 300 L620 240 L690 290 V340 H20 Z"/>
  <path fill="#fff" d="M20 340 Q200 320 360 340 T690 335 L690 700 L20 700 Z"/>
  ${fir(80, 420, 140, 'url(#hatchg)')} ${fir(150, 400, 100, 'url(#hatchg)')} ${fir(620, 430, 160, 'url(#hatchg)')}
  <path fill="url(#hatchg)" d="M440 330 L500 290 L560 330 Z"/><rect x="450" y="330" width="100" height="70"/>
  <rect x="468" y="345" width="26" height="24" fill="#fff"/><path fill="none" stroke-width="3" d="M460 340 l-10 -8 M500 340 l10 -8 M481 375 v12"/>
  <path fill="none" stroke-width="3" d="M520 290 V270"/>
  ${Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const x = 250 + (480 - 250) * t + Math.sin(t * 6) * 30, y = 680 - (680 - 410) * t, s = 1 - t * 0.7;
    const off = i % 2 ? 14 * s : -14 * s;
    return `<ellipse cx="${(x + off).toFixed(0)}" cy="${y.toFixed(0)}" rx="${(10 * s).toFixed(1)}" ry="${(18 * s).toFixed(1)}" fill="${G}" stroke-width="3"/>`;
  }).join('')}
  ${Array.from({ length: 6 }, (_, i) => `<path fill="${G}" stroke-width="3" d="M${620 - i * 50} ${640 - i * 30} l-14 -8 l4 14 Z M${606 - i * 50} ${648 - i * 30} l-14 -8 l4 14 Z"/>`).join('')}`,
  },
  {
    file: '097',
    title: 'Lagerhalle bei Nacht',
    tags: 'Lagerhalle, Kisten, Taschenlampe, Nacht, Einbruch',
    svg: `
  <rect x="10" y="10" width="690" height="690" fill="url(#hatchg)" stroke="none"/>
  ${[120, 290, 460].map((x) => `<rect x="${x}" y="40" width="120" height="50" fill="#fff"/><path fill="none" stroke-width="3" d="M${x + 40} 40 V90 M${x + 80} 40 V90"/>`).join('')}
  <path fill="none" stroke-width="7" d="M40 140 V600 M300 140 V600 M40 280 H300 M40 430 H300"/>
  ${[[50, 200, 110, 78], [170, 214, 120, 64], [60, 350, 100, 78], [170, 370, 120, 58], [60, 500, 220, 98]].map(([x, y, w, h]) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}"/><path fill="none" stroke-width="3" d="M${x} ${y} L${x + w} ${y + h} M${x + w} ${y} L${x} ${y + h}"/>`).join('')}
  <path fill="#fff" d="M400 600 V470 H520 V600 Z"/><path fill="none" d="M470 470 V360 M500 470 V360"/>
  <path fill="url(#hatch)" d="M380 480 H470 V560 H380 Z"/>
  <circle cx="420" cy="600" r="20"/><circle cx="500" cy="600" r="20"/>
  <path fill="none" stroke-width="5" d="M470 560 H560 M470 590 H560"/>
  <rect x="320" y="560" width="110" height="60" fill="#fff"/><path fill="${G}" d="M320 560 L340 540 H450 L430 560 Z"/>
  <path fill="none" stroke-width="3" d="M335 556 l-6 -16 M350 556 l4 -18 M410 556 l-4 -16"/>
  ${beam(640, 380, 120, 300, 260, 640)}
  ${person(650, 620, 260, { fill: 'url(#dark)', head: G, arms: 'M618 458 L640 390 M682 458 L690 520' })}
  <path fill="none" d="M20 620 H690"/>`,
  },
  {
    file: '098',
    title: 'Vogelscheuche im Gewitter',
    tags: 'Vogelscheuche, Feld, Gewitter, Krähen, unheimlich',
    svg: `
  ${cloud(20, 170, 300, 'fill="url(#dark)"')} ${cloud(330, 150, 320, 'fill="url(#dark)"')}
  ${bolt(560, 160, 1.1)}
  <path fill="none" d="M20 330 H690"/>
  <path fill="url(#hatchg)" d="M80 330 L80 290 L110 270 L140 290 V330 Z"/>
  <path fill="${G}" stroke="none" d="M20 330 H690 V700 H20 Z"/>
  <path fill="none" stroke-width="3" d="${Array.from({ length: 14 }, (_, i) => `M${355 + (i - 6.5) * 18} 332 L${355 + (i - 6.5) * 110} 700`).join(' ')}"/>
  <path fill="none" stroke-width="8" d="M355 640 V250 M200 320 H510"/>
  <path fill="url(#hatchg)" d="M300 300 L410 300 L430 480 L280 480 Z"/>
  <path fill="#fff" stroke-width="3.5" d="M280 480 l10 22 l12 -18 l12 22 l12 -22 l12 22 l12 -22 l12 22 l12 -22 l12 22 l12 -22 l12 20 l10 -22 Z"/>
  <path fill="#fff" stroke-width="3.5" d="M210 310 l-14 18 l18 -2 l-8 20 M500 310 l14 18 l-18 -2 l8 20"/>
  <path fill="url(#hatch)" d="M220 300 H300 V340 H220 Z M410 300 H490 V340 H410 Z"/>
  <circle cx="355" cy="240" r="40" fill="${G}"/>
  <path fill="none" stroke-width="5" d="M335 232 l10 10 M345 232 l-10 10 M365 232 l10 10 M375 232 l-10 10 M335 260 l8 -4 l8 4 l8 -4 l8 4 l8 -4"/>
  <path fill="url(#dark)" d="M300 210 H410 L395 200 L380 150 Q355 140 330 150 L315 200 Z"/>
  ${crow(150, 260)} ${crow(220, 220, 0.8)} ${crow(520, 260, 0.9)} ${crow(470, 380, 0.7)}`,
  },
  {
    file: '099',
    title: 'Dunkler Hotelflur',
    tags: 'Hotel, Flur, Türen, Dunkelheit, Geheimnis',
    svg: `
  <path fill="url(#hatchg)" d="M20 20 L310 280 L310 420 L20 690 Z"/>
  <path fill="url(#hatchg)" d="M690 20 L400 280 L400 420 L690 690 Z"/>
  <path fill="${G}" d="M20 20 H690 L400 280 H310 Z" stroke="none"/>
  <path fill="#fff" d="M20 690 L310 420 H400 L690 690 Z"/>
  <path fill="none" stroke-width="3" d="M355 420 V690 M310 420 L130 690 M400 420 L580 690 M140 600 H570 M230 520 H480 M282 466 H428"/>
  <path fill="none" d="M20 20 L310 280 M690 20 L400 280 M20 690 L310 420 M690 690 L400 420"/>
  <rect x="310" y="280" width="90" height="140" fill="url(#dark)"/>
  <path fill="#fff" d="M345 290 h44 v120 h-44 Z"/><path fill="${D}" d="M310 290 h35 v120 h-35 Z" stroke="none"/>
  <path fill="#fff" fill-opacity="0.9" stroke-width="3" stroke-dasharray="10 8" d="M350 420 L400 420 L470 520 L330 520 Z"/>
  ${[[90, 160, 500, 1], [200, 250, 420, 0.6]].map(([x, top, bottom, s]) => `<path fill="#fff" d="M${x} ${top} L${x + 70 * s} ${top + 60 * s} L${x + 70 * s} ${bottom - 40 * s} L${x} ${bottom} Z"/>`).join('')}
  ${[[620, 160, 500, 1], [510, 250, 420, 0.6]].map(([x, top, bottom, s]) => `<path fill="#fff" d="M${x} ${top} L${x - 70 * s} ${top + 60 * s} L${x - 70 * s} ${bottom - 40 * s} L${x} ${bottom} Z"/>`).join('')}
  <path fill="url(#dark)" d="M620 160 L640 140 L640 520 L620 500 Z"/>
  <path fill="#fff" stroke-width="3" d="M140 300 h26 v40 h-26 Z"/>
  <ellipse cx="355" cy="90" rx="40" ry="10"/><ellipse cx="355" cy="190" rx="24" ry="6"/><ellipse cx="355" cy="250" rx="14" ry="4"/>
  <path fill="#fff" d="M470 560 H600 V610 H470 Z"/><path fill="none" d="M480 610 V650 M590 610 V650"/>
  <circle cx="480" cy="655" r="8"/><circle cx="590" cy="655" r="8"/><ellipse cx="530" cy="548" rx="40" ry="14" fill="${G}"/>`,
  },
  {
    file: '100',
    title: 'Auto auf dem Bahnübergang',
    tags: 'Bahnübergang, Zug, Auto, Panne, Gefahr',
    svg: `
  <path fill="none" d="M20 330 H690"/>
  <path fill="url(#hatch)" d="M20 330 Q120 290 220 320 L260 330 Z M480 330 Q580 280 690 310 V330 Z"/>
  <path fill="${G}" stroke="none" d="M20 330 H690 V700 H20 Z"/>
  <path fill="#fff" d="M330 330 H380 L560 700 H150 Z"/>
  <path fill="none" stroke-width="5" d="M340 330 L210 700 M372 330 L500 700"/>
  <path fill="none" stroke-width="4" d="${Array.from({ length: 9 }, (_, i) => {
    const t = (i / 8) ** 1.6;
    const y = 335 + t * 360, l = 335 - t * 140, r = 377 + t * 140;
    return `M${l.toFixed(0)} ${y.toFixed(0)} H${r.toFixed(0)}`;
  }).join(' ')}"/>
  <rect x="330" y="290" width="50" height="44" rx="8" fill="url(#hatchg)"/><circle cx="355" cy="305" r="9" fill="#fff"/>
  ${rotated(355, 305, 8, '<line x1="355" y1="285" x2="355" y2="272" stroke-width="3"/>')}
  ${car(200, 560, 250, { fill: '#fff' })}
  <path fill="none" stroke-width="4" d="M250 470 l-10 -16 M330 460 v-18"/>
  <path fill="none" d="M110 700 V360"/>
  <path fill="#fff" stroke-width="4" d="M70 380 L150 420 L156 408 L76 368 Z M70 408 L150 368 L156 380 L76 420 Z"/>
  <circle cx="98" cy="450" r="14" fill="url(#dark)"/><circle cx="126" cy="450" r="14" fill="#fff"/>
  <path fill="none" stroke-width="3.5" d="M126 426 v-10 M146 442 l10 -6 M146 460 l10 6"/>
  <path fill="none" stroke-width="9" d="M600 540 L470 360"/><path fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="14 14" d="M600 540 L470 360"/>
  <rect x="580" y="530" width="40" height="80" fill="url(#hatchg)"/>`,
  },
];
