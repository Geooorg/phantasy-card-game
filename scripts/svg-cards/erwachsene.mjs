// Gezeichnete Karten für das Erwachsenen-Deck (Nummern ab 049).
import { cloud, flame, star, sparkle, bird, person, dashed, rotated } from './lib.mjs';

const G = '#e4e1dc';

/** Skalierte Punktliste relativ zu (x,y) → Pfad. */
const at = (x, y, s) => (dx, dy) => `${(x + dx * s).toFixed(1)} ${(y + dy * s).toFixed(1)}`;

/** Auto von der Seite, (x,y) = linkes Ende auf dem Boden, w = Länge, nach rechts fahrend. */
function car(x, y, w, { fill = '#fff', flip = false } = {}) {
  const s = w / 200;
  const P = flip ? (dx, dy) => at(x, y, s)(200 - dx, dy) : at(x, y, s);
  return `
  <path fill="${fill}" d="M${P(0, -25)} L${P(4, -58)} L${P(45, -62)} L${P(70, -98)} L${P(140, -98)} L${P(166, -62)} L${P(196, -56)} L${P(200, -25)} Z"/>
  <path d="M${P(78, -90)} L${P(102, -90)} L${P(102, -64)} L${P(60, -64)} Z M${P(110, -90)} L${P(134, -90)} L${P(154, -64)} L${P(110, -64)} Z"/>
  <circle cx="${P(45, 0).split(' ')[0]}" cy="${y - 22 * s}" r="${22 * s}"/><circle cx="${P(155, 0).split(' ')[0]}" cy="${y - 22 * s}" r="${22 * s}"/>
  <circle cx="${P(45, 0).split(' ')[0]}" cy="${y - 22 * s}" r="${8 * s}" fill="#5a5a5a"/><circle cx="${P(155, 0).split(' ')[0]}" cy="${y - 22 * s}" r="${8 * s}" fill="#5a5a5a"/>`;
}

/** Tanne, Fuß (x,y), Höhe h. */
const fir = (x, y, h, fill = 'url(#hatch)') =>
  `<path fill="${fill}" d="M${x} ${y - h} L${x - h * 0.3} ${y - h * 0.15} L${x + h * 0.3} ${y - h * 0.15} Z"/><path fill="none" d="M${x} ${y - h * 0.15} V${y}"/>`;

/** Kahler Baum, Fuß (x,y), Höhe h, Richtung dir (1/-1). */
const bareTree = (x, y, h, dir = 1) => {
  const P = (dx, dy) => `${x + dx * (h / 300) * dir} ${y - dy * (h / 300)}`;
  return `<path fill="url(#hatch)" d="M${P(-14, 0)} L${P(-8, 160)} L${P(-60, 230)} L${P(-50, 238)} L${P(-2, 180)} L${P(4, 300)} L${P(16, 300)} L${P(14, 190)} L${P(70, 250)} L${P(78, 240)} L${P(18, 160)} L${P(22, 0)} Z"/>
  <path fill="none" stroke-width="3.5" d="M${P(-40, 205)} L${P(-80, 210)} M${P(45, 220)} L${P(60, 275)} M${P(8, 250)} L${P(-30, 290)}"/>`;
};

/** Gitterturm (Kran, Startturm), von (x,y1) bis y2, Breite w. */
const lattice = (x, y1, y2, w, step = 40) => {
  let d = `M${x} ${y1} V${y2} M${x + w} ${y1} V${y2}`;
  for (let y = y1; y < y2; y += step) d += ` M${x} ${y} L${x + w} ${y + step} M${x + w} ${y} L${x} ${y + step} M${x} ${y} H${x + w}`;
  return `<path fill="none" stroke-width="3.5" d="${d}"/>`;
};

/** Pseudozufall, reproduzierbar. */
function rng(seed) {
  let s = seed;
  return () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
}

/** Notenzeichen. */
const note = (x, y) =>
  `<ellipse cx="${x}" cy="${y}" rx="11" ry="8" fill="#2e2e2e" transform="rotate(-20 ${x} ${y})"/><path fill="none" stroke-width="4" d="M${x + 10} ${y - 2} V${y - 48} q14 8 18 22"/>`;

