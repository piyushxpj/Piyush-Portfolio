import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { WORK_PROJECTS } from '../components/sections/WorkSection.jsx';
import useCanvas from '../hooks/useCanvas.js';

const TAG_STYLES = {
  'Rebrand': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Visual Design': { color: '#FF5100', bg: 'rgba(255, 81, 0, 0.10)' },
  'Product Design': { color: '#00B25D', bg: 'rgba(0, 178, 93, 0.10)' },
  'Website Design': { color: '#8253FF', bg: 'rgba(130, 83, 255, 0.10)' },
  'Mini App Design': { color: '#FF2ADF', bg: 'rgba(255, 42, 223, 0.10)' },
  'Branding': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
};

// Pikaicons SVG paths
const icons = {
  chevronDown: (size = 14) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 10.14a20.4 20.4 0 0 0 3.702 3.893c.175.141.42.141.596 0A20.4 20.4 0 0 0 16 10.14" />
    </svg>
  ),
  chevronRight: (size = 14) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 8.14a20.4 20.4 0 0 1 3.894 3.701.47.47 0 0 1 0 .596A20.4 20.4 0 0 1 10 16.139" />
    </svg>
  ),
  page: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2.058V3.2c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C16.28 8 17.12 8 18.8 8h1.142M14 2.058C13.607 2 13.136 2 12.349 2H10.4c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748C4 5.04 4 6.16 4 8.4v7.2c0 2.24 0 3.36.436 4.216a4 4 0 0 0 1.748 1.748C7.04 22 8.16 22 10.4 22h3.2c2.24 0 3.36 0 4.216-.436a4 4 0 0 0 1.748-1.748C20 18.96 20 17.84 20 15.6V9.651c0-.787 0-1.257-.058-1.651M14 2.058q.143.02.277.053c.408.098.798.26 1.156.478.404.248.75.594 1.442 1.286l1.25 1.25c.692.692 1.038 1.038 1.286 1.442a4 4 0 0 1 .479 1.156q.031.134.052.277" />
    </svg>
  ),
  frame: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v4m0 0v10M7 7h10M7 7H3m4 10v4m0-4h10M7 17H3M21 7h-4m0 0V3m0 4v10m0 0v4m0-4h4" />
    </svg>
  ),
  arrowUpRight: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.999 5.516a30.2 30.2 0 0 1 7.797-.152.94.94 0 0 1 .568.272m.12 8.365a30.2 30.2 0 0 0 .152-7.797.95.95 0 0 0-.272-.568m0 0L5.636 18.364" />
    </svg>
  ),
};

// Canvas items for each project — placeholder content
function getProjectCanvasItems(project) {
  return [
    // Hero image
    { type: 'image', src: project.image, x: 100, y: 80, width: 600 },
    // Title
    { type: 'heading', text: project.title, x: 100, y: 520 },
    // Description
    { type: 'text', text: project.description, x: 100, y: 570, width: 500 },
    // Role card
    { type: 'card', title: 'Role', text: project.tags.join(', '), x: 760, y: 80, width: 280 },
    // Timeline card
    { type: 'card', title: 'Timeline', text: '2024 — Present', x: 760, y: 200, width: 280 },
    // Tools card
    { type: 'card', title: 'Tools', text: 'Figma, React, Tailwind CSS', x: 760, y: 320, width: 280 },
    // Placeholder screens
    { type: 'placeholder', label: 'Screen 1', x: 100, y: 660, width: 340, height: 240 },
    { type: 'placeholder', label: 'Screen 2', x: 460, y: 660, width: 340, height: 240 },
    { type: 'placeholder', label: 'Screen 3', x: 820, y: 660, width: 340, height: 240 },
    // Placeholder for more
    { type: 'placeholder', label: 'More details coming soon...', x: 100, y: 940, width: 500, height: 180 },
  ];
}

