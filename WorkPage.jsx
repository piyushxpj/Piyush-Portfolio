import React, { useCallback, useEffect, useRef, useState } from 'react';
import './work-page.css';
import workImages from './workImageManifest.json';

const ART = '/work-v2/artwork/';
const MEDIA = '/work-v2/media/';
// Figma 1071:22785: row-major order, 590 × 372 cards with 20px gutters.
const cards = [
  { id: '22786', title: 'Built for people who actually ship things', crop: 'top' },
  { id: '22791', title: 'The AI that just works', composition: 'ai' },
  { id: '22790', title: 'Server animation', video: 'server', audio: true },
  { id: '22789', title: 'Inner Circle — Build Something Wonderful', video: 'inner-circle', audio: true },
  { id: '22796', title: 'Trading app interface', crop: 'top' },
  { id: '22798', title: 'Claim rewards interaction', video: 'claim-rewards', audio: true },
  { id: '22799', title: 'Code effect', video: 'code-effect' },
  { id: '22800', title: 'Crowwd — creators and initiatives', crop: 'top' },
  { id: '22803', title: 'Velar — DeFi liquidity on Bitcoin', composition: 'velar' },
  { id: '22804', title: 'What have you created?', video: 'created' },
  { id: 'bento-identity', title: 'Bento — animated brand identity', video: 'bento-identity', videoSrc: '/playground/twitter-gif-1988869773401215143.mp4', poster: `${MEDIA}bento-identity.png` },
  { id: '22811', title: 'Velar product metrics', composition: 'metrics' },
  { id: '22806', title: 'Nexus brand identity', crop: 'full' },
  { id: 'ship-future-ai', title: 'Ship the Future with AI — website concept', video: 'ship-future-ai', videoSrc: `${MEDIA}ship-future-ai-cropped.mp4`, poster: `${MEDIA}ship-future-ai-cropped.jpg` },
  { id: '22813', title: 'Character chat mobile app', crop: 'top' },
  { id: '22817', title: 'Based Fellowship', crop: 'top' },
  { id: '22819', title: 'Not another wrapper. A real workflow.', crop: 'top' },
  { id: '22825', title: 'GDUPI, Brunette, and Higher token cards', crop: 'top' },
  { id: '25883', title: 'AI workflow editorial design', crop: 'top' },
  { id: '25886', title: 'Token market table', composition: 'market' },
  { id: '25888', title: 'Velar staking interface', composition: 'staking' },
  { id: '25891', title: 'Knox technology and marketing', crop: 'top' },
  { id: '25893', title: 'Pending, successful, and failed status explorations', crop: 'top' },
  { id: '25922', title: 'NexusAIM editorial campaign', composition: 'editorial' },
  // Figma 1073:29141: preserve the four new row pairings after the original gallery.
  { id: '29142', nodeId: '1073:29142', title: 'Higher or Lower — card game interface', startsRow: true, background: '#f1dcc7', layers: [
    { file: 'game-29803', x: 28, y: 35, width: 160.587, height: 302 },
    { file: 'game-29587', x: 214.38, y: 35, width: 160.587, height: 302 },
    { file: 'game-29695', x: 400.76, y: 35, width: 160.587, height: 302 },
  ] },
  { id: '29994', nodeId: '1074:29994', title: 'Crowwd — creator profile and project funding', background: '#f3f3f4', layers: [
    { file: 'crowwd-profile', x: 40, y: -141, width: 674, height: 473, crop: { height: '101.33%', top: '-0.03%' } },
  ] },
  { id: '29143', nodeId: '1073:29143', title: 'Velar — trading dashboard', background: '#ffe400', layers: [
    { file: 'velar-trading', x: 43.2485, y: 31, width: 503.503, height: 310, crop: { width: '100.14%', height: '100.64%', left: '-0.07%' } },
  ] },
  { id: '29144', nodeId: '1073:29144', title: 'Purple geometric brand identity', background: '#232528', layers: [
    { file: 'purple-brand', x: -117, y: 0, width: 824, height: 371, radius: 51.747, insetShadow: true },
  ] },
  { id: '29145', nodeId: '1073:29145', title: 'Bento — brand marks and campaign', background: '#f0512a', layers: [
    { file: 'bento-marks', x: 20, y: 51, width: 270, height: 270 },
    { file: 'bento-banner', x: 308, y: 51, width: 480, height: 270 },
  ] },
  { id: '29146', nodeId: '1073:29146', title: 'Wagadu — making DeFi accessible to all', background: '#05a139', layers: [
    { file: 'wagadu', x: 37, y: 41, width: 516, height: 290 },
  ] },
  { id: '29147', nodeId: '1073:29147', title: 'Based Fellowship — two-week program', background: '#fafafa', layers: [
    { file: 'fellowship-weeks', x: 56, y: 33, width: 478, height: 306.592 },
  ] },
  { id: '30385', nodeId: '1074:30385', title: 'AI Bootcamp with Emergent and ElevenLabs AI Voice Buildathon', background: '#eceae9', layers: [
    { file: 'event-30387', x: 24, y: 56.3, width: 260.374, height: 260.374 },
    { file: 'event-30435', x: 304.63, y: 56.3, width: 260.374, height: 260.374 },
  ] },
  { id: 'knox-brand', title: 'Knox — brand identity and stationery', src: '/playground/01.webp', inset: true },
];

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

function WorkArtwork({ card, priority }) {
  if (card.src) return <img className={`work-art-image${card.inset ? ' work-art-image--inset' : ''}`} src={card.src} alt={card.title} loading="lazy" decoding="async" />;
  if (card.layers) return <div className="work-art work-art--layers" style={{ background: card.background }} role="img" aria-label={card.title}>
    {card.layers.map(layer => <div className={`work-art-layer${layer.insetShadow ? ' work-art-layer--inset' : ''}`} key={layer.file}
      style={{ left: `${layer.x / 590 * 100}%`, top: `${layer.y / 372 * 100}%`, width: `${layer.width / 590 * 100}%`, height: `${layer.height / 372 * 100}%`, borderRadius: layer.radius ? `${layer.radius / 590 * 100}cqw` : undefined }}>
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

export default function WorkPage() {
  const [audibleId, setAudibleId] = useState(null);
  const quiet = useCallback(id => setAudibleId(current => current === id ? null : current), []);
  const sound = useCallback(id => setAudibleId(current => current === id ? null : id), []);
  return <main className="work-page" id="work-content" aria-labelledby="work-title" data-node-id="1071:22783">
    <h1 id="work-title" tabIndex={-1} data-node-id="1071:22784">Designing<br />Across Everything</h1>
    <section className="work-grid" aria-label="Selected design work" data-node-id="1071:22785">
      {cards.map((card, index) => <figure className={`work-card${card.startsRow ? ' work-card--starts-row' : ''}`}
        key={card.id} data-node-id={card.nodeId || (card.src || card.videoSrc ? undefined : `1071:${card.id}`)}>
        {card.video ? <WorkVideo card={card} audible={audibleId === card.id} onSound={sound} onQuiet={quiet} />
          : <WorkArtwork card={card} priority={index < 2} />}
      </figure>)}
    </section>
  </main>;
}
