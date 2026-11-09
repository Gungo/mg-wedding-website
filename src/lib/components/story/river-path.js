import { landscapePoints } from './story-landscape.js';
export const COMPACT_WIDTH = 400;
export const COMPACT_HEIGHT = 560;

// A single route drives the water, its currents and the floating milestones.
const compactCurves = [
  [[72, 28], [127, 57], [327, 36], [334, 103]],
  [[334, 103], [341, 163], [69, 143], [64, 208]],
  [[64, 208], [59, 273], [340, 263], [338, 330]],
  [[338, 330], [336, 387], [76, 370], [75, 425]],
  [[75, 425], [74, 480], [213, 468], [270, 527]]
];

export const COMPACT_PATH = 'M72 28 C127 57 327 36 334 103 C341 163 69 143 64 208 C59 273 340 263 338 330 C336 387 76 370 75 425 C74 480 213 468 270 527';

function cubic(curve, t) {
  const s = 1 - t;
  return {
    x: s ** 3 * curve[0][0] + 3 * s ** 2 * t * curve[1][0] + 3 * s * t ** 2 * curve[2][0] + t ** 3 * curve[3][0],
    y: s ** 3 * curve[0][1] + 3 * s ** 2 * t * curve[1][1] + 3 * s * t ** 2 * curve[2][1] + t ** 3 * curve[3][1]
  };
}

const route = [];
let routeLength = 0;
for (const curve of compactCurves) {
  for (let j = route.length ? 1 : 0; j <= 100; j++) {
    const point = cubic(curve, j / 100);
    const last = route.at(-1);
    if (last) routeLength += Math.hypot(point.x - last.x, point.y - last.y);
    route.push({ ...point, distance: routeLength });
  }
}

/** Distance-based point: progress is clamped to 0..1; coordinates use 400x560. */
export function compactPoint(progress) {
  const distance = Math.min(1, Math.max(0, progress)) * routeLength;
  let low = 0;
  let high = route.length - 1;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (route[middle].distance < distance) low = middle + 1;
    else high = middle;
  }
  const a = route[Math.max(0, low - 1)];
  const b = route[low];
  const t = (distance - a.distance) / (b.distance - a.distance || 1);
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export function riverPoints(mode, width, height, rem = 16) {
  if (mode === 'landscape') return landscapePoints(width, height);
  if (mode === 'compact') {
    return Array.from({ length: 301 }, (_, i) => {
      const t = i / 300;
      const p = compactPoint(t);
      return { x: p.x / 400 * width, y: p.y / 560 * height, width: (32 + 6 * Math.sin(t * 23 + 0.4) + 3 * Math.cos(t * 43)) * width / 400 };
    });
  }
  const top = 9.85 * rem;
  const bottom = 28.85 * rem + 144;
  const left = 8;
  const right = width - 48;
  const points = [];
  for (let i = 0; i <= 200; i++) {
    const t = i / 200;
    points.push({ x: left + t * (right - left), y: top + Math.sin(t * Math.PI * 12) * 7, width: 42 + 10 * Math.sin(t * Math.PI * 7) ** 2 });
  }
  const mid = (top + bottom) / 2;
  for (let i = 1; i <= 80; i++) {
    const angle = -Math.PI / 2 + i / 80 * Math.PI;
    points.push({ x: right + Math.cos(angle) * 24, y: mid + Math.sin(angle) * (bottom - top) / 2, width: 39 + Math.sin(angle * 3) * 4 });
  }
  for (let i = 1; i <= 200; i++) {
    const t = i / 200;
    points.push({ x: right - t * (right - left), y: bottom - Math.sin(t * Math.PI * 12) * 7, width: 43 + 10 * Math.sin(t * Math.PI * 7 + 1) ** 2 });
  }
  return points;
}

// Deterministic paper-edge noise. Different seeds keep the banks independent.
function bankNoise(value, seed) {
  const hash = n => { const h = Math.sin(n*127.1+seed*311.7)*43758.5453; return (h-Math.floor(h))*2-1; };
  const cell = Math.floor(value), t = value-cell, blend = t*t*(3-2*t);
  return hash(cell)*(1-blend)+hash(cell+1)*blend;
}

export function ribbonShape(points) {
  let distance = 0;
  const samples = points.map((point, i) => {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const length = Math.hypot(dx, dy) || 1;
    if (i) distance += Math.hypot(point.x - prev.x, point.y - prev.y);
    const nx = -dy / length, ny = dx / length;
    let a = point.bankA ?? point.width / 2;
    let b = point.bankB ?? point.width / 2;
    if (point.bankA !== undefined) {
      a += bankNoise(distance/34,2)*3.8 + bankNoise(distance/8,7)*1.7 + bankNoise(distance/3,11)*0.55;
      b += bankNoise(distance/29,17)*4.1 + bankNoise(distance/7,23)*1.8 + bankNoise(distance/3,29)*0.55;
    }
    // Keep the inside bank within the local bend radius; a wide offset would
    // otherwise fold over itself at a hairpin and create a pointed seam.
    const ux = point.x-prev.x, uy = point.y-prev.y;
    const vx = next.x-point.x, vy = next.y-point.y;
    const cross = ux*vy-uy*vx;
    const radius = Math.abs(cross)>0.00001 ? Math.hypot(ux,uy)*Math.hypot(vx,vy)*length/(2*Math.abs(cross)) : Infinity;
    if (cross > 0) b = Math.min(b,Math.max(8,radius*0.78));
    if (cross < 0) a = Math.min(a,Math.max(8,radius*0.78));
    return { ...point, nx, ny, distance, ax: point.x - nx*a, ay: point.y - ny*a, bx: point.x + nx*b, by: point.y + ny*b };
  });
  const edge = (p, side) => {
    const f = (side + 1) / 2;
    return `${(p.ax+(p.bx-p.ax)*f).toFixed(2)},${(p.ay+(p.by-p.ay)*f).toFixed(2)}`;
  };
  const outline = `M${samples.map(p => edge(p, 1)).join(' L')} L${samples.slice().reverse().map(p => edge(p, -1)).join(' L')} Z`;
  const currents = [-0.94,-0.88,-0.79,-0.63,-0.42,-0.08,0.28,0.55,0.73,0.85,0.92].map(side => `M${samples.map(p => edge(p, side + Math.sin(p.distance / 210 + side * 5) * (1-Math.abs(side))*0.15)).join(' L')}`);
  return { samples, outline, currents, length: distance };
}
