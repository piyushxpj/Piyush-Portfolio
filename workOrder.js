// Pure ordering helpers shared by the gallery, editor, and local save endpoint.
export function resolveOrder(order, ids) {
  const valid = new Set(ids);
  const seen = new Set();
  return [...(Array.isArray(order) ? order : []), ...ids].filter(id => {
    if (!valid.has(id) || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

export function isValidOrder(order, ids) {
  return Array.isArray(order) && order.length === ids.length &&
    new Set(order).size === ids.length && order.every(id => typeof id === 'string' && ids.includes(id));
}

export function moveOrder(order, from, to, size = 1) {
  const count = Math.floor(order.length / size);
  if (![1, 2].includes(size) || !Number.isInteger(from) || !Number.isInteger(to) ||
      from < 0 || to < 0 || from >= count || to >= count || from === to) return order;
  const units = Array.from({ length: count }, (_, i) => order.slice(i * size, (i + 1) * size));
  const [moved] = units.splice(from, 1);
  units.splice(to, 0, moved);
  return [...units.flat(), ...order.slice(count * size)];
}
