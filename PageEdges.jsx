import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { mountPageEdges } from './pageEdges.js';
import './page-edges.css';

export default function PageEdges({ scopeRef }) {
  useEffect(() => mountPageEdges(scopeRef.current), [scopeRef]);
  // The stamp/page containers animate transforms. Body is the fixed layer's host.
  return createPortal(<>
    <div className="edge-top" aria-hidden="true" />
    <div className="edge-bottom" aria-hidden="true" />
  </>, document.body);
}
