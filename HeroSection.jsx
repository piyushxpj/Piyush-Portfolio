import React from 'react';
import HeroAmbience from './HeroAmbience';
import './hero.css';

const assets = '/hero/';
const navigation = [
  { label: 'About', href: '/', page: 'about' },
  { label: 'Work', href: '/?section=work', page: 'work' },
  { label: 'Playground', href: '/playground', page: 'playground' },
  { label: 'Case Study', href: '/?section=work', page: 'work' },
];
const birds = [
  { name: 'top', width: 49.7999, height: 31.6301 },
  { name: 'portrait', width: 77.3145, height: 30.093 },
  { name: 'left', width: 50.5219, height: 19.4572 },
  { name: 'right', width: 37.8132, height: 19.3344 },
];
// Each source crop starts and ends at matching points of a complete motif.
// Duration scales with tile width to preserve the original 1240px / 60s speed.
const patternGroups = [
  [ // Purple / lilac
    { start: 0, height: 33, width: 35.0581 },
    { start: 33, height: 17, width: 35.0581 },
  ],
  [ // Blue / yellow
    { start: 50, height: 49, width: 37.2412 },
    { start: 99, height: 41, width: 43.0664 },
  ],
  [ // Coral / pink
    { start: 140, height: 38, width: 37.2412 },
    { start: 178, height: 15, width: 35.0581 },
  ],
  [ // Green / yellow
    { start: 193, height: 17, width: 35.0581 },
    { start: 210, height: 43, width: 36.0854 },
  ],
];
// Each palette occupies exactly one quarter; scale both axes to avoid distortion.
const patternBands = patternGroups.flatMap((rows, groupIndex) => {
  const groupHeight = 253 / patternGroups.length;
  const scale = groupHeight / rows.reduce((sum, row) => sum + row.height, 0);
  let offset = groupIndex * groupHeight;
  return rows.map(({ start, height, width }) => {
    const band = { sourceStart: start, start: offset, height: height * scale, width: width * scale };
    offset += band.height;
    return band;
  });
});
const clients = [
  ['coinbase.svg', 'Coinbase', 94, 16],
  ['base.svg', 'Base', 62, 16],
  ['dacoit.svg', 'Dacoit', 40, 16],
  ['velar.svg', 'Velar', 70, 16],
  ['/clients/bricx.webp', 'Bricx', 54, 19],
  ['inner-circle.svg', 'Inner Circle', 56, 15],
  ['bento.svg', 'Bento', 61, 17],
];

export default function HeroSection({ onPageChange }) {
  const navigate = (event, page) => {
    // Preserve native open-in-new-tab and modified-click behavior.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onPageChange(page);
  };

  return (
    <main className="portfolio-hero" aria-labelledby="hero-title">
      <div className="hero-stage" data-node-id="1025:1136">
        <div className="hero-paper" aria-hidden="true">
          <img className="hero-paper__asset" src={`${assets}stamp-paper.png`} alt="" draggable={false} />
          <div className="hero-pattern" id="hero-pattern">
            {patternBands.map(({ sourceStart, start, height, width }) => (
              <div className="hero-pattern__row" key={sourceStart}
                style={{ '--row-start': start, '--row-height': height, '--tile-width': width,
                  '--row-duration': `${60 * width / 1240}s`, '--row-art': `url('${assets}pattern-row-${sourceStart}.svg')` }}>
                <div className="hero-pattern__track" />
              </div>
            ))}
            <div className="hero-ship-crossing">
              <div className="hero-ship-bob">
                <img className="hero-ship" src={`${assets}sailboat-v2.png`} alt="" width="384" height="256" draggable={false} />
              </div>
            </div>
          </div>
        </div>

        <header className="hero-intro">
          <h1 id="hero-title">Piyush Jain</h1>
          <p>Designing things across products, brands &amp; everything between, building with AI, breaking things to understand them, and making them better.</p>
        </header>

        <a className="hero-contact" href="mailto:hey@piyushjain.in">Contact</a>

        <div className="hero-portrait">
          <img className="hero-portrait__background" src={`${assets}portrait-background.png`} alt="" width="394" height="411" fetchPriority="high" draggable={false} />
          <img className="hero-portrait__foreground" src={`${assets}portrait-foreground.png`} alt="Piyush Jain smiling at the beach" width="394" height="411" fetchPriority="high" draggable={false} />
        </div>
        <div className="hero-tile" aria-hidden="true">
          <svg className="hero-tile__art" width="81" height="81" viewBox="0 0 81 81" fill="none" focusable="false">
            <rect width="81" height="81" fill="#CD9D00" />
            {[13, 41, 69].map((cy, row) => (
              <g className="hero-tile__circles" key={cy}>
                {[-29, -1, 27, 55, 83, 111].map((cx, column) => (
                  <circle className="hero-tile__circle" key={cx} cx={cx} cy={cy} r="14" fill="#FFC800"
                    style={{ '--pop-delay': `${((column + row * 2) % 5) * 85}ms` }} />
                ))}
              </g>
            ))}
          </svg>
        </div>
        {birds.map(({ name, width, height }) => (
          <div key={name} className={`hero-bird hero-bird--${name}`} aria-hidden="true"
            style={{ aspectRatio: `${width} / ${height}` }}>
            {['left', 'body', 'right'].map(part => (
              <span key={part} className={`hero-bird__part hero-bird__part--${part}`}>
                <img src={`${assets}bird-${name}.svg`} alt="" draggable={false} />
              </span>
            ))}
          </div>
        ))}

        <section className="hero-clients" aria-labelledby="hero-clients-title">
          <h2 id="hero-clients-title">Worked with</h2>
          <div className="hero-client-logos">
            {clients.map(([file, name, width, height]) => (
              <img key={name} src={file.startsWith('/') ? file : `${assets}${file}`} alt={name} width={width} height={height} draggable={false}
                style={{ '--logo-width': width, '--logo-height': height }} />
            ))}
          </div>
        </section>

        <nav className="hero-navigation" aria-label="Portfolio">
          {navigation.map(({ label, href, page }) => (
            <a key={label} href={href} aria-label={label} onClick={event => navigate(event, page)}
              aria-current={page === 'about' ? 'page' : undefined}>
              <span className="hero-navigation__label" aria-hidden="true">
                {Array.from(label).map((letter, index) => (
                  <span className="hero-navigation__letter-window" key={index}>
                    <span className="hero-navigation__letter" data-letter={letter === ' ' ? '\u00a0' : letter}
                      style={{ '--letter-index': index }}>
                      {letter === ' ' ? '\u00a0' : letter}
                    </span>
                  </span>
                ))}
              </span>
              <svg className="hero-navigation__arrow" viewBox="0 0 24 24" width="18" height="18"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true" focusable="false">
                <path d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </a>
          ))}
        </nav>
      </div>
      <HeroAmbience />
    </main>
  );
}
