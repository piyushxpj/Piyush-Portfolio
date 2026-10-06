import React, { useEffect, useRef } from 'react';
import PLAYGROUND_IMAGES, { isVideo } from './playgroundImages.js';

function LazyVideo({ src, index }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;

    const syncPlayback = () => {
      if (visible && !document.hidden && !reduceMotion.matches) {
        element.play().catch(() => {});
      } else {
        element.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { rootMargin: '240px 0px' });

    observer.observe(element);
    reduceMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      observer.disconnect();
      reduceMotion.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      element.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      aria-label={`Playground motion piece ${index + 1}`}
      loop
      muted
      playsInline
      preload="metadata"
      className="playground-media"
    />
  );
}

export default function PlaygroundPage({ withSidebar = false }) {
  return (
    <main id="playground-content" tabIndex={-1} aria-label="Experiments" className={`playground-page${withSidebar ? ' playground-page--with-sidebar' : ''}`}>
      <div className="playground-page__inner">
        <section className="playground-masonry" aria-label="Playground gallery">
          {PLAYGROUND_IMAGES.map((src, index) => (
            <figure className="playground-masonry__item" key={src}>
              {isVideo(src) ? (
                <LazyVideo src={src} index={index} />
              ) : (
                <img
                  src={src}
                  alt={`Playground piece ${index + 1}`}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="playground-media"
                />
              )}
            </figure>
          ))}
        </section>
      </div>
    </main>
  );
}
