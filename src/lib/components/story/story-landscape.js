// Authored river bends and unequal bank widths, in the illustration's coordinates.
// These points also anchor the story; the water does not depend on a content grid.
export const LANDSCAPE_WIDTH = 4380;
export const LANDSCAPE_HEIGHT = 1280;
export const riverKnots = [
  [0,310,48,35], [180,340,64,47], [560,300,32,24],
  [760,490,49,36], [470,675,39,53], [830,880,77,48],
  [1120,720,27,23], [1350,440,66,48], [1150,210,35,30],
  [1670,285,60,32], [1900,535,43,38], [1630,760,40,57],
  [2160,895,73,47], [2440,680,32,26], [2260,410,51,39],
  [2800,235,74,49], [3100,465,37,36], [2870,770,51,65],
  [3430,895,63,37], [3690,680,28,23], [3980,430,71,53], [4380,490,48,34]
];

// Photo centers, top edges and widths: arranged in the open spaces inside bends.
export const memoryPlacements = [
  [195,15,310], [525,160,180], [925,350,210], [300,475,220],
  [720,650,205], [1160,820,170], [1445,520,220], [1150,20,210],
  [1580,95,180], [1870,255,215], [1580,905,275], [2185,955,355],
  [2460,815,190], [2220,155,235], [2830,20,290], [3300,355,225],
  [2840,970,210], [3450,600,230], [3675,515,290], [4040,615,260]
];

export function landscapePoints(width = LANDSCAPE_WIDTH, height = LANDSCAPE_HEIGHT) {
  const result = [];
  // Cubic Hermite sections have individually chosen knots and nonperiodic turns.
  for (let i = 0; i < riverKnots.length - 1; i++) {
    const before = riverKnots[Math.max(0, i - 1)];
    const a = riverKnots[i];
    const b = riverKnots[i + 1];
    const after = riverKnots[Math.min(riverKnots.length - 1, i + 2)];
    for (let j = i ? 1 : 0; j <= 120; j++) {
      const t = j / 120, t2 = t * t, t3 = t2 * t;
      const h00 = 2*t3 - 3*t2 + 1, h10 = t3 - 2*t2 + t;
      const h01 = -2*t3 + 3*t2, h11 = t3 - t2;
      const ease = t2 * (3 - 2*t);
      result.push({
        x: (h00*a[0] + h10*(b[0]-before[0])*0.55 + h01*b[0] + h11*(after[0]-a[0])*0.55) * width/LANDSCAPE_WIDTH,
        y: (h00*a[1] + h10*(b[1]-before[1])*0.55 + h01*b[1] + h11*(after[1]-a[1])*0.55) * height/LANDSCAPE_HEIGHT,
        bankA: (a[2] + (b[2]-a[2])*ease) * width/LANDSCAPE_WIDTH,
        bankB: (a[3] + (b[3]-a[3])*ease) * width/LANDSCAPE_WIDTH,
        width: (a[2]+a[3]+(b[2]+b[3]-a[2]-a[3])*ease)*width/LANDSCAPE_WIDTH
      });
    }
  }
  return result;
}
