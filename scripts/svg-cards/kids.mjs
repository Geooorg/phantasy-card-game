// Gezeichnete Karten für das Kinder-Deck (Nummern ab 085).
import { cloud, flame, star, sparkle, bird, dashed, rotated } from './lib.mjs';

const K = '#222';

/** Dicker „Schlauch“ mit Umriss (Schlangen, Roboterarme …). */
const tube = (d, w) =>
  `<path d="${d}" fill="none" stroke-width="${w + 13}"/><path d="${d}" fill="none" stroke="#fff" stroke-width="${w}"/>`;

/** Fledermaus-Silhouette, Mitte (x,y). */
const bat = (x, y, s = 1) =>
  `<path fill="${K}" stroke-width="3" transform="translate(${x} ${y}) scale(${s})" d="M0 -6 C-6 -14, -14 -14, -16 -6 C-28 -20, -44 -18, -52 -4 C-44 -6, -38 0, -36 8 C-30 2, -22 2, -18 10 C-12 4, -6 4, 0 12 C6 4, 12 4, 18 10 C22 2, 30 2, 36 8 C38 0, 44 -6, 52 -4 C44 -18, 28 -20, 16 -6 C14 -14, 6 -14, 0 -6 Z"/>`;

/** Punkte auf einer quadratischen Bézierkurve. */
const quad = (p0, p1, p2, t) => [
  (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
  (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
];

const mirrorX = (pts) => pts.map(([x, y]) => [710 - x, y]);
const poly = (pts) => pts.map((p) => p.join(' ')).join(' L');

// ---------- Spinne ----------
const spiderLegs = [
  [[335, 375], [230, 280], [150, 330]],
  [[330, 395], [190, 360], [110, 440]],
  [[330, 420], [200, 470], [140, 560]],
  [[340, 440], [250, 530], [230, 630]],
];
const web = (() => {
  const c = [30, 30];
  const angles = [0, 20, 45, 70, 90].map((a) => (a * Math.PI) / 180);
  const pt = (r, a) => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a)];
  let d = angles.map((a) => `M${c.join(' ')} L${pt(260, a).join(' ')}`).join(' ');
  for (const r of [80, 150, 220]) {
    d += ` M${pt(r, angles[0]).join(' ')}`;
    for (let i = 1; i < angles.length; i++) {
      const mid = (angles[i - 1] + angles[i]) / 2;
      d += ` Q${pt(r * 0.85, mid).join(' ')} ${pt(r, angles[i]).join(' ')}`;
    }
  }
  return `<path fill="none" stroke-width="3.5" d="${d}"/>`;
})();

// ---------- Hängebrücke ----------
const bridge = (() => {
  const a = [185, 330], c = [355, 440], b = [525, 300];
  const ua = [180, 262], uc = [355, 375], ub = [530, 232];
  let planks = '', ropes = '';
  for (let i = 1; i < 14; i++) {
    const t = i / 14;
    if (i === 8) continue; // hier fehlt ein Brett
    const [x, y] = quad(a, c, b, t);
    const [ux, uy] = quad(ua, uc, ub, t);
    ropes += `M${x} ${y} L${ux} ${uy} `;
    planks += `<rect x="${x - 10}" y="${y - 7}" width="20" height="26" rx="3" transform="rotate(${(t - 0.5) * 60} ${x} ${y})"/>`;
  }
  return `
  <path fill="none" stroke-width="3.5" d="${ropes}"/>
  ${planks}
  <path fill="none" d="M${a.join(' ')} Q${c.join(' ')} ${b.join(' ')}"/>
  <path fill="none" d="M${ua.join(' ')} Q${uc.join(' ')} ${ub.join(' ')}"/>`;
})();

