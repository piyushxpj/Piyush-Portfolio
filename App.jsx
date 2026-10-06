import React, { useState, useCallback, useEffect } from 'react';
import LeftSidebar from './LeftSidebar.jsx';
import RightSidebar from './RightSidebar.jsx';
import Canvas from './Canvas.jsx';
import BottomToolbar from './BottomToolbar.jsx';
import useCanvas from './useCanvas.js';
import useIsMobile from './useIsMobile.js';
import useNarrowDesktop from './useNarrowDesktop.js';
import MobileShell from './MobileShell.jsx';
import WorkModal from './WorkModal.jsx';
import Loader from './Loader.jsx';
import PlaygroundPage from './PlaygroundPage.jsx';
import HeroSection from './HeroSection.jsx';
import { PAGES } from './canvasData.js';

function pageFromPath() {
  if (window.location.pathname === '/playground') return 'playground';
  const section = new URLSearchParams(window.location.search).get('section');
  return ['work', 'builds'].includes(section) ? section : 'about';
}

function applyTheme(isDark) {
  const root = document.documentElement;
  root.dataset.theme = isDark ? 'dark' : 'light';
  if (isDark) {
    root.style.setProperty('--figma-bg', '#1e1e1e');
    root.style.setProperty('--figma-surface', '#2c2c2c');
    root.style.setProperty('--figma-surface-hover', '#363636');
    root.style.setProperty('--figma-border', '#3d3d3d');
    root.style.setProperty('--figma-text', '#ffffff');
    root.style.setProperty('--figma-text-secondary', '#999999');
    root.style.setProperty('--figma-text-tertiary', '#666666');
    root.style.setProperty('--figma-blue-bg', 'rgba(13, 153, 255, 0.15)');
    root.style.setProperty('--figma-focus', '#58b8ff');
    root.style.setProperty('--figma-image-outline', 'oklch(1 0 0 / 0.1)');
  } else {
    root.style.setProperty('--figma-bg', '#f5f5f5');
    root.style.setProperty('--figma-surface', '#ffffff');
    root.style.setProperty('--figma-surface-hover', '#f0f0f0');
    root.style.setProperty('--figma-border', '#e0e0e0');
    root.style.setProperty('--figma-text', '#1e1e1e');
    root.style.setProperty('--figma-text-secondary', '#666666');
    root.style.setProperty('--figma-text-tertiary', '#999999');
    root.style.setProperty('--figma-blue-bg', 'rgba(13, 153, 255, 0.1)');
    root.style.setProperty('--figma-focus', '#0068b8');
    root.style.setProperty('--figma-image-outline', 'oklch(0 0 0 / 0.1)');
  }
}

