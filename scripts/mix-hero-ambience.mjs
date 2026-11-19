import { spawnSync } from 'node:child_process';
import { renameSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Natural CC0 birds: https://freesound.org/people/iwanPlays/sounds/512769/
// Keep the supplied beach recording untouched and render a single mixed track,
// so autoplay, looping, mute and route cleanup still share one audio element.
const root = fileURLToPath(new URL('../', import.meta.url));
const calls = [
  { at: 2, source: 5, duration: 2.4 },
  { at: 12, source: 18, duration: 2.8 },
  { at: 21, source: 33, duration: 2.2 },
  { at: 32, source: 47, duration: 3 },
  { at: 40, source: 61, duration: 2.5 },
  { at: 52, source: 76, duration: 2.8 },
  { at: 62, source: 91, duration: 2.3 },
  { at: 71, source: 106, duration: 2.7 },
  { at: 82, source: 120, duration: 2.4 },
  { at: 92, source: 135, duration: 3 },
  { at: 101, source: 150, duration: 2.5 },
  { at: 112, source: 10, duration: 2.4 },
  { at: 120, source: 25, duration: 2.8 },
  { at: 132, source: 40, duration: 2.2 },
  { at: 142, source: 55, duration: 3 },
  { at: 151, source: 70, duration: 2.5 },
  { at: 162, source: 85, duration: 2.8 },
  { at: 172, source: 100, duration: 2.3 },
  { at: 181, source: 115, duration: 2.7 },
  { at: 192, source: 130, duration: 2.4 },
  { at: 202, source: 145, duration: 3 },
  { at: 213, source: 155, duration: 2.5 },
];
// The field recording is already quiet; this keeps calls below the surf.
const birdGain = 0.65;
const filters = [
  `[1:a]asplit=${calls.length}${calls.map((_, i) => `[source${i}]`).join('')}`,
  ...calls.map(({ at, source, duration }, i) =>
    `[source${i}]atrim=start=${source}:duration=${duration},asetpts=PTS-STARTPTS,` +
    `highpass=f=1200,lowpass=f=8500,volume=${birdGain},` +
    `afade=t=in:d=0.35,afade=t=out:st=${duration - 0.5}:d=0.5,` +
    `adelay=${at * 1000}:all=1[call${i}]`),
  `[0:a]${calls.map((_, i) => `[call${i}]`).join('')}` +
    `amix=inputs=${calls.length + 1}:duration=first:normalize=0[mix]`,
];
const result = spawnSync('ffmpeg', [
  '-y', '-hide_banner', '-loglevel', 'warning',
  '-i', 'public/hero/beach-ambience.mp3',
  '-i', 'scripts/audio/morning-birds-source.mp3',
  '-filter_complex', filters.join(';'), '-map', '[mix]',
  '-codec:a', 'libmp3lame', '-b:a', '160k', '-ar', '48000',
  'public/hero/.beach-with-birds.next.mp3',
], { cwd: root, stdio: 'inherit' });
if (result.error) throw result.error;
// Never let the dev server stream a partially written audio file.
if (result.status === 0) {
  renameSync(join(root, 'public/hero/.beach-with-birds.next.mp3'), join(root, 'public/hero/beach-with-birds.mp3'));
}
process.exitCode = result.status ?? 1;