export default [
  {
    file: '085',
    title: 'Astronaut auf dem Mond',
    tags: 'Weltraum, Mond, Erde, Flagge, Sterne',
    svg: `
  <circle cx="560" cy="150" r="58"/>
  <path fill="none" stroke-width="4" d="M522 128 q15 -12 30 0 t28 12 M530 172 q22 12 38 -6 M588 136 q12 16 0 34"/>
  ${star(140, 120, 17)} ${star(255, 85, 10)} ${sparkle(420, 105)} ${sparkle(105, 250, 7)} ${star(640, 290, 10)}
  <path d="M40 515 Q200 478 360 503 T690 492 L690 700 L40 700 Z"/>
  <ellipse cx="150" cy="565" rx="48" ry="14"/><ellipse cx="470" cy="600" rx="62" ry="16"/><ellipse cx="600" cy="545" rx="26" ry="8"/>
  <line x1="470" y1="505" x2="470" y2="290"/>
  <path d="M470 295 L575 300 L570 365 L470 360 Z"/>${star(522, 330, 17)}
  <path d="M270 430 L262 512 L298 512 L300 440 Z"/><path d="M312 440 L318 512 L352 512 L342 430 Z"/>
  <rect x="226" y="335" width="38" height="92" rx="10"/>
  <rect x="215" y="350" width="34" height="88" rx="17" transform="rotate(12 232 350)"/>
  <rect x="250" y="325" width="106" height="125" rx="30"/>
  <rect x="279" y="356" width="48" height="32" rx="6"/>
  <circle cx="292" cy="372" r="5" fill="${K}"/><circle cx="313" cy="372" r="5"/>
  <path d="M345 342 L425 292 L440 314 L358 372 Z"/><circle cx="436" cy="298" r="17"/>
  <circle cx="303" cy="270" r="62"/>
  <path fill="${K}" d="M256 262 Q303 222 350 262 Q352 302 303 307 Q254 302 256 262 Z"/>
  <path fill="none" stroke="#fff" stroke-width="5" d="M275 258 Q290 246 308 245"/>`,
  },
  {
    file: '086',
    title: 'Große Spinne',
    tags: 'Spinne, Netz, gruselig, Faden',
    svg: `
  ${web}
  <line x1="380" y1="20" x2="380" y2="180" stroke-width="4"/>
  ${[...spiderLegs, ...spiderLegs.map((l) => mirrorX(l).map(([x, y]) => [x + 50, y]))]
    .map((l) => `<path fill="none" stroke-width="9" d="M${poly(l)}"/>`).join('')}
  <ellipse cx="380" cy="265" rx="78" ry="90"/>
  <path fill="none" d="M380 205 L355 250 L380 290 L405 250 Z"/>
  <circle cx="380" cy="405" r="64"/>
  <circle cx="356" cy="398" r="15"/><circle cx="404" cy="398" r="15"/>
  <circle cx="359" cy="402" r="6" fill="${K}"/><circle cx="401" cy="402" r="6" fill="${K}"/>
  <path fill="none" stroke-width="8" d="M332 372 L370 386 M428 372 L390 386"/>
  <path fill="${K}" stroke-width="4" d="M362 440 q-8 22 6 30 q-2 -14 6 -26 Z M398 440 q8 22 -6 30 q2 -14 -6 -26 Z"/>`,
  },
  {
    file: '087',
    title: 'Eiskristall',
    tags: 'Schneeflocke, Eis, Winter, Kälte',
    svg: `
  ${rotated(355, 355, 6, `<path fill="none" stroke-width="9" d="M355 355 V135 M355 290 l-48 -48 M355 290 l48 -48 M355 225 l-38 -38 M355 225 l38 -38 M355 172 l-24 -24 M355 172 l24 -24"/>
    <path d="M355 140 l-13 -16 l13 -16 l13 16 Z" stroke-width="5"/>`)}
  <polygon stroke-width="7" points="${Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${355 + 36 * Math.cos(a)},${355 + 36 * Math.sin(a)}`;
  }).join(' ')}"/>
  ${sparkle(110, 120)} ${sparkle(600, 600, 11)} ${sparkle(610, 130, 7)} ${sparkle(120, 590, 7)}
  <circle cx="95" cy="350" r="6"/><circle cx="625" cy="360" r="6"/>`,
  },
  {
    file: '088',
    title: 'T-Rex',
    tags: 'Dinosaurier, Urzeit, Zähne, gefährlich',
    svg: `
  <path transform="translate(-80 -4)" d="M310 420 C365 410, 400 460, 380 505 L372 560 L405 572 L405 580 L318 580 L330 560 L330 510 C290 490, 280 440, 310 420 Z"/>
  ${[[200, 395], [250, 360], [300, 333], [350, 320], [400, 300], [437, 268]]
    .map(([x, y]) => `<polygon stroke-width="5" points="${x - 16},${y + 6} ${x - 6},${y - 24} ${x + 14},${y}"/>`).join('')}
  <path d="M75 470 C180 440, 250 330, 340 320 C400 315, 430 290, 450 250 L460 190 C470 160, 520 150, 600 165 L628 185 L628 226 L522 236 L606 258 L601 282 C560 292, 520 292, 495 292 C480 330, 470 380, 440 420 C420 460, 380 482, 330 482 C250 482, 180 482, 75 470 Z"/>
  <path stroke-width="4" d="M540 231 l8 15 l8 -16 M565 230 l8 15 l8 -16 M590 228 l8 14 l8 -15 M545 244 l7 -10 l7 12 M568 250 l7 -11 l7 13"/>
  <circle cx="548" cy="192" r="9" fill="${K}"/>
  <path fill="none" stroke-width="9" d="M522 172 L570 184"/>
  <circle cx="612" cy="180" r="4" fill="${K}"/>
  <path fill="none" stroke-width="9" d="M465 352 L502 368 L512 392 M502 368 L524 374"/>
  <path d="M310 420 C365 410, 400 460, 380 505 L372 560 L405 572 L405 580 L318 580 L330 560 L330 510 C290 490, 280 440, 310 420 Z"/>
  <path fill="none" d="M60 582 H660"/>
  <path fill="none" stroke-width="4" d="M620 100 l18 -10 M640 130 l22 -2 M600 80 l6 -18"/>`,
  },
  {
    file: '089',
    title: 'Böser Tiger',
    tags: 'Tiger, Raubkatze, wütend, Zähne, Dschungel',
    svg: `
  <circle cx="215" cy="200" r="52"/><circle cx="495" cy="200" r="52"/>
  <circle cx="220" cy="205" r="24"/><circle cx="490" cy="205" r="24"/>
  <path d="M355 160 C470 160, 560 220, 565 330 L605 358 L560 375 L588 420 L540 425 C510 510, 440 560, 355 560 C270 560, 200 510, 170 425 L122 420 L150 375 L105 358 L145 330 C150 220, 240 160, 355 160 Z"/>
  <path fill="${K}" stroke-width="3" d="M355 166 L340 238 L370 238 Z M290 178 L308 232 L318 182 Z M420 178 L402 232 L392 182 Z
    M150 298 L218 314 L152 330 Z M168 392 L228 382 L178 414 Z M560 298 L492 314 L558 330 Z M542 392 L482 382 L532 414 Z"/>
  <path d="M245 290 L322 316 Q302 346 266 336 Q240 322 245 290 Z"/><path d="M465 290 L388 316 Q408 346 444 336 Q470 322 465 290 Z"/>
  <ellipse cx="287" cy="322" rx="6" ry="14" fill="${K}"/><ellipse cx="423" cy="322" rx="6" ry="14" fill="${K}"/>
  <path fill="none" stroke-width="11" d="M232 268 L326 298 M478 268 L384 298"/>
  <circle cx="318" cy="430" r="46"/><circle cx="392" cy="430" r="46"/>
  <path fill="${K}" d="M298 462 Q355 548 412 462 Q355 484 298 462 Z"/>
  <path stroke-width="4" d="M316 468 L328 504 L340 472 Z M394 468 L382 504 L370 472 Z"/>
  <path fill="${K}" d="M318 380 L392 380 L355 416 Z"/>
  <path fill="none" stroke-width="3.5" d="M285 440 L195 428 M285 456 L200 472 M425 440 L515 428 M425 456 L510 472"/>`,
  },
  {
    file: '090',
    title: 'Wildschwein',
    tags: 'Wildschwein, Wald, Hauer, rennt, Angriff',
    svg: `
  <path d="M480 455 L492 545 L522 545 L522 452 Z"/><path d="M300 465 L300 545 L330 545 L332 465 Z"/>
  <path fill="none" stroke-width="5" d="M232 298 l14 -26 l12 22 l14 -30 l14 26 l14 -30 l13 26 l15 -28 l13 26 l15 -27 l13 25 l15 -24 l13 22 l15 -20 l12 19"/>
  <path d="M200 330 C260 262, 480 252, 560 300 C622 340, 612 452, 540 472 L262 476 C212 470, 180 400, 200 330 Z"/>
  <path d="M245 455 L234 545 L265 545 L282 462 Z"/><path d="M540 448 L562 540 L592 534 L572 440 Z"/>
  <path d="M232 318 C198 308, 158 330, 128 368 L92 392 L88 446 L140 452 C182 456, 222 440, 252 420 Z"/>
  <ellipse cx="90" cy="420" rx="14" ry="27"/><circle cx="86" cy="410" r="3.5" fill="${K}"/><circle cx="86" cy="430" r="3.5" fill="${K}"/>
  <path stroke-width="5" d="M138 432 Q108 402 120 372 Q132 404 154 426 Z"/>
  <path fill="none" stroke-width="5" d="M96 446 Q122 458 152 442"/>
  <circle cx="190" cy="356" r="9" fill="${K}"/><path fill="none" stroke-width="8" d="M166 334 L214 352"/>
  <path d="M212 316 L236 262 L258 322 Z"/>
  <path fill="none" stroke-width="5" d="M602 330 q36 -10 26 20 q-10 22 22 26"/>
  <path fill="none" d="M60 547 H600"/>
  ${cloud(585, 560, 70)} ${cloud(615, 505, 45)}
  <path fill="none" stroke-width="5" d="M622 285 H672 M632 330 H676 M618 400 H660"/>`,
  },
  {
    file: '091',
    title: 'Brennendes Haus',
    tags: 'Feuer, Haus, Rauch, Notfall, Feuerwehr',
    svg: `
  ${cloud(220, 130, 110)} ${cloud(380, 110, 150)} ${cloud(520, 160, 90)}
  <rect x="470" y="205" width="42" height="80"/>
  <rect x="172" y="330" width="368" height="252"/>
  <path d="M140 342 L356 172 L572 342 Z"/>
  <rect x="210" y="380" width="72" height="62"/><rect x="430" y="380" width="72" height="62"/>
  <path d="M322 582 V505 Q356 470 390 505 V582"/>
  <circle cx="378" cy="545" r="5" fill="${K}"/>
  ${flame(246, 442, 120)} ${flame(466, 442, 110)}
  ${flame(258, 290, 150)} ${flame(430, 285, 175)} ${flame(345, 210, 115)}
  ${flame(258, 290, 80, 'stroke-width="4"')} ${flame(430, 285, 90, 'stroke-width="4"')}
  <path fill="none" d="M80 582 H630"/>
  <path fill="none" stroke-width="4" d="M150 240 l-14 -14 M590 250 l16 -12 M600 310 l20 0 M120 300 l-18 -4"/>`,
  },
  {
    file: '092',
    title: 'Kirche',
    tags: 'Kirche, Turm, Glocke, Uhr, Dorf',
    svg: `
  <circle cx="160" cy="450" r="62"/><path d="M150 510 L148 582 L172 582 L170 510" />
  <path d="M420 292 L560 292 L612 368 L420 368 Z"/>
  <rect x="420" y="366" width="182" height="216"/>
  <path d="M470 470 V430 Q490 405 510 430 V470 Z"/><path d="M540 470 V430 Q560 405 580 430 V470 Z"/>
  <rect x="290" y="222" width="130" height="360"/>
  <path d="M278 226 L355 100 L432 226 Z"/>
  <path fill="none" stroke-width="8" d="M355 100 V52 M336 70 H374"/>
  <circle cx="355" cy="276" r="30"/>
  <path fill="none" stroke-width="5" d="M355 276 V256 M355 276 L370 284"/>
  <path d="M332 372 V342 Q355 314 378 342 V372 Z"/>
  <path fill="none" stroke-width="4" d="M342 360 Q355 344 368 360"/>
  <path d="M318 582 V512 Q355 470 392 512 V582"/><path fill="none" d="M355 490 V582"/>
  <path fill="none" d="M80 582 H640"/>
  ${bird(520, 150)} ${bird(570, 180, 0.8)} ${bird(200, 160, 0.9)}`,
  },
  {
    file: '093',
    title: 'Sportwagen',
    tags: 'Auto, schnell, Rennen, Geschwindigkeit',
    svg: `
  <path fill="none" d="M122 378 L128 402"/>
  <path d="M90 465 L92 405 L180 395 L290 340 Q340 325 420 330 L520 380 L620 405 Q648 420 642 465 Z"/>
  <path d="M78 362 L168 362 L162 378 L84 378 Z"/>
  <path d="M305 352 Q345 341 400 344 L468 384 L300 386 Z"/><path fill="none" d="M382 344 V386"/>
  <path fill="none" d="M300 392 L312 455"/><path fill="none" stroke-width="5" d="M330 410 H352"/>
  <path d="M598 410 L632 418 L628 432 L594 426 Z"/>
  <path fill="none" stroke-width="5" d="M108 428 L290 428 M108 442 L290 442"/>
  <circle cx="205" cy="465" r="52"/><circle cx="205" cy="465" r="22"/>
  <circle cx="530" cy="465" r="52"/><circle cx="530" cy="465" r="22"/>
  <path fill="none" stroke-width="4" d="M205 443 V420 M205 487 V510 M183 465 H160 M227 465 H250 M530 443 V420 M530 487 V510 M508 465 H485 M552 465 H575"/>
  <path fill="none" d="M60 518 H660"/>
  <path fill="none" stroke-width="5" d="M42 410 H72 M38 440 H62 M46 470 H66"/>
  ${cloud(70, 520, 50)}`,
  },
  {
    file: '094',
    title: 'Käse mit Maus',
    tags: 'Käse, Löcher, Maus, angeschnitten, Essen',
    svg: `
  <path d="M125 300 L125 450 A230 90 0 0 0 223 524 L223 374 A230 90 0 0 1 125 300 Z"/>
  <path d="M585 300 L585 450 A230 90 0 0 1 487 524 L487 374 A230 90 0 0 0 585 300 Z"/>
  <path d="M355 300 L223 374 L223 524 L355 450 Z"/>
  <path d="M355 300 L487 374 L487 524 L355 450 Z"/>
  <path d="M355 300 L487 374 A230 90 0 1 0 223 374 Z"/>
  <ellipse cx="290" cy="276" rx="24" ry="8"/><ellipse cx="420" cy="262" rx="17" ry="6"/>
  <ellipse cx="200" cy="318" rx="15" ry="5"/><ellipse cx="520" cy="312" rx="19" ry="6"/><ellipse cx="350" cy="232" rx="12" ry="4"/>
  <ellipse cx="270" cy="440" rx="18" ry="22"/><ellipse cx="300" cy="380" rx="10" ry="12"/><ellipse cx="250" cy="495" rx="10" ry="12"/>
  <ellipse cx="410" cy="490" rx="12" ry="14"/><ellipse cx="455" cy="410" rx="9" ry="10"/>
  <ellipse cx="170" cy="380" rx="13" ry="18"/><ellipse cx="555" cy="390" rx="11" ry="16"/>
  <ellipse cx="160" cy="465" rx="14" ry="18" fill="${K}"/>
  <path fill="none" stroke-width="5" d="M152 472 Q110 500 90 470 Q80 440 110 445"/>
  <ellipse cx="410" cy="430" rx="34" ry="38" fill="${K}"/>
  <circle cx="390" cy="410" r="14"/><circle cx="430" cy="410" r="14"/>
  <ellipse cx="410" cy="438" rx="25" ry="22"/>
  <circle cx="401" cy="432" r="4" fill="${K}"/><circle cx="419" cy="432" r="4" fill="${K}"/>
  <circle cx="410" cy="448" r="4.5" fill="${K}"/>
  <path fill="none" stroke-width="3" d="M402 450 L372 446 M402 455 L374 462 M418 450 L448 446 M418 455 L446 462"/>
  <circle cx="560" cy="560" r="5"/><circle cx="590" cy="545" r="4"/><circle cx="140" cy="570" r="4"/>`,
  },
  {
    file: '095',
    title: 'Geist',
    tags: 'Gespenst, Spuk, Nacht, Mond, Buh',
    svg: `
  <path d="M560 90 A62 62 0 1 0 610 190 A50 50 0 1 1 560 90 Z"/>
  ${star(140, 110, 14)} ${star(200, 200, 9)} ${sparkle(470, 90)} ${star(610, 420, 10)} ${sparkle(110, 470, 8)}
  <g transform="rotate(-7 355 380)">
    <path d="M240 336 C200 350, 165 345, 138 318 C155 348, 196 378, 240 388 Z"/>
    <path d="M470 336 C510 350, 545 345, 572 318 C555 348, 514 378, 470 388 Z"/>
    <path d="M235 300 C235 160, 475 160, 475 300 L482 560 Q452 600 422 565 Q392 530 362 570 Q332 605 302 565 Q272 530 232 565 Z"/>
    <ellipse cx="315" cy="290" rx="17" ry="27" fill="${K}"/><ellipse cx="395" cy="290" rx="17" ry="27" fill="${K}"/>
    <ellipse cx="355" cy="372" rx="27" ry="35" fill="${K}"/>
  </g>
  <path fill="none" stroke-width="4" d="M190 580 q-16 6 -30 0 M540 590 q16 6 30 0 M520 160 l18 -12"/>`,
  },
  {
    file: '096',
    title: 'Feuerdrache',
    tags: 'Drache, Feuer, Fantasie, Hörner, gefährlich',
    svg: `
  <path d="M330 252 L285 160 L362 242 Z"/><path d="M385 246 L368 150 L414 248 Z"/>
  ${[[148, 540], [168, 470], [196, 405], [238, 340], [290, 282]]
    .map(([x, y]) => `<polygon stroke-width="5" points="${x + 10},${y + 22} ${x - 30},${y - 8} ${x + 18},${y - 14}"/>`).join('')}
  <path d="M110 720 C140 560, 170 430, 230 360 C250 300, 290 250, 350 240 L470 250 C500 255, 520 275, 515 300 L506 330 L420 336 L500 352 C505 382, 480 396, 450 396 L370 396 C330 410, 300 470, 290 530 C282 600, 272 660, 272 720 Z"/>
  <path stroke-width="4" d="M430 334 l8 14 l8 -14 M456 333 l8 14 l8 -14 M482 332 l7 12 l7 -12 M440 352 l7 -12 l7 13 M466 356 l7 -11 l7 12"/>
  <circle cx="400" cy="288" r="15"/><ellipse cx="402" cy="290" rx="4" ry="11" fill="${K}"/>
  <path fill="none" stroke-width="8" d="M374 266 L428 278"/>
  <path fill="none" stroke-width="5" d="M488 276 q8 -8 14 2"/>
  <path fill="none" stroke-width="4" d="M210 470 q14 -10 22 4 M240 420 q14 -10 22 4 M196 540 q14 -10 22 4 M250 500 q14 -10 22 4"/>
  <path d="M512 344 C540 318, 570 272, 610 242 C605 266, 630 262, 652 246 C642 282, 682 300, 662 322 C692 338, 672 362, 690 382 C660 382, 680 412, 655 432 C640 416, 610 420, 600 442 C580 402, 550 372, 512 352 Z"/>
  <path stroke-width="4" d="M520 346 C548 330, 568 306, 592 292 C592 310, 612 308, 626 300 C620 322, 646 334, 630 348 C650 360, 630 372, 640 392 C616 388, 600 400, 590 410 C574 384, 552 366, 520 352 Z"/>
  ${cloud(520, 230, 50)} ${cloud(560, 190, 34)}`,
  },
  {
    file: '097',
    title: 'Vulkanausbruch',
    tags: 'Vulkan, Lava, Ausbruch, Berg, Rauch',
    svg: `
  ${cloud(220, 230, 140)} ${cloud(330, 175, 170)} ${cloud(450, 220, 120)}
  <path d="M70 605 L250 305 L290 322 L330 292 L380 312 L420 290 L460 305 L640 605 Z"/>
  <path d="M300 318 Q312 380 292 420 Q282 452 302 462 Q324 440 322 400 Q332 360 342 312 Z"/>
  <path d="M400 300 Q395 360 420 410 Q440 460 430 520 Q452 530 458 500 Q462 440 440 395 Q424 350 440 302 Z"/>
  <path d="M262 312 Q240 360 220 392 Q205 418 222 428 Q240 410 252 380 Q262 350 280 320 Z"/>
  <path fill="${K}" stroke-width="3" d="M190 160 l18 -10 l10 16 l-16 12 Z M520 130 l20 -6 l6 18 l-20 6 Z M300 90 l14 -10 l12 12 l-14 10 Z M600 260 l14 -6 l6 14 l-14 6 Z M120 280 l14 -4 l4 14 l-14 4 Z"/>
  <path fill="none" stroke-width="4" d="M260 290 L210 230 M450 290 L500 230 M355 290 V230"/>
  <path fill="none" d="M50 605 H660"/>
  <path fill="none" stroke-width="4" d="M150 530 l20 -10 M520 470 l20 10 M560 540 l22 6"/>`,
  },
  {
    file: '098',
    title: 'Piratenschiff',
    tags: 'Piraten, Schiff, Meer, Totenkopf, Kanonen',
    svg: `
  <line x1="355" y1="405" x2="355" y2="60"/>
  <path d="M245 140 Q355 165 465 140 L455 272 Q355 292 255 272 Z"/>
  <path d="M230 292 Q355 318 480 292 L470 385 Q355 402 240 385 Z"/>
  <circle cx="355" cy="200" r="24"/><circle cx="346" cy="198" r="5" fill="${K}"/><circle cx="364" cy="198" r="5" fill="${K}"/>
  <path fill="none" stroke-width="7" d="M320 228 L390 256 M390 228 L320 256"/>
  <path fill="none" stroke-width="7" d="M235 140 H475 M220 290 H490"/>
  <path fill="${K}" d="M358 64 Q400 54 445 66 L442 116 Q400 106 358 114 Z"/>
  <circle cx="400" cy="84" r="10" fill="#fff" stroke="#fff"/>
  <path fill="none" stroke="#fff" stroke-width="4" d="M386 100 L414 108 M414 100 L386 108"/>
  <path d="M95 375 L210 405 L540 405 L625 365 L596 432 L556 540 L166 540 L130 440 Z"/>
  <path fill="none" stroke-width="4" d="M140 445 H590 M155 500 H570"/>
  ${[230, 300, 370, 440, 510].map((x) => `<circle cx="${x}" cy="472" r="13" fill="${K}"/>`).join('')}
  <path d="M40 540 Q80 518 120 540 T200 540 T280 540 T360 540 T440 540 T520 540 T600 540 T680 540 L690 700 L30 700 Z"/>
  <path fill="none" stroke-width="4" d="M90 590 q20 -12 40 0 M300 610 q20 -12 40 0 M520 585 q20 -12 40 0"/>
  ${bird(140, 170)} ${bird(560, 200, 0.8)}`,
  },
  {
    file: '099',
    title: 'Hai',
    tags: 'Hai, Meer, Zähne, gefährlich, Fisch flieht',
    svg: `
  <path fill="none" d="M40 140 Q80 120 120 140 T200 140 T280 140 T360 140 T440 140 T520 140 T600 140 T680 140"/>
  <path d="M95 350 C160 290, 300 270, 430 288 L475 205 L505 300 C560 310, 600 325, 625 330 L665 262 L650 345 L670 430 L615 370 C560 390, 480 420, 380 430 C300 440, 220 440, 160 430 L110 420 L175 395 L105 370 Z"/>
  <path fill="${K}" d="M105 370 L175 395 L110 420 Z"/>
  <path stroke-width="3" d="M112 373 l6 14 l8 -10 l6 14 l8 -10 l6 14 l8 -10 M114 417 l6 -13 l8 9 l6 -13 l8 9 l6 -12 l8 8"/>
  <circle cx="192" cy="332" r="10" fill="${K}"/><path fill="none" stroke-width="7" d="M172 314 L212 324"/>
  <path fill="none" stroke-width="5" d="M250 340 q-8 25 0 50 M272 340 q-8 25 0 50 M294 340 q-8 25 0 50"/>
  <path d="M300 420 L262 500 L362 432 Z"/>
  <ellipse cx="110" cy="232" rx="28" ry="15"/><path d="M136 232 L162 216 L160 248 Z"/>
  <circle cx="98" cy="228" r="4" fill="${K}"/>
  <path fill="none" stroke-width="4" d="M84 252 q-4 8 0 14 M180 228 H200 M178 242 H196"/>
  <circle cx="240" cy="210" r="8"/><circle cx="262" cy="182" r="6"/><circle cx="560" cy="230" r="9"/>
  <path fill="none" stroke-width="5" d="M40 620 Q200 590 360 615 T680 605"/>
  <path fill="none" stroke-width="5" d="M140 610 q-20 -40 0 -70 q20 -30 0 -60 M560 610 q20 -40 0 -70"/>`,
  },
  {
    file: '100',
    title: 'UFO entführt Kuh',
    tags: 'UFO, Außerirdische, Lichtstrahl, Kuh, Nacht',
    svg: `
  ${star(110, 100, 12)} ${sparkle(620, 90)} ${star(600, 320, 9)} ${sparkle(100, 320, 7)}
  <path fill="none" stroke-width="4" stroke-dasharray="14 12" d="M285 252 L160 600 M425 252 L550 600"/>
  <path d="M250 196 Q355 72 460 196 Z"/>
  <circle cx="332" cy="160" r="6" fill="${K}"/><circle cx="378" cy="160" r="6" fill="${K}"/>
  <ellipse cx="355" cy="212" rx="212" ry="50"/>
  <path fill="none" d="M150 220 Q355 250 560 220"/>
  ${[200, 280, 355, 430, 510].map((x, i) => `<circle cx="${x}" cy="${222 + (i === 2 ? 8 : i % 4 ? 6 : 0)}" r="11"/>`).join('')}
  <g transform="rotate(-12 360 430)">
    <path fill="none" stroke-width="7" d="M318 455 L306 505 M345 458 L348 510 M392 458 L398 508 M415 455 L432 500"/>
    <rect x="296" y="398" width="132" height="64" rx="24"/>
    <path fill="${K}" stroke-width="3" d="M320 410 q20 -6 26 10 q-6 18 -24 10 Z M370 430 q18 -10 28 6 q-4 16 -22 14 Z"/>
    <rect x="420" y="380" width="56" height="44" rx="16"/>
    <path fill="none" stroke-width="5" d="M430 380 l-8 -16 M466 380 l8 -16 M296 410 q-26 -6 -30 -30"/>
    <circle cx="438" cy="396" r="5" fill="${K}"/><circle cx="458" cy="396" r="5" fill="${K}"/>
    <ellipse cx="448" cy="414" rx="16" ry="7"/>
  </g>
  <path fill="none" d="M50 600 H660"/>
  <path fill="none" stroke-width="4" d="M100 600 l-6 -20 M110 600 l4 -22 M600 600 l-6 -20 M610 600 l6 -20"/>`,
  },
  {
    file: '101',
    title: 'Höhle mit leuchtenden Augen',
    tags: 'Höhle, Augen, Dunkelheit, unheimlich, Fledermäuse',
    svg: `
  <path d="M40 610 L90 400 L170 280 L280 222 L400 232 L520 300 L610 420 L670 610 Z"/>
  <path fill="${K}" d="M200 610 C200 430, 270 360, 355 360 C440 360, 510 430, 510 610 Z"/>
  <path stroke-width="4" d="M290 380 l10 34 l12 -30 M380 368 l10 30 l10 -28 M440 395 l8 26 l10 -22"/>
  ${[[305, 470, 1], [355, 466, 1], [420, 540, 0.75], [458, 542, 0.75]].map(([x, y, s]) =>
    `<ellipse cx="${x}" cy="${y}" rx="${19 * s}" ry="${11 * s}" stroke="#fff" stroke-width="3"/><ellipse cx="${x}" cy="${y}" rx="${4 * s}" ry="${9 * s}" fill="${K}" stroke="none"/>`).join('')}
  <path fill="none" stroke-width="4" d="M150 380 q20 -10 40 4 M480 280 q22 -8 40 8 M560 450 q20 -6 34 10"/>
  <ellipse cx="170" cy="600" rx="34" ry="16"/><ellipse cx="545" cy="598" rx="42" ry="18"/>
  <path fill="none" d="M40 612 H670"/>
  ${bat(420, 150, 1)} ${bat(520, 110, 0.7)} ${bat(330, 120, 0.6)}`,
  },
  {
    file: '102',
    title: 'Hexenkessel',
    tags: 'Zaubertrank, Kessel, Feuer, Blasen, Magie',
    svg: `
  <path fill="none" stroke-width="10" d="M230 610 L480 570 M230 570 L480 610"/>
  ${flame(290, 600, 90)} ${flame(355, 605, 120)} ${flame(420, 600, 90)}
  <path d="M190 345 C150 450, 220 560, 355 560 C490 560, 560 450, 520 345 Z"/>
  <path fill="none" stroke-width="10" d="M440 330 L520 220"/>
  <circle cx="512" cy="212" r="15"/><circle cx="532" cy="228" r="15"/>
  <ellipse cx="355" cy="340" rx="192" ry="32"/>
  <ellipse cx="355" cy="340" rx="166" ry="20" fill="${K}"/>
  <circle cx="300" cy="288" r="24"/><circle cx="400" cy="268" r="32"/><circle cx="345" cy="214" r="16"/>
  <circle cx="440" cy="196" r="12"/><circle cx="268" cy="228" r="10"/><circle cx="380" cy="150" r="9"/>
  ${star(180, 170, 14)} ${sparkle(560, 120)} ${sparkle(140, 300, 8)} ${star(590, 320, 10)}
  <path fill="none" stroke-width="5" d="M280 420 q20 -10 40 0 M380 470 q20 -10 40 0"/>`,
  },
  {
    file: '103',
    title: 'Schlange',
    tags: 'Schlange, Zunge, gefährlich, Wüste',
    svg: `
  ${tube('M110 590 C260 605, 520 615, 545 540 C565 470, 300 482, 292 410 C282 340, 470 335, 452 262', 48)}
  <path d="M110 590 C260 605, 520 615, 545 540 C565 470, 300 482, 292 410 C282 340, 470 335, 452 262" fill="none" stroke-width="14" stroke-dasharray="1 46"/>
  <path fill="none" stroke-width="5" d="M452 290 L452 320 L438 340 M452 320 L466 340"/>
  <ellipse cx="452" cy="238" rx="58" ry="44"/>
  <circle cx="430" cy="225" r="13"/><circle cx="474" cy="225" r="13"/>
  <ellipse cx="430" cy="227" rx="3.5" ry="9" fill="${K}"/><ellipse cx="474" cy="227" rx="3.5" ry="9" fill="${K}"/>
  <path fill="none" stroke-width="7" d="M412 204 L440 212 M492 204 L464 212"/>
  <circle cx="444" cy="262" r="3" fill="${K}"/><circle cx="460" cy="262" r="3" fill="${K}"/>
  <path fill="none" stroke-width="4" d="M150 200 q10 -16 20 0 q10 16 20 0 M560 180 l20 -10 M570 210 l24 0"/>
  <ellipse cx="590" cy="610" rx="40" ry="16"/><path fill="none" stroke-width="4" d="M80 625 H650"/>`,
  },
  {
    file: '104',
    title: 'Krokodil',
    tags: 'Krokodil, Wasser, Zähne, Fluss, Gefahr',
    svg: `
  <g transform="translate(0 15) scale(1 1.25) translate(0 -80)">
  <path d="M60 470 C150 440, 230 420, 300 410 L420 400 L470 378 L622 330 L632 346 L500 400 L632 418 L622 440 L470 446 C380 462, 300 472, 220 476 C160 480, 110 480, 60 470 Z"/>
  <path fill="${K}" d="M502 400 L628 349 L628 416 Z"/>
  <path stroke-width="3" d="M520 393 l8 12 l6 -15 l8 12 l6 -15 l8 12 l6 -14 l8 11 l6 -14 l8 10 M520 407 l8 -10 l6 13 l8 -10 l6 13 l8 -10 l6 12 l8 -10 l6 12"/>
  <path d="M120 450 q12 -26 24 0 M170 436 q12 -26 24 0 M220 425 q12 -26 24 0 M270 416 q12 -26 24 0 M320 410 q12 -24 24 0 M370 406 q12 -24 24 0"/>
  <circle cx="462" cy="372" r="20"/><ellipse cx="465" cy="372" rx="4" ry="10" fill="${K}"/>
  <path fill="none" stroke-width="7" d="M440 352 L484 360"/>
  <circle cx="612" cy="336" r="3" fill="${K}"/>
  </g>
  <path d="M30 505 Q70 487 110 505 T190 505 T270 505 T350 505 T430 505 T510 505 T590 505 T670 505 L690 700 L20 700 Z"/>
  <path fill="none" stroke-width="4" d="M120 540 q20 -12 40 0 M330 560 q20 -12 40 0 M520 530 q20 -12 40 0 M230 620 q20 -12 40 0"/>
  <path fill="none" stroke-width="5" d="M80 505 V250 M110 505 V300 M100 380 l20 -30"/>
  <ellipse cx="80" cy="250" rx="10" ry="28"/><ellipse cx="110" cy="295" rx="9" ry="24"/>`,
  },
  {
    file: '105',
    title: 'Hexe auf dem Besen',
    tags: 'Hexe, Besen, Vollmond, Nacht, fliegen',
    svg: `
  <circle cx="370" cy="310" r="215"/>
  <circle cx="300" cy="230" r="28" fill="none" stroke-width="4"/><circle cx="460" cy="420" r="38" fill="none" stroke-width="4"/>
  ${star(100, 110, 13)} ${star(610, 600, 11)} ${sparkle(630, 120)} ${sparkle(90, 560, 8)}
  <path stroke-width="5" d="M190 418 L95 392 L80 440 L102 472 L196 432 Z"/>
  <path fill="none" stroke-width="3" d="M110 400 L185 425 M100 425 L188 430 M105 455 L190 432"/>
  <path fill="none" stroke-width="10" d="M190 425 L580 320"/>
  <path fill="${K}" d="M290 400 C305 340, 340 290, 385 278 L405 335 L440 365 L340 398 Z M305 340 L230 305 L262 345 L216 355 L285 385 Z"/>
  <circle cx="395" cy="262" r="22" fill="${K}"/>
  <path fill="${K}" d="M412 256 L436 266 L412 270 Z"/>
  <path fill="${K}" d="M368 248 L420 242 L332 150 Z"/><path fill="none" stroke-width="8" d="M356 250 L432 240"/>
  <path fill="none" stroke-width="12" d="M392 300 L455 348"/>
  <path fill="none" stroke-width="10" d="M370 395 L395 445 L420 445"/>
  ${bat(560, 160, 0.8)} ${bat(180, 220, 0.6)}`,
  },
  {
    file: '106',
    title: 'Roboter',
    tags: 'Roboter, Maschine, Technik, Funken',
    svg: `
  <line x1="355" y1="132" x2="355" y2="92"/><circle cx="355" cy="84" r="12"/>
  <path fill="none" stroke-width="5" d="M395 70 L415 50 L405 80 L428 62"/>
  ${tube('M245 300 L185 360 L195 425', 26)}
  ${tube('M465 300 L535 250 L555 190', 26)}
  <path fill="none" stroke-width="8" d="M180 430 l-8 26 M205 430 l10 24 M548 180 l-16 -18 M565 185 l14 -20"/>
  <rect x="280" y="460" width="50" height="92"/><rect x="380" y="460" width="50" height="92"/>
  <rect x="262" y="548" width="78" height="30" rx="10"/><rect x="370" y="548" width="78" height="30" rx="10"/>
  <rect x="240" y="270" width="230" height="192" rx="16"/>
  <rect x="270" y="300" width="100" height="62" rx="8"/>
  <path fill="none" stroke-width="4" d="M280 334 L300 334 L310 314 L322 352 L334 326 L344 334 L360 334"/>
  <circle cx="420" cy="320" r="22"/><path fill="none" stroke-width="5" d="M420 320 L434 306"/>
  <circle cx="290" cy="410" r="12" fill="${K}"/><circle cx="330" cy="410" r="12"/><circle cx="370" cy="410" r="12" fill="${K}"/>
  <rect x="400" y="388" width="44" height="48" rx="6"/>
  <rect x="336" y="248" width="38" height="24"/>
  <rect x="270" y="130" width="170" height="120" rx="18"/>
  <rect x="252" y="168" width="18" height="40" rx="5"/><rect x="440" y="168" width="18" height="40" rx="5"/>
  <circle cx="318" cy="182" r="22"/><circle cx="392" cy="182" r="22"/>
  <circle cx="318" cy="182" r="8" fill="${K}"/><circle cx="392" cy="182" r="8" fill="${K}"/>
  <rect x="308" y="216" width="94" height="20" rx="4"/>
  <path fill="none" stroke-width="4" d="M330 216 V236 M355 216 V236 M380 216 V236"/>
  <path fill="none" d="M120 580 H600"/>`,
  },
  {
    file: '107',
    title: 'Fledermaus',
    tags: 'Fledermaus, Nacht, Mond, Vampir, fliegen',
    svg: `
  <circle cx="355" cy="320" r="235"/>
  <circle cx="230" cy="220" r="30" fill="none" stroke-width="4"/><circle cx="500" cy="440" r="42" fill="none" stroke-width="4"/>
  ${star(80, 90, 12)} ${star(640, 620, 12)} ${sparkle(640, 90)} ${sparkle(80, 620, 8)}
  <path fill="#444" d="M325 300 L230 245 L80 290 Q118 330 108 375 Q150 352 180 395 Q210 362 252 405 Q284 372 322 386 Z"/>
  <path fill="#444" d="M385 300 L480 245 L630 290 Q592 330 602 375 Q560 352 530 395 Q500 362 458 405 Q426 372 388 386 Z"/>
  <path fill="none" stroke="#fff" stroke-width="3" d="M230 250 L180 390 M230 250 L252 400 M480 250 L530 390 M480 250 L458 400"/>
  <ellipse cx="355" cy="345" rx="48" ry="62" fill="${K}"/>
  <path fill="${K}" d="M322 250 L316 196 L346 232 Z M388 250 L394 196 L364 232 Z"/>
  <circle cx="355" cy="266" r="42" fill="${K}"/>
  <ellipse cx="338" cy="260" rx="11" ry="9" fill="#fff"/><ellipse cx="372" cy="260" rx="11" ry="9" fill="#fff"/>
  <circle cx="340" cy="261" r="4" fill="${K}"/><circle cx="370" cy="261" r="4" fill="${K}"/>
  <path stroke="#fff" fill="#fff" stroke-width="2" d="M342 288 l5 14 l5 -12 Z M368 288 l-5 14 l-5 -12 Z"/>
  <path fill="none" stroke="#fff" stroke-width="3.5" d="M336 284 Q355 296 374 284"/>`,
  },
  {
    file: '108',
    title: 'Hängebrücke über der Schlucht',
    tags: 'Brücke, Schlucht, Abgrund, Mut, Abenteuer',
    svg: `
  ${cloud(170, 640, 150)} ${cloud(380, 680, 130)}
  <path d="M20 330 L190 330 L202 380 L172 450 L192 520 L152 600 L132 700 L20 700 Z"/>
  <path d="M690 300 L520 300 L508 360 L540 430 L515 500 L550 580 L570 700 L690 700 Z"/>
  <path fill="none" stroke-width="4" d="M80 330 l-6 -20 M92 330 l4 -22 M600 300 l-6 -20 M612 300 l6 -22 M120 420 l30 10 M600 400 l-30 10"/>
  <path fill="none" stroke-width="8" d="M180 330 V255 M530 300 V225"/>
  ${bridge}
  <rect x="345" y="540" width="20" height="40" rx="3" transform="rotate(35 355 560)"/>
  <path fill="none" stroke-width="4" d="M330 500 l-6 -22 M380 505 l6 -22 M355 495 V470"/>
  ${bird(420, 130)} ${bird(470, 160, 0.8)} ${bird(250, 120, 0.9)}`,
  },
];
