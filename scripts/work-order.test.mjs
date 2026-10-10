import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer, get } from 'node:http';
import { workCards } from '../workCards.js';
import { isValidOrder, moveOrder, resolveOrder } from '../workOrder.js';
import { workOrderDevApi } from './work-order-dev-api.mjs';

test('ordering handles missing, stale, duplicate and invalid IDs', () => {
  assert.deepEqual(resolveOrder(['b', 'b', 'gone'], ['a', 'b', 'c']), ['b', 'a', 'c']);
  assert.deepEqual(resolveOrder(null, ['a', 'b']), ['a', 'b']);
  assert.equal(isValidOrder(['b', 'a'], ['a', 'b']), true);
  for (const bad of [null, ['a'], ['a', 'a'], ['a', 'x']]) assert.equal(isValidOrder(bad, ['a', 'b']), false);
});

test('card and row moves preserve every card and paired rows', () => {
  const order = ['a', 'b', 'c', 'd', 'e'];
  assert.deepEqual(moveOrder(order, 0, 3), ['b', 'c', 'd', 'a', 'e']);
  assert.deepEqual(moveOrder(order, 1, 0, 2), ['c', 'd', 'a', 'b', 'e']);
  assert.deepEqual(moveOrder(order, 2, 0, 2), order);
  assert.deepEqual(moveOrder(order, -1, 2), order);
  assert.deepEqual(moveOrder(order, 0, 100), order);
  assert.deepEqual(order, ['a', 'b', 'c', 'd', 'e']);
});

test('local API validates saves, rejects hostile requests and prevents lost updates', async () => {
  const root = await mkdtemp(join(tmpdir(), 'work-order-test-'));
  const ids = workCards.map(card => card.id);
  const file = join(root, 'workOrder.json');
  await writeFile(file, `${JSON.stringify(ids, null, 2)}\n`);
  let handler;
  const plugin = workOrderDevApi();
  assert.equal(plugin.apply, 'serve');
  plugin.configureServer({ config: { root }, middlewares: { use(path, callback) { assert.equal(path, '/__local/work-order'); handler = callback; } } });
  const server = createServer((req, res) => handler(req, res));
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    const snapshot = await (await fetch(origin)).json();
    assert.deepEqual(snapshot.order, ids);
    const headers = { Origin: origin, 'Content-Type': 'application/json', 'X-Work-Editor-Token': snapshot.token };
    const post = (body, custom = headers) => fetch(origin, { method: 'POST', headers: custom, body: JSON.stringify(body) });
    const hostileHostStatus = await new Promise((resolve, reject) => {
      get(origin, { headers: { Host: 'evil.example' } }, response => { response.resume(); resolve(response.statusCode); }).on('error', reject);
    });
    assert.equal(hostileHostStatus, 403);
    assert.equal((await fetch(origin, { headers: { 'Sec-Fetch-Site': 'cross-site' } })).status, 403);
    assert.equal((await post({ order: ids, revision: snapshot.revision }, { ...headers, Origin: 'https://evil.example' })).status, 403);
    assert.equal((await post({ order: ids, revision: snapshot.revision }, { ...headers, 'X-Work-Editor-Token': 'wrong' })).status, 403);
    assert.equal((await post({ order: ids.slice(1), revision: snapshot.revision })).status, 400);
    assert.equal((await post({ order: [...ids.slice(1), ids[1]], revision: snapshot.revision })).status, 400);
    assert.equal((await post({ order: ['unknown', ...ids.slice(1)], revision: snapshot.revision })).status, 400);
    assert.equal((await post({ padding: 'x'.repeat(17000) })).status, 413);
    assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), ids);
    const next = moveOrder(ids, 0, 1);
    const saves = await Promise.all([post({ order: next, revision: snapshot.revision }), post({ order: next, revision: snapshot.revision })]);
    assert.deepEqual(saves.map(r => r.status).sort(), [200, 409]);
    assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), next);
    const updated = await (await fetch(origin)).json();
    assert.notEqual(updated.revision, snapshot.revision);
    assert.equal((await post({ order: ids, revision: updated.revision })).status, 200);
    assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), ids);
  } finally {
    await new Promise(resolve => server.close(resolve));
    await rm(root, { recursive: true, force: true });
  }
});
