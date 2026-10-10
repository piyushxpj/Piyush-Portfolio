import React, { useCallback, useEffect, useRef, useState } from 'react';
import './work-page.css';
import workImages from './workImageManifest.json';
import { workCards } from './workCards.js';
import savedOrder from './workOrder.json';
import { resolveOrder } from './workOrder.js';

const ART = '/work-v2/artwork/';
const MEDIA = '/work-v2/media/';

function SoundIcon({ muted }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5Z" />
    {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></>}
  </svg>;
}

function WorkVideo({ card, audible, onSound, onQuiet }) {
  const videoRef = useRef(null);
  const syncRef = useRef(() => {});
  const wantsPlay = useRef(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [load, setLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const sync = () => {
      if (visible && !document.hidden && wantsPlay.current) {
        video.play().catch(() => setPlaying(false));
      } else {
        video.pause();
        video.muted = true;
        onQuiet(card.id);
      }
    };
    syncRef.current = sync;
    const preloadObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setLoad(true); preloadObserver.disconnect(); }
    }, { rootMargin: '400px 0px' });
    const playbackObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.05 });
    const preferenceChanged = () => { wantsPlay.current = !motion.matches; sync(); };
    preloadObserver.observe(video);
    playbackObserver.observe(video);
    motion.addEventListener('change', preferenceChanged);
    document.addEventListener('visibilitychange', sync);
    return () => {
      preloadObserver.disconnect(); playbackObserver.disconnect();
      motion.removeEventListener('change', preferenceChanged);
      document.removeEventListener('visibilitychange', sync);
      video.pause(); video.muted = true;
      syncRef.current = () => {};
    };
  }, [card.id, onQuiet]);

  useEffect(() => { videoRef.current.muted = !audible; }, [audible]);

  const togglePlayback = () => {
    const video = videoRef.current;
    wantsPlay.current = video.paused;
    if (failed) { setFailed(false); video.load(); }
    syncRef.current();
  };
  const toggleSound = () => {
    const video = videoRef.current;
    // Change the media property inside the gesture for Safari activation.
    video.muted = audible;
    onSound(card.id);
    if (!audible) {
      wantsPlay.current = true;
      video.play().catch(() => { video.muted = true; onQuiet(card.id); });
    }
  };

  return <>
    <video ref={videoRef} src={load ? card.videoSrc || `${MEDIA}${card.video}.mp4` : undefined}
      poster={load ? card.poster || `${MEDIA}${card.video}.jpg` : undefined} loop muted={!audible} playsInline preload="metadata"
      aria-label={card.title} aria-hidden={!load || undefined} onCanPlay={() => syncRef.current()}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => { setFailed(true); setPlaying(false); }} />
    <div className="work-media-controls">
    <button className="work-media-control work-media-control--play" type="button"
      onClick={togglePlayback} aria-label={`${failed ? 'Retry' : playing ? 'Pause' : 'Play'} ${card.title}`}
      title={failed ? 'Retry video' : playing ? 'Pause video' : 'Play video'}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {playing ? <path d="M6 4h4v16H6zm8 0h4v16h-4z" /> : <path d="m7 4 13 8-13 8z" />}
      </svg>
    </button>
    {card.audio && <button className="work-media-control work-media-control--sound" type="button"
      onClick={toggleSound} aria-label={`${audible ? 'Mute' : 'Unmute'} ${card.title}`}
      aria-pressed={audible} title={audible ? 'Mute video' : 'Unmute video'}>
      <SoundIcon muted={!audible} />
    </button>}
    </div>
    <span className="work-media-error" role="status">{failed ? 'Video unavailable. Use play to retry.' : ''}</span>
  </>;
}

function WorkImage({ name, priority = false, scale = 1, ...props }) {
  const { width, height, variants } = workImages[name];
  // Match the actual one-/two-column card widths, including oversized layers.
  const sizes = `(max-width: 42rem) calc((100vw - 40px) * ${scale}), (max-width: 1680px) calc((100vw - 100px) * ${scale / 2}), ${790 * scale}px`;
  return <img {...props} src={variants.at(-1).src}
    srcSet={variants.map(variant => `${variant.src} ${variant.width}w`).join(', ')} sizes={sizes}
    width={width} height={height} loading={priority ? 'eager' : 'lazy'}
    fetchpriority={priority ? 'high' : 'auto'} decoding="async" />;
}

