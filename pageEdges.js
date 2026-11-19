// Read the rendered surface once per frame, including intermediate CSS-transition
// colors, then share those exact values with the strips and browser chrome.
export function mountPageEdges(shell, doc = document, win = window) {
  const root = doc.documentElement;
  const properties = ['--edge-top-background', '--edge-bottom-background', '--edge-viewport-top', '--edge-viewport-bottom'];
  const saved = properties.map(name => [name, root.style.getPropertyValue(name), root.style.getPropertyPriority(name)]);
  const saveBackground = element => {
    const entries = [...element.style].filter(name => name.startsWith('background') || name.startsWith('transition'))
      .map(name => [name, element.style.getPropertyValue(name), element.style.getPropertyPriority(name)]);
    return () => {
      element.style.removeProperty('background');
      element.style.removeProperty('transition');
      entries.forEach(([name, value, priority]) => element.style.setProperty(name, value, priority));
    };
  };
  const restoreRoot = saveBackground(root);
  const restoreBody = saveBackground(doc.body);
  let meta = doc.querySelector('meta[name="theme-color"]');
  const createdMeta = !meta;
  if (!meta) {
    meta = doc.createElement('meta');
    meta.name = 'theme-color';
    doc.head.append(meta);
  }
  const previousTheme = meta.getAttribute('content');
  let frame = 0;
  let transitioning = false;
  let disposed = false;
  let lastTop;
  let lastBottom;
  const viewport = win.visualViewport;

  root.style.setProperty('background', 'var(--edge-top-background)');
  doc.body.style.setProperty('background', 'var(--edge-bottom-background)');
  // The surface already animates its color; a second document transition lags it.
  root.style.setProperty('transition', 'none');
  doc.body.style.setProperty('transition', 'none');

  const update = () => {
    frame = 0;
    if (disposed) return;
    const surface = win.getComputedStyle(shell);
    // The exposed Home frame and the sticky inner-page header share charcoal.
    // The lower edge follows the actual page surface (charcoal → paper white).
    const top = surface.getPropertyValue('--portfolio-frame-background').trim();
    const bottom = surface.backgroundColor;
    if (top !== lastTop) {
      root.style.setProperty('--edge-top-background', top);
      meta.setAttribute('content', top);
      lastTop = top;
    }
    if (bottom !== lastBottom) {
      root.style.setProperty('--edge-bottom-background', bottom);
      lastBottom = bottom;
    }
    root.style.setProperty('--edge-viewport-top', `${Math.max(0, viewport?.offsetTop || 0)}px`);
    root.style.setProperty('--edge-viewport-bottom', `${Math.max(0, win.innerHeight - (viewport?.height || win.innerHeight) - (viewport?.offsetTop || 0))}px`);
    if (transitioning && !doc.hidden) frame = win.requestAnimationFrame(update);
  };
  const schedule = () => {
    if (!disposed && !frame) frame = win.requestAnimationFrame(update);
  };
  const transition = event => {
    if (event.target !== shell || event.propertyName !== 'background-color') return;
    transitioning = event.type === 'transitionrun';
    schedule();
  };
  const listeners = [
    [shell, 'scroll', schedule], [win, 'scroll', schedule],
    [win, 'resize', schedule], [win, 'orientationchange', schedule],
    [win, 'pageshow', schedule], [doc, 'visibilitychange', schedule],
    [viewport, 'resize', schedule], [viewport, 'scroll', schedule],
    ...['transitionrun', 'transitionend', 'transitioncancel'].map(type => [shell, type, transition]),
  ];
  listeners.forEach(([target, type, handler]) => target?.addEventListener(type, handler, { passive: true }));
  const resize = new win.ResizeObserver(schedule);
  resize.observe(shell);
  const paletteKey = () => ['--portfolio-frame-background', '--portfolio-paper-background']
    .map(name => root.style.getPropertyValue(name)).join('|');
  let previousPalette = paletteKey();
  const changes = new win.MutationObserver(records => {
    // Ignore our own root edge-variable writes, but respond to palette edits.
    const nextPalette = paletteKey();
    if (nextPalette !== previousPalette || records.some(record => record.target !== root || record.attributeName !== 'style')) schedule();
    previousPalette = nextPalette;
  });
  changes.observe(shell, { attributes: true, attributeFilter: ['class', 'style'] });
  changes.observe(root, { attributes: true, attributeFilter: ['class', 'data-theme', 'style'] });
  update();
  schedule(); // Includes browser-restored scroll/layout after the initial paint.

  return () => {
    disposed = true;
    win.cancelAnimationFrame(frame);
    listeners.forEach(([target, type, handler]) => target?.removeEventListener(type, handler));
    resize.disconnect();
    changes.disconnect();
    restoreRoot();
    restoreBody();
    saved.forEach(([name, value, priority]) => value
      ? root.style.setProperty(name, value, priority) : root.style.removeProperty(name));
    if (createdMeta) meta.remove();
    else if (previousTheme === null) meta.removeAttribute('content');
    else meta.setAttribute('content', previousTheme);
  };
}
