import React from 'react';
import './experiments-page.css';

export default function PlaygroundPage({ withSidebar = false }) {
  return (
    <main id="playground-content" tabIndex={-1} aria-labelledby="experiments-title" className={`playground-page experiments-page${withSidebar ? ' playground-page--with-sidebar' : ''}`}>
      <div className="experiments-page__message">
        <div className="experiments-page__icon" aria-hidden="true">
          <img src="/experiments-icon-transparent.png" alt="" draggable={false} />
        </div>
        <h1 id="experiments-title">Experiments coming soon</h1>
      </div>
    </main>
  );
}
