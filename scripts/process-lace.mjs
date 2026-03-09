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

// Create vertical (rotated) versions for left/right edges
for (const n of [1, 2]) {
  const src = join(OUT, `strip-${n}.png`);
  const dst = join(OUT, `strip-${n}-v.png`);
  await sharp(src).rotate(90).png({ compressionLevel: 9 }).toFile(dst);
  const m = await sharp(dst).metadata();
  console.log(`Saved ${dst}: ${m.width}x${m.height}`);
}

console.log('Done!');
