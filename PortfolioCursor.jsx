import React, { useEffect, useRef } from 'react';
import './portfolio-cursor.css';

// The tiny center mark follows the real pointer exactly; only the decorative
// frame eases toward it. No React renders or permanent animation loop on move.
export default function PortfolioCursor({ scopeRef }) {
  const frameRef = useRef(null);
  const pointRef = useRef(null);

  useEffect(() => {
    const scope = scopeRef.current;
    const frame = frameRef.current;
    const point = pointRef.current;
    const preference = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)');
    let visible = false;
    let pressed = false;
    let lastPosition = null;
    const hoverTones = ['yellow', 'coral', 'purple'];
    let hoverIndex = -1;
    let hoverTarget = null;
    const hide = () => {
      visible = false;
      pressed = false;
      hoverTarget = null;
      scope.removeAttribute('data-portfolio-cursor');
      frame.removeAttribute('data-visible');
      point.removeAttribute('data-visible');
    };
    const move = event => {
      if (event.pointerType !== 'mouse' || !preference.matches) return hide();
      const target = event.target;
      if (!(target instanceof Element) || target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, [data-native-cursor]')) return hide();
      lastPosition = { clientX: event.clientX, clientY: event.clientY };
      const position = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      // Re-entry starts at the pointer rather than flying in from an old spot.
      if (!visible) frame.style.transition = 'none';
      frame.style.transform = position;
      point.style.transform = position;
      const nextHoverTarget = target.closest('a, button, [role="button"]');
      if (nextHoverTarget && nextHoverTarget !== hoverTarget) {
        hoverIndex = (hoverIndex + 1) % hoverTones.length;
      }
      hoverTarget = nextHoverTarget;
      frame.dataset.tone = pressed ? 'coral' : hoverTarget ? hoverTones[hoverIndex] : 'purple';
      if (!visible) {
        frame.getBoundingClientRect();
        frame.style.removeProperty('transition');
        frame.dataset.visible = '';
        point.dataset.visible = '';
        scope.setAttribute('data-portfolio-cursor', '');
        visible = true;
      }
    };
    const refresh = () => {
      if (!visible || !lastPosition) return;
      const target = document.elementFromPoint(lastPosition.clientX, lastPosition.clientY);
      if (!target || !scope.contains(target)) return hide();
      move({ ...lastPosition, target, pointerType: 'mouse' });
    };
    const down = event => { pressed = true; move(event); };
    const up = () => { pressed = false; refresh(); };
    const onKey = event => { if (event.key === 'Tab' || event.key === 'Escape') hide(); };
    scope.addEventListener('pointermove', move, { passive: true });
    scope.addEventListener('pointerover', move, { passive: true });
    scope.addEventListener('pointerdown', down, { passive: true });
    scope.addEventListener('pointerleave', hide);
    scope.addEventListener('pointercancel', hide);
    scope.addEventListener('scroll', refresh, { passive: true, capture: true });
    window.addEventListener('pointerup', up);
    window.addEventListener('blur', hide);
    window.addEventListener('keydown', onKey);
    document.addEventListener('visibilitychange', hide);
    preference.addEventListener('change', hide);
    return () => {
      hide();
      scope.removeEventListener('pointermove', move);
      scope.removeEventListener('pointerover', move);
      scope.removeEventListener('pointerdown', down);
      scope.removeEventListener('pointerleave', hide);
      scope.removeEventListener('pointercancel', hide);
      scope.removeEventListener('scroll', refresh, true);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('blur', hide);
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('visibilitychange', hide);
      preference.removeEventListener('change', hide);
    };
  }, [scopeRef]);

  return <>
    <div ref={frameRef} className="portfolio-cursor" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path className="portfolio-cursor__box" d="M0 0h24v24H0z" />
        <path className="portfolio-cursor__corners" d="M8 2H2v6 M16 2h6v6 M2 16v6h6 M22 16v6h-6" />
      </svg>
    </div>
    <div ref={pointRef} className="portfolio-cursor-point" aria-hidden="true" />
  </>;
}
