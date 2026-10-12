import { sceneSequence } from './illustrated-river-art.js';

// Each bank is independently drawn. A segment is [control1, control2, end].
// No path is closed, clipped, or painted over at a scene boundary: the ten
// reaches are assembled into ONE outline, and both long currents run through it.
const shapes = {
  sweep: {
    upper: [[160,70], [235,70,285,25,360,45], [465,73,530,125,650,90], [810,44,950,49,1040,83], [1153,117,1275,169,1252,265], [1233,342,1073,354,932,372], [823,389,752,320,687,395], [645,443,648,493,510,511], [377,530,259,493,173,563], [90,632,133,693,313,708], [400,715,417,765,489,777], [668,817,707,762,873,768], [1033,774,1160,783,1280,750]],
    lower: [[160,112], [235,112,292,68,360,93], [465,130,542,167,650,132], [815,82,947,91,1030,121], [1133,158,1214,192,1190,258], [1160,307,1066,314,934,332], [819,348,741,291,661,365], [591,428,624,464,501,474], [360,485,227,455,131,535], [17,628,82,737,303,752], [375,758,403,804,481,817], [660,861,740,805,874,807], [1053,811,1166,844,1280,810]],
    current: [[160,89], [232,89,289,41,360,64], [465,95,537,142,650,109], [812,63,948,67,1036,101], [1145,139,1241,180,1222,262], [1203,326,1070,338,933,353], [822,369,747,306,676,380], [618,436,637,480,506,493], [368,508,243,475,154,550], [61,628,107,714,308,731], [385,736,410,787,485,797], [662,839,723,785,874,788], [1046,792,1163,814,1280,779]],
    ribbon: 'M175 554 C99 611 104 687 309 731 C132 718 73 650 141 568Z',
    eddy: 'M488 563 C547 542 583 565 568 581 C552 598 512 586 500 579 C534 588 556 578 551 572 C544 560 516 558 488 563Z',
    fan: 'M1030 157 C1141 170 1210 220 1160 282 C1181 225 1118 187 1030 157Z'
  },
  hook: {
    upper: [[160,70], [237,70,304,64,378,83], [503,116,538,124,657,99], [814,65,903,19,1048,87], [1172,145,1320,167,1290,261], [1268,335,1097,357,943,369], [799,383,757,324,686,402], [634,459,636,509,512,510], [335,511,243,468,156,556], [64,649,153,708,324,704], [415,703,411,772,495,781], [651,810,710,761,873,768], [1044,776,1161,786,1280,750]],
    lower: [[160,112], [238,112,302,98,373,121], [503,159,555,166,661,141], [831,101,922,72,1034,128], [1129,176,1251,197,1228,253], [1208,304,1095,316,942,329], [802,340,745,289,658,372], [583,443,602,468,508,471], [341,477,209,426,112,522], [-4,638,93,753,316,749], [381,747,408,811,487,824], [652,853,749,803,875,808], [1058,814,1163,842,1280,810]],
    current: [[160,89], [238,89,303,78,376,101], [503,137,546,144,659,119], [822,83,914,45,1041,107], [1151,160,1287,182,1259,257], [1238,320,1096,337,942,349], [801,362,751,306,672,387], [608,451,619,488,510,490], [338,494,226,447,134,539], [30,643,123,730,320,727], [399,725,410,792,491,803], [652,832,729,782,874,788], [1050,795,1162,815,1280,779]],
    ribbon: 'M154 551 C72 625 124 709 319 730 C110 717 38 637 132 544Z',
    eddy: 'M449 564 C498 545 548 566 530 585 C513 603 471 592 463 584 C489 594 518 583 514 576 C508 565 474 559 449 564Z',
    fan: 'M1034 173 C1142 185 1236 228 1184 283 C1204 239 1134 208 1034 173Z'
  },
  basin: {
    upper: [[160,70], [238,70,293,35,369,60], [479,96,538,125,648,92], [819,42,965,33,1071,84], [1254,171,1361,212,1303,288], [1249,361,1083,353,936,381], [807,406,756,324,682,405], [628,464,620,520,506,514], [361,505,228,480,141,566], [54,651,165,699,322,709], [401,714,416,773,493,781], [643,823,724,765,873,768], [1042,775,1167,784,1280,750]],
    lower: [[160,112], [240,112,294,78,367,103], [480,140,550,165,652,134], [821,81,967,85,1051,133], [1168,199,1248,221,1214,274], [1184,313,1075,313,933,339], [805,362,744,287,652,376], [578,447,587,477,501,473], [361,463,196,431,97,527], [-49,669,112,752,316,753], [372,758,409,814,485,828], [651,865,751,806,875,810], [1051,817,1162,842,1280,810]],
    current: [[160,89], [239,89,294,56,368,81], [480,118,544,145,650,113], [820,62,966,59,1061,108], [1203,185,1300,217,1258,281], [1217,337,1079,333,935,360], [806,384,750,305,667,391], [603,455,604,498,504,494], [361,484,212,456,119,547], [3,660,138,726,319,731], [387,736,412,794,489,805], [647,844,738,785,874,789], [1046,796,1165,814,1280,779]],
    ribbon: 'M145 556 C45 627 127 713 319 732 C78 723 8 621 121 551Z',
    eddy: 'M456 570 C502 553 554 571 537 591 C522 608 481 601 469 591 C496 599 521 592 522 584 C523 575 489 565 456 570Z',
    fan: 'M1069 167 C1206 183 1280 243 1219 303 C1238 244 1166 204 1069 167Z'
  }
};

