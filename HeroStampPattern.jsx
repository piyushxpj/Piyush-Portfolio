import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { MAX_STAMPS, STAMP_MASK, STAMP_PATH, STAMP_WIDTH, STAMP_HEIGHT, stampPlacement } from './stampGeometry.js';
import './hero-stamp-pattern.css';

const shapeStyle = { maskImage: STAMP_MASK, WebkitMaskImage: STAMP_MASK };
const positionStyle = stamp => ({ left: `${stamp.x * 100}%`, top: `${stamp.y * 100}%`, width: `${stamp.width * 100}%`, height: `${stamp.height * 100}%` });
const vectors = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };

// Snapshot the clicked artwork without replacing or restarting the live SVG.
function capturePiece(image, surface, stamp, holes) {
  const canvas = document.createElement('canvas');
  const density = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = STAMP_WIDTH * density;
  canvas.height = STAMP_HEIGHT * density;
  const ctx = canvas.getContext('2d');
  if (!ctx || !image.complete || !image.naturalWidth) return null;
  ctx.scale(density, density);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, STAMP_WIDTH, STAMP_HEIGHT);
  const bounds = image.getBoundingClientRect();
  const scale = Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight);
  const width = image.naturalWidth * scale;
  const height = image.naturalHeight * scale;
  const left = stamp.x * surface.width;
  const top = stamp.y * surface.height;
  ctx.save();
  ctx.beginPath();
  ctx.rect(-left, -top, surface.width, surface.height);
  ctx.clip();
  ctx.drawImage(image, bounds.left - surface.left + (bounds.width - width) / 2 - left,
    bounds.top - surface.top + (bounds.height - height) / 2 - top, width, height);
  for (const hole of holes) {
    ctx.save();
    ctx.translate(hole.x * surface.width - left, hole.y * surface.height - top);
    ctx.scale(hole.width * surface.width / STAMP_WIDTH, hole.height * surface.height / STAMP_HEIGHT);
    ctx.fill(new Path2D(STAMP_PATH));
    ctx.restore();
  }
  ctx.restore();
  return canvas.toDataURL('image/png');
}

