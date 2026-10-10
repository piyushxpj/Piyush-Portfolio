import React, { useEffect, useRef, useState } from 'react';
import WorkPage, { WorkArtwork } from './WorkPage.jsx';
import { workCards } from './workCards.js';
import { moveOrder } from './workOrder.js';
import './work-order-editor.css';

const byId = new Map(workCards.map(card => [card.id, card]));
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function Thumbnail({ id }) {
  const card = byId.get(id);
  return <div className="work-editor__thumb">
    <div className="work-card" aria-hidden="true">
      {card.video ? <img className="work-art-image" src={card.poster || `/work-v2/media/${card.video}.jpg`} alt="" loading="lazy" />
        : <WorkArtwork card={card} />}
    </div>
    <p>{card.title}</p>
  </div>;
}

export default function WorkOrderEditor() {
  const [order, setOrder] = useState([]);
  const [saved, setSaved] = useState([]);
  const [history, setHistory] = useState([]);
  const [connection, setConnection] = useState(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [mode, setMode] = useState('cards');
  const [preview, setPreview] = useState(false);
  const [target, setTarget] = useState(null);
  const dragged = useRef(null);
  const heading = useRef(null);
  const scroll = useRef(null);
  const dirty = !same(order, saved);
  const size = mode === 'rows' ? 2 : 1;
  const count = Math.floor(order.length / size);
  const units = Array.from({ length: Math.ceil(order.length / size) }, (_, i) => order.slice(i * size, (i + 1) * size));

  async function load() {
    setBusy(true); setError('');
    try {
      const response = await fetch('/__local/work-order');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setOrder(data.order); setSaved(data.order); setConnection(data); setHistory([]);
      setStatus('Saved order loaded.');
    } catch { setError('Unable to load the editor. Make sure the local development server is running, then retry.'); }
    finally { setBusy(false); }
  }
  useEffect(() => { load(); }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function change(next, message) {
    if (same(next, order) || busy) return;
    setHistory(previous => [...previous.slice(-99), order]);
    setOrder(next); setStatus(message); setError('');
  }
  function move(from, to) {
    change(moveOrder(order, from, to, size), `${size === 2 ? 'Row' : byId.get(order[from])?.title} moved to ${size === 2 ? 'row' : 'position'} ${to + 1}.`);
  }
  function togglePreview() {
    setPreview(value => !value);
    scroll.current?.scrollTo({ top: 0 });
    requestAnimationFrame(() => heading.current?.focus());
  }
  async function save() {
    if (!connection || busy) return;
    setBusy(true); setError('');
    try {
      const response = await fetch('/__local/work-order', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Work-Editor-Token': connection.token },
        body: JSON.stringify({ order, revision: connection.revision }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSaved(data.order); setConnection(previous => ({ ...previous, revision: data.revision }));
      setStatus('Saved to workOrder.json. The live website is unchanged.');
    } catch (failure) { setError(failure instanceof TypeError ? 'Unable to reach the local server. Make sure it is running and try again.' : failure.message || 'Unable to save. Check the local server and try again.'); }
    finally { setBusy(false); }
  }

  return <div className="work-editor" ref={scroll}>
    <header className="work-editor__header">
      <div><a href="/work">← Back to Work</a><p className="work-editor__local">Local editor · not published</p>
        <h1 ref={heading} tabIndex={-1}>{preview ? 'Preview Work' : 'Arrange Work'}</h1>
        <p>Move the thumbnails. Save when it feels right. Publishing is a separate step.</p></div>
    </header>
    <div className="work-editor__toolbar">
      <div className="work-editor__actions">
        <button type="button" disabled={busy || !history.length} onClick={() => {
          setOrder(history.at(-1)); setHistory(values => values.slice(0, -1)); setError(''); setStatus('Last change undone.');
        }}>Undo</button>
        <button type="button" disabled={busy || !dirty} onClick={() => change(saved, 'Reset to the last saved order. You can undo this.')}>Reset</button>
        <button type="button" disabled={busy || !order.length} onClick={togglePreview}>{preview ? 'Keep arranging' : 'Preview'}</button>
        <button type="button" className="work-editor__save" disabled={busy || !connection || !dirty} onClick={save}>{busy && connection ? 'Saving…' : 'Save order'}</button>
      </div>
    </div>
    <div className="work-editor__feedback">
      <p><strong>{dirty ? 'Unsaved changes' : 'No unsaved changes'}</strong> · {order.length} cards</p>
      <p role="status">{status}</p>
      {error && <div role="alert"><p>{error}</p><button type="button" disabled={busy} onClick={() => {
        if (!dirty || window.confirm('Discard your unsaved arrangement and reload the saved order?')) load();
      }}>{connection ? 'Reload saved order' : 'Retry loading'}</button></div>}
    </div>
    {preview ? <WorkPage order={order} /> : <main className="work-editor__main" aria-label="Work arrangement">
      <div className="work-editor__options">
        <label>Move <select value={mode} disabled={busy} onChange={event => { setMode(event.target.value); setTarget(null); dragged.current = null; }}>
          <option value="cards">Individual cards</option><option value="rows">Two-card rows</option>
        </select></label>
        <p>Drag a handle onto another {size === 2 ? 'row' : 'card'}, or use the move controls. {size === 2 ? 'The final unpaired card stays last.' : 'Cards read left to right, then top to bottom.'}</p>
      </div>
      {busy && !connection && <p>Loading thumbnails…</p>}
      <ol className={`work-editor__grid work-editor__grid--${mode}`}>
        {units.map((unit, index) => <li key={unit.join(':')} className={`work-editor__tile${target === index ? ' is-drop-target' : ''}`}
          onDragOver={event => { if (dragged.current !== null && index < count && !busy) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; setTarget(index); } }}
          onDrop={event => { event.preventDefault(); if (dragged.current !== null && index < count) move(dragged.current, index); dragged.current = null; setTarget(null); }}>
          <div className="work-editor__tile-bar">
            <button type="button" className="work-editor__handle" draggable={!busy && index < count}
              disabled={busy || index >= count} aria-label={`Drag ${size === 2 ? `row ${index + 1}` : byId.get(unit[0]).title}`}
              title="Drag to reorder, or use the move controls"
              onDragStart={event => { dragged.current = index; event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', unit[0]); }}
              onDragEnd={() => { dragged.current = null; setTarget(null); }}>
              <span aria-hidden="true">⠿</span> {size === 2 ? 'Row ' : ''}{String(index + 1).padStart(2, '0')}
            </button>
            <span>{size === 2 ? 'Two-card row' : byId.get(unit[0]).video ? 'Video' : 'Artwork'}</span>
          </div>
          <div className="work-editor__images">{unit.map(id => <Thumbnail key={id} id={id} />)}</div>
          <div className="work-editor__moves">
            <button type="button" disabled={busy || index === 0 || index >= count} aria-label={`Move ${size === 2 ? `row ${index + 1}` : byId.get(unit[0]).title} earlier`} onClick={() => move(index, index - 1)}>← Earlier</button>
            <button type="button" disabled={busy || index >= count - 1} aria-label={`Move ${size === 2 ? `row ${index + 1}` : byId.get(unit[0]).title} later`} onClick={() => move(index, index + 1)}>Later →</button>
            {index < count && <label>Position <select value={index} disabled={busy} aria-label={`Position for ${size === 2 ? `row ${index + 1}` : byId.get(unit[0]).title}`} onChange={event => move(index, Number(event.target.value))}>
              {Array.from({ length: count }, (_, n) => <option key={n} value={n}>{n + 1}</option>)}
            </select></label>}
          </div>
          {target === index && <span className="work-editor__drop-label">Drop here</span>}
        </li>)}
      </ol>
    </main>}
  </div>;
}
