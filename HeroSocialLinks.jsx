import React, { useEffect, useState } from 'react';
import { SOCIAL_LINKS } from './canvasData.js';

const email = SOCIAL_LINKS.find(link => link.email).email;

export default function HeroSocialLinks({ activePage }) {
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => setCopyStatus(''), [activePage]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  };

  return <div className="hero-v2__socials">
    <nav className="hero-v2__social-links" aria-label="Social links">
      {SOCIAL_LINKS.filter(link => link.url).map(link => (
        <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" title="Opens in a new tab">
          {link.label === 'X (Twitter)' ? 'Twitter' : link.label}
        </a>
      ))}
      <button type="button" onClick={copyEmail} title={`Copy ${email}`}>
        {copyStatus === 'copied' ? 'Copied' : 'Email'}
      </button>
    </nav>
    <span className="hero-v2__social-status" role="status">
      {copyStatus === 'copied' ? 'Email copied to clipboard' : copyStatus === 'error' ? 'Couldn’t copy. Select the email below to copy it manually.' : ''}
    </span>
    {copyStatus === 'error' && <span className="hero-v2__social-error">Couldn’t copy. Select to copy: <span>{email}</span></span>}
  </div>;
}
