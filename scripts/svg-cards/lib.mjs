// Hilfsfunktionen für die gezeichneten SVG-Karten (Rahmen, Filter, wiederkehrende Formen).
// Koordinatensystem jeder Karte: 0..710 × 0..710.

export const SIZE = 710;

/** Strichstil je Deck. */
export const STYLES = {
  kids: { stroke: '#222', width: 6.5, grain: false },
  erwachsene: { stroke: '#2e2e2e', width: 4.5, grain: true },
};

function filters(seed, grain) {
  const grainSteps = grain
    ? `<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="${seed + 7}" result="g"/>
       <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.75" result="gm"/>
       <feComposite in="d" in2="gm" operator="in" result="dg"/>`
    : '';
  const ink = grain ? 'dg' : 'd';
  return `
  <filter id="ink" x="-3%" y="-3%" width="106%" height="106%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="${seed}" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/>
    ${grainSteps}
    <feOffset in="d" dx="5" dy="6" result="o"/>
    <feColorMatrix in="o" type="matrix" values="0 0 0 0 0.78  0 0 0 0 0.78  0 0 0 0 0.78  0 0 0 0.45 0" result="sh"/>
    <feMerge><feMergeNode in="sh"/><feMergeNode in="${ink}"/></feMerge>
  </filter>
  <filter id="frame" x="-3%" y="-3%" width="106%" height="106%">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="${seed + 3}" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G"/>
  </filter>`;
}

const patterns = `
  <pattern id="hatch" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="11" height="11" fill="#fff"/><line x1="0" y1="0" x2="0" y2="11" stroke="#5a5a5a" stroke-width="1.6"/>
  </pattern>
  <pattern id="hatchg" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="11" height="11" fill="#e4e1dc"/><line x1="0" y1="0" x2="0" y2="11" stroke="#5a5a5a" stroke-width="1.6"/>
  </pattern>
  <pattern id="cross" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="12" height="12" fill="#fff"/>
    <line x1="0" y1="0" x2="0" y2="12" stroke="#5a5a5a" stroke-width="1.5"/>
    <line x1="0" y1="0" x2="12" y2="0" stroke="#5a5a5a" stroke-width="1.5"/>
  </pattern>
  <pattern id="dark" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
    <rect width="7" height="7" fill="#d9d6d1"/>
    <line x1="0" y1="0" x2="0" y2="7" stroke="#3a3a3a" stroke-width="1.6"/>
    <line x1="0" y1="0" x2="7" y2="0" stroke="#3a3a3a" stroke-width="1.6"/>
  </pattern>`;

/** Komplettes SVG einer Karte. */
export function cardSvg(deck, body, seed) {
  const s = STYLES[deck];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
<defs>${filters(seed, s.grain)}${patterns}
  <clipPath id="card"><rect x="18" y="18" width="674" height="674" rx="20"/></clipPath></defs>
<rect x="16" y="16" width="678" height="678" rx="22" fill="#fff"/>
<g clip-path="url(#card)"><g filter="url(#ink)" fill="#fff" stroke="${s.stroke}" stroke-width="${s.width}" stroke-linecap="round" stroke-linejoin="round">
${body}
</g></g>
<g filter="url(#frame)" fill="none" stroke-linejoin="round">
  <rect x="16" y="16" width="678" height="678" rx="22" stroke="#262626" stroke-width="5.5"/>
  <rect x="19" y="13" width="676" height="680" rx="24" stroke="#777" stroke-width="1.6"/>
</g>
</svg>`;
}

// ---------- wiederkehrende Formen ----------

/** Wolke aus Bögen, (x,y) = linke untere Ecke, w = Breite. */
export function cloud(x, y, w, attrs = '') {
  const h = w * 0.45;
  return `<path ${attrs} d="M${x} ${y} C${x - w * 0.12} ${y}, ${x - w * 0.1} ${y - h * 0.6}, ${x + w * 0.08} ${y - h * 0.55}
    C${x + w * 0.1} ${y - h * 1.1}, ${x + w * 0.45} ${y - h * 1.2}, ${x + w * 0.52} ${y - h * 0.75}
    C${x + w * 0.65} ${y - h * 1.05}, ${x + w * 0.95} ${y - h * 0.85}, ${x + w * 0.9} ${y - h * 0.4}
    C${x + w * 1.08} ${y - h * 0.35}, ${x + w * 1.08} ${y}, ${x + w * 0.92} ${y} Z"/>`;
}

