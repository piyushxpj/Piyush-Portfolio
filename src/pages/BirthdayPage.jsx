import React, { useState, useCallback, useRef } from 'react';

const VIDEO_ID = '_q_nqgpZjl0';
const THUMBNAIL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
const HEARTS = ['❤️', '💕', '💗', '💖', '💘', '❣️'];

let heartId = 0;

export default function BirthdayPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [hearts, setHearts] = useState([]);
  const containerRef = useRef(null);

  const spawnHearts = useCallback((e) => {
    if (videoOpen) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const batch = Array.from({ length: 12 }, () => ({
      id: heartId++,
      x: x + (Math.random() - 0.5) * 60,
      y,
      emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      dx: (Math.random() - 0.5) * 120,
      size: 14 + Math.random() * 28,
    }));
    setHearts(prev => [...prev, ...batch]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !batch.includes(h)));
    }, 2200);
  }, [videoOpen]);

  return (
    <div
      ref={containerRef}
      onClick={spawnHearts}
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '0 50px',
        gap: 40,
      }}
    >
      {/* Heart particles */}
      {hearts.map(h => (
        <span
          key={h.id}
          style={{
            position: 'absolute',
            left: h.x,
            top: h.y,
            fontSize: h.size,
            pointerEvents: 'none',
            zIndex: 500,
            animation: 'heartFloat 2s ease-out forwards',
            '--dx': `${h.dx}px`,
          }}
        >
          {h.emoji}
        </span>
      ))}

      <style>{`
        @keyframes heartFloat {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          50% { opacity: 1; transform: translate(calc(var(--dx) * 0.5), -80px) scale(1.1); }
          100% { opacity: 0; transform: translate(var(--dx), -180px) scale(0.2); }
        }
      `}</style>

      {/* Left — Text content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        flex: '0 0 auto',
        maxWidth: 663,
      }}>
        <h1 style={{
          fontFamily: "'Figtree', sans-serif",
          fontSize: 'clamp(48px, 7vw, 101px)',
          fontWeight: 500,
          lineHeight: 1,
          letterSpacing: '-0.05em',
          color: '#000000',
          margin: 0,
          whiteSpace: 'nowrap',
        }}>
          Happiest<br />Birthday Ishuu <span role="img" aria-label="heart">&#10084;&#65039;</span>
        </h1>

        <p style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 40,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: 'rgba(0, 0, 0, 0.4)',
          margin: 0,
          maxWidth: 353,
        }}>
          thank you for always being there for me
        </p>
      </div>

      {/* Right — Video thumbnail + caption */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 28,
        flex: 1,
        maxWidth: 626,
      }}>
        <div
          onClick={(e) => { e.stopPropagation(); setVideoOpen(true); }}
          style={{
            width: '100%',
            aspectRatio: '626 / 336',
            borderRadius: 12,
            overflow: 'hidden',
            cursor: 'pointer',
            position: 'relative',
            background: '#000',
          }}
        >
          <img
            src={THUMBNAIL}
            alt="Play video"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.25)',
            transition: 'background 0.2s',
          }}>
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
              <circle cx="34" cy="34" r="34" fill="rgba(0,0,0,0.6)" />
              <polygon points="27,20 27,48 50,34" fill="#fff" />
            </svg>
          </div>
        </div>

        <p style={{
          fontFamily: "'Caveat', cursive",
          fontSize: 'clamp(24px, 2.9vw, 42px)',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: '#000000',
          textAlign: 'center',
          margin: 0,
          width: '100%',
        }}>
          a little something for you
        </p>
      </div>

      {/* Fullscreen video overlay */}
      {videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 24,
            right: 24,
            color: '#fff',
            fontSize: 16,
            fontFamily: "'Figtree', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            opacity: 0.7,
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Close
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85vw',
              maxWidth: 1200,
              aspectRatio: '16 / 9',
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Birthday video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