function reverseCurves(curves) {
  const result = [[...curves.at(-1).slice(-2)]];
  for (let i = curves.length - 1; i > 0; i--) {
    const curve = curves[i];
    result.push([...curve.slice(2, 4), ...curve.slice(0, 2), ...curves[i - 1].slice(-2)]);
  }
  return result;
}

function position(curves, index, reversed) {
  const flattened = curves.map(points => [...points]);
  const end = flattened.at(-1);
  end[3] = end[5];
  const ordered = reversed ? reverseCurves(flattened) : flattened;
  return ordered.map(points => points.map((value, coordinate) => coordinate % 2 === 0 ? index * 1440 + (reversed ? 1440 - value : value) : value));
}

function continuousBank(key) {
  const reaches = sceneSequence.map(([kind, reversed], index) => position(shapes[kind][key], index, reversed));
  // Give the three ascending transitions enough horizontal room to turn.
  // Only the end/start of adjacent reaches moves; their pools stay in place.
  for (let index = 1; index < reaches.length; index++) {
    const end = reaches[index - 1].at(-1);
    const start = reaches[index][0];
    if (Math.abs(end[5] - start[1]) < 80) continue;
    const seam = index * 1440;
    end[2] = seam - 330;
    end[4] = seam - 250;
    start[0] = seam + 250;
    reaches[index][1][0] = seam + 285;
  }
  const first = reaches[0][0];
  const path = [[-80, first[1]], [0, first[1], 80, first[1], ...first], ...reaches[0].slice(1)];
  for (let index = 1; index < reaches.length; index++) {
    const next = reaches[index];
    const [x0, y0] = path.at(-1).slice(-2);
    const [x1, y1] = next[0];
    const seam = index * 1440;
    const steep = Math.abs(y0 - y1) >= 80;
    const flank = key === 'upper' ? -1 : key === 'lower' ? 1 : 0;
    if (steep) {
      // A single, uninterrupted S-curve crosses the seam. Independent bank
      // controls retain water width through the diagonal, without a shelf.
      const spread = flank * Math.sign(y0 - y1) * 50;
      path.push([x0 + 170 + spread, y0, x1 - 170 + spread, y1, x1, y1]);
    } else {
      const y = (y0 + y1) / 2;
      path.push([x0 + 95, y0, seam - 115, y, seam - 55, y]);
      path.push([seam - 20, y, seam + 20, y, seam + 55, y]);
      path.push([seam + 115, y, x1 - 95, y1, x1, y1]);
    }
    path.push(...next.slice(1));
  }
  const last = path.at(-1).slice(-2);
  path.push([last[0] + 65, last[1], 14400, last[1], 14480, last[1]]);
  return path;
}

function draw(curves, move = true) {
  return `${move ? `M${curves[0].join(' ')}` : ''} ${curves.slice(1).map(points => `C${points.join(' ')}`).join(' ')}`;
}

export const banks = { upper: continuousBank('upper'), lower: continuousBank('lower') };
const returning = reverseCurves(banks.lower);
export const riverOutline = `${draw(banks.upper)} L${returning[0].join(' ')} ${draw(returning, false)}Z`;
export const longCurrent = draw(continuousBank('current'));
export const flourishes = sceneSequence.map(([kind, reverse], index) => ({
  ...shapes[kind], transform: reverse ? `translate(${(index + 1) * 1440} 0) scale(-1 1)` : `translate(${index * 1440} 0)`
}));

// Exposed to the geometry check: each seam is interior to the same cubic.
export const seamPositions = sceneSequence.slice(1).map((_, i) => (i + 1) * 1440);