/** Flamme, Fußpunkt (x,y), Höhe h. */
export function flame(x, y, h, attrs = '') {
  const w = h * 0.55;
  return `<path ${attrs} d="M${x} ${y} C${x - w} ${y}, ${x - w * 0.9} ${y - h * 0.45}, ${x - w * 0.45} ${y - h * 0.6}
    C${x - w * 0.5} ${y - h * 0.35}, ${x - w * 0.2} ${y - h * 0.35}, ${x - w * 0.15} ${y - h * 0.5}
    C${x - w * 0.25} ${y - h * 0.75}, ${x} ${y - h * 0.85}, ${x + w * 0.05} ${y - h}
    C${x + w * 0.2} ${y - h * 0.75}, ${x + w * 0.55} ${y - h * 0.7}, ${x + w * 0.45} ${y - h * 0.4}
    C${x + w * 0.6} ${y - h * 0.45}, ${x + w * 0.75} ${y - h * 0.55}, ${x + w * 0.7} ${y - h * 0.7}
    C${x + w * 1.05} ${y - h * 0.4}, ${x + w * 0.8} ${y}, ${x} ${y} Z"/>`;
}

/** Stern mit 5 Zacken. */
export function star(cx, cy, r, attrs = '') {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon ${attrs} points="${pts.join(' ')}"/>`;
}

/** Kleines Funkel-Kreuz. */
export function sparkle(x, y, r = 9) {
  return `<path fill="none" stroke-width="3.5" d="M${x - r} ${y} H${x + r} M${x} ${y - r} V${y + r}"/>`;
}

/** Vogel als Doppelbogen. */
export function bird(x, y, s = 1) {
  return `<path fill="none" stroke-width="3" d="M${x - 14 * s} ${y} q${7 * s} ${-9 * s} ${14 * s} 0 q${7 * s} ${-9 * s} ${14 * s} 0"/>`;
}

/**
 * Einfache Person (Erwachsenen-Stil): Kopf + Körper, Fußpunkt (x,y), Höhe h.
 * fill: Füllung des Oberkörpers, arms: 'down' | 'up' | 'wave' | 'none' | eigener Pfad.
 */
export function person(x, y, h, { fill = 'url(#hatchg)', arms = 'down', head = '#fff', legs = true } = {}) {
  const s = h / 200;
  const P = (dx, dy) => `${(x + dx * s).toFixed(1)} ${(y + dy * s).toFixed(1)}`;
  const armPaths = {
    down: `M${P(-30, -128)} L${P(-42, -70)} M${P(30, -128)} L${P(42, -70)}`,
    up: `M${P(-28, -132)} L${P(-55, -195)} M${P(28, -132)} L${P(55, -195)}`,
    wave: `M${P(-30, -128)} L${P(-42, -70)} M${P(28, -132)} L${P(58, -190)}`,
    none: '',
  };
  const arm = armPaths[arms] ?? arms;
  return `
  ${legs ? `<path fill="none" d="M${P(-12, -60)} L${P(-14, 0)} M${P(12, -60)} L${P(14, 0)}"/>` : ''}
  ${arm ? `<path fill="none" d="${arm}"/>` : ''}
  <path fill="${fill}" d="M${P(-26, -140)} Q${P(0, -150)} ${P(26, -140)} L${P(34, -60)} L${P(-34, -60)} Z"/>
  <circle cx="${x}" cy="${(y - 168 * s).toFixed(1)}" r="${(24 * s).toFixed(1)}" fill="${head}"/>`;
}

/** Gestrichelte Linie zwischen zwei Punkten. */
export function dashed(x1, y1, x2, y2, w = 3) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${w}" stroke-dasharray="10 9" fill="none"/>`;
}

/** Wiederholung eines Elements um einen Mittelpunkt. */
export function rotated(cx, cy, n, inner, offset = 0) {
  return Array.from({ length: n }, (_, i) =>
    `<g transform="rotate(${offset + (360 / n) * i} ${cx} ${cy})">${inner}</g>`).join('');
}
