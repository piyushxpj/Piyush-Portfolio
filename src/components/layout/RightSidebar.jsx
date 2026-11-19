import React, { useState } from 'react';
import { SOCIAL_LINKS } from '../../data/canvasData.js';

const ArrowUpRight = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.999 5.516a30.2 30.2 0 0 1 7.797-.152.94.94 0 0 1 .568.272m.12 8.365a30.2 30.2 0 0 0 .152-7.797.95.95 0 0 0-.272-.568m0 0L5.636 18.364" />
  </svg>
);

export default function RightSidebar({ canvasBg, onCanvasBgChange, isDark, onToggleTheme }) {
  return (
    <div className="sidebar" style={{
      width: 256,
      borderLeft: '1px solid var(--figma-border)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      zIndex: 40,
    }}>
      {/* Top header — avatar + share */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 12px',
        borderBottom: '1px solid var(--figma-border)',
      }}>
        {/* Avatar */}
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          <img src="/pj-avatar.webp" alt="PJ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Theme icon */}
          <div
            onClick={onToggleTheme}
            style={{ cursor: 'pointer', display: 'flex', color: 'var(--figma-text-secondary)' }}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </div>

          {/* Say hii button */}
          <a href="https://cal.com/piyushxpj" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#0d99ff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '6px 16px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'Figtree, sans-serif',
            }}>
              Say hii
            </button>
          </a>
        </div>
      </div>

      {/* Design tab */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--figma-border)',
        padding: '0 12px',
      }}>
        <div style={{
          padding: '8px 12px',
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--figma-text)',
          borderBottom: '2px solid var(--figma-blue)',
        }}>
          Design
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <PageProperties canvasBg={canvasBg} onCanvasBgChange={onCanvasBgChange} />
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid var(--figma-border)',
        fontSize: 12,
        color: 'var(--figma-text-secondary)',
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        Made with ❤️ by Piyush Jain and Claude
      </div>
    </div>
  );
}

function PageProperties({ canvasBg = '#F2F2F2', onCanvasBgChange = () => {} }) {
  const [showPicker, setShowPicker] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  return (
    <>
      {/* Page section */}
      <div className="section-header">Page</div>
      <div className="prop-row" style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setShowPicker(!showPicker)}>
        <div style={{
          width: 16,
          height: 16,
          borderRadius: 3,
          background: canvasBg,
          border: '1px solid var(--figma-border)',
          flexShrink: 0,
        }} />
        <span style={{ color: 'var(--figma-text)', fontSize: 12 }}>{canvasBg.replace('#', '').toUpperCase()}</span>
        <span style={{ color: 'var(--figma-text-tertiary)', fontSize: 12, marginLeft: 'auto' }}>100 %</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--figma-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" fill="var(--figma-text-tertiary)" />
        </svg>
      </div>
      {showPicker && (
        <div style={{ padding: '8px 12px' }}>
          <input
            type="color"
            value={canvasBg}
            onChange={(e) => onCanvasBgChange(e.target.value)}
            style={{
              width: '100%',
              height: 32,
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              background: 'transparent',
              padding: 0,
            }}
          />
          {/* Preset colors */}
          <div style={{ display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap' }}>
            {['#F2F2F2', '#FFFFFF', '#1E1E1E', '#2C2C2C', '#0D99FF', '#F24E1E', '#0ACF83', '#FF7262', '#A259FF', '#FFC700'].map(c => (
              <div
                key={c}
                onClick={() => onCanvasBgChange(c)}
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: c,
                  border: canvasBg === c ? '2px solid var(--figma-blue)' : '1px solid var(--figma-border)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div style={{ height: 1, background: 'var(--figma-border)', margin: '8px 0' }} />

      {/* Social Links */}
      {SOCIAL_LINKS.map((link, i) => (
        link.email ? (
          <div key={i}>
            <div
              className="prop-row"
              style={{ justifyContent: 'space-between', cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(link.email);
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
              }}
            >
              <span style={{ color: emailCopied ? '#0ACF83' : 'var(--figma-text)', fontSize: 14, transition: 'color 0.2s' }}>
                {emailCopied ? 'Email Copied' : link.label}
              </span>
              <span style={{ color: 'var(--figma-text-tertiary)', display: 'flex' }}>
                <ArrowUpRight size={14} />
              </span>
            </div>
            {i < SOCIAL_LINKS.length - 1 && (
              <div style={{ height: 1, background: 'var(--figma-border)', margin: '2px 0' }} />
            )}
          </div>
        ) : (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <div className="prop-row" style={{ justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ color: 'var(--figma-text)', fontSize: 14 }}>{link.label}</span>
              <span style={{ color: 'var(--figma-text-tertiary)', display: 'flex' }}>
                <ArrowUpRight size={14} />
              </span>
            </div>
            {i < SOCIAL_LINKS.length - 1 && (
              <div style={{ height: 1, background: 'var(--figma-border)', margin: '2px 0' }} />
            )}
          </a>
        )
      ))}
    </>
  );
}

