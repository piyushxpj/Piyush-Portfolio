import React, { memo } from 'react';
import { motion } from 'motion/react';
import { getBuildPosition } from './buildLayout.js';

const TAG_STYLES = {
  'Branding': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Brand Design': { color: '#009EFF', bg: 'rgba(0, 158, 255, 0.10)' },
  'Visual Design': { color: '#FF5100', bg: 'rgba(255, 81, 0, 0.10)' },
  'Product Design': { color: '#00B25D', bg: 'rgba(0, 178, 93, 0.10)' },
  'Website Design': { color: '#8253FF', bg: 'rgba(130, 83, 255, 0.10)' },
  'Mini App Design': { color: '#FF2ADF', bg: 'rgba(255, 42, 223, 0.10)' },
};

export const BUILDS_PROJECTS = [
  {
    id: 'farfield',
    title: 'Farfield',
    description: 'Social store for creatives to sell their assets onchain and earn in crypto. Onchain Summer Awards Winner.',
    image: '/builds/Farfield.webp',
    tags: ['Branding', 'Visual Design', 'Mini App Design'],
    url: 'https://farcaster.xyz/miniapps/9OlQm7ZO9S_M/farfield',
  },
  {
    id: 'dither-matrix',
    title: 'Dither Matrix',
    description: 'Dither tool made for designers with various effects to be used while adding custom colors.',
    image: '/builds/Dither%20Matrix.webp',
    tags: ['Visual Design', 'Product Design'],
    url: 'https://dithermatrix.piyushjain.in',
  },
  {
    id: 'pixel-pop',
    title: 'Pixel Pop Tool',
    description: 'Convert any image into pixel art with this tool. Customize the pixel size and color palette.',
    image: '/builds/Pixel%20Pop.webp',
    tags: ['Visual Design', 'Product Design'],
    url: 'https://pixelart.piyushjain.in',
  },
  {
    id: 'freetype-writer',
    title: 'Freetype Writer',
    description: 'A small space to write like a typewriter and export it as txt or a shareable envelope style PNG.',
    image: '/builds/typewriter.webp',
    tags: ['Visual Design', 'Product Design'],
    url: 'https://freetypewriter.piyushjain.in',
  },
  {
    id: 'myob',
    title: 'MYOB',
    description: 'Community back recipes. You tell it what you have, and it tells you what you can make.',
    image: '/builds/myob.png',
    tags: ['Product Design', 'Brand Design'],
    url: 'https://makeyourownbreakfast.in',
  },
];

function BuildCard({ project, x, y }) {
  return (
    <motion.a
      data-card
      href={project.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${project.title}`}
      onClick={(e) => e.stopPropagation()}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 420,
        cursor: 'pointer',
        zIndex: 1,
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <div style={{
        width: '100%',
        aspectRatio: '488 / 382',
        overflow: 'hidden',
        borderRadius: 6,
        background: '#eee',
        outline: '1px solid var(--figma-image-outline)',
        outlineOffset: -1,
      }}>
        <img
          src={project.image}
          alt=""
          draggable={false}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
          }}
        />
      </div>

      <div style={{
        marginTop: 16,
        fontSize: 22,
        fontWeight: 600,
        color: 'var(--figma-text)',
        fontFamily: "'Figtree', sans-serif",
        letterSpacing: '-0.03em',
      }}>
        {project.title}
      </div>

      <div style={{
        marginTop: 4,
        fontSize: 16,
        color: 'var(--figma-text-secondary)',
        fontFamily: "'Figtree', sans-serif",
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        minHeight: '2.8em',
      }}>
        {project.description}
      </div>

      <div style={{
        marginTop: 12,
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
      }}>
        {project.tags.map((tag, i) => {
          const style = TAG_STYLES[tag] || { color: '#666', bg: 'rgba(0,0,0,0.05)' };
          return (
            <span
              key={i}
              style={{
                display: 'flex',
                padding: '5px 10px',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 500,
                color: style.color,
                fontFamily: "'Figtree', sans-serif",
                letterSpacing: '-0.01em',
                background: style.bg,
                borderRadius: 10,
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </motion.a>
  );
}

function BuildsSection() {
  return (
    <>
      {BUILDS_PROJECTS.map((project, i) => (
        <BuildCard
          key={project.id}
          project={project}
          {...getBuildPosition(i, BUILDS_PROJECTS.length)}
        />
      ))}
    </>
  );
}

export default memo(BuildsSection);
