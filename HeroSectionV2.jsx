import React, { useLayoutEffect, useRef, useState } from 'react';
import WorkPage from './WorkPage.jsx';
import AboutPage from './AboutPage.jsx';
import PlaygroundPage from './PlaygroundPage.jsx';
import HeroSocialLinks from './HeroSocialLinks.jsx';
import PortfolioCursor from './PortfolioCursor.jsx';
import './hero.css';
import './hero-v2.css';

const assets = '/hero-v2/';
// Pattern colors on charcoal; darker counterparts keep the paper nav readable.
const navAccents = [
  ['#FCCC30', '#876200'],
  ['#F77FCE', '#A82B7E'],
  ['#6DA53D', '#467122'],
  ['#4B8EE2', '#2464B5'],
  ['#D6A8FA', '#7929DC'],
];
const navigation = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'About', href: '/about', page: 'about' },
  { label: 'Work', href: '/work', page: 'work' },
  { label: 'Experiments', href: '/playground', page: 'playground' },
  { label: 'Contact', href: 'https://cal.com/piyushxpj' },
];
const clients = [
  ['coinbase.svg', 'Coinbase', 94, 16, 'https://www.coinbase.com/'],
  ['dacoit.svg', 'Dacoit', 40, 16, 'https://dacoit.design'],
  ['base.svg', 'Base', 62, 16, 'https://www.base.org/'],
  ['velar.svg', 'Velar', 70, 16, 'https://velar.co'],
  ['/clients/bricx.webp', 'Bricx', 54, 19, 'https://bricxlabs.com'],
  ['inner-circle.svg', 'Inner Circle', 56, 15, 'https://innercircle.so'],
  ['bento.svg', 'Bento', 61, 17, 'https://bento.fun'],
];

export default function HeroSectionV2({ activePage = 'home', onPageChange }) {
  const isWork = activePage === 'work';
  const isAbout = activePage === 'about';
  const isExperiments = activePage === 'playground';
  const isInnerPage = isWork || isAbout || isExperiments;
  const headingId = isWork ? 'work-title' : isAbout ? 'about-title' : isExperiments ? 'playground-content' : 'hero-v2-title';
  const shellRef = useRef(null);
  const previousPage = useRef(activePage);
  const accentCursor = useRef(-1);
  const [linkAccents, setLinkAccents] = useState({});
  const [instantNavigation, setInstantNavigation] = useState(false);
  const advanceAccent = href => {
    accentCursor.current = (accentCursor.current + 1) % navAccents.length;
    const accent = navAccents[accentCursor.current];
    setLinkAccents(previous => ({ ...previous, [href]: accent }));
  };
  useLayoutEffect(() => {
    shellRef.current.scrollTop = 0;
    if (previousPage.current !== activePage) {
      shellRef.current.querySelector(`#${headingId}`)?.focus({ preventScroll: true });
    }
    previousPage.current = activePage;
  }, [activePage, headingId]);
  const navigate = (event, page) => {
    if (!page || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setInstantNavigation(event.detail === 0);
    onPageChange(page);
  };

  return (
    <div ref={shellRef} className={`hero-v2${isInnerPage ? ' hero-v2--inner' : ''}${instantNavigation ? ' hero-v2--instant' : ''}`}>
      <PortfolioCursor scopeRef={shellRef} />
      {isInnerPage && <a className="work-skip" href={`#${headingId}`}>Skip to {isWork ? 'work' : isAbout ? 'about' : 'experiments'}</a>}
      <div className="hero-v2__stage" role={isInnerPage ? undefined : 'main'} aria-labelledby={isInnerPage ? undefined : 'hero-v2-title'} data-node-id="1012:7579">
        <div className="hero-paper hero-v2__paper" aria-hidden="true" data-node-id="1012:7580">
          <div className="hero-v2__pattern" data-node-id="1012:7583">
            <img src={`${assets}pattern-animated.svg`} alt="" draggable={false} />
          </div>
        </div>

        <nav className="hero-v2__navigation" aria-label="Portfolio" data-node-id="1063:9848">
          {navigation.map(({ label, href, page }) => (
            <a className="hero-v2__nav-link" key={label} href={href} onClick={event => navigate(event, page)}
              target={page ? undefined : '_blank'} rel={page ? undefined : 'noopener noreferrer'}
              title={page ? undefined : 'Book a call — opens in a new tab'}
              style={{
                '--nav-accent-dark': (linkAccents[href] || navAccents[0])[0],
                '--nav-accent-light': (linkAccents[href] || navAccents[0])[1],
              }}
              onPointerEnter={event => { if (event.pointerType !== 'touch') advanceAccent(href); }}
              onPointerDown={event => { if (event.pointerType === 'touch') advanceAccent(href); }}
              onFocus={event => { if (event.currentTarget.matches(':focus-visible')) advanceAccent(href); }}
              aria-current={page === activePage ? 'page' : undefined}>
              {label}
            </a>
          ))}
        </nav>

        <div className="hero-v2__content" aria-hidden={isInnerPage || undefined} inert={isInnerPage ? '' : undefined}>
          <header className="hero-v2__intro" data-node-id="1012:7589">
            <div className="hero-v2__identity" data-node-id="1012:7590">
              <img className="hero-v2__portrait" src={`${assets}portrait.png`} alt="Piyush Jain"
                width="83" height="74" draggable={false} fetchPriority="high" data-node-id="1012:7591" />
              <h1 id="hero-v2-title" tabIndex={-1} data-node-id="1012:7592">Piyush Jain</h1>
            </div>
            <p data-node-id="1012:7593">Designing things across products, brands &amp; everything between, building with AI, breaking things to understand them, and making them better.</p>
            <HeroSocialLinks activePage={activePage} />
          </header>

          <section className="hero-v2__clients" aria-labelledby="hero-v2-clients-title" data-node-id="1063:9882">
            <h2 id="hero-v2-clients-title">Worked with</h2>
            <div className="hero-v2__logos">
              {clients.map(([file, name, width, height, href]) => {
                const logo = <img src={file.startsWith('/') ? file : `${assets}${file}`} alt={name}
                  width={width} height={height} draggable={false} />;
                return href
                  ? <a key={name} className="hero-v2__client-link" href={href} target="_blank" rel="noopener noreferrer"
                      aria-label={`${name} — opens in a new tab`} title={`${name} — opens in a new tab`}>{logo}</a>
                  : <React.Fragment key={name}>{logo}</React.Fragment>;
              })}
            </div>
          </section>
        </div>
      </div>
      {isWork && <WorkPage />}
      {isAbout && <AboutPage />}
      {isExperiments && <PlaygroundPage />}
    </div>
  );
}