export default function App() {
  const isMobile = useIsMobile();
  const [isDark, setIsDark] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [activePage, setActivePage] = useState(pageFromPath);

  useEffect(() => { applyTheme(isDark); }, [isDark]);

  useEffect(() => {
    const handlePopState = () => setActivePage(pageFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToPage = useCallback((pageId) => {
    const nextPath = pageId === 'playground' ? '/playground' : pageId === 'about' ? '/' : `/?section=${pageId}`;
    if (window.location.pathname + window.location.search !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
    setActivePage(pageId);
  }, []);

  const toggleTheme = useCallback(() => {
    const transitionBlocker = document.createElement('style');
    transitionBlocker.textContent = '*,*::before,*::after{transition:none!important}';
    document.head.append(transitionBlocker);

    const nextTheme = !isDark;
    applyTheme(nextTheme);
    setIsDark(nextTheme);
    void document.body.offsetHeight;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => transitionBlocker.remove());
    });
  }, [isDark]);

  const closeModal = useCallback(() => setModalProject(null), []);

  return (
    <>
      {activePage !== 'about' && <Loader />}
      {activePage === 'about'
        ? <HeroSection onPageChange={navigateToPage} />
        : isMobile
        ? <MobileShell activePage={activePage} onPageChange={navigateToPage} isDark={isDark} onToggleTheme={toggleTheme} onOpenWork={setModalProject} />
        : <DesktopApp activePage={activePage} onPageChange={navigateToPage} isDark={isDark} onToggleTheme={toggleTheme} onOpenWork={setModalProject} />}
      <WorkModal project={modalProject} onClose={closeModal} onNavigate={setModalProject} />
    </>
  );
}

function DesktopApp({ activePage, onPageChange, isDark, onToggleTheme, onOpenWork }) {
  const narrowDesktop = useNarrowDesktop();
  const { worldRef, handlers, containerRef, transformRef, panTo } = useCanvas();
  const [selectedCard, setSelectedCard] = useState(null);
  const [canvasBg, setCanvasBg] = useState(isDark ? '#1e1e1e' : '#F2F2F2');
  const [activeTool, setActiveTool] = useState('move');
  const [shapeType, setShapeType] = useState('rectangle');
  const [stickyColor, setStickyColor] = useState('yellow');
  const [canvasItems, setCanvasItems] = useState([]);

  // Sync canvas bg with theme
  useEffect(() => { setCanvasBg(isDark ? '#1e1e1e' : '#F2F2F2'); }, [isDark]);

  // Keep the canvas focused on the selected canvas page. Playground uses normal document scrolling.
  useEffect(() => {
    if (activePage === 'playground') return undefined;
    const page = PAGES.find((item) => item.id === activePage);
    if (!page) return undefined;
    const scales = { about: 0.7, work: 0.5, builds: 0.5 };
    const frame = requestAnimationFrame(() => {
      panTo(page.x, page.y, scales[page.id] || 0.7, page.id === 'about');
    });
    return () => cancelAnimationFrame(frame);
  }, [activePage, panTo]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.closest('input, textarea')) return;
      switch (e.key) {
        case 'Escape': setActiveTool('move'); setSelectedCard(null); break;
        case 'v': case 'V': setActiveTool('move'); break;
        case 's': case 'S':
          if (!e.metaKey && !e.ctrlKey) { e.preventDefault(); setActiveTool('sticky'); }
          break;
        case 'r': case 'R': setActiveTool('shape'); setShapeType('rectangle'); break;
        case 'o': case 'O': setActiveTool('shape'); setShapeType('circle'); break;
        case 'l': case 'L': setActiveTool('shape'); setShapeType('line'); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handlePageClick = useCallback((page) => {
    onPageChange(page.id);
    setSelectedCard(null);
  }, [onPageChange]);

  const handleCardClick = useCallback((project) => {
    if (typeof project === 'string' || project === null) {
      setSelectedCard(project);
      return;
    }
    setSelectedCard(project.id);
    onPageChange(project.page);
    requestAnimationFrame(() => panTo(project.x - 100, project.y - 100, 0.7));
  }, [onPageChange, panTo]);

  const resetTool = useCallback(() => { setActiveTool('move'); }, []);

  const handleCanvasClick = useCallback((worldX, worldY) => {
    if (activeTool === 'move') { setSelectedCard(null); return; }
    const newItem = { id: `item-${Date.now()}`, type: activeTool, x: worldX, y: worldY };
    if (activeTool === 'sticky') { newItem.type = 'sticky'; newItem.text = ''; newItem.color = stickyColor; }
    setCanvasItems(prev => [...prev, newItem]);
  }, [activeTool, stickyColor]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        {!narrowDesktop && (
          <LeftSidebar activePage={activePage} onPageClick={handlePageClick} selectedCard={selectedCard} onCardClick={handleCardClick} />
        )}
        <div style={{ display: activePage === 'playground' ? 'none' : 'flex', flex: 1, minWidth: 0 }}>
          <Canvas worldRef={worldRef} handlers={handlers} containerRef={containerRef} transformRef={transformRef}
            selectedCard={selectedCard} onSelectCard={setSelectedCard} onOpenWork={onOpenWork} canvasBg={canvasBg}
            activeTool={activeTool} shapeType={shapeType} onCanvasClick={handleCanvasClick}
            canvasItems={canvasItems} setCanvasItems={setCanvasItems} onResetTool={resetTool} stickyColor={stickyColor} />
        </div>
        {activePage === 'playground' && <PlaygroundPage withSidebar={!narrowDesktop} />}
        {activePage !== 'playground' && (
          <BottomToolbar activeTool={activeTool} shapeType={shapeType} stickyColor={stickyColor}
            onToolChange={setActiveTool} onShapeTypeChange={setShapeType} onStickyColorChange={setStickyColor} />
        )}
        {!narrowDesktop && activePage !== 'playground' && (
          <RightSidebar selectedCard={selectedCard} canvasBg={canvasBg} onCanvasBgChange={setCanvasBg}
            isDark={isDark} onToggleTheme={onToggleTheme} />
        )}
      </div>
    </div>
  );
}
