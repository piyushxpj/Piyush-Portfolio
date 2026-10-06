import React from 'react';
import HeroAmbience from './HeroAmbience';
import './hero.css';

const assets = '/hero/';
const birds = [
  { name: 'top', width: 49.7999, height: 31.6301 },
  { name: 'portrait', width: 77.3145, height: 30.093 },
  { name: 'left', width: 50.5219, height: 19.4572 },
  { name: 'right', width: 37.8132, height: 19.3344 },
];
// Boundaries fall in the gaps between motifs in the 253px-tall Figma artwork.
const patternBands = [0, 33, 50, 99, 140, 178, 193, 210, 253];
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
    <main className="portfolio-hero" aria-labelledby="hero-title" tabIndex={0}>
      <div className="hero-stage" data-node-id="1025:1136">
        <div className="hero-paper" aria-hidden="true">
          <img className="hero-paper__asset" src={`${assets}stamp-paper.png`} alt="" draggable={false} />
          <div className="hero-pattern" id="hero-pattern">
            {patternBands.slice(0, -1).map((start, index) => (
              <div className="hero-pattern__row" key={start}
                style={{ '--row-start': start, '--row-height': patternBands[index + 1] - start }}>
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
          <a href="/?section=work" onClick={(event) => navigate(event, 'work')}>Work</a>
          <a href="/playground" onClick={(event) => navigate(event, 'playground')}>Playground</a>
          <a href="/?section=work" onClick={(event) => navigate(event, 'work')}>Case Study</a>
        </nav>
      </div>
      <section className="home-projects" aria-labelledby="home-projects-title">
        <h2 id="home-projects-title">Projects</h2>
        <div className="home-projects__grid">
          {['01', '02', '03', '04'].map(number => (
            <article className="home-project-card" key={number}>
              <div className="home-project-card__cover" aria-hidden="true">
                <span>Project preview</span>
              </div>
              <h3>Project {number}</h3>
            </article>
          ))}
        </div>
      </section>
      <HeroAmbience />
    </main>
  );
}
