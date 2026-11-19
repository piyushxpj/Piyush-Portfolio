import test from 'node:test';
import assert from 'node:assert/strict';
import { mountPageEdges } from '../pageEdges.js';

class Style {
  values = new Map();
  [Symbol.iterator]() { return this.values.keys(); }
  getPropertyValue(name) { return this.values.get(name)?.[0] || ''; }
  getPropertyPriority(name) { return this.values.get(name)?.[1] || ''; }
  setProperty(name, value, priority = '') { this.values.set(name, [value, priority]); }
  removeProperty(name) { this.values.delete(name); }
}
class Target {
  style = new Style();
  listeners = new Map();
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
  }
  removeEventListener(type, callback) { this.listeners.get(type)?.delete(callback); }
  emit(type, data = {}) { this.listeners.get(type)?.forEach(fn => fn({ type, target: this, ...data })); }
}
function fixture(hasMeta = true) {
  const shell = new Target();
  const doc = new Target();
  const win = new Target();
  doc.documentElement = new Target();
  doc.body = new Target();
  const attributes = new Map([['content', '#abcdef']]);
  const meta = {
    getAttribute: key => attributes.get(key) ?? null,
    setAttribute: (key, value) => attributes.set(key, value),
    removeAttribute: key => attributes.delete(key),
    remove() { this.removed = true; },
  };
  doc.querySelector = () => hasMeta ? meta : null;
  doc.createElement = () => meta;
  doc.head = { append() {} };
  win.visualViewport = new Target();
  Object.assign(win.visualViewport, { offsetTop: 0, height: 800 });
  win.innerHeight = 800;
  const surface = { backgroundColor: 'rgb(37, 37, 37)', getPropertyValue: () => '#252525' };
  let reads = 0;
  win.getComputedStyle = () => { reads++; return surface; };
  const frames = new Map();
  let id = 0;
  win.requestAnimationFrame = fn => { frames.set(++id, fn); return id; };
  win.cancelAnimationFrame = id => frames.delete(id);
  const observers = [];
  win.ResizeObserver = win.MutationObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe() {}
    disconnect() { this.disconnected = true; }
  };
  const flush = () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(fn => fn()); };
  return { shell, doc, win, surface, meta, frames, observers, flush, reads: () => reads };
}

test('shares one rendered palette and coalesces scroll, restoration and resize', () => {
  const f = fixture();
  const cleanup = mountPageEdges(f.shell, f.doc, f.win);
  const style = f.doc.documentElement.style;
  assert.equal(style.getPropertyValue('--edge-top-background'), '#252525');
  assert.equal(f.meta.getAttribute('content'), '#252525');
  assert.equal(f.doc.body.style.getPropertyValue('background'), 'var(--edge-bottom-background)');
  f.flush();
  f.surface.backgroundColor = 'rgb(255, 255, 255)';
  f.shell.emit('scroll'); f.win.emit('pageshow'); f.win.emit('resize');
  assert.equal(f.frames.size, 1);
  const previousReads = f.reads();
  f.flush();
  assert.equal(f.reads(), previousReads + 1);
  assert.equal(style.getPropertyValue('--edge-bottom-background'), f.surface.backgroundColor);
  cleanup();
});

test('tracks visual viewport offsets and intermediate background transitions', () => {
  const f = fixture();
  const cleanup = mountPageEdges(f.shell, f.doc, f.win);
  f.flush();
  f.win.visualViewport.height = 650;
  f.win.visualViewport.offsetTop = 20;
  f.win.visualViewport.emit('resize'); f.win.visualViewport.emit('scroll');
  f.flush();
  assert.equal(f.doc.documentElement.style.getPropertyValue('--edge-viewport-top'), '20px');
  assert.equal(f.doc.documentElement.style.getPropertyValue('--edge-viewport-bottom'), '130px');
  f.shell.emit('transitionrun', { propertyName: 'background-color' });
  f.surface.backgroundColor = 'rgb(120, 120, 120)';
  f.flush();
  assert.equal(f.doc.documentElement.style.getPropertyValue('--edge-bottom-background'), f.surface.backgroundColor);
  assert.equal(f.frames.size, 1);
  f.shell.emit('transitionend', { propertyName: 'background-color' });
  f.flush();
  assert.equal(f.frames.size, 0);
  cleanup();
});

test('unmount restores owned styles and meta, removes listeners and cancels queued work', () => {
  const f = fixture();
  const root = f.doc.documentElement;
  root.style.setProperty('background', 'red', 'important');
  root.style.setProperty('--edge-top-background', 'pink');
  f.doc.body.style.setProperty('transition', 'color 1s');
  const cleanup = mountPageEdges(f.shell, f.doc, f.win);
  root.style.setProperty('--unrelated', 'preserve-me');
  cleanup();
  assert.equal(root.style.getPropertyValue('background'), 'red');
  assert.equal(root.style.getPropertyPriority('background'), 'important');
  assert.equal(root.style.getPropertyValue('--edge-top-background'), 'pink');
  assert.equal(root.style.getPropertyValue('--unrelated'), 'preserve-me');
  assert.equal(f.doc.body.style.getPropertyValue('transition'), 'color 1s');
  assert.equal(f.meta.getAttribute('content'), '#abcdef');
  assert.equal(f.frames.size, 0);
  assert.ok(f.observers.every(o => o.disconnected));
  for (const target of [f.shell, f.win, f.doc, f.win.visualViewport]) {
    assert.ok([...target.listeners.values()].every(set => set.size === 0));
  }
});

test('removes a temporary theme tag and supports StrictMode remount', () => {
  const f = fixture(false);
  mountPageEdges(f.shell, f.doc, f.win)();
  assert.equal(f.meta.removed, true);
  const cleanup = mountPageEdges(f.shell, f.doc, f.win);
  assert.equal(f.meta.getAttribute('content'), '#252525');
  cleanup();
});

test('responds to palette changes without an observer feedback loop', () => {
  const f = fixture();
  const cleanup = mountPageEdges(f.shell, f.doc, f.win);
  f.flush();
  const observer = f.observers[1];
  const root = f.doc.documentElement;
  observer.callback([{ target: root, attributeName: 'style' }]);
  assert.equal(f.frames.size, 0);
  root.style.setProperty('--portfolio-frame-background', '#123456');
  f.surface.getPropertyValue = () => '#123456';
  observer.callback([{ target: root, attributeName: 'style' }]);
  f.flush();
  assert.equal(f.meta.getAttribute('content'), '#123456');
  cleanup();
});
