import React, { useEffect, useRef, useState } from 'react';

const AMBIENCE_VOLUME = 0.35;

export default function HeroAmbience() {
  const audioRef = useRef(null);
  const requestedRef = useRef(false);
  const requestIdRef = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = AMBIENCE_VOLUME;
    return () => {
      requestedRef.current = false;
      requestIdRef.current += 1;
      audio.pause();
    };
  }, []);

  const toggleSound = async () => {
    const audio = audioRef.current;
    const requestId = ++requestIdRef.current;
    requestedRef.current = !requestedRef.current;
    setEnabled(requestedRef.current);
    setError('');

    if (!requestedRef.current) {
      audio.pause();
      return;
    }

    try {
      // Call directly from the user's gesture: no autoplay or eager download.
      await audio.play();
    } catch {
      // Ignore a play request cancelled by a newer toggle or route unmount.
      if (requestId !== requestIdRef.current) return;
      requestedRef.current = false;
      setEnabled(false);
      setError('Unable to play beach sound. Please try again.');
    }
  };

  const syncPause = () => {
    if (audioRef.current?.paused) {
      requestedRef.current = false;
      setEnabled(false);
    }
  };

  const handleAudioError = () => {
    requestIdRef.current += 1;
    requestedRef.current = false;
    setEnabled(false);
    setError('Unable to play beach sound. Please try again.');
  };

  return (
    <div className="hero-ambience">
      <audio ref={audioRef} src="/hero/beach-ambience.mp3" preload="none" loop onPause={syncPause} onError={handleAudioError} />
      <p className="hero-ambience__error" role="status">{error}</p>
      <button type="button" className="hero-sound-toggle" aria-label="Beach sound"
        aria-pressed={enabled} title={enabled ? 'Mute beach sound' : 'Unmute beach sound'} onClick={toggleSound}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
          strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M11 4 6 8H3v8h3l5 4V4Z" />
          {enabled ? <>
            <path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />
          </> : <path d="m16 9 5 6m0-6-5 6" />}
        </svg>
      </button>
    </div>
  );
}
