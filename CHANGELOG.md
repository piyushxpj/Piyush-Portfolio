# Changelog

## 2026-10-06

### Fixed
- Smoothed Home-to-Work stamp motion: fixed-pitch perforations, a charcoal crossfade instead of swapping stamp images, and a coordinated 600ms collapse/gallery reveal.
- Replaced the eleven low-resolution Work card exports with 2× Figma assets, preserving their design and crop.
- Made stamp perforations circular and evenly repeated at every aspect ratio; hid the paper image's stretched original edges and prevented the portrait from overlapping client logos on short tablets.
- Repaired cut and overlapping motifs across all eight animated sea rows using seamless tiles extracted from the original SVG; preserved alternating directions and movement speed.

### Added
- Added all eight artwork cards from Figma `1073:29141` below the existing Work gallery, preserving their four row pairings, original layers, and responsive layout.
- Built `/work` from Figma `1071:22783`: responsive two-column artwork gallery, five supplied looping videos, sound controls for audio clips, and one intentionally empty slot.
- Added a shared stamp-to-navbar transition between Home and Work, sticky Work navigation, direct-route support, and keyboard/reduced-motion behavior.
- Added Hero V2 from Figma frame `1012:7579` as the active homepage, with top navigation, italic condensed name, portrait thumbnail, client logos, and the supplied multicolor footer; retained V1 unmounted for rollback.
- Scrollable homepage continuation with four project-card placeholders, two per desktop row and one on phones, on the same dark background as the stamp hero.
- Added the supplied beach ambience as opt-in, low-volume looping homepage audio with a small bottom-right mute/unmute control; playback stops when leaving home.
- Generated a transparent sketch-style sailboat and added a slow, off-screen looping crossing with gentle bobbing and rocking on the blue sea; reduced-motion keeps it still.
- Gentle, independently timed flight motion for all four hero birds, disabled for reduced-motion preferences.

### Changed
- Softened Work video controls from translucent white to light grey, retaining their sizing, placement, and dark icons.
- Made every Work video and its poster fill the card edge to edge with centered, proportional cropping instead of letterboxing.
- Grouped Work video pause and sound controls at the bottom right with smaller translucent-white circles and retained 44px touch targets.
- Increased all five V2 pattern tracks to roughly 4–5× their original speed for bolder motion, retaining seamless loops, fixed panels, and reduced-motion support.
- Rebuilt V2's raster footer as editable SVG patterns with five independently looping tracks; removed whole-image drift and retained silent playback and reduced-motion support.
- Animated the V2 footer with a slow clipped vertical drift and reduced-motion fallback; removed V2 audio playback and its mute button while preserving V1's audio.
- Raised beach ambience from 35% to 60%, mixed in quiet natural bird calls starting at 2 seconds and every 8–12 seconds afterward, and added touch-release playback retry for browser autoplay restrictions.
- Grouped the pattern into four equal-height, non-repeating palette sections instead of cycling colors across rows; scaled motifs proportionally and retained alternating movement.
- Recolored the animated pattern with sampled purple/lilac, blue/yellow, green/yellow, and coral/pink pairs from the supplied reference, keeping all shapes and animation unchanged.
- Replaced the hero navigation's whole-label slide with a staggered letter-roll on desktop hover and keyboard focus, preserving stationary hit areas and static reduced-motion/mobile states.
- Sound now defaults to enabled with an unmuted icon, even while autoplay awaits browser permission; the tooltip distinguishes waiting from active playback.
- Added About to the hero navigation and replaced underline hover with an ocean-blue label slide and arrow reveal, with keyboard focus and reduced-motion support.
- Beach ambience now attempts automatic looping playback, with a first-interaction fallback when autoplay is blocked; manual mute remains available.
- Changed the project section to white paper with the hero's existing noise texture and dark text, retaining the dark frame around the hero.
- Removed italics from the hero name using the genuine Season Mix Trial Regular upright font, preserving size and placement.
- Increased the birds' wing-flap range to 14–16° while keeping flight paths, flap timing, and reduced-motion behavior unchanged.
- Added short, independently timed curved flight paths to all birds while preserving wing flaps; mobile paths are smaller and reduced-motion disables both.
- Switched the hero name to Season Mix Trial Regular Italic, preserving its size, weight, and placement.
- Increased wing-flap range again to 10–12° for more visible strokes, leaving timing and fixed bodies unchanged.
- Replaced the detailed sailboat with a bolder folk-print ship featuring blue geometric sail marks and a yellow pennant; layout and motion are unchanged.
- Increased wing-flap range from 4–5° to 6.5–8° for slightly more visible movement, preserving speed and stationary bodies.
- Replaced whole-bird floating with small wing-only flaps; bird bodies and positions now stay fixed.
- Undid the sunburst-ray experiment and restored the previous staggered circle-pop hover animation; other hero changes are preserved.

### Removed
- Removed the homepage project-card section and its extra scrolling continuation, restoring the single-screen hero.

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
