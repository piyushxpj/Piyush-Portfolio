# Changelog

## 2026-10-06

### Added
- Scrollable homepage continuation with four project-card placeholders, two per desktop row and one on phones, on the same dark background as the stamp hero.
- Added the supplied beach ambience as opt-in, low-volume looping homepage audio with a small bottom-right mute/unmute control; playback stops when leaving home.
- Generated a transparent sketch-style sailboat and added a slow, off-screen looping crossing with gentle bobbing and rocking on the blue sea; reduced-motion keeps it still.
- Gentle, independently timed flight motion for all four hero birds, disabled for reduced-motion preferences.

### Changed
- Removed italics from the hero name using the genuine Season Mix Trial Regular upright font, preserving size and placement.
- Increased the birds' wing-flap range to 14–16° while keeping flight paths, flap timing, and reduced-motion behavior unchanged.
- Added short, independently timed curved flight paths to all birds while preserving wing flaps; mobile paths are smaller and reduced-motion disables both.
- Switched the hero name to Season Mix Trial Regular Italic, preserving its size, weight, and placement.
- Increased wing-flap range again to 10–12° for more visible strokes, leaving timing and fixed bodies unchanged.
- Replaced the detailed sailboat with a bolder folk-print ship featuring blue geometric sail marks and a yellow pennant; layout and motion are unchanged.
- Increased wing-flap range from 4–5° to 6.5–8° for slightly more visible movement, preserving speed and stationary bodies.
- Replaced whole-bird floating with small wing-only flaps; bird bodies and positions now stay fixed.
- Undid the sunburst-ray experiment and restored the previous staggered circle-pop hover animation; other hero changes are preserved.

## 2026-10-05

### Fixed
- Replaced the blurry 54px Bricx hero logo with the existing 612px asset without changing its display size or placement.
- Refreshed the pattern export to fill the central divider across the entire band.
- Disabled hero selection and native image dragging so the paper, portrait, and client logos no longer receive browser selection overlays.

### Added
- Yellow tile tilts and lifts on hover, returning smoothly on exit; disabled for touch-only and reduced-motion users.
- Continuous CSS-transform animation of the supplied blue SVG band, with Pause/Resume motion and a static reduced-motion mode.
- Project architecture and implementation notes for the Figma hero work.
- Full-viewport homepage hero from Figma, with local assets, exact preview fonts, client logos, and responsive reflow.

### Changed
- Replaced circle pops with hover-revealed sunburst rays rotating in alternating directions inside the fixed yellow tile; reduced-motion keeps the rays static.
- Refined the tile's internal motion into bold, staggered circle pops; the square stays fixed and clips the animation at its edges.
- Replaced the tile's lift/tilt with hover-driven circle-row motion inside a fixed, clipped square; pauses on exit.
- Split the blue pattern into eight independently scrolling rows with alternating directions.
- Home now shows the new hero without the canvas chrome or loading animation.
- Work/builds navigation persists through reload and browser history via section query parameters.
- Homepage image preload now prioritizes the hero portrait instead of the old collage.

### Removed
- Pause/Resume motion button, as requested; reduced-motion support remains.
