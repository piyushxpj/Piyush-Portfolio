import { randomBytes, createHash } from 'node:crypto';
import { readFile, writeFile, rename, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { workCards } from '../workCards.js';
import { isValidOrder, resolveOrder } from '../workOrder.js';

const loopback = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);
const revision = text => createHash('sha256').update(text).digest('hex');

export function workOrderDevApi() {
  return {
    name: 'local-work-order-editor',
    apply: 'serve',
    configureServer(server) {
      const file = resolve(server.config.root, 'workOrder.json');
      const ids = workCards.map(card => card.id);
      const token = randomBytes(32).toString('hex');
      let queue = Promise.resolve();
      server.middlewares.use('/__local/work-order', async (req, res) => {
        const send = (status, data) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-store');
          res.end(JSON.stringify(data));
        };
        const host = req.headers.host || '';
        if (!loopback.has(req.socket.remoteAddress) ||
            !/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host) ||
            req.headers['sec-fetch-site'] === 'cross-site') return send(403, { error: 'Open the editor on localhost.' });
        if (req.url !== '/' && req.url !== '') return send(404, { error: 'Not found.' });
        if (req.method === 'GET') {
          try {
            const text = await readFile(file, 'utf8');
            return send(200, { order: resolveOrder(JSON.parse(text), ids), revision: revision(text), token });
          } catch { return send(500, { error: 'Unable to read workOrder.json. Check the file and reload.' }); }
        }
        if (req.method !== 'POST') return send(405, { error: 'Method not allowed.' });
        if (req.headers.origin !== `http://${host}` || req.headers['x-work-editor-token'] !== token ||
            req.headers['content-type'] !== 'application/json') return send(403, { error: 'Reload the local editor and try again.' });
        try {
          let body = '';
          for await (const chunk of req) {
            body += chunk;
            if (Buffer.byteLength(body) > 16384) return send(413, { error: 'Order is too large.' });
          }
          const data = JSON.parse(body);
          if (!isValidOrder(data.order, ids) || typeof data.revision !== 'string') return send(400, { error: 'Order must contain every card exactly once. Reload and try again.' });
          // Serialize reads/writes so two editor tabs cannot silently overwrite each other.
          const save = async () => {
            const current = await readFile(file, 'utf8');
            if (revision(current) !== data.revision) return send(409, { error: 'The saved order changed in another tab or file. Reload saved order before saving again.' });
            const text = `${JSON.stringify(data.order, null, 2)}\n`;
            if (text !== current) {
              const temp = `${file}.${randomBytes(8).toString('hex')}.tmp`;
              try { await writeFile(temp, text, { flag: 'wx' }); await rename(temp, file); }
              finally { await unlink(temp).catch(() => {}); }
            }
            send(200, { order: data.order, revision: revision(text) });
          };
          const pending = queue.then(save);
          queue = pending.catch(() => {});
          await pending;
        } catch (error) {
          send(error instanceof SyntaxError ? 400 : 500, { error: error instanceof SyntaxError ? 'Invalid order data. Reload and try again.' : 'Unable to save. Check that the project is writable and try again.' });
        }
      });
    },
  };
}
