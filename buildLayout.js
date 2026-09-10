// Center incomplete rows while allowing the Builds collection to grow.
export function getBuildPosition(index, count) {
  const columns = 3;
  const stride = 460;
  const row = Math.floor(index / columns);
  const itemsInRow = Math.min(columns, count - row * columns);
  return {
    x: 3200 + ((columns - itemsInRow) / 2 + index % columns) * stride,
    y: 1700 + row * 520,
  };
}
