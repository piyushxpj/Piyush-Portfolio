import React, { useEffect, useRef } from 'react';
import WorkPage from './WorkPage.jsx';
import './hero.css';
import './hero-v2.css';

const assets = '/hero-v2/';
const navigation = [
  { label: 'About', href: '/', page: 'about' },
  { label: 'Work', href: '/work', page: 'work' },
  { label: 'Experiments', href: '/playground', page: 'playground' },
  { label: 'Contact', href: 'mailto:hey@piyushjain.in' },
];
const workNavigation = [
  { label: 'Home', href: '/', page: 'about' },
  { label: 'About', href: '/', page: 'about' },
  { label: 'Experiments', href: '/playground', page: 'playground' },
  { label: 'Contact', href: 'mailto:hey@piyushjain.in' },
];
const clients = [
  ['coinbase.svg', 'Coinbase', 94, 16],
  ['dacoit.svg', 'Dacoit', 40, 16],
  ['base.svg', 'Base', 62, 16],
  ['velar.svg', 'Velar', 70, 16],
  ['/clients/bricx.webp', 'Bricx', 54, 19],
  ['inner-circle.svg', 'Inner Circle', 56, 15],
  ['bento.svg', 'Bento', 61, 17],
];

export default function HeroSectionV2({ activePage = 'about', onPageChange }) {
  const isWork = activePage === 'work';
  const shellRef = useRef(null);
  const previousPage = useRef(activePage);
  useEffect(() => {
    shellRef.current.scrollTop = 0;
    if (previousPage.current !== activePage) {
      shellRef.current.querySelector(isWork ? '#work-title' : '#hero-v2-title')?.focus({ preventScroll: true });
    }
    previousPage.current = activePage;
  }, [activePage, isWork]);
  const navigate = (event, page) => {
    if (!page || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onPageChange(page);
  };

  return (
    <div ref={shellRef} className={`hero-v2${isWork ? ' hero-v2--work' : ''}`}>
      {isWork && <a className="work-skip" href="#work-title">Skip to work</a>}
      <div className="hero-v2__stage" role={isWork ? undefined : 'main'} aria-labelledby={isWork ? undefined : 'hero-v2-title'} data-node-id="1012:7579">
        <div className="hero-paper hero-v2__paper" aria-hidden="true" data-node-id="1012:7580">
          <div className="hero-v2__pattern" data-node-id="1012:7583">
            <img src={`${assets}pattern-animated.svg`} alt="" draggable={false} />
          </div>
        </div>

        <nav className="hero-v2__navigation" aria-label="Portfolio" data-node-id="1063:9848">
          {(isWork ? workNavigation : navigation).map(({ label, href, page }) => (
            <a key={label} href={href} onClick={event => navigate(event, page)}
              aria-current={!isWork && page === 'about' ? 'page' : undefined}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hero-v2__content" aria-hidden={isWork || undefined} inert={isWork ? '' : undefined}>
          <header className="hero-v2__intro" data-node-id="1012:7589">
            <div className="hero-v2__identity" data-node-id="1012:7590">
              <img className="hero-v2__portrait" src={`${assets}portrait.png`} alt="Piyush Jain"
                width="83" height="74" draggable={false} fetchPriority="high" data-node-id="1012:7591" />
              <h1 id="hero-v2-title" tabIndex={-1} data-node-id="1012:7592">Piyush Jain</h1>
            </div>
            <p data-node-id="1012:7593">Designing things across products, brands &amp; everything between, building with AI, breaking things to understand them, and making them better.</p>
          </header>

          <section className="hero-v2__clients" aria-labelledby="hero-v2-clients-title" data-node-id="1063:9882">
            <h2 id="hero-v2-clients-title">Worked with</h2>
            <div className="hero-v2__logos">
              {clients.map(([file, name, width, height]) => (
                <img key={name} src={file.startsWith('/') ? file : `${assets}${file}`} alt={name}
                  width={width} height={height} draggable={false} />
              ))}
            </div>
          </section>
        </div>
      </div>
      {isWork && <WorkPage />}
    </div>
  );
}
