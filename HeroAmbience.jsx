import React, { useEffect, useRef, useState } from 'react';

const AMBIENCE_VOLUME = 0.6;

export default function HeroAmbience() {
  const audioRef = useRef(null);
  const requestedRef = useRef(true);
  const requestIdRef = useRef(0);
  const cancelAutostartRef = useRef(() => {});
  const [enabled, setEnabled] = useState(true);
  const [waitingForInteraction, setWaitingForInteraction] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = AMBIENCE_VOLUME;
    let pending = true;
    const cancelAutostart = () => {
      pending = false;
      window.removeEventListener('pointerdown', startOnInteraction);
      window.removeEventListener('pointerup', startOnInteraction);
      window.removeEventListener('keydown', startOnInteraction);
    };
    const startAutomatically = async () => {
      if (!pending) return;
      const requestId = ++requestIdRef.current;
      requestedRef.current = true;
      try {
        await audio.play();
        if (requestId !== requestIdRef.current) return;
        setEnabled(true);
        setWaitingForInteraction(false);
        cancelAutostart();
      } catch (playError) {
        if (requestId !== requestIdRef.current) return;
        // Autoplay policy pauses playback, not the visitor's sound preference.
        if (playError.name === 'NotAllowedError') {
          setWaitingForInteraction(true);
        } else {
          requestedRef.current = false;
          setEnabled(false);
          setWaitingForInteraction(false);
          cancelAutostart();
          setError('Unable to play beach sound. Please try again.');
        }
      }
    };
    function startOnInteraction(event) {
      // The sound button owns its gesture; never compete with a mute request.
      if (event.target instanceof Element && event.target.closest('.hero-sound-toggle')) return;
      if (event.type === 'keydown' && (event.repeat || event.metaKey || event.ctrlKey || event.altKey)) return;
      void startAutomatically();
    }
    cancelAutostartRef.current = cancelAutostart;
    window.addEventListener('pointerdown', startOnInteraction);
    // Touch browsers may grant audio permission only when the finger lifts.
    window.addEventListener('pointerup', startOnInteraction);
    window.addEventListener('keydown', startOnInteraction);
    void startAutomatically();
    return () => {
      cancelAutostart();
      requestedRef.current = false;
      requestIdRef.current += 1;
      audio.pause();
    };
  }, []);

  const toggleSound = async () => {
    cancelAutostartRef.current();
    const audio = audioRef.current;
    const requestId = ++requestIdRef.current;
    requestedRef.current = !requestedRef.current;
    setEnabled(requestedRef.current);
    setWaitingForInteraction(false);
    setError('');

    if (!requestedRef.current) {
      audio.pause();
      return;
    }

    try {
      // Manual unmute remains a direct user-gesture playback request.
      await audio.play();
    } catch {
      // Ignore a play request cancelled by a newer toggle or route unmount.
      if (requestId !== requestIdRef.current) return;
      requestedRef.current = false;
      setEnabled(false);
      setWaitingForInteraction(false);
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
    cancelAutostartRef.current();
    requestIdRef.current += 1;
    requestedRef.current = false;
    setEnabled(false);
    setWaitingForInteraction(false);
    setError('Unable to play beach sound. Please try again.');
  };

  return (
    <div className="hero-ambience">
      <audio ref={audioRef} src="/hero/beach-with-birds.mp3" preload="auto" loop onPause={syncPause} onError={handleAudioError} />
      <p className="hero-ambience__error" role="status">{error}</p>
      <button type="button" className="hero-sound-toggle" aria-label="Beach sound"
        aria-pressed={enabled}
        title={waitingForInteraction && enabled ? 'Sound enabled; starts after interaction. Click to mute.' : enabled ? 'Mute beach sound' : 'Unmute beach sound'}
        onClick={toggleSound}>
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
