import { useLayoutEffect } from 'react';

// Measure only when a passage enters view. Animate decoration, never text.
export default function useHighlightSelection(storyRef, decorationRef) {
  useLayoutEffect(() => {
    const story = storyRef.current;
    const decoration = decorationRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference) and (forced-colors: none)');
    if (!preference.matches || story.closest('.hero-v2--instant') ||
        !('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const highlights = [...story.querySelectorAll('.about-highlight')];
    const active = new Set();

    const reveal = (mark, delay) => {
      const origin = story.getBoundingClientRect();
      const lines = [...mark.getClientRects()].filter(rect => rect.width && rect.height);
      const totalWidth = lines.reduce((sum, rect) => sum + rect.width, 0);
      if (!totalWidth) { mark.removeAttribute('data-highlight-pending'); return; }
      const styles = getComputedStyle(mark);
      const layer = document.createElement('span');
      layer.className = 'about-selection';
      layer.style.setProperty('--highlight-fill', styles.getPropertyValue('--highlight-fill'));
      layer.style.setProperty('--highlight-edge', styles.getPropertyValue('--highlight-edge'));
      const animations = [];
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        mark.removeAttribute('data-highlight-pending');
        animations.forEach(animation => animation.cancel());
        layer.remove();
        active.delete(finish);
      };
      active.add(finish);
      decoration.append(layer);
      let elapsed = delay;
      lines.forEach((rect, index) => {
        const line = document.createElement('span');
        line.className = 'about-selection__line';
        Object.assign(line.style, {
          left: `${rect.left - origin.left}px`, top: `${rect.top - origin.top}px`,
          width: `${rect.width}px`, height: `${rect.height}px`,
        });
        const fill = document.createElement('span');
        fill.className = 'about-selection__fill';
        const caret = document.createElement('span');
        caret.className = 'about-selection__caret';
        line.append(fill, caret);
        layer.append(line);
        const duration = 600 * rect.width / totalWidth;
        animations.push(fill.animate([
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0 0 0)' },
        ], { duration, delay: elapsed, easing: 'linear', fill: 'forwards' }));
        const end = `translateX(${Math.max(0, rect.width - 2)}px)`;
        animations.push(caret.animate([
          { transform: 'translateX(0)', opacity: 1, offset: 0 },
          { transform: end, opacity: 1, offset: 0.999 },
          { transform: end, opacity: index === lines.length - 1 ? 1 : 0, offset: 1 },
        ], { duration, delay: elapsed, easing: 'linear', fill: 'forwards' }));
        if (index === 0) {
          const start = document.createElement('span');
          start.className = 'about-selection__caret';
          line.append(start);
          animations.push(start.animate([{ opacity: 1 }, { opacity: 1 }], {
            duration: 1, delay, fill: 'forwards',
          }));
        }
        elapsed += duration;
      });
      Promise.all(animations.map(animation => animation.finished)).then(finish).catch(() => {});
    };

    const observer = new IntersectionObserver(entries => {
      let stagger = 0;
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        observer.unobserve(target);
        reveal(target, Math.min(stagger++, 3) * 50);
      });
    }, { root: story.closest('.hero-v2'), rootMargin: '-80px 0px -8% 0px', threshold: 0.15 });
    highlights.forEach(mark => {
      mark.setAttribute('data-highlight-pending', '');
      observer.observe(mark);
    });
    // Finish an in-flight selection if line wrapping changes; static marks
    // then reflow naturally instead of keeping stale measured rectangles.
    const finishActive = () => [...active].forEach(finish => finish());
    const revealAll = () => {
      observer.disconnect();
      finishActive();
      highlights.forEach(mark => mark.removeAttribute('data-highlight-pending'));
    };
    preference.addEventListener('change', revealAll);
    window.addEventListener('resize', finishActive);
    document.fonts?.addEventListener('loadingdone', finishActive);
    return () => {
      revealAll();
      preference.removeEventListener('change', revealAll);
      window.removeEventListener('resize', finishActive);
      document.fonts?.removeEventListener('loadingdone', finishActive);
    };
  }, [storyRef, decorationRef]);
}
