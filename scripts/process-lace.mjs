import sharp from 'sharp';
import { join } from 'path';

const OUT = join(process.cwd(), 'static/images/lace');
const TILE_WIDTH = 800;

async function makeTransparent(inputPath, outputPath, opts = {}) {
  const { cropTop, cropHeight, threshold = 128 } = opts;

  let pipeline = sharp(inputPath);
  const meta = await sharp(inputPath).metadata();

  if (cropTop !== undefined && cropHeight !== undefined) {
    pipeline = pipeline.extract({
      left: 0,
      top: cropTop,
      width: meta.width,
      height: cropHeight
    });
  }

  pipeline = pipeline.resize({ width: TILE_WIDTH });

  const { data, info } = await pipeline
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Convert white-on-black to white with alpha transparency
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    const brightness = data[i];
    rgba[i * 4] = 255;
    rgba[i * 4 + 1] = 255;
    rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = brightness > threshold ? 255 : 0;
  }

  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  const out = await sharp(outputPath).metadata();
  console.log(`Saved ${outputPath}: ${out.width}x${out.height}`);
}

// Asset 1: crop the strip from bottom portion
const src1 = join(process.cwd(), 'static/lace-border-set/8212.jpg');
const meta1 = await sharp(src1).metadata();
const stripTop = Math.round(meta1.height * 0.69);
await makeTransparent(src1, join(OUT, 'strip-1.png'), {
  cropTop: stripTop,
  cropHeight: meta1.height - stripTop,
  threshold: 80
});

// Asset 2: full image is the pattern
const src2 = join(process.cwd(), 'static/vecteezy_seamless-lace-pattern-flower-vintage-vector-background_5764079_380/vecteezy_seamless-lace-pattern-flower-vintage-vector-background_5764079.jpg');
await makeTransparent(src2, join(OUT, 'strip-2.png'), {
  threshold: 180
});

// Generate all 4 edge variants per pattern:
//   strip-N.png       = original horizontal     → top edge (scallops up)
//   strip-N-flip.png  = flipped vertically       → bottom edge (scallops down)
//   strip-N-v.png     = rotated 90° CW           → right edge (scallops right)
//   strip-N-v-flip.png= rotated 90° CW + flip X  → left edge (scallops left)
for (const n of [1, 2]) {
  const src = join(OUT, `strip-${n}.png`);

  // Bottom: flip the horizontal strip vertically
  const flipDst = join(OUT, `strip-${n}-flip.png`);
  await sharp(src).flip().png({ compressionLevel: 9 }).toFile(flipDst);
  let m = await sharp(flipDst).metadata();
  console.log(`Saved ${flipDst}: ${m.width}x${m.height}`);

  // Right: rotate 90° CW (original top → right side)
  const vDst = join(OUT, `strip-${n}-v.png`);
  await sharp(src).rotate(90).png({ compressionLevel: 9 }).toFile(vDst);
  m = await sharp(vDst).metadata();
  console.log(`Saved ${vDst}: ${m.width}x${m.height}`);

  // Left: rotate 90° CCW so original top (scallops) faces left
  const vFlipDst = join(OUT, `strip-${n}-v-flip.png`);
  await sharp(src).rotate(270).png({ compressionLevel: 9 }).toFile(vFlipDst);
  m = await sharp(vFlipDst).metadata();
  console.log(`Saved ${vFlipDst}: ${m.width}x${m.height}`);
}

console.log('Done!');
