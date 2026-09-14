import sharp from 'sharp';
import { join } from 'path';

const src = join(process.cwd(), 'static/images/main/open-brown-envelope.jpg');
const dst = join(process.cwd(), 'static/images/main/open-brown-envelope-transparent.png');

const { data, info } = await sharp(src)
  .raw()
  .ensureAlpha()
  .toBuffer({ resolveWithObject: true });

const THRESHOLD = 240;

for (let i = 0; i < info.width * info.height; i++) {
  const r = data[i * 4];
  const g = data[i * 4 + 1];
  const b = data[i * 4 + 2];
  if (r > THRESHOLD && g > THRESHOLD && b > THRESHOLD) {
    data[i * 4 + 3] = 0;
  }
}

// Trim the transparent edges automatically
await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .trim()
  .png({ compressionLevel: 9 })
  .toFile(dst);

const out = await sharp(dst).metadata();
console.log(`Saved ${dst}: ${out.width}x${out.height}`);