export default function HeroStampPattern({ active }) {
  const surfaceRef = useRef(null);
  const artRef = useRef(null);
  const carryRef = useRef(null);
  const placementRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const tiltTimer = useRef(null);
  const lastMoveTime = useRef(0);
  const reduceMotion = useReducedMotion();
  const tiltTarget = useMotionValue(0);
  const tilt = useSpring(tiltTarget, { duration: .5, bounce: .2 });
  const tiltTransform = useTransform(tilt, value => `rotate(${value}deg)`);
  const nextId = useRef(0);
  const [stamps, setStamps] = useState([]);
  const [placed, setPlaced] = useState([]);
  const [held, setHeld] = useState(null);
  const [aim, setAim] = useState({ x: .5, y: .5 });
  const [status, setStatus] = useState('');
  const stage = surfaceRef.current?.closest('.hero-v2__stage');

  useEffect(() => {
    if (!active) { setStamps([]); setPlaced([]); setHeld(null); setStatus(''); }
  }, [active]);

  const moveCarry = (x, y, allowTilt = false) => {
    const now = performance.now();
    const elapsed = Math.max(8, now - lastMoveTime.current);
    const velocity = lastMoveTime.current ? (x - pointer.current.x) / elapsed : 0;
    clearTimeout(tiltTimer.current);
    if (allowTilt && !reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      tiltTarget.set(Math.max(-7, Math.min(7, velocity * 5)));
      tiltTimer.current = setTimeout(() => tiltTarget.set(0), 80);
    } else {
      tiltTarget.set(0);
      tilt.jump(0);
    }
    lastMoveTime.current = now;
    pointer.current = { x, y };
    if (carryRef.current) carryRef.current.style.transform = `translate3d(${x - STAMP_WIDTH / 2}px, ${y - STAMP_HEIGHT / 2}px, 0)`;
  };

  useEffect(() => {
    clearTimeout(tiltTimer.current);
    tiltTarget.set(0);
    tilt.jump(0);
    lastMoveTime.current = 0;
    return () => clearTimeout(tiltTimer.current);
  }, [held, reduceMotion, tiltTarget, tilt]);

  useLayoutEffect(() => {
    if (!held || !active) return undefined;
    document.body.setAttribute('data-stamp-carrying', '');
    moveCarry(pointer.current.x, pointer.current.y);
    placementRef.current?.focus({ preventScroll: true });
    return () => document.body.removeAttribute('data-stamp-carrying');
  }, [held, active]);

  const cancel = () => {
    setStamps(current => current.filter(stamp => stamp.id !== held.id));
    setHeld(null);
    setStatus('Cut cancelled. The piece is back in the artwork.');
    surfaceRef.current?.focus({ preventScroll: true });
  };

  const reset = () => {
    setStamps([]);
    setPlaced([]);
    setHeld(null);
    setStatus('All stamps cleared. Artwork restored.');
  };

  const punch = event => {
    if (!active || held) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const keyboard = event.detail === 0;
    const x = keyboard ? aim.x * rect.width : event.clientX - rect.left;
    const y = keyboard ? aim.y * rect.height : event.clientY - rect.top;
    const stamp = { id: nextId.current++, ...stampPlacement(x, y, rect.width, rect.height) };
    let src;
    try { src = capturePiece(artRef.current, rect, stamp, stamps); } catch { /* Keep artwork intact on failed capture. */ }
    if (!src) { setStatus('Artwork is still loading. Please try again.'); return; }
    pointer.current = { x: rect.left + x, y: rect.top + y };
    setStamps(current => [...current, stamp].slice(-MAX_STAMPS));
    setHeld({ ...stamp, src, keyboard });
    setStatus('Piece picked up. Click or tap anywhere to place it. Arrow keys move it; Enter places it; Escape cancels.');
  };

  const place = event => {
    if (!held || !stage) return;
    const rect = stage.getBoundingClientRect();
    const keyboard = event.detail === 0;
    const x = keyboard ? pointer.current.x : event.clientX;
    const y = keyboard ? pointer.current.y : event.clientY;
    setPlaced(current => [...current, { ...held, x: (x - rect.left) / rect.width, y: (y - rect.top) / rect.height }].slice(-MAX_STAMPS));
    setHeld(null);
    setStatus('Stamp placed. Pick another piece from the artwork.');
    if (keyboard) surfaceRef.current?.focus({ preventScroll: true });
  };

  const moveAim = event => {
    const direction = vectors[event.key];
    if (!direction) return;
    event.preventDefault();
    const rect = surfaceRef.current.getBoundingClientRect();
    setAim(current => ({ x: Math.max(0, Math.min(1, current.x + direction[0] * 16 / rect.width)), y: Math.max(0, Math.min(1, current.y + direction[1] * 16 / rect.height)) }));
  };

  const carryKey = event => {
    if (event.key === 'Escape' || event.key === 'Tab') { event.preventDefault(); cancel(); return; }
    const direction = vectors[event.key];
    if (!direction) return;
    event.preventDefault();
    moveCarry(Math.max(0, Math.min(innerWidth, pointer.current.x + direction[0] * 16)), Math.max(0, Math.min(innerHeight, pointer.current.y + direction[1] * 16)));
  };

  return <>
    <div className="hero-v2__pattern hero-stamp-pattern" data-node-id="1012:7583" aria-hidden={!active || undefined} inert={!active ? '' : undefined}>
      <img ref={artRef} className="hero-stamp-art" src="/hero-v2/pattern-animated.svg" alt="" draggable={false} />
      <div className="hero-stamp-cutouts" aria-hidden="true">
        {stamps.map(stamp => <span key={stamp.id} className="hero-stamp-cutout" style={{ ...positionStyle(stamp), ...shapeStyle }} />)}
      </div>
      <button ref={surfaceRef} type="button" className="hero-stamp-surface" data-stamp-surface=""
        aria-label="Pick up a stamp from the artwork" aria-describedby="hero-stamp-instructions" onClick={punch} onKeyDown={moveAim}>
        <span className="hero-stamp-aim" aria-hidden="true" style={{ left: `${aim.x * 100}%`, top: `${aim.y * 100}%`, width: STAMP_WIDTH, height: STAMP_HEIGHT, ...shapeStyle }} />
      </button>
      <span id="hero-stamp-instructions" className="hero-stamp-sr">Click or tap to pick up a stamp, then click or tap anywhere to place it. Use arrow keys to aim, Enter or Space to pick up and place, and Escape to cancel.</span>
      <span className="hero-stamp-sr" role="status">{status}</span>
    </div>
    {active && stage && createPortal(<div className="hero-stamp-placed-layer" aria-hidden="true">
      {placed.map(piece => <img key={piece.id} className="hero-stamp-placed" src={piece.src} alt="" draggable={false}
        style={{ ...shapeStyle, left: `${piece.x * 100}%`, top: `${piece.y * 100}%`, width: STAMP_WIDTH, height: STAMP_HEIGHT }} />)}
    </div>, stage)}
    {active && createPortal(<button type="button" className="hero-stamp-reset" data-native-cursor=""
      aria-label="Reset stamps" title="Reset stamps" onClick={reset}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 10a8 8 0 1 1 1.5 7M4 4v6h6" />
      </svg>
    </button>, document.body)}
    {active && held && createPortal(<button ref={placementRef} type="button" className="hero-stamp-placement"
      aria-label="Place the stamp" aria-describedby="hero-stamp-instructions" onClick={place} onKeyDown={carryKey}
      onPointerMove={event => { if (event.pointerType === 'mouse' || event.pointerType === 'pen') moveCarry(event.clientX, event.clientY, event.pointerType === 'mouse'); }}>
      <span ref={carryRef} className="hero-stamp-carried" style={{ width: STAMP_WIDTH, height: STAMP_HEIGHT }} aria-hidden="true">
        <motion.img src={held.src} alt="" draggable={false} style={{ ...shapeStyle, transform: tiltTransform }} />
      </span>
    </button>, document.body)}
  </>;
}
