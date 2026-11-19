import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { workCards } from '../workCards.js';
import { isValidOrder } from '../workOrder.js';

test('mascot is present once in the saved order with local silent media', () => {
  const order = JSON.parse(readFileSync(new URL('../workOrder.json', import.meta.url)));
  assert.ok(isValidOrder(order, workCards.map(card => card.id)));
  const cards = workCards.filter(card => card.id === 'cute-mascots');
  assert.equal(cards.length, 1);
  assert.equal(order.filter(id => id === 'cute-mascots').length, 1);
  assert.equal(cards[0].mediaFit, 'cover');
  assert.equal(cards[0].audio, undefined);
  assert.equal(cards[0].sourceUrl, 'https://x.com/piyushxpj/status/2112103352482041922');
  for (const extension of ['mp4', 'jpg']) {
    assert.ok(statSync(new URL(`../public/work-v2/media/${cards[0].video}.${extension}`, import.meta.url)).size > 1000);
  }
});

test('Work and Arrange Work both respect per-card media fitting', () => {
  for (const file of ['WorkPage.jsx', 'WorkOrderEditor.jsx']) {
    assert.match(readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'), /objectFit: card\.mediaFit/);
  }
});
