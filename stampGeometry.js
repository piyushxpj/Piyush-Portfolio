export const STAMP_WIDTH = 72;
export const STAMP_HEIGHT = 76;
export const MAX_STAMPS = 40;

// Inward semicircles keep the same postage-stamp silhouette at every size.
export function stampPath(width = STAMP_WIDTH, height = STAMP_HEIGHT) {
  const r = 2.5;
  let d = 'M0 0';
  for (let x = 6; x < width; x += 12) d += `H${x - r}A${r} ${r} 0 0 0 ${x + r} 0`;
  d += `H${width}`;
  for (let y = 6; y < height - r; y += 12) d += `V${y - r}A${r} ${r} 0 0 0 ${width} ${y + r}`;
  d += `V${height}`;
  for (let x = width - 6; x > 0; x -= 12) d += `H${x + r}A${r} ${r} 0 0 0 ${x - r} ${height}`;
  d += 'H0';
  for (let y = height - 6; y > r; y -= 12) d += `V${y + r}A${r} ${r} 0 0 0 0 ${y - r}`;
  return `${d}Z`;
}

export const STAMP_PATH = stampPath();
export const STAMP_MASK = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${STAMP_WIDTH} ${STAMP_HEIGHT}"><path d="${STAMP_PATH}"/></svg>`)}")`;

export function stampPlacement(x, y, width, height) {
  return {
    x: (Math.max(0, Math.min(width, x)) - STAMP_WIDTH / 2) / width,
    y: (Math.max(0, Math.min(height, y)) - STAMP_HEIGHT / 2) / height,
    width: STAMP_WIDTH / width,
    height: STAMP_HEIGHT / height,
  };
}
