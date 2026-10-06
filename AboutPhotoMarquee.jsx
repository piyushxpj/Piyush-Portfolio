import React, { useEffect, useRef, useState } from 'react';

const photos = [
  { file: 'seaside-friends', alt: 'Friends taking a selfie outdoors beside a palm tree', tilt: -2, position: '50% 60%' },
  { file: 'sketchbook', alt: 'A hand-drawn storefront in a spiral sketchbook', tilt: 2.5, position: '50% 55%' },
  { file: 'ice-cream', alt: 'Friends holding ice cream cones and an ice lolly together', tilt: -2, position: '50% 50%' },
  { file: 'arched-door', alt: 'A portrait in front of an arched wooden door', tilt: 2, position: '68% 50%', rotation: 90 },
  { file: 'studio', alt: 'Camera, lights, and backdrop in a photography studio', tilt: -2, position: '50% 50%' },
  { file: 'cafe-friends', alt: 'Friends taking a mirror photo at a cafe', tilt: 1.5, position: '50% 75%' },
  { file: 'inner-circle-times', alt: 'Holding a copy of 100ft. Times beneath the Inner Circle sign', tilt: -2, position: '50% 42%' },
  { file: 'wonderful-stickers', alt: 'Blue Build Something Wonderful stickers in a clear bag', tilt: -1.5, position: '50% 50%' },
  { file: 'workshop', alt: 'A conversation during a creative workshop', tilt: -3, position: '57% 50%' },
  { file: 'corn-flakes', alt: 'A corn flakes box on a wooden table beside a window', tilt: 2.5, position: '50% 60%' },
  { file: 'friends', alt: 'A group of friends posing for a selfie', tilt: -2, position: '50% 50%' },
  { file: 'rejected-event', alt: 'A Top 1% Rejected event banner outside a venue', tilt: 1.5, position: '50% 50%' },
  { file: 'art-wall', alt: 'A wall filled with drawings and paintings', tilt: -1.5, position: '50% 50%' },
  { file: 'mirror', alt: 'Three friends taking a photo in a window reflection', tilt: 2, position: '50% 62%' },
  { file: 'printed-albums', alt: 'Printed wedding album covers arranged on patterned fabric', tilt: -1.5, position: '50% 50%' },
  { file: 'circle-selfie', alt: 'Friends leaning together for a playful group selfie', tilt: 2.5, position: '50% 50%' },
  { file: 'first-workspace', alt: 'Working on a packaging design at a laptop', tilt: -1.5, position: '50% 50%' },
  { file: 'designathon', alt: 'The stage and lectern at an annual UX Designathon', tilt: 2, position: '50% 78%' },
];

export default function AboutPhotoMarquee() {
  const [paused, setPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    let visible = true;
    const update = () => setOffscreen(!visible || document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(sectionRef.current);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  return <section ref={sectionRef} className="about-photos" aria-label="Snapshots from my life">
    <div className="about-photos__viewport" tabIndex={0} aria-label="Photo strip. Use arrow keys to browse when reduced motion is enabled.">
      <div className="about-photos__track" style={{ animationPlayState: paused || offscreen ? 'paused' : undefined }}>
        {[0, 1].map(copy => <div className="about-photos__group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
          {photos.map(photo => <figure className="about-photos__card" key={photo.file}
            style={{ '--photo-tilt': `${photo.tilt}deg` }}>
            <img src={`/about-photos/${photo.file}.webp`} alt={copy === 0 ? photo.alt : ''}
              width="900" height="900" decoding="async" draggable={false}
              style={{ objectPosition: photo.position, transform: photo.rotation ? `rotate(${photo.rotation}deg)` : undefined }} />
          </figure>)}
        </div>)}
      </div>
    </div>
    <button type="button" className="about-photos__toggle" onClick={() => setPaused(value => !value)}
      aria-label={paused ? 'Play photo marquee' : 'Pause photo marquee'}
      title={paused ? 'Click to play photos' : 'Click to pause photos'} />
  </section>;
}