export function WorkArtwork({ card, priority }) {
  if (card.src) return <img className={`work-art-image${card.inset ? ' work-art-image--inset' : ''}`} src={card.src} alt={card.title} loading="lazy" decoding="async" />;
  if (card.layers) return <div className="work-art work-art--layers" style={{ background: card.background }} role="img" aria-label={card.title}>
    {card.layers.map(layer => <div className={`work-art-layer${layer.insetShadow ? ' work-art-layer--inset' : ''}`} key={layer.file}
      style={{ left: `${layer.x / 590 * 100}%`, top: `${layer.y / 372 * 100}%`, width: `${layer.width / 590 * 100}%`, height: `${layer.height / 372 * 100}%`, borderRadius: layer.radius ? `${layer.radius / 590 * 100}cqw` : undefined, '--layer-border': layer.border }}>
      <WorkImage name={layer.file} scale={layer.width / 590} alt="" style={layer.crop} />
    </div>)}
  </div>;
  if (['metrics', 'market'].includes(card.composition)) return <div className={`work-art work-art--${card.composition}`}>
    <WorkImage name={card.composition} scale={1.13} alt={card.title} />
  </div>;
  if (card.composition === 'editorial') return <div className="work-art work-art--editorial" role="img" aria-label={card.title}>
    {[0, 1].map(index => <div className="work-editorial-post" key={index}>
      <WorkImage name={`editorial-${index}`} scale={.415} alt="" />
      <div className="work-editorial-post__copy">
        <p className="work-editorial-post__date">Published July {index === 0 ? '20' : '23'}, 2026</p>
        <p className="work-editorial-post__headline">{index === 0 ? <>Intelligence isn’t static.<br />Neither is your business.</> : 'Every decision is another training example.'}</p>
      </div>
      <p className="work-editorial-post__brand">NexusAIM AI</p>
    </div>)}
  </div>;
  if (card.composition === 'ai') return <div className="work-art work-art--ai" role="img" aria-label={card.title}>
    <WorkImage className="work-art__ai-background" name="ai-background" scale={1.136} priority={priority} alt="" />
    <div className="work-art__ai-caption">
      <img src={`${ART}ai-wordmark.svg`} alt="" width="118" height="35" />
      <p>AI was supposed to make work easier. Instead it created a new kind of work managing AI</p>
    </div>
  </div>;
  if (card.composition === 'velar') return <div className="work-art work-art--velar">
    <WorkImage name="velar-website" alt={card.title} />
  </div>;
  if (card.composition === 'staking') return <div className="work-art work-art--staking" role="img" aria-label={card.title}>
    <WorkImage className="work-art__staking-background" name="velar-staking-0" alt="" />
    <WorkImage className="work-art__staking-interface" name="velar-staking-1" scale={.824} alt="" />
  </div>;
  return <WorkImage className={`work-art-export work-art-export--${card.crop}`}
    name={card.id} priority={priority} alt={card.title} />;
}

export default function WorkPage({ order = savedOrder }) {
  const byId = new Map(workCards.map(card => [card.id, card]));
  const cards = resolveOrder(order, workCards.map(card => card.id)).map(id => byId.get(id));
  const [audibleId, setAudibleId] = useState(null);
  const quiet = useCallback(id => setAudibleId(current => current === id ? null : current), []);
  const sound = useCallback(id => setAudibleId(current => current === id ? null : id), []);
  return <main className="work-page" id="work-content" aria-labelledby="work-title" data-node-id="1071:22783">
    {import.meta.env.DEV && window.location.pathname !== '/arrange-work' && <a className="work-arrange-link" href="/arrange-work">Arrange Work ↗</a>}
    <h1 id="work-title" tabIndex={-1} data-node-id="1071:22784">Designing<br />Across Everything</h1>
    <section className="work-grid" aria-label="Selected design work" data-node-id="1071:22785">
      {cards.map((card, index) => <figure className="work-card"
        key={card.id} data-node-id={card.nodeId || (card.src || card.videoSrc ? undefined : `1071:${card.id}`)}>
        {card.video ? <WorkVideo card={card} audible={audibleId === card.id} onSound={sound} onQuiet={quiet} />
          : <WorkArtwork card={card} priority={index < 2} />}
      </figure>)}
    </section>
  </main>;
}
