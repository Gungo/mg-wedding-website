// A study-specific ribbon, sampled along tangent-continuous cubic bends.
// All pigment and thread paths share the same normal field, so the illustration
// keeps its natural width through a bend without sharp joins or overlapping strokes.
export function makeRiver(curves, width = 92) {
  let distance = 0;
  const points = curves.flatMap((curve, index) =>
    Array.from({ length: 73 }, (_, i) => {
      const t = i / 72;
      const s = 1 - t;
      const x = s ** 3 * curve[0][0] + 3 * s * s * t * curve[1][0] + 3 * s * t * t * curve[2][0] + t ** 3 * curve[3][0];
      const y = s ** 3 * curve[0][1] + 3 * s * s * t * curve[1][1] + 3 * s * t * t * curve[2][1] + t ** 3 * curve[3][1];
      const dx = 3 * s * s * (curve[1][0] - curve[0][0]) + 6 * s * t * (curve[2][0] - curve[1][0]) + 3 * t * t * (curve[3][0] - curve[2][0]);
      const dy = 3 * s * s * (curve[1][1] - curve[0][1]) + 6 * s * t * (curve[2][1] - curve[1][1]) + 3 * t * t * (curve[3][1] - curve[2][1]);
      return { x, y, nx: -dy / Math.hypot(dx, dy), ny: dx / Math.hypot(dx, dy) };
    }).slice(index ? 1 : 0)
  ).map((p, i, all) => {
    if (i) distance += Math.hypot(p.x - all[i - 1].x, p.y - all[i - 1].y);
    return { ...p, distance, width: width * (1 + Math.sin(distance / 340) * 0.12 + Math.sin(distance / 137) * 0.035) };
  });
  function lane(side, thread = false) {
    return points.map(p => {
      const weave = thread ? Math.sin(p.distance / 51 + side * 8) * 1.1 + Math.sin(p.distance / 12 + side * 3) * 0.35 : 0;
      const offset = side * p.width / 2 + weave;
      return `${(p.x + p.nx * offset).toFixed(1)},${(p.y + p.ny * offset).toFixed(1)}`;
    });
  }
  const band = (a, b) => `M${lane(a).join('L')}L${lane(b).reverse().join('L')}Z`;
  return {
    outline: band(-1, 1),
    bands: [band(-0.9, -0.48), band(-0.29, 0.2), band(0.5, 0.94)],
    threads: [-0.95, -0.9, -0.81, -0.66, -0.46, -0.21, 0.08, 0.35, 0.58, 0.75, 0.87, 0.94].map(side => `M${lane(side, true).join('L')}`)
  };
}

export const desktopRiver = makeRiver([
  [[-110, 170], [210, 245], [430, 58], [750, 132]],
  [[750, 132], [1070, 206], [1360, 357], [1050, 480]],
  [[1050, 480], [740, 603], [510, 460], [270, 650]],
  [[270, 650], [30, 840], [685, 1125], [1520, 822]]
]);

export const mobileRiver = makeRiver([
  [[37, -60], [9, 160], [109, 160], [62, 390]],
  [[62, 390], [15, 620], [5, 650], [48, 850]],
  [[48, 850], [91, 1050], [87, 1150], [30, 1370]]
], 37);
