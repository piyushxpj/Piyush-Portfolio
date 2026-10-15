import test from 'node:test';
import assert from 'node:assert/strict';
import { observeHomeContentSize } from '../homeContentSize.js';

test('measures natural content, responds to reflow and restores on route exit', () => {
  const values = new Map();
  let writes = 0;
  const style = {
    getPropertyValue: name => values.get(name) || '',
    setProperty: (name, value) => { values.set(name, value); writes++; },
    removeProperty: name => values.delete(name),
  };
  const stage = { style };
  const content = { offsetHeight: 300 };
  const navigation = { offsetHeight: 44 };
  const elements = { '.hero-v2__stage': stage, '.hero-v2__content': content, '.hero-v2__navigation': navigation };
  let observer;
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = []; observer = this; }
    observe(element) { this.targets.push(element); }
    disconnect() { this.disconnected = true; }
  }
  const cleanup = observeHomeContentSize({ querySelector: selector => elements[selector] }, Observer);
  assert.equal(values.get('--home-content-height'), '300px');
  assert.equal(values.get('--home-nav-height'), '44px');
  assert.deepEqual(observer.targets, [content, navigation]);
  observer.callback();
  assert.equal(writes, 2, 'unchanged sizes must not trigger style/layout feedback');
  content.offsetHeight = 360; // Font load, text zoom, email fallback or narrower width.
  observer.callback();
  assert.equal(values.get('--home-content-height'), '360px');
  cleanup();
  assert.equal(observer.disconnected, true);
  assert.equal(values.size, 0);
});

test('phone height budget fits content and art, with safe areas counted once', () => {
  // Mirrors the CSS sizing equations; these are layout-budget checks, not
  // browser measurements. Actual content height is supplied by ResizeObserver.
  for (const [viewport, top, bottom, content] of [[568,12,12,310], [667,12,12,310], [700,47,34,300], [844,59,34,300], [932,59,34,280]]) {
    const navSpace = 24 + 44 + 16;
    const frame = 12;
    const stage = Math.max(viewport - top - bottom, navSpace + content + frame + 80);
    const art = Math.max(80, Math.min(stage * .28, stage - navSpace - content - frame));
    assert.equal(stage + top + bottom, viewport);
    assert.ok(stage - content - art - frame >= navSpace - .001);
    assert.ok(art >= 80);
  }
  const enlargedContent = 600;
  assert.ok(84 + enlargedContent + 12 + 80 > 568 - 24, 'oversized content keeps a scroll fallback instead of being clipped');
});
