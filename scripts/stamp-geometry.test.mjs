import test from 'node:test';
import assert from 'node:assert/strict';
import { STAMP_WIDTH, STAMP_HEIGHT, STAMP_PATH, STAMP_MASK, stampPlacement } from '../stampGeometry.js';

test('stamp is centered on the click with a consistent pixel footprint', () => {
  for (const [width, height] of [[1240, 280], [351, 190]]) {
    const stamp = stampPlacement(width / 2, height / 2, width, height);
    assert.equal(stamp.width * width, STAMP_WIDTH);
    assert.equal(stamp.height * height, STAMP_HEIGHT);
    assert.equal((stamp.x + stamp.width / 2) * width, width / 2);
    assert.equal((stamp.y + stamp.height / 2) * height, height / 2);
  }
});

test('edge stamps stay centered at the edge and are clipped by the surface', () => {
  assert.deepEqual(stampPlacement(-100, -100, 360, 200), stampPlacement(0, 0, 360, 200));
  assert.deepEqual(stampPlacement(900, 900, 360, 200), stampPlacement(360, 200, 360, 200));
  assert.equal(stampPlacement(0, 0, 360, 200).x * 360, -STAMP_WIDTH / 2);
});

test('normalized placement preserves the location on responsive resize', () => {
  const stamp = stampPlacement(800, 150, 1200, 300);
  assert.ok(Math.abs((stamp.x + stamp.width / 2) * 360 - 240) < 1e-9);
  assert.equal((stamp.y + stamp.height / 2) * 180, 90);
});

test('cursor and cutout share a closed perforated SVG path', () => {
  assert.ok(STAMP_PATH.startsWith('M0 0'));
  assert.ok(STAMP_PATH.endsWith('Z'));
  assert.equal((STAMP_PATH.match(/A2.5/g) || []).length, 24);
  assert.ok(decodeURIComponent(STAMP_MASK).includes(`d="${STAMP_PATH}"`));
});
