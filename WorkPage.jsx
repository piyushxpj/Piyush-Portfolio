import React, { useCallback, useEffect, useRef, useState } from 'react';
import './work-page.css';

const ART = '/work-v2/artwork/';
const MEDIA = '/work-v2/media/';
// Figma 1071:22785: row-major order, 590 × 372 cards with 20px gutters.
const cards = [
  { id: '22786', title: 'Built for people who actually ship things', crop: 'top' },
  { id: '22789', title: 'Inner Circle — Build Something Wonderful', video: 'inner-circle', audio: true },
  { id: '22790', title: 'Server animation', video: 'server', audio: true },
  { id: '22791', title: 'The AI that just works', composition: 'ai' },
  { id: '22796', title: 'Trading app interface', crop: 'top' },
  { id: '22798', title: 'Claim rewards interaction', video: 'claim-rewards', audio: true },
  { id: '22799', title: 'Code effect', video: 'code-effect' },
  { id: '22800', title: 'Crowwd — creators and initiatives', crop: 'top' },
  { id: '22803', title: 'Velar — DeFi liquidity on Bitcoin', composition: 'velar' },
  { id: '22804', title: 'What have you created?', video: 'created' },
  { id: '22805', empty: true },
  { id: '22806', title: 'Nexus brand identity', crop: 'full' },
  { id: '22811', title: 'Velar product metrics', composition: 'metrics' },
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
    <video ref={videoRef} src={load ? `${MEDIA}${card.video}.mp4` : undefined}
      poster={`${MEDIA}${card.video}.jpg`} loop muted={!audible} playsInline preload="metadata"
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

function WorkArtwork({ card }) {
  if (card.layers) return <div className="work-art work-art--layers" style={{ background: card.background }} role="img" aria-label={card.title}>
    {card.layers.map(layer => <div className={`work-art-layer${layer.insetShadow ? ' work-art-layer--inset' : ''}`} key={layer.file}
      style={{ left: `${layer.x / 590 * 100}%`, top: `${layer.y / 372 * 100}%`, width: `${layer.width / 590 * 100}%`, height: `${layer.height / 372 * 100}%`, borderRadius: layer.radius ? `${layer.radius / 590 * 100}cqw` : undefined }}>
      <img src={`${ART}${layer.file}.png`} alt="" loading="lazy" decoding="async" style={layer.crop} />
    </div>)}
  </div>;
  if (['metrics', 'market'].includes(card.composition)) return <div className={`work-art work-art--${card.composition}`}>
    <img src={`${ART}${card.composition}.png`} alt={card.title} loading="lazy" />
  </div>;
  if (card.composition === 'editorial') return <div className="work-art work-art--editorial" role="img" aria-label={card.title}>
    {[0, 1].map(index => <div className="work-editorial-post" key={index}>
      <img src={`${ART}editorial-${index}.png`} alt="" loading="lazy" />
      <div className="work-editorial-post__copy">
        <p className="work-editorial-post__date">Published July {index === 0 ? '20' : '23'}, 2026</p>
        <p className="work-editorial-post__headline">{index === 0 ? <>Intelligence isn’t static.<br />Neither is your business.</> : 'Every decision is another training example.'}</p>
      </div>
      <p className="work-editorial-post__brand">NexusAIM AI</p>
    </div>)}
  </div>;
  if (card.composition === 'ai') return <div className="work-art work-art--ai" role="img" aria-label={card.title}>
    <img className="work-art__ai-background" src={`${ART}ai-background.png`} alt="" loading="lazy" />
    <div className="work-art__ai-caption">
      <img src={`${ART}ai-wordmark.svg`} alt="" width="118" height="35" />
      <p>AI was supposed to make work easier. Instead it created a new kind of work managing AI</p>
    </div>
  </div>;
  if (card.composition === 'velar') return <div className="work-art work-art--velar">
    <img src={`${ART}velar-website.png`} alt={card.title} loading="lazy" />
  </div>;
  if (card.composition === 'staking') return <div className="work-art work-art--staking" role="img" aria-label={card.title}>
    <img className="work-art__staking-background" src={`${ART}velar-staking-0.png`} alt="" loading="lazy" />
    <img className="work-art__staking-interface" src={`${ART}velar-staking-1.png`} alt="" loading="lazy" />
  </div>;
  return <img className={`work-art-export work-art-export--${card.crop}`}
    src={`${ART}${card.id}.png`} alt={card.title} loading="lazy" decoding="async" />;
}

export default function WorkPage() {
  const [audibleId, setAudibleId] = useState(null);
  const quiet = useCallback(id => setAudibleId(current => current === id ? null : current), []);
  const sound = useCallback(id => setAudibleId(current => current === id ? null : id), []);
  return <main className="work-page" id="work-content" aria-labelledby="work-title" data-node-id="1071:22783">
    <h1 id="work-title" tabIndex={-1} data-node-id="1071:22784">Designing<br />Across Everything</h1>
    <section className="work-grid" aria-label="Selected design work" data-node-id="1071:22785">
      {cards.map(card => <figure className={`work-card${card.empty ? ' work-card--empty' : ''}${card.startsRow ? ' work-card--starts-row' : ''}`}
        key={card.id} data-node-id={card.nodeId || `1071:${card.id}`} aria-hidden={card.empty || undefined}>
        {card.video ? <WorkVideo card={card} audible={audibleId === card.id} onSound={sound} onQuiet={quiet} />
          : !card.empty && <WorkArtwork card={card} />}
      </figure>)}
    </section>
  </main>;
}
