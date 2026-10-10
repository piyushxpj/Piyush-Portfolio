// Non-destructive Work derivatives. Requires cwebp (brew install webp).
import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'public/work-v2/optimized');
mkdirSync(output, { recursive: true });
const topCrops = ['22786', '22796', '22800', '22813', '22817', '22819', '22825', '25883', '25891', '25893'];
const artwork = [...topCrops, '22806', 'ai-background', 'velar-website', 'metrics', 'market',
  'velar-staking-0', 'velar-staking-1', 'editorial-0', 'editorial-1',
  'game-29803', 'game-29587', 'game-29695', 'crowwd-profile', 'velar-trading',
  'purple-brand', 'bento-marks', 'bento-banner', 'wagadu', 'fellowship-weeks', 'event-30387', 'event-30435',
  'leagues-wallet', 'leagues-funds', 'leagues-discover', 'first-dollar-campaigns',
  'first-dollar-menu', 'first-dollar-winners', 'first-dollar-profile', 'first-dollar-showcase'];
const manifest = {};
let originalBytes = 0;
let largestBytes = 0;
for (const name of artwork) {
  const input = resolve(root, `public/work-v2/artwork/${name}.png`);
  const png = readFileSync(input);
  const width = png.readUInt32BE(16);
  const height = topCrops.includes(name) ? Math.round(width * 372 / 590) : png.readUInt32BE(20);
  const widths = [...new Set([Math.min(600, width), Math.min(1200, width), Math.min(1600, width)])];
  const variants = widths.map(size => {
    const filename = `${name}-${size}.webp`;
    const args = ['-quiet', '-q', '88', '-m', '6', '-sharp_yuv'];
    if (topCrops.includes(name)) args.push('-crop', '0', '0', String(width), String(height));
    args.push('-resize', String(size), '0', input, '-o', resolve(output, filename));
    execFileSync('cwebp', args);
    return { width: size, src: `/work-v2/optimized/${filename}`, bytes: statSync(resolve(output, filename)).size };
  });
  originalBytes += png.length;
  largestBytes += variants.at(-1).bytes;
  manifest[name] = { width, height, variants };
}
writeFileSync(resolve(root, 'workImageManifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${artwork.length} images: ${(originalBytes / 1e6).toFixed(2)} MB originals → ${(largestBytes / 1e6).toFixed(2)} MB largest derivatives (${(100 * (1 - largestBytes / originalBytes)).toFixed(1)}% smaller).`);
