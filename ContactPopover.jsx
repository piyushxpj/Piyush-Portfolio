import React, { useEffect, useId, useRef, useState } from 'react';
import { SOCIAL_LINKS } from './canvasData.js';
import './contact-popover.css';

const email = SOCIAL_LINKS.find(link => link.email).email;

function ContactIcon({ copy = false }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {copy ? <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></> : <path d="M7 17 17 7M7 7h10v10" />}
  </svg>;
}

export default function ContactPopover({ style, onAccent, activePage }) {
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimer = useRef(null);
  const panelId = useId();
  const cancelClose = () => clearTimeout(closeTimer.current);

  useEffect(() => {
    setOpen(false);
    setCopyStatus('');
  }, [activePage]);

  useEffect(() => {
    if (!open) return;
    const outside = event => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const escape = event => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      if (rootRef.current?.contains(document.activeElement)) triggerRef.current?.focus();
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('Email copied');
    } catch {
      setCopyStatus('Couldn’t copy. Select the email to copy it manually.');
    }
  };

  return <div ref={rootRef} className="contact-popover" style={style}
    onPointerEnter={event => {
      if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover)').matches) return;
      cancelClose();
      setOpen(true);
      setCopyStatus('');
      onAccent();
    }}
    onPointerLeave={event => {
      if (event.pointerType !== 'mouse') return;
      cancelClose();
      closeTimer.current = setTimeout(() => {
        if (!rootRef.current?.contains(document.activeElement)) setOpen(false);
      }, 150);
    }}
    onBlur={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
    <button ref={triggerRef} type="button" className="hero-v2__nav-link contact-popover__trigger"
      aria-expanded={open} aria-controls={panelId}
      onFocus={event => { if (event.currentTarget.matches(':focus-visible')) onAccent(); }}
      onPointerDown={event => { if (event.pointerType === 'touch') onAccent(); }}
      onClick={event => {
        cancelClose();
        setCopyStatus('');
        if (event.detail === 0 || !window.matchMedia('(hover: hover)').matches) setOpen(value => !value);
        else setOpen(true);
      }}>Contact</button>
    <div id={panelId} className="contact-popover__positioner" hidden={!open}>
      <div className="contact-popover__panel" aria-label="Contact options">
        <div className="contact-popover__links">
          {SOCIAL_LINKS.filter(link => ['X (Twitter)', 'LinkedIn', 'Instagram'].includes(link.label)).map(link => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" title="Opens in a new tab">
              {link.label === 'X (Twitter)' ? 'Twitter' : link.label}
              <ContactIcon />
            </a>
          ))}
        </div>
        <div className="contact-popover__email">
          <a href={`mailto:${email}`}>{email}</a>
          <button type="button" onClick={copyEmail} aria-label={`Copy email address ${email}`} title="Copy email">
            <ContactIcon copy />
            <span>{copyStatus === 'Email copied' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <p className="contact-popover__status" role="status">{copyStatus}</p>
      </div>
    </div>
  </div>;
}
