# Changelog

## 2026-10-07

### Changed
- Set Vercel Production branch tracking to `codex/figma-hero` with existing custom-domain auto-assignment; preserved the original Figma-style portfolio on `main`.
- Increased the inline Experiments icon slightly and switched its heading to Hero Roobert sans-serif.

## 2026-10-06

### Fixed
- Smoothed Home-to-Work stamp motion: fixed-pitch perforations, a charcoal crossfade instead of swapping stamp images, and a coordinated 600ms collapse/gallery reveal.
- Replaced the eleven low-resolution Work card exports with 2× Figma assets, preserving their design and crop.
- Made stamp perforations circular and evenly repeated at every aspect ratio; hid the paper image's stretched original edges and prevented the portrait from overlapping client logos on short tablets.
- Repaired cut and overlapping motifs across all eight animated sea rows using seamless tiles extracted from the original SVG; preserved alternating directions and movement speed.

### Added
- Added Bento's animated identity, the Ship the Future with AI website concept, and Knox stationery to Work using original Experiments assets; kept Experiments unchanged and filled Work's frames edge to edge with centered crops.
- Added a shared Contact hover/click popover with Twitter, LinkedIn, Instagram, selectable email, and copy-email feedback; supports keyboard access, Escape/outside dismissal, and narrow screens.
- Highlighted the fourteen selected About passages with alternating portfolio-color tints and start/end bars, preserving natural wrapping and the MYOB hyperlink.
- Added the Inner Circle / 100ft. Times photo to the About marquee (18 photos total).
- Added four supplied photos to the About marquee (17 total) and reshuffled the full sequence to mix personal, creative, food, and event moments.
- Added the cafe mirror photo, group selfie, and ice-cream photo to the About marquee (13 photos total), retaining the smaller cards.
- Added seven supplied photos above the About story as a full-width, gently tilted, seamlessly looping marquee with faded edges, pause/play, and a reduced-motion scrollable alternative.
- Linked Poki Studios and MYOB in the About story to their supplied websites, with underlined native text links.
- Added `/about` with the complete supplied story and “I Never Really Had a Plan” title, responsive reading layout, and shared stamp navigation; separated Home and About routes.
- Added all eight artwork cards from Figma `1073:29141` below the existing Work gallery, preserving their four row pairings, original layers, and responsive layout.
- Built `/work` from Figma `1071:22783`: responsive two-column artwork gallery, five supplied looping videos, sound controls for audio clips, and one intentionally empty slot.
- Added a shared stamp-to-navbar transition between Home and Work, sticky Work navigation, direct-route support, and keyboard/reduced-motion behavior.
- Added Hero V2 from Figma frame `1012:7579` as the active homepage, with top navigation, italic condensed name, portrait thumbnail, client logos, and the supplied multicolor footer; retained V1 unmounted for rollback.
- Scrollable homepage continuation with four project-card placeholders, two per desktop row and one on phones, on the same dark background as the stamp hero.
- Added the supplied beach ambience as opt-in, low-volume looping homepage audio with a small bottom-right mute/unmute control; playback stops when leaving home.
- Generated a transparent sketch-style sailboat and added a slow, off-screen looping crossing with gentle bobbing and rocking on the blue sea; reduced-motion keeps it still.
- Gentle, independently timed flight motion for all four hero birds, disabled for reduced-motion preferences.

### Changed
- Made the Experiments coming-soon icon transparent and text-height, aligned on one responsive line with the heading.
- Replaced the Experiments gallery with the supplied construction icon and “Experiments coming soon”; preserved the original media files used by Work.
- Reduced only the new Knox stationery artwork to a centered 84% image area inside its unchanged Work card frame.
- Replaced the Contact hover menu with a direct calendar link and moved social links below the homepage intro; matched navigation's bold italic font without underlines and retained Email-to-Copied feedback.
- Replaced the browser favicon with the supplied black-and-white portrait, using a new PNG asset URL to avoid the old favicon cache.
- Matched the About title to Work's 36px desktop / 32px mobile sizing and line spacing, without changing body text or highlights.
- Made only the About story's Poki Studios and MYOB hyperlinks open in new tabs; navigation retains its same-page transitions.
- Swapped the Inner Circle video and blue AI cloud artwork in Work, and removed the empty media card so the gallery flows without a blank slot.
- Moved the About photo marquee below the full story and removed its circular pause icon; clicking or keyboard-activating the strip still toggles playback.
- Made About marquee cards and gaps about 20% smaller and added the album, corn flakes, and Designathon photos, bringing the loop to ten images.
- Standardized navigation to Home, About, Work, Experiments, Contact on every active portfolio page, including Experiments; all five remain visible at 320px.
- Nav highlights now cycle yellow, pink, green, blue, and lilac on hover, keyboard focus, or touch, with darker equivalents on the white hero.
- Reduced About body text to 18px desktop / 16px mobile and the title to 36–56px, retaining comfortable line spacing.
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