function CanvasItem({ item }) {
  const baseStyle = { position: 'absolute', left: item.x, top: item.y };

  switch (item.type) {
    case 'image':
      return (
        <div style={{ ...baseStyle, width: item.width, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
          <img src={item.src} alt="" style={{ width: '100%', display: 'block' }} />
        </div>
      );
    case 'heading':
      return (
        <div style={{ ...baseStyle, fontSize: 32, fontWeight: 700, color: 'var(--figma-text)', fontFamily: "'Figtree', sans-serif", letterSpacing: '-0.03em' }}>
          {item.text}
        </div>
      );
    case 'text':
      return (
        <div style={{ ...baseStyle, width: item.width, fontSize: 16, color: 'var(--figma-text-secondary)', fontFamily: "'Figtree', sans-serif", lineHeight: 1.6 }}>
          {item.text}
        </div>
      );
    case 'card':
      return (
        <div style={{
          ...baseStyle, width: item.width || 280,
          background: 'var(--figma-surface)', borderRadius: 10,
          border: '1px solid var(--figma-border)',
          padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--figma-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
            {item.title}
          </div>
          <div style={{ fontSize: 14, color: 'var(--figma-text)', fontFamily: "'Figtree', sans-serif", lineHeight: 1.5 }}>
            {item.text}
          </div>
        </div>
      );
    case 'placeholder':
      return (
        <div style={{
          ...baseStyle, width: item.width, height: item.height,
          borderRadius: 10, border: '2px dashed var(--figma-border)',
          background: 'var(--figma-surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: 'var(--figma-text-tertiary)', fontSize: 13, fontFamily: "'Figtree', sans-serif" }}>{item.label}</span>
        </div>
      );
    default:
      return null;
  }
}

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = WORK_PROJECTS.find(p => p.id === id);
  const { transform, handlers, containerRef, isPanning, panTo } = useCanvas({ x: 20, y: 10, scale: 0.8 });
  const [layersOpen, setLayersOpen] = useState(true);

  // Center on load
  useEffect(() => {
    panTo(500, 400, 0.8);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!project) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, fontFamily: "'Figtree', sans-serif" }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: 'var(--figma-text)' }}>Project not found</div>
        <div onClick={() => navigate('/')} style={{ color: '#0d99ff', cursor: 'pointer' }}>← Back to portfolio</div>
      </div>
    );
  }

  const canvasItems = getProjectCanvasItems(project);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left Sidebar */}
        <div className="sidebar" style={{
          width: 240, borderRight: '1px solid var(--figma-border)',
          display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 40,
        }}>
          {/* Header */}
          <div style={{ padding: '12px', borderBottom: '1px solid var(--figma-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer', color: 'var(--figma-text-secondary)', display: 'flex' }}
                title="Back to portfolio"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--figma-text)' }}>Project</span>
            </div>
          </div>

          {/* Project tabs as pages */}
          <div>
            <div className="section-header"><span>Pages</span></div>
            {WORK_PROJECTS.map(p => (
              <div
                key={p.id}
                className={`sidebar-item ${p.id === id ? 'active' : ''}`}
                onClick={() => navigate(`/project/${p.id}`)}
              >
                {icons.page}
                <span style={{ fontSize: 14 }}>{p.title}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: 'var(--figma-border)', margin: '4px 0' }} />

          {/* Layers */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <div
              className="section-header"
              onClick={() => setLayersOpen(!layersOpen)}
              style={{ cursor: 'pointer' }}
            >
              <span>Layers</span>
              <span style={{
                color: 'var(--figma-text-tertiary)',
                transform: layersOpen ? 'rotate(0)' : 'rotate(-90deg)',
                transition: 'transform 0.15s', display: 'flex',
              }}>
                {icons.chevronDown(14)}
              </span>
            </div>
            {layersOpen && (
              <>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Hero Image</span>
                </div>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Title</span>
                </div>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Description</span>
                </div>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Role</span>
                </div>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Timeline</span>
                </div>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Tools</span>
                </div>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Screen 1</span>
                </div>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Screen 2</span>
                </div>
                <div className="sidebar-item" style={{ paddingLeft: 12 }}>
                  {icons.frame}
                  <span style={{ fontSize: 12 }}>Screen 3</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={containerRef}
          className="canvas-viewport"
          style={{
            flex: 1,
            cursor: isPanning ? 'grabbing' : 'grab',
            background: 'var(--figma-canvas, #f2f2f2)',
          }}
          {...handlers}
        >
          <div
            className="canvas-world"
            style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }}
          >
            {canvasItems.map((item, i) => (
              <CanvasItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="sidebar" style={{
          width: 256, borderLeft: '1px solid var(--figma-border)',
          display: 'flex', flexDirection: 'column', flexShrink: 0, zIndex: 40,
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 12px', borderBottom: '1px solid var(--figma-border)',
          }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
              <img src="/pj-avatar.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: '#0d99ff', color: '#fff', border: 'none',
                  borderRadius: 6, padding: '6px 16px', fontSize: 12,
                  fontWeight: 600, cursor: 'pointer', fontFamily: "'Figtree', sans-serif",
                }}>
                  Visit Project
                </button>
              </a>
            )}
          </div>

          {/* Design tab */}
          <div style={{
            display: 'flex', alignItems: 'center',
            borderBottom: '1px solid var(--figma-border)', padding: '0 12px',
          }}>
            <div style={{
              padding: '8px 12px', fontSize: 14, fontWeight: 500,
              color: 'var(--figma-text)', borderBottom: '2px solid var(--figma-blue)',
            }}>
              Design
            </div>
          </div>

          {/* Project details */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {/* Image preview */}
            <div style={{ padding: 12 }}>
              <img src={project.image} alt="" style={{ width: '100%', borderRadius: 8 }} />
            </div>

            <div style={{ height: 1, background: 'var(--figma-border)' }} />

            {/* Title */}
            <div style={{ padding: '12px 12px 4px', fontSize: 16, fontWeight: 600, color: 'var(--figma-text)' }}>
              {project.title}
            </div>

            {/* Description */}
            <div style={{ padding: '0 12px 8px', fontSize: 13, color: 'var(--figma-text-secondary)', lineHeight: 1.5 }}>
              {project.description}
            </div>

            {/* Tags */}
            <div style={{ padding: '4px 12px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {project.tags.map((tag, i) => {
                const style = TAG_STYLES[tag] || { color: '#666', bg: 'rgba(0,0,0,0.05)' };
                return (
                  <span key={i} style={{
                    padding: '3px 8px', fontSize: 12, fontWeight: 500,
                    color: style.color, background: style.bg, borderRadius: 6,
                  }}>
                    {tag}
                  </span>
                );
              })}
            </div>

            {project.url && (
              <>
                <div style={{ height: 1, background: 'var(--figma-border)' }} />
                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <div className="prop-row" style={{ justifyContent: 'space-between', cursor: 'pointer', padding: '10px 12px' }}>
                    <span style={{ color: '#0d99ff', fontSize: 13, fontWeight: 500 }}>Visit Project</span>
                    {icons.arrowUpRight}
                  </div>
                </a>
              </>
            )}
          </div>

          {/* Footer */}
          <div style={{
            padding: 12, borderTop: '1px solid var(--figma-border)',
            fontSize: 12, color: 'var(--figma-text-secondary)', textAlign: 'center', whiteSpace: 'nowrap',
          }}>
            Made with ❤️ by Piyush Jain and Claude
          </div>
        </div>
      </div>
    </div>
  );
}