/** Gezackte Sprechblase um (cx,cy). */
const burst = (cx, cy, rx, ry, tail) => {
  const pts = [];
  for (let i = 0; i < 18; i++) {
    const a = (Math.PI * 2 * i) / 18;
    const f = i % 2 ? 0.78 : 1;
    pts.push(`${(cx + rx * f * Math.cos(a)).toFixed(1)},${(cy + ry * f * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}"/><path fill="none" d="${tail}"/>`;
};

const snow = (() => {
  const r = rng(42);
  return Array.from({ length: 70 }, () =>
    `<circle cx="${(40 + r() * 630).toFixed(0)}" cy="${(40 + r() * 470).toFixed(0)}" r="${(3 + r() * 5).toFixed(1)}" stroke-width="2.5"/>`).join('');
})();

export default [
  {
    file: '049',
    title: 'Raketenstart',
    tags: 'Rakete, Start, Weltraum, Rauch, Countdown',
    svg: `
  ${sparkle(560, 90)} ${sparkle(620, 200, 7)} ${sparkle(470, 150, 6)} ${star(110, 90, 10)}
  ${lattice(150, 130, 590, 50)}
  <path fill="none" d="M200 250 H312 M200 360 H312"/>
  <path fill="url(#hatch)" d="M312 400 L262 486 L312 474 Z M398 400 L448 486 L398 474 Z"/>
  <rect x="312" y="170" width="86" height="305"/>
  <path fill="url(#hatchg)" d="M312 172 Q355 78 398 172 Z"/>
  <rect x="312" y="300" width="86" height="26" fill="${G}"/>
  <circle cx="355" cy="232" r="19"/>
  <path fill="${G}" d="M330 475 L322 500 L388 500 L380 475 Z"/>
  ${flame(355, 500, 120, 'transform="rotate(180 355 500)"')}
  ${flame(355, 500, 70, 'stroke-width="3" transform="rotate(180 355 500)"')}
  <path fill="none" d="M40 600 H670"/>
  ${cloud(50, 660, 190, `fill="${G}"`)} ${cloud(220, 680, 210, `fill="${G}"`)} ${cloud(420, 670, 200, `fill="${G}"`)} ${cloud(560, 640, 140, `fill="${G}"`)}
  ${cloud(140, 600, 110)} ${cloud(470, 595, 120)}`,
  },
  {
    file: '050',
    title: 'Arbeit am Computer',
    tags: 'Büro, Computer, Arbeit, Nachtschicht, Deadline',
    svg: `
  <rect x="90" y="80" width="190" height="140" fill="url(#hatchg)"/><rect x="104" y="94" width="162" height="112"/>
  <path fill="none" d="M185 94 V206 M104 150 H266"/>
  <path d="M240 108 A18 18 0 1 0 256 136 A14 14 0 1 1 240 108 Z" stroke-width="3"/>
  <circle cx="560" cy="115" r="34"/><path fill="none" stroke-width="4" d="M560 115 V90 M560 115 L548 98"/>
  <rect x="340" y="215" width="240" height="165" rx="8" fill="${G}"/><rect x="355" y="230" width="210" height="135"/>
  <path fill="url(#hatch)" stroke-width="3" d="M375 345 h22 v-40 h-22 Z M410 345 h22 v-70 h-22 Z M445 345 h22 v-25 h-22 Z M480 345 h22 v-85 h-22 Z"/>
  <path fill="none" stroke-width="3.5" d="M375 300 L420 265 L460 290 L540 245"/>
  <rect x="566" y="250" width="34" height="34" fill="url(#hatchg)" stroke-width="3"/>
  <path fill="${G}" d="M445 380 L440 433 L480 433 L475 380 Z"/>
  <rect x="90" y="445" width="540" height="20" fill="url(#hatchg)"/>
  <path fill="none" d="M110 465 V620 M610 465 V620"/>
  <rect x="330" y="428" width="160" height="17" fill="${G}"/>
  <path d="M522 400 h40 v45 h-40 Z"/><path fill="none" d="M562 410 q18 0 18 14 q0 12 -18 12"/>
  <path fill="none" stroke-width="3" d="M532 390 q-6 -12 2 -22 M548 390 q-6 -12 2 -22"/>
  <path fill="url(#hatchg)" d="M182 300 Q245 280 308 300 L318 440 L172 440 Z"/>
  <path fill="none" d="M300 318 L345 420"/>
  <circle cx="245" cy="255" r="38"/><path fill="url(#dark)" d="M207 252 Q210 214 245 214 Q282 214 283 252 Q262 238 245 240 Q226 238 207 252 Z"/>
  <rect x="180" y="350" width="130" height="112" rx="16" fill="url(#cross)"/>
  <path fill="none" d="M245 462 V560 M190 590 L245 560 L300 590"/>
  <circle cx="190" cy="596" r="8"/><circle cx="300" cy="596" r="8"/>`,
  },
  {
    file: '051',
    title: 'Familienausflug',
    tags: 'Familie, Wandern, Natur, Ausflug, Kinder',
    svg: `
  <circle cx="575" cy="120" r="40"/>
  <path fill="none" stroke-width="3.5" d="M575 60 V45 M575 180 V195 M515 120 H500 M635 120 H650 M533 78 l-10 -10 M617 78 l10 -10"/>
  ${bird(180, 110)} ${bird(225, 140, 0.8)}
  <path fill="url(#hatch)" d="M20 330 L140 200 L230 290 L320 190 L470 330 Z"/>
  <path fill="#fff" d="M118 224 L140 200 L162 222 L150 230 L140 222 L128 232 Z M298 214 L320 190 L345 214 L332 222 L320 214 L308 222 Z" stroke-width="3"/>
  <path fill="${G}" d="M20 370 Q180 300 340 350 T690 330 L690 700 L20 700 Z"/>
  <path d="M260 700 C300 580, 420 500, 380 410 C365 375, 395 352, 418 346 L432 346 C440 360, 420 380, 440 420 C480 510, 470 600, 490 700 Z"/>
  ${fir(110, 470, 170)} ${fir(170, 520, 130)} ${fir(600, 480, 180)} ${fir(650, 560, 140)} ${fir(540, 430, 110)}
  ${person(345, 640, 210, { fill: 'url(#hatchg)' })}
  <rect x="320" y="470" width="50" height="62" rx="10" fill="url(#cross)"/>
  ${person(440, 645, 200, { fill: 'url(#hatch)', arms: 'wave' })}
  ${person(395, 650, 120, { fill: '#fff', arms: 'up' })}
  ${person(275, 660, 110, { fill: 'url(#hatchg)' })}
  <path fill="none" stroke-width="3.5" d="M300 580 L318 560"/>`,
  },
  {
    file: '052',
    title: 'Streit',
    tags: 'Streit, Konflikt, Wut, Paar, Diskussion',
    svg: `
  <rect x="285" y="120" width="140" height="150" fill="url(#hatchg)"/><rect x="298" y="133" width="114" height="124"/>
  <path fill="none" d="M355 133 V257 M298 195 H412"/>
  <path fill="none" d="M40 570 H670"/>
  <rect x="622" y="340" width="16" height="230" fill="${G}"/><path fill="${G}" d="M598 340 L662 340 L648 292 L612 292 Z"/>
  ${person(210, 570, 300, { fill: 'url(#hatch)', arms: 'M252 380 L330 335 M168 380 L140 430 L168 470' })}
  ${person(475, 570, 300, { fill: 'url(#hatchg)', arms: 'M435 380 L395 300 M515 380 L555 300' })}
  <path fill="none" stroke-width="5" d="M200 300 L228 310 M480 296 L455 308"/>
  <circle cx="225" cy="322" r="4" fill="#2e2e2e"/><circle cx="458" cy="320" r="4" fill="#2e2e2e"/>
  <path fill="none" stroke-width="4" d="M220 345 q10 -6 18 0 M450 345 q10 -10 18 0"/>
  ${burst(150, 145, 95, 70, 'M180 205 L205 255')}
  <path fill="#2e2e2e" stroke-width="2" d="M140 105 L115 150 L138 150 L122 190 L170 135 L145 135 L160 105 Z"/>
  <path fill="none" stroke-width="5" d="M180 125 V170 M195 125 V170 M170 138 H205 M170 157 H205"/>
  ${burst(560, 155, 95, 72, 'M530 215 L505 262')}
  <path fill="none" stroke-width="5" d="M530 155 m-8 0 a8 8 0 1 1 16 0 a14 14 0 1 1 -28 0 a22 22 0 1 1 44 0"/>
  <path fill="none" stroke-width="7" d="M600 120 V165"/><circle cx="600" cy="185" r="5" fill="#2e2e2e"/>
  <path fill="none" stroke-width="4" d="M330 300 l18 -12 M338 330 l22 -2 M375 300 l-18 -12"/>`,
  },
  {
    file: '053',
    title: 'Zerbrochenes Geschirr',
    tags: 'Scherben, Geschirr, Küche, Unfall, kaputt',
    svg: `
  <rect x="40" y="250" width="630" height="34" fill="url(#hatchg)"/>
  <rect x="40" y="284" width="630" height="110"/>
  <path fill="none" d="M197 284 V394 M355 284 V394 M512 284 V394"/>
  <path fill="none" stroke-width="5" d="M180 330 V350 M215 330 V350 M495 330 V350 M530 330 V350"/>
  <rect x="40" y="70" width="240" height="140" fill="url(#hatchg)"/><path fill="none" d="M160 70 V210"/>
  <ellipse cx="560" cy="240" rx="70" ry="12"/><ellipse cx="560" cy="226" rx="70" ry="12"/><ellipse cx="560" cy="212" rx="70" ry="12"/>
  <path fill="${G}" d="M40 394 H670 L690 700 L20 700 Z" stroke="none"/>
  <path fill="none" stroke-width="3.5" d="M40 394 H670 M30 470 H680 M25 570 H685 M180 394 L120 700 M355 394 V700 M530 394 L590 700"/>
  <path d="M235 515 L300 492 L318 545 L262 566 Z"/><path fill="none" stroke-width="3.5" d="M246 520 Q275 505 300 506"/>
  <path d="M330 500 L405 486 L398 540 L350 545 Z"/><path fill="none" stroke-width="3.5" d="M340 510 Q370 498 398 502"/>
  <path fill="url(#hatch)" d="M300 580 L370 565 L388 615 L320 628 Z"/>
  <path d="M410 560 L460 548 L470 590 L420 598 Z"/>
  <path d="M180 590 L210 576 L222 605 Z M490 520 L515 512 L520 535 Z M265 620 L290 612 L285 640 Z M450 630 L478 622 L470 652 Z M560 590 L580 580 L586 600 Z"/>
  <path transform="rotate(-25 540 470)" d="M505 440 h70 v62 a18 18 0 0 1 -18 18 h-34 a18 18 0 0 1 -18 -18 Z"/>
  <path fill="none" d="M598 520 q26 4 20 30"/>
  <path fill="none" stroke-width="4" d="M310 455 l-10 -24 M355 448 V422 M400 455 l10 -24 M260 470 l-22 -14 M450 470 l22 -14"/>`,
  },
  {
    file: '054',
    title: 'Party',
    tags: 'Party, Feier, Tanzen, Musik, Diskokugel',
    svg: `
  <line x1="355" y1="18" x2="355" y2="120" stroke-width="3"/>
  ${[[30, 230], [75, 140], [120, 205], [590, 230], [635, 140], [680, 205]].map(([a, b]) => '').join('')}
  ${rotated(355, 165, 12, dashed(355, 230, 355, 300, 3))}
  <circle cx="355" cy="165" r="45" fill="url(#cross)"/>
  <path fill="none" d="M40 120 Q200 190 330 150 M380 150 Q520 190 670 115"/>
  ${[[70, 136], [130, 158], [190, 168], [250, 165], [460, 168], [520, 166], [580, 154], [640, 132]]
    .map(([x, y], i) => `<path fill="${i % 2 ? 'url(#hatch)' : '#fff'}" stroke-width="3.5" d="M${x - 20} ${y - 6} L${x + 20} ${y - 6} L${x} ${y + 34} Z"/>`).join('')}
  <rect x="55" y="400" width="90" height="190" fill="url(#hatchg)"/><circle cx="100" cy="450" r="24"/><circle cx="100" cy="530" r="34"/>
  <rect x="565" y="400" width="90" height="190" fill="url(#hatchg)"/><circle cx="610" cy="450" r="24"/><circle cx="610" cy="530" r="34"/>
  <path fill="none" d="M40 590 H670"/>
  ${person(230, 590, 230, { fill: 'url(#hatch)', arms: 'up' })}
  ${person(360, 600, 260, { fill: 'url(#hatchg)', arms: 'wave' })}
  ${person(480, 590, 220, { fill: 'url(#cross)', arms: 'M460 450 L500 400 L520 430 M500 446 L540 470' })}
  ${note(150, 310)} ${note(560, 290)} ${note(470, 250)}`,
  },
  {
    file: '055',
    title: 'Segeln',
    tags: 'Segelboot, Meer, Wind, Wellen, Urlaub',
    svg: `
  <circle cx="590" cy="110" r="38"/>
  ${cloud(80, 140, 120)} ${bird(260, 110)} ${bird(300, 140, 0.8)}
  <path fill="url(#hatch)" d="M20 330 Q70 290 120 300 Q160 280 200 310 L210 330 Z"/>
  <path d="M170 312 L178 270 L188 270 L194 312 Z" stroke-width="3"/>
  <path fill="none" d="M20 330 H690"/>
  <g transform="rotate(-9 360 460)">
    <line x1="360" y1="455" x2="360" y2="90"/>
    <path fill="url(#hatchg)" d="M368 100 Q470 250 590 440 L368 440 Z"/>
    <path d="M350 120 Q290 280 190 440 L350 440 Z"/>
    <path fill="none" stroke-width="3.5" d="M368 200 L440 200 M368 320 L510 320"/>
    <path fill="${G}" d="M150 450 L600 450 L555 520 L200 520 Z"/>
    <path fill="none" stroke-width="3.5" d="M170 478 H580"/>
    <circle cx="520" cy="420" r="15"/><path fill="url(#hatch)" d="M505 450 L508 432 L532 432 L535 450 Z"/>
  </g>
  <path d="M20 500 Q70 470 120 500 T220 500 T320 500 T420 500 T520 500 T620 500 T720 500 L720 720 L0 720 Z"/>
  <path fill="none" stroke-width="3.5" d="M80 560 q30 -18 60 0 M260 590 q30 -18 60 0 M460 560 q30 -18 60 0 M580 620 q30 -18 60 0 M140 640 q30 -18 60 0"/>`,
  },
  {
    file: '056',
    title: 'Krankenhauszimmer',
    tags: 'Krankenhaus, Bett, Patient, Infusion, Herzmonitor',
    svg: `
  <rect x="80" y="90" width="200" height="160"/><path fill="none" d="M180 90 V250 M80 170 H280"/>
  <path fill="url(#hatchg)" d="M60 70 L60 270 Q90 200 100 70 Z M300 70 L300 270 Q270 200 260 70 Z"/>
  <path fill="none" stroke-width="3.5" d="M50 70 H310"/>
  <rect x="430" y="120" width="140" height="95" rx="6" fill="${G}"/><rect x="442" y="132" width="116" height="71"/>
  <path fill="none" stroke-width="3.5" d="M448 170 H475 L485 145 L497 192 L508 158 L515 170 H552"/>
  <path fill="none" d="M600 140 V585 M565 590 H635"/>
  <path fill="none" d="M600 150 H625"/>
  <rect x="610" y="150" width="42" height="72" rx="10" fill="url(#hatchg)"/>
  ${dashed(631, 222, 560, 400)}
  <rect x="90" y="330" width="28" height="255" fill="url(#hatchg)"/>
  <rect x="520" y="390" width="24" height="195" fill="url(#hatchg)"/>
  <rect x="110" y="430" width="430" height="34"/>
  <path fill="none" d="M140 464 V560 M510 464 V560"/>
  <circle cx="140" cy="572" r="12"/><circle cx="510" cy="572" r="12"/>
  <ellipse cx="180" cy="412" rx="55" ry="22"/>
  <circle cx="185" cy="385" r="30"/>
  <path fill="none" stroke-width="3.5" d="M174 382 q5 4 10 0 M192 382 q5 4 10 0"/>
  <path fill="url(#hatch)" d="M210 405 Q360 365 530 400 L540 440 L200 440 Z"/>
  <path fill="none" d="M40 585 H670"/>`,
  },
  {
    file: '057',
    title: 'Gerichtssaal',
    tags: 'Gericht, Richter, Urteil, Hammer, Prozess',
    svg: `
  <path fill="none" d="M355 70 V150 M300 92 H410"/>
  <path fill="none" stroke-width="3.5" d="M300 92 L282 132 M300 92 L318 132 M410 92 L392 132 M410 92 L428 132"/>
  <path fill="${G}" d="M276 132 Q300 150 324 132 Z M386 132 Q410 150 434 132 Z"/>
  <path fill="${G}" d="M335 150 H375 L382 160 H328 Z"/>
  <rect x="150" y="200" width="410" height="30" fill="url(#hatchg)"/>
  <circle cx="355" cy="262" r="34"/>
  <path fill="url(#dark)" d="M300 360 Q300 305 355 300 Q410 305 410 360 Z"/>
  <path fill="none" stroke-width="3" d="M345 305 L355 330 L365 305"/>
  <rect x="180" y="340" width="350" height="180" fill="url(#hatchg)"/>
  <path fill="none" d="M180 380 H530 M297 380 V520 M413 380 V520"/>
  <rect x="160" y="520" width="390" height="22"/>
  <rect x="440" y="320" width="54" height="18" rx="4" fill="url(#hatch)" transform="rotate(-20 467 329)"/>
  <path fill="none" stroke-width="6" d="M462 335 L430 300"/>
  <rect x="50" y="410" width="100" height="132" fill="url(#hatch)"/><path fill="none" d="M100 410 L120 360"/><circle cx="122" cy="352" r="8"/>
  <path fill="none" d="M40 542 H670"/>
  <path fill="none" stroke-width="3.5" d="M40 600 H670 M80 600 V680 M160 600 V680 M240 600 V680 M470 600 V680 M550 600 V680 M630 600 V680"/>
  <circle cx="320" cy="640" r="30"/><path fill="url(#hatch)" d="M270 720 Q270 670 320 668 Q370 670 370 720 Z"/>
  <circle cx="610" cy="560" r="36"/><path fill="none" stroke-width="3.5" d="M610 560 V536 M610 560 L626 568"/>`,
  },
  {
    file: '058',
    title: 'Hochzeit',
    tags: 'Hochzeit, Paar, Feier, Liebe, Zeremonie',
    svg: `
  <path fill="url(#hatchg)" d="M290 690 L330 420 L380 420 L420 690 Z"/>
  <path fill="none" stroke-width="10" d="M190 560 V270 A165 165 0 0 1 520 270 V560"/>
  ${Array.from({ length: 13 }, (_, i) => {
    const a = Math.PI - (Math.PI * i) / 12;
    return `<circle cx="${(355 + 165 * Math.cos(a)).toFixed(0)}" cy="${(270 - 165 * Math.sin(a)).toFixed(0)}" r="${i % 2 ? 14 : 18}" fill="${i % 3 ? '#fff' : 'url(#hatch)'}"/>`;
  }).join('')}
  <circle cx="190" cy="350" r="15"/><circle cx="520" cy="350" r="15" fill="url(#hatch)"/><circle cx="190" cy="430" r="15" fill="url(#hatch)"/><circle cx="520" cy="430" r="15"/>
  ${person(305, 560, 260, { fill: 'url(#dark)', arms: 'M285 400 L270 470 M325 400 L350 450' })}
  <path d="M410 395 L360 560 L470 560 Z"/>
  <path fill="none" stroke-width="3.5" d="M380 500 Q415 515 450 500"/>
  <circle cx="412" cy="350" r="30"/>
  <path fill="url(#hatchg)" stroke-width="3.5" d="M395 330 Q412 310 430 330 L470 470 L440 470 Z"/>
  <circle cx="358" cy="452" r="12" fill="url(#hatch)"/>
  <path fill="none" d="M40 560 H190 M520 560 H670"/>
  ${[90, 600].map((x) => `<path fill="url(#hatch)" d="M${x - 30} 600 h60 v-50 h-60 Z"/><path fill="none" d="M${x - 30} 600 V640 M${x + 30} 600 V640"/><path fill="none" d="M${x - 30} 550 V510"/>`).join('')}
  <path d="M120 150 c-10 -16 -32 -6 -22 12 l22 20 l22 -20 c10 -18 -12 -28 -22 -12 Z" fill="url(#hatch)" stroke-width="3.5"/>
  <path d="M590 120 c-8 -13 -26 -5 -18 10 l18 16 l18 -16 c8 -15 -10 -23 -18 -10 Z" stroke-width="3.5"/>`,
  },
  {
    file: '059',
    title: 'Unfall mit Blaulicht',
    tags: 'Unfall, Polizei, Blaulicht, Nacht, Straße',
    svg: `
  <path d="M120 80 A40 40 0 1 0 160 140 A32 32 0 1 1 120 80 Z" stroke-width="3.5"/>
  ${sparkle(260, 90, 7)} ${sparkle(600, 80, 8)}
  <rect x="210" y="200" width="16" height="320" fill="url(#hatchg)"/><path fill="none" d="M218 200 Q218 170 260 168"/><path fill="${G}" d="M250 162 h40 l-6 14 h-28 Z"/>
  <g transform="rotate(8 150 520)">${car(40, 522, 200, { fill: 'url(#hatchg)' })}</g>
  <path fill="none" stroke-width="4" d="M228 380 l20 -16 M232 420 l26 -4 M226 455 l24 10"/>
  ${cloud(180, 380, 70, `fill="${G}"`)}
  ${car(410, 520, 250, { flip: true })}
  <path fill="none" stroke-width="5" d="M440 470 H640"/>
  <rect x="502" y="380" width="56" height="18" rx="5" fill="url(#dark)"/>
  <path fill="none" stroke-width="4" d="M500 370 l-26 -26 M530 360 V325 M560 370 l26 -26 M490 390 H455 M570 390 H605"/>
  <path fill="none" d="M30 522 H680"/>
  <path fill="none" stroke-width="5" stroke-dasharray="40 30" d="M40 600 H670"/>
  <path fill="url(#hatchg)" d="M330 520 L365 455 L400 520 Z"/><path d="M350 508 L365 480 L380 508 Z" stroke-width="3"/>`,
  },
  {
    file: '060',
    title: 'Leuchtturm im Sturm',
    tags: 'Leuchtturm, Sturm, Wellen, Blitz, Meer',
    svg: `
  ${cloud(40, 150, 260, 'fill="url(#dark)"')} ${cloud(300, 130, 250, 'fill="url(#dark)"')} ${cloud(520, 170, 190, 'fill="url(#dark)"')}
  <path fill="#fff" d="M200 160 L170 230 L195 230 L165 300 L230 210 L205 210 L230 160 Z"/>
  <path fill="none" stroke-width="3" d="M90 200 l-14 40 M120 260 l-14 40 M250 240 l-14 40 M300 190 l-14 40 M600 220 l-14 40 M640 280 l-14 40 M90 330 l-14 40"/>
  <path fill="none" stroke-width="3.5" stroke-dasharray="10 8" d="M455 260 L250 210 M455 285 L250 340 M505 260 L690 200 M505 285 L690 330"/>
  <path fill="url(#hatchg)" d="M380 560 L420 470 L560 470 L620 560 Z"/>
  <path d="M440 470 L455 300 L505 300 L520 470 Z"/>
  <path fill="url(#hatch)" d="M449 380 L511 380 L514 420 L446 420 Z"/>
  <rect x="448" y="245" width="64" height="55" fill="${G}"/><path fill="none" d="M480 245 V300"/>
  <path fill="url(#hatchg)" d="M440 245 L480 205 L520 245 Z"/>
  <path fill="none" d="M436 300 H524"/>
  <path d="M20 540 Q90 470 160 520 Q130 470 190 460 Q260 470 250 540 Q320 500 380 560 Q450 520 520 580 Q600 520 690 560 L700 720 L10 720 Z"/>
  <path fill="none" stroke-width="3.5" d="M60 600 q30 -20 60 0 M250 620 q30 -20 60 0 M470 640 q30 -20 60 0 M150 470 q20 -30 40 -10"/>
  <g transform="rotate(-20 110 450)"><path fill="url(#hatch)" d="M60 450 L160 450 L145 475 L75 475 Z"/><path fill="none" d="M110 450 V400"/><path d="M112 405 L140 445 L112 445 Z" stroke-width="3"/></g>`,
  },
  {
    file: '061',
    title: 'Labor',
    tags: 'Labor, Experiment, Wissenschaft, Reagenzglas, Mikroskop',
    svg: `
  <path fill="none" d="M60 140 H360 M60 250 H360"/>
  ${[80, 130, 190, 250, 300].map((x, i) => `<rect x="${x}" y="${140 - 50 - (i % 2) * 15}" width="34" height="${50 + (i % 2) * 15}" rx="4" fill="${i % 2 ? 'url(#hatchg)' : '#fff'}" stroke-width="3.5"/>`).join('')}
  ${[90, 150, 210, 280].map((x, i) => `<path fill="${i % 2 ? '#fff' : 'url(#hatch)'}" stroke-width="3.5" d="M${x} 250 L${x + 8} 205 L${x + 8} 190 L${x + 22} 190 L${x + 22} 205 L${x + 30} 250 Z"/>`).join('')}
  <path fill="${G}" d="M520 100 L580 205 L460 205 Z"/><path fill="none" stroke-width="6" d="M520 135 V170"/><circle cx="520" cy="188" r="4" fill="#2e2e2e"/>
  <rect x="40" y="430" width="630" height="26" fill="url(#hatchg)"/>
  <path fill="none" d="M70 456 V650 M640 456 V650"/>
  <rect x="80" y="400" width="140" height="14"/><path fill="none" stroke-width="3.5" d="M85 414 V430 M215 414 V430"/>
  ${[100, 130, 160, 190].map((x, i) => `<path fill="${i % 2 ? 'url(#hatch)' : '#fff'}" stroke-width="3.5" d="M${x - 9} 330 V405 a9 9 0 0 0 18 0 V330"/>`).join('')}
  <path d="M290 430 L320 340 L320 300 L360 300 L360 340 L390 430 Z"/>
  <path fill="url(#hatchg)" d="M300 400 L380 400 L390 430 L290 430 Z"/>
  <circle cx="330" cy="270" r="10"/><circle cx="352" cy="240" r="7"/><circle cx="335" cy="210" r="12"/><circle cx="360" cy="180" r="6"/>
  <path fill="${G}" d="M450 430 h120 v-14 h-120 Z"/>
  <path fill="none" stroke-width="14" d="M552 416 V380 Q556 300 512 272"/>
  <path fill="none" d="M462 372 H548"/>
  <rect x="482" y="250" width="32" height="92" rx="4" fill="url(#hatch)"/>
  <rect x="476" y="226" width="44" height="24" rx="4"/>
  <rect x="490" y="342" width="16" height="20"/>
  <path fill="none" stroke-width="4" d="M400 300 l14 -10 M398 340 l20 0"/>`,
  },
  {
    file: '062',
    title: 'Verlassenes Haus bei Nacht',
    tags: 'Spukhaus, verlassen, Nacht, Mond, unheimlich',
    svg: `
  <circle cx="540" cy="140" r="70"/>
  <path fill="#2e2e2e" stroke-width="2" transform="translate(470 120) scale(0.9)" d="M0 -6 C-6 -14, -14 -14, -16 -6 C-28 -20, -44 -18, -52 -4 C-44 -6, -38 0, -36 8 C-30 2, -22 2, -18 10 C-12 4, -6 4, 0 12 C6 4, 12 4, 18 10 C22 2, 30 2, 36 8 C38 0, 44 -6, 52 -4 C44 -18, 28 -20, 16 -6 C14 -14, 6 -14, 0 -6 Z"/>
  <path fill="#2e2e2e" stroke-width="2" transform="translate(590 230) scale(0.6)" d="M0 -6 C-6 -14, -14 -14, -16 -6 C-28 -20, -44 -18, -52 -4 C-44 -6, -38 0, -36 8 C-30 2, -22 2, -18 10 C-12 4, -6 4, 0 12 C6 4, 12 4, 18 10 C22 2, 30 2, 36 8 C38 0, 44 -6, 52 -4 C44 -18, 28 -20, 16 -6 C14 -14, 6 -14, 0 -6 Z"/>
  ${bareTree(110, 600, 330)}
  <path fill="url(#hatchg)" d="M220 590 L230 320 L470 300 L490 590 Z"/>
  <path fill="url(#hatch)" d="M200 330 L350 170 L505 310 Z"/>
  <path d="M330 220 L350 205 L362 228 L340 240 Z" stroke-width="3"/>
  <rect x="420" y="190" width="34" height="70" fill="url(#hatchg)"/>
  <rect x="260" y="360" width="70" height="80"/>
  <path fill="none" stroke-width="7" d="M255 368 L335 432 M255 432 L335 368"/>
  <rect x="380" y="350" width="70" height="80" fill="#fff"/>
  <path fill="#2e2e2e" d="M415 430 L415 395 Q415 375 405 372 Q398 360 415 357 Q432 360 425 372 Q415 375 415 395 Z" stroke-width="2"/>
  <path fill="none" stroke-width="3.5" d="M370 340 l-12 -12 M460 340 l12 -12 M466 390 h16 M364 390 h-16"/>
  <path fill="#2e2e2e" d="M320 590 V500 Q345 478 370 500 V590 Z"/>
  <path d="M370 500 L398 512 L398 590 L370 590 Z"/>
  <path fill="none" d="M30 590 H690"/>
  <path fill="none" stroke-width="5" d="M440 650 V590 M480 655 V600 M520 640 V585 M560 660 L590 610 M420 620 H600 M30 640 H690"/>
  <path fill="none" stroke-width="3.5" d="M560 640 l-10 -14 M600 640 l12 -6"/>`,
  },
  {
    file: '063',
    title: 'Offener Tresor',
    tags: 'Tresor, Bank, Gold, Einbruch, Laser',
    svg: `
  <rect x="60" y="80" width="400" height="500" fill="${G}"/>
  <rect x="80" y="100" width="360" height="460" fill="url(#hatch)"/>
  <rect x="100" y="120" width="320" height="420"/>
  <path fill="none" d="M100 260 H420 M100 400 H420"/>
  ${[[130, 260], [200, 260], [165, 236], [300, 400], [370, 400], [335, 376], [130, 540], [200, 540]].map(([x, y]) =>
    `<path fill="url(#hatchg)" stroke-width="3.5" d="M${x - 30} ${y} L${x - 22} ${y - 24} L${x + 22} ${y - 24} L${x + 30} ${y} Z"/>`).join('')}
  ${[[330, 255], [380, 540], [310, 535]].map(([x, y]) =>
    `<path fill="#fff" d="M${x - 35} ${y} Q${x - 42} ${y - 50} ${x - 12} ${y - 62} L${x - 18} ${y - 75} L${x + 18} ${y - 75} L${x + 12} ${y - 62} Q${x + 42} ${y - 50} ${x + 35} ${y} Z"/><path fill="none" stroke-width="3.5" d="M${x - 14} ${y - 62} H${x + 14}"/>`).join('')}
  <path fill="none" stroke-width="3.5" stroke-dasharray="12 8" d="M100 320 L420 370 M100 470 L420 430 M100 200 L420 180"/>
  <ellipse cx="545" cy="330" rx="110" ry="220" fill="url(#hatchg)"/>
  <ellipse cx="545" cy="330" rx="80" ry="180"/>
  ${[0, 60, 120, 180, 240, 300].map((a) => {
    const r = (a * Math.PI) / 180;
    return `<circle cx="${(545 + 95 * Math.cos(r)).toFixed(0)}" cy="${(330 + 200 * Math.sin(r)).toFixed(0)}" r="8" fill="#5a5a5a"/>`;
  }).join('')}
  <circle cx="545" cy="330" r="34"/><path fill="none" d="M545 290 V370 M505 330 H585 M517 302 L573 358 M573 302 L517 358"/>
  <path fill="none" d="M40 580 H670"/>`,
  },
  {
    file: '064',
    title: 'Baustelle mit Kran',
    tags: 'Baustelle, Kran, Bau, Last, Arbeiter',
    svg: `
  ${lattice(140, 120, 580, 40, 46)}
  ${lattice(60, 100, 120, 590, 590)}
  <path fill="none" stroke-width="3.5" d="M60 100 H650 M60 120 H650 M100 100 V120 M180 100 V120 M260 100 V120 M340 100 V120 M420 100 V120 M500 100 V120 M580 100 V120"/>
  <path fill="none" d="M160 100 L160 50 L60 100 M160 50 L650 100"/>
  <rect x="60" y="120" width="50" height="40" fill="url(#hatchg)"/>
  <rect x="145" y="150" width="30" height="34" fill="${G}"/>
  <path fill="none" stroke-width="3" d="M470 120 V300"/>
  <path fill="none" d="M470 300 q-14 0 -14 14 q0 12 12 12"/>
  <path fill="none" stroke-width="3" d="M466 326 L400 360 M470 326 L540 360"/>
  <rect x="380" y="360" width="180" height="22" fill="url(#hatchg)" transform="rotate(-6 470 371)"/>
  <path fill="none" stroke-width="4" d="M370 340 l-16 -8 M375 390 l-18 6 M570 330 l16 -8"/>
  <path fill="none" d="M300 580 V420 M420 580 V420 M540 580 V420 M640 580 V420 M300 420 H640 M300 500 H640"/>
  <path fill="none" stroke-width="3" d="M300 500 L420 420 M420 500 L540 420 M540 580 L640 500"/>
  <path fill="none" d="M30 580 H690"/>
  <rect x="60" y="610" width="280" height="30" fill="url(#hatch)"/>
  <path fill="none" d="M90 640 V680 M310 640 V680"/>
  ${[420, 500, 580].map((x) => `<path fill="#fff" d="M${x - 24} 670 L${x} 600 L${x + 24} 670 Z"/><path fill="url(#hatchg)" stroke-width="3" d="M${x - 15} 645 L${x + 15} 645 L${x + 10} 630 L${x - 10} 630 Z"/>`).join('')}
  ${person(240, 580, 130, { fill: 'url(#hatchg)', arms: 'wave' })}
  <path fill="${G}" d="M222 470 Q240 446 258 470 Z"/>`,
  },
  {
    file: '065',
    title: 'Fußballstadion',
    tags: 'Stadion, Fußball, Spiel, Zuschauer, Flutlicht',
    svg: `
  ${[90, 620].map((x) => `<path fill="none" d="M${x} 80 V300"/><rect x="${x - 40}" y="50" width="80" height="44" fill="url(#cross)"/>`).join('')}
  <rect x="270" y="70" width="170" height="70" fill="${G}"/><rect x="285" y="84" width="140" height="42"/>
  <path fill="none" stroke-width="6" d="M320 92 V118 M350 92 V118 M335 105 H335 M380 92 V118 M380 92 H400 V118 H380"/>
  <path fill="url(#hatchg)" d="M20 330 L20 190 Q355 150 690 190 L690 330 Z"/>
  ${Array.from({ length: 3 }, (_, row) => Array.from({ length: 16 }, (_, i) =>
    `<circle cx="${50 + i * 40 + (row % 2) * 20}" cy="${215 + row * 38}" r="11" fill="#fff" stroke-width="3"/>`).join('')).join('')}
  <path fill="#fff" d="M20 330 H690 L700 720 L10 720 Z"/>
  <path fill="none" stroke-width="3.5" d="M60 330 L20 680 M650 330 L690 680 M40 480 H670"/>
  <ellipse cx="355" cy="480" rx="120" ry="34" fill="none" stroke-width="3.5"/>
  <path fill="none" d="M270 330 V285 H440 V330"/>
  <path fill="none" stroke-width="2.5" d="M285 290 V330 M305 290 V330 M325 290 V330 M345 290 V330 M365 290 V330 M385 290 V330 M405 290 V330 M425 290 V330 M270 300 H440 M270 315 H440"/>
  <circle cx="420" cy="600" r="44"/>
  <path fill="#5a5a5a" stroke-width="3" d="M420 580 L438 592 L432 612 L408 612 L402 592 Z"/>
  <path fill="none" stroke-width="3" d="M420 580 V558 M438 592 L460 585 M432 612 L445 632 M408 612 L395 632 M402 592 L380 585"/>
  <path fill="none" stroke-width="4" d="M340 600 H300 M350 630 H310"/>`,
  },
  {
    file: '066',
    title: 'Friedhof im Nebel',
    tags: 'Friedhof, Nebel, Gräber, Nacht, Rabe',
    svg: `
  <circle cx="140" cy="130" r="55"/>
  <path fill="none" stroke-width="4" d="M30 300 H690 M30 330 H690"/>
  ${Array.from({ length: 17 }, (_, i) => `<path fill="none" stroke-width="4" d="M${50 + i * 38} 360 V285 l-7 0 l7 -16 l7 16 l-7 0"/>`).join('')}
  ${bareTree(590, 500, 380, -1)}
  <path fill="#2e2e2e" stroke-width="2" d="M560 245 q14 -14 30 -6 l12 -6 l-6 10 q6 14 -10 18 l-22 4 l-14 10 l2 -14 Z"/>
  <path fill="url(#hatchg)" d="M140 520 V430 Q190 380 240 430 V520 Z"/>
  <path fill="none" stroke-width="3.5" d="M170 445 H210 M175 465 H205"/>
  <path fill="#fff" d="M310 520 V400 H285 V375 H310 V340 H340 V375 H365 V400 H340 V520 Z"/>
  <path fill="url(#hatch)" d="M410 520 V450 Q410 420 450 420 Q490 420 490 450 V520 Z" transform="rotate(6 450 520)"/>
  <path fill="#fff" d="M60 520 V470 Q60 450 90 450 Q120 450 120 470 V520 Z"/>
  <path fill="none" d="M30 520 H690"/>
  <path fill="none" stroke-width="5" d="M530 520 L560 410"/><path fill="${G}" d="M550 420 L572 404 L590 450 L566 460 Z" transform="rotate(10 570 430)"/>
  <path fill="${G}" fill-opacity="0.92" stroke-width="3.5" d="M20 480 Q120 455 220 480 T420 478 T620 480 T720 478 L720 720 L0 720 Z"/>
  <path fill="#fff" fill-opacity="0.9" stroke-width="3.5" d="M20 560 Q140 535 260 560 T500 560 T740 560 L740 720 L0 720 Z"/>
  <path fill="none" stroke-width="3.5" d="M90 620 q60 -18 120 0 M380 640 q60 -18 120 0"/>`,
  },
  {
    file: '067',
    title: 'Vorstellungsgespräch',
    tags: 'Bewerbung, Gespräch, Büro, Job, Nervosität',
    svg: `
  <rect x="80" y="90" width="110" height="80" fill="url(#hatchg)"/><rect x="92" y="102" width="86" height="56"/>
  <path fill="none" stroke-width="3" d="M108 120 H162 M108 135 H150"/>
  <rect x="440" y="70" width="190" height="170"/>
  <path fill="none" stroke-width="3" d="M440 90 H630 M440 110 H630 M440 130 H630 M440 150 H630 M440 170 H630 M440 190 H630 M440 210 H630"/>
  <circle cx="315" cy="120" r="32"/><path fill="none" stroke-width="4" d="M315 120 V98 M315 120 L332 128"/>
  <path fill="url(#hatchg)" d="M600 600 L590 540 L650 540 L640 600 Z"/>
  <path fill="none" d="M620 540 Q600 470 570 450 M620 540 Q630 470 660 440 M620 540 Q610 480 620 420"/>
  ${person(190, 560, 300, { fill: 'url(#hatchg)', arms: 'M232 370 L260 430 M148 370 L130 420', legs: false })}
  <path fill="none" stroke-width="4" d="M235 290 q8 6 4 16"/>
  ${person(500, 560, 300, { fill: 'url(#dark)', arms: 'M458 370 L430 430 M542 370 L560 420', legs: false })}
  <rect x="80" y="440" width="490" height="24" fill="url(#hatchg)"/>
  <path d="M80 464 H570 L560 600 H90 Z"/>
  <path fill="none" d="M325 464 V600"/>
  <path d="M390 440 L405 395 L470 395 L462 440 Z" fill="${G}"/><path fill="none" d="M380 440 H480"/>
  <path d="M250 440 L262 420 L330 424 L322 440 Z"/><path fill="none" stroke-width="3" d="M270 428 H312 M268 434 H306"/>
  <path d="M520 440 V405 H540 V440 Z"/>
  <path fill="none" d="M40 600 H670"/>`,
  },
  {
    file: '068',
    title: 'Im Schneesturm stecken geblieben',
    tags: 'Schnee, Sturm, Auto, Winter, Panne',
    svg: `
  ${fir(110, 430, 230, 'url(#hatchg)')} ${fir(200, 400, 170, 'url(#hatchg)')} ${fir(620, 420, 210, 'url(#hatchg)')}
  <path fill="#fff" stroke-width="3.5" d="M75 300 Q110 285 145 300 Z M82 250 Q110 238 136 250 Z M175 290 Q200 280 225 290 Z M590 300 Q620 288 650 300 Z"/>
  <path fill="none" d="M520 500 V320"/><rect x="490" y="290" width="60" height="40" fill="url(#hatch)"/>
  ${car(190, 500, 300, { fill: 'url(#hatchg)' })}
  <path fill="none" stroke-width="3.5" stroke-dasharray="10 8" d="M490 420 L680 370 M490 440 L680 480"/>
  <path d="M20 470 Q120 420 220 480 Q330 440 420 475 Q520 430 600 470 Q660 450 700 465 L700 720 L10 720 Z"/>
  <path fill="none" stroke-width="3.5" d="M100 560 q40 -18 80 0 M380 580 q40 -18 80 0 M560 540 q40 -18 80 0"/>
  ${snow}
  <path fill="none" stroke-width="4" d="M60 160 q60 -20 120 0 M400 120 q60 -20 120 0 M300 230 q50 -16 100 0"/>`,
  },
  {
    file: '069',
    title: 'Fitnessstudio',
    tags: 'Sport, Fitness, Training, Hanteln, Laufband',
    svg: `
  <rect x="50" y="80" width="300" height="220" fill="url(#hatch)"/><rect x="66" y="96" width="268" height="188"/>
  <circle cx="560" cy="120" r="34"/><path fill="none" stroke-width="4" d="M560 120 V96 M560 120 L578 130"/>
  <path fill="none" d="M60 430 H330 M80 430 V520 M310 430 V520"/>
  ${[110, 170, 230, 285].map((x, i) => `<path fill="none" stroke-width="5" d="M${x - 18} 418 H${x + 18}"/><rect x="${x - 28}" y="${404 - i * 2}" width="12" height="${28 + i * 4}" rx="3" fill="url(#hatchg)" stroke-width="3.5"/><rect x="${x + 16}" y="${404 - i * 2}" width="12" height="${28 + i * 4}" rx="3" fill="url(#hatchg)" stroke-width="3.5"/>`).join('')}
  <rect x="90" y="540" width="200" height="22" fill="url(#hatchg)"/><path fill="none" d="M110 562 V600 M270 562 V600"/>
  <path fill="none" d="M140 540 V470 M240 540 V470"/><path fill="none" stroke-width="7" d="M70 470 H310"/>
  <rect x="62" y="440" width="22" height="60" rx="4" fill="url(#dark)"/><rect x="296" y="440" width="22" height="60" rx="4" fill="url(#dark)"/>
  <path fill="${G}" d="M390 600 L650 560 L660 590 L400 625 Z"/>
  <path fill="none" d="M620 560 L600 380 L560 380"/>
  <rect x="580" y="360" width="50" height="26" rx="4" fill="url(#hatch)"/>
  ${person(500, 585, 240, { fill: 'url(#hatchg)', arms: 'M480 430 L455 470 L470 495 M520 430 L555 455 L575 420', legs: false })}
  <path fill="none" d="M490 515 L460 585 M510 515 L540 545 L560 585"/>
  <path fill="none" stroke-width="3.5" d="M410 420 h-26 M420 460 h-30 M418 500 h-24"/>
  <path fill="url(#hatchg)" d="M120 640 a30 30 0 1 1 60 0 Z"/><path fill="none" d="M135 615 q15 -22 30 0"/>
  <path fill="none" d="M40 640 H670"/>`,
  },
  {
    file: '070',
    title: 'Beim Zahnarzt',
    tags: 'Zahnarzt, Behandlung, Angst, Bohrer, Praxis',
    svg: `
  <rect x="70" y="80" width="140" height="170" fill="url(#hatchg)"/><rect x="84" y="94" width="112" height="142"/>
  <path d="M110 130 Q140 115 170 130 Q178 170 165 215 Q156 222 150 200 Q140 175 130 200 Q124 222 115 215 Q102 170 110 130 Z"/>
  <path fill="none" d="M520 60 V110 L420 170"/>
  <path fill="url(#hatchg)" d="M380 160 L460 160 L450 200 L390 200 Z"/>
  <path fill="none" stroke-width="3.5" stroke-dasharray="10 8" d="M395 205 L340 300 M445 205 L470 300"/>
  <path fill="url(#hatchg)" d="M140 420 L230 300 L270 310 L200 430 Z"/>
  <path fill="url(#hatchg)" d="M200 430 L470 410 L500 440 L210 465 Z"/>
  <path fill="url(#hatchg)" d="M470 410 L560 460 L545 480 L490 445 Z"/>
  <path fill="none" d="M340 450 V560 M280 580 H400"/>
  <path fill="none" d="M240 430 L250 380 L320 380"/>
  <path fill="none" d="M580 300 V560 M540 580 H620"/>
  <rect x="520" y="290" width="120" height="16" fill="${G}"/>
  <path fill="none" stroke-width="3.5" d="M535 290 L545 255 M555 290 L560 250 M575 290 L590 252 M600 290 L612 258"/>
  <circle cx="545" cy="250" r="7"/>
  <path fill="none" d="M610 300 Q650 340 600 400 L560 380"/>
  <path fill="none" d="M40 580 H670"/>
  <path fill="#fff" d="M110 520 h60 v60 h-60 Z"/><ellipse cx="140" cy="520" rx="34" ry="10" fill="${G}"/>`,
  },
  {
    file: '071',
    title: 'Riesenrad auf der Kirmes',
    tags: 'Riesenrad, Kirmes, Jahrmarkt, Nacht, Lichter',
    svg: `
  ${sparkle(90, 90, 8)} ${sparkle(640, 80)} <circle cx="120" cy="200" r="30"/>
  <path fill="none" d="M300 590 L400 300 L500 590 M330 520 H470"/>
  <circle cx="400" cy="300" r="200"/>
  <circle cx="400" cy="300" r="180" fill="none" stroke-width="3"/>
  ${rotated(400, 300, 12, '<line x1="400" y1="300" x2="400" y2="100" stroke-width="3"/>')}
  <circle cx="400" cy="300" r="22" fill="url(#hatchg)"/>
  ${Array.from({ length: 12 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 12;
    const x = 400 + 200 * Math.cos(a), y = 300 + 200 * Math.sin(a);
    return `<path fill="${i % 3 ? '#fff' : 'url(#hatchg)'}" stroke-width="3.5" d="M${(x - 20).toFixed(0)} ${(y + 8).toFixed(0)} h40 v24 a8 8 0 0 1 -8 8 h-24 a8 8 0 0 1 -8 -8 Z"/><path fill="none" stroke-width="3" d="M${x.toFixed(0)} ${y.toFixed(0)} V${(y + 8).toFixed(0)}"/>`;
  }).join('')}
  <path fill="url(#hatch)" d="M60 450 L135 380 L210 450 Z"/>
  <rect x="70" y="450" width="130" height="140"/>
  <path fill="none" d="M100 450 V590 M170 450 V590"/>
  <path fill="none" d="M135 380 V355"/><path fill="${G}" d="M135 355 L160 362 L135 370 Z" stroke-width="3"/>
  <path fill="none" d="M30 590 H690"/>
  <path fill="none" stroke-width="3" d="M30 110 Q200 170 360 100"/>
  ${[70, 120, 170, 220, 270, 320].map((x, i) => `<circle cx="${x}" cy="${118 + Math.sin(i / 1.6) * 30 + (i > 2 ? 0 : 10)}" r="7"/>`).join('')}`,
  },
  {
    file: '072',
    title: 'Gefängniszelle',
    tags: 'Gefängnis, Zelle, Gitter, Flucht, Schlüssel',
    svg: `
  ${[[90, 220], [520, 380], [150, 330], [560, 120], [240, 520]].map(([x, y]) =>
    `<path fill="none" stroke-width="3" d="M${x} ${y} h50 v24 h-50 Z m50 0 h50 v24 h-50 Z M${x + 25} ${y + 24} h50 v24 h-50 Z"/>`).join('')}
  <rect x="290" y="95" width="130" height="85" fill="url(#hatchg)"/>
  <path fill="none" stroke-width="7" d="M322 95 V180 M355 95 V180 M388 95 V180"/>
  <path fill="none" stroke-width="3" stroke-dasharray="10 8" d="M300 180 L200 440 M410 180 L470 440"/>
  <path fill="none" stroke-width="4" d="M470 230 V280 M488 230 V280 M506 230 V280 M524 230 V280 M462 270 L534 240 M560 230 V280 M578 230 V280 M596 230 V280"/>
  <rect x="60" y="450" width="270" height="28" fill="url(#hatchg)"/>
  <path fill="url(#hatch)" d="M120 450 Q200 420 330 440 L330 450 Z"/>
  <ellipse cx="95" cy="440" rx="40" ry="16"/>
  <path fill="none" d="M75 478 V560 M315 478 V560"/>
  <path fill="#fff" d="M500 560 L510 490 L590 490 L600 560 Z"/><ellipse cx="550" cy="490" rx="40" ry="10" fill="${G}"/>
  <path fill="${G}" stroke="none" d="M20 560 H690 V700 H20 Z"/>
  <path fill="none" d="M20 560 H690"/>
  <path fill="none" stroke-width="8" d="M20 590 H690 ${Array.from({ length: 8 }, (_, i) => `M${58 + i * 85} 30 V690`).join(' ')} M20 120 H690"/>
  <rect x="370" y="330" width="56" height="70" rx="6" fill="url(#hatchg)"/><circle cx="398" cy="355" r="8"/><path fill="none" stroke-width="4" d="M398 363 V380"/>
  <circle cx="470" cy="645" r="16"/><path fill="none" stroke-width="6" d="M486 645 H560 M545 645 V662 M530 645 V658"/>`,
  },
];
