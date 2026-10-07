# Journal

## 2026-10-07 — Work image loading

The slow gallery was requesting multi-megabyte PNG artwork, including 1180 × 9368 Figma exports whose visible card occupies just 1180 × 744 pixels. Native lazy loading delayed those requests but did not reduce download or decode cost. Added non-destructive, reproducible WebP derivatives and responsive selection without changing layer positions or visible crops. The 31 affected sources total 39.16 MB; even the largest derivative of each totals only 3.14 MB (92% smaller). The first-row maximum-size artwork totals 293 KB instead of about 4 MB. Original assets and the old portfolio branch remain untouched.

Prioritized the first two cards and made video posters follow the same near-viewport loading gate as their clips. Production build and diff checks passed; all 72 derivative paths were checked in public and built output. Browser checks at desktop and 390px confirmed first-row rendering, smaller mobile sources, no horizontal overflow, and absent src/poster attributes for distant videos. This verifies payload and rendering improvements, not a measured slow-network timing benchmark.

## 2026-10-07 — Publish the new branch without replacing main

The user chose to serve the new portfolio on the existing domain while retaining the Figma-style portfolio on `main`. Verified both local and remote `main` at `56433b69fdd3b3f19fab79ce6aa30cc1b1280ae3`, matching the existing Vercel production deployment `54fwgh141oJdQuBeEdcWrDxVkbGQ`. Changed the existing project's Production branch tracking from `main` to `codex/figma-hero`, leaving automatic production-domain assignment enabled. No domain transfer, new hosting project, merge, or force push is needed. The latest design passed the production build before publication. The following push triggers the new production deployment; verify its Ready status and public routes before considering the cutover complete.

To revert, restore branch tracking to `main` and deploy the preserved revision, or use Vercel's previous production deployment rollback. The Experiments placeholder now uses sans-serif Hero Roobert and a 1.2em-tall transparent icon on one line.

## 2026-10-06 — Experiments coming-soon state

Follow-up: switched to a small inline icon with a genuine transparent background and kept the icon/heading together on one responsive line. The built-in image editor preserved the construction illustration while extracting its background; saved the result as `public/experiments-icon-transparent.png`. Prompt: remove only the white/off-white background and internal white gaps to alpha transparency; preserve shapes, colors, textures, proportions, and arrangement; no new shadows or text; tightly crop with a small transparent margin. Original supplied image remains available.

Removed the gallery from the Experiments page and replaced it with the supplied construction illustration and exact “Experiments coming soon” heading. The shared navigation stays intact, and the illustration is centered above the heading using the existing Season Mix typeface. CSS trims the icon's white margins without modifying the original image. Preserved all original Experiments media and its manifest so the three recently added Work cards continue to function; only their display on Experiments was removed.

## 2026-10-06 — Experiments artwork added to Work

Follow-up: reduced only Knox to a centered 84% image area with contain fitting, keeping its frame unchanged and the two videos filled. Verified all three original assets load in Work and the Knox inset in the browser; production build and whitespace checks pass.

Matched the three supplied references to Experiments' original assets: Bento's silent 0.8-second identity loop, the 12.97-second Ship the Future with AI website clip, and the 1800px Knox stationery image. Added them after the existing 30 Work cards without duplicating the original media or removing them from Experiments. Extracted local video posters and reused Work's play/pause and reduced-motion behavior. After the user requested frame-filling media, switched the three new cards from contain to centered cover crops to remove letterboxing.

## 2026-10-06 — Inline social links and calendar contact

Replaced the Contact hover disclosure with the calendar URL already used by the legacy sidebar. Moved Twitter, LinkedIn, Instagram, and the email-copy action below the homepage description, then matched the navigation's bold italic type and removed underlines per the user's follow-up. Deleted the unused popover component and stylesheet; their prior version is recoverable in Git. Email displays “Copied” only after the Clipboard API resolves, with a screen-reader status and manual-copy fallback. Project notes now describe the inline links rather than the superseded dropdown.

## 2026-10-06 — Contact disclosure across the shared navigation

Reused existing social URLs and email rather than introducing duplicate profile data. Contact is now a button with a hover/click panel, a padded pointer bridge, delayed mouse exit, keyboard tab flow, and Escape/outside/focus-leave dismissal. Scoped existing navigation styles to top-level link/trigger classes so dropdown links do not inherit oversized italic navbar styling. Removed stage-level overflow clipping while retaining the stamp paper and pattern masks.

Verified desktop and 320px layout, keyboard opening and tab focus, Escape focus restoration, outside dismissal, and both Home and About. Clipboard API resolved and displayed success, but the browser automation clipboard readback was empty, so end-to-end clipboard contents were not confirmed. Build and whitespace checks passed. Physical touch, pointer-only hover traversal, OS clipboard paste, and full screen-reader testing were not run.

## 2026-10-06 — Inline highlights from selected passages

The follow-up selections add “Robin and Shweta,” “rejection,” and “I met people who became some of my closest friends.” The fourteen highlights have no identical neighboring palette colors; their rendered text and classes were checked in the browser, and the build passed again.

Matched eleven exact screenshot selections without changing the story. Used inline `mark` elements with sliced decoration so translucent backgrounds follow wrapping while solid vertical bars appear only at the start and end of each selected passage. The renderer applies existing link markup inside highlighted segments, preserving MYOB's underlined new-tab link. The five portfolio tints retain dark text with measured contrast ratios from 12.12:1 to 13.56:1 on the white page. Verified all eleven matches, 23 paragraphs, desktop appearance, and no clipped highlights or horizontal overflow at 320px. Build and whitespace checks passed; screen-reader and forced-colors behavior were not manually tested.

## 2026-10-06 — Reshuffled seventeen-photo strip

Added the outdoor friends photo, arched-door portrait, event banner, and sticker photo, then reordered the complete set to interleave people, creative work, food, and events. Kept the order deterministic so both loop groups match and the sequence does not change during playback. Corrected the sideways portrait at render time without changing its source. Confirmed 17 unique images, all 34 loop instances loaded, equal group widths, and the upright portrait in the browser. Build and whitespace checks passed; smaller sizing, bottom placement, and icon-free controls remain unchanged.

## 2026-10-06 — Photos after the story

Moved the existing marquee after the article and restored the title's original top spacing. Removed the separate circular pause/play icon as requested; retained playback control through a transparent native button covering the strip, with an accessible name and keyboard focus outline. Hover/focus pause and the reduced-motion scrollable alternative remain. Verified the section follows all 23 paragraphs, no marquee SVG icon remains, and click toggles pause/play. Build and whitespace checks passed; screen-reader and OS reduced-motion testing were not rerun.

## 2026-10-06 — Personal photo marquee on About

Used the first seven attachments as photos and the last as visual guidance only. Placed the strip above the story, with full-width overflow clipping, slightly rotated square crops, rounded corners, and faded edges. Moved the existing reading-width constraint onto the article so the biography remains narrow while the photos span the page. Two identically sized groups make the 50% translation seamless without timing JavaScript. The native pause button, focus/hover pause, offscreen pause, and reduced-motion scrollable strip follow the motion/accessibility guidance without changing the supplied story.

Confirmed all 14 rendered images loaded, both loop groups had equal widths, the paused transform stayed unchanged, and Play resumed the animation. Verified desktop appearance at 1280px and 320px mobile layout with no page overflow. Production build and whitespace checks passed. Reduced-motion rules were code-reviewed; OS preference switching, full screen-reader, zoom, and RTL testing were not run.

## 2026-10-06 — One consistent portfolio navigation

Replaced page-specific link lists with one fixed Home, About, Work, Experiments, Contact list. Kept current-page links visible with `aria-current`, native URLs, and cycling highlights. Experiments now uses the shared stamp shell instead of the legacy canvas sidebar, retaining its masonry gallery and playback behavior; its main region is the navigation focus/skip target. Reduced mobile nav insets/gaps to fit all five links without hiding or scrolling them.

Verified identical link order on Home, About, Work, and Experiments through browser navigation, and measured a 272px-wide nav with no overflow at a 320px viewport. Build and whitespace checks pass. Contact's mail action was not launched; full screen-reader, zoom, and RTL audits were not run.

## 2026-10-06 — Cycling navigation accents

Replaced the fixed purple nav highlight with a repeatable yellow/pink/green/blue/lilac cycle using the existing pattern palette. Each new hover, keyboard-focus entry, or touch press advances once; mouse focus does not advance again after pointer entry. Darker counterparts keep the same hue families legible on the white homepage. Declared color contrast is at least 4.57:1 on charcoal and 5.56:1 on white. Keyboard verification showed yellow, pink, then green on successive focus entries, with the existing white focus ring intact. Build and whitespace checks passed; touch hardware, full screen-reader, and frame-by-frame transition checks were not run.

## 2026-10-06 — A dedicated About story

Preserved the supplied autobiography verbatim as 23 paragraphs, with “I Never Really Had a Plan” as its title. Split the previous homepage `about` state into distinct Home and About routes so navbar links now have separate destinations. Reused the compact stamp shell and existing local fonts; layout, typography, and accessibility guidance informed the narrow reading column, generous line spacing, selectable text, heading focus, and skip link.

Verified direct About loading, Home/About navigation including Enter-key activation, all 23 paragraphs and closing text, desktop layout at 1280px, and no article overflow at 320px. Production build passes. Full screen-reader, 200% zoom, and RTL audits were not run. No push was attempted for this change.

## 2026-10-06 — Stable stamp-to-navbar motion

The shared mask used `round` repetition, which recalculated the number and pitch of side perforations during every height change. Work also swapped the paper background for another stamp asset immediately and moved the footer by a full viewport. Switched V2 to fixed-pitch, top-anchored repeats, faded a charcoal overlay over the existing paper, reduced exiting layers to a 24px lift, and coordinated the gallery reveal with the second half of a 600ms collapse. CSS variables document the motion timing; reverse navigation remains interruptible and reduced motion remains static.

Checked Home/Work navigation and final mask/overlay styles in the browser, and ran the production build. Frame-by-frame timing capture was unavailable through the browser adapter, so it is not claimed as measured. V1 and gallery playback behavior remain unchanged.

## 2026-10-06 — Eight additional Work pieces

Added frame `1073:29141` as four more paired rows after the existing gallery. Kept the old reserved media slot empty. Reused the original source images for six cards and 2× exports of the individual game states and event posters. The whole game-card export incorrectly repeated a drawn-card state on the entry screen; exporting each state separately preserved the three distinct screens. The page keeps native grid layout and descriptive image labels; pictured trading/game controls remain static portfolio artwork, not functioning products.

Verified all eight desktop cards at 590 × 372 with 20px gaps and all twelve source images loaded, then checked the single-column layout. Build and whitespace checks pass. Full screen-reader, zoom, and RTL audits were not run for this additive artwork change.

## 2026-10-06 — Sharper Work artwork and quieter controls

The default Figma exports capped tall FILL-height frames at 4096px, leaving only 516px of width for 590px cards. Explicit 2× exports bypassed that reduction and provided 1180px-wide artwork without changing any composition or crop. Replaced all eleven runtime numeric exports; the other six compositions already use high-resolution original layers.

Grouped pause and sound at the bottom right with 30px translucent-white circles and 14px icons. Accessibility guidance kept 44px non-overlapping targets, native buttons, descriptive labels, and keyboard focus. Verified both controls, keyboard pause, 2× image dimensions in the browser, and alignment on desktop and the narrow default viewport. Production build and whitespace checks pass. Screen-reader software, forced-colors rendering, and an automated accessibility audit were not verified.

## 2026-10-06 — Work gallery and folding stamp

Implemented the user's Work design as a normal scrolling page, keeping the existing hero component mounted so its stamp can collapse into the dark navigation strip instead of cutting to the old canvas. The gallery follows all 23 Figma slots in order. The user supplied five media files for six empty cards and explicitly asked to leave the last empty slot for later. Preserved native link behavior, direct `/work` loading, the old work query URL, and navigation history.

Figma's isolated exports stretched several FILL-height cards to the full 4684px gallery height. Top-positioned artwork could be preserved with its original crop; center-positioned content was lost in those exports. Rebuilt affected compositions from the original image layers and design-context geometry rather than displaying blanks or using a screenshot of the page. Exact typography remains native for the Work heading and reconstructed editorial text; project mockups remain artwork, not misleading interactive controls.

Converted the supplied GIF to controllable silent video and compressed local MP4 derivatives without modifying originals. Three source MP4s have audio; the code-effect clip and GIF do not. Visibility-aware playback, user-controlled pausing, reduced-motion defaults, and a single audible-video state prevent off-screen or overlapping sound. Verified all five clips play muted, loop, and stop off-screen, tested sound/pause, keyboard Work navigation, direct reload, and 320/390/1280px layouts. Build and whitespace checks pass. OS reduced-motion preference, physical iOS devices, 200% zoom, screen-reader software, and an automated accessibility audit were not tested.

## 2026-10-06 — Faster, bolder vector pattern

Shortened the five V2 loops to 3–5.5 seconds at the user's request. Kept their full-tile travel and opposing directions, so the stronger motion does not introduce jumps, flashing, or movement of the frame itself. The named timing configuration keeps later tuning small; V2 remains silent and reduced-motion stays static.

## 2026-10-06 — Real vector motion for V2

The user clarified that the footer should become SVG, not simply move as one raster image. Recreated its waves, stripes, triangles, arches, palette, and diagonal panel composition using paths, repeating patterns, and fixed clipping paths. This is an authored vector recreation rather than an exact trace or a bitmap embedded in SVG. Kept the original Figma PNG as a reference. Each panel now travels one complete repeat in its own direction and duration, with overscan preventing exposed edges; removed the old whole-image drift. The animation skill informed the independent motion tracks, repeat-exact endpoints, and static reduced-motion fallback. V2 remains silent and V1 is untouched.

Build and whitespace checks passed. Browser inspection confirmed the SVG loaded, all five transforms advanced independently, and the homepage had zero audio elements. Reduced-motion support is source-verified, not OS-preference tested.

## 2026-10-06 — Animate V2 without audio

At the user's follow-up request, animated the supplied footer artwork with a slow vertical out-and-back drift. Only the oversized image transforms; the frame and crop remain stationary, and phone overscan keeps both endpoints covered. Kept the original asset intact rather than reconstructing the flattened pattern into separate motifs. Reduced-motion disables the loop. Removed the `HeroAmbience` import and mount from V2 entirely, so it neither downloads nor plays audio; V1 retains its original audio integration. Browser inspection confirmed zero audio elements and sound buttons, and an active CSS transform animation. Build passed.

## 2026-10-06 — Hero V2, with V1 preserved

Implemented the newly supplied Figma frame `1012:7579` in a separate component and stylesheet, then changed only the homepage render in `App.jsx`. V1 and its assets remain available but unmounted, avoiding duplicate navigation or audio. Downloaded the actual portrait, pattern image, paper, and logo exports, reused the existing sharp Bricx mark, and found the exact Morganite Bold Italic and Roobert SemiBold Italic fonts locally. The fonts are retained for local preview; licensing remains a publishing check.

Used a grid with a bottom-aligned content row rather than fixing every element to coordinates. At 1280 × 832, the intro starts at y=323, paragraph wraps to three lines, clients share the y=505 baseline, and the 257px footer begins at y=555. A computed inherited letter-spacing initially added a fourth paragraph line; specifying the design's -0.02em at the paragraph's own font size restored the target geometry. The paper reuses the non-distorting CSS stamp mask. Responsive cover crops preserve the new pattern's proportions.

Verified all visible image loads and reference sizes, 320px/390px mobile and 1024px/1280px desktop views, keyboard focus, Experiments navigation and browser Back. Shared audio remains mounted only on the homepage. Production build passed. No push or deployment. Screen-reader software, physical devices, and 200% browser zoom were not tested.

## 2026-10-06 — Louder beach, occasional birds, startup check

Raised player volume to 60% and mixed short CC0 natural bird excerpts into a separate local MP3, preserving the original supplied beach file. The user found 20-second bird spacing too long, so the final mix starts calls at 2 seconds and then every 8–12 seconds, with soft fades and a quiet filtered bird layer. One audio element retains all existing mute and cleanup behavior. The mix script uses an atomic rename after rendering to prevent dev-server reloads from trying to play a partially written MP3.

Reproduced delayed startup: audio had readyState 4 and more than 150 seconds buffered but remained at time 0 because audible autoplay was denied. There is no silent opening in the source. A real click began playback immediately; added pointer-up retry for touch browsers that do not activate on pointer-down. Confirmed mute pauses playback, unrelated clicks do not unmute it, and manual unmute resumes the combined track. Build passed; rendered mix peaks at -8.6 dBFS (no clipping). Physical-device touch testing and subjective speaker/headphone listening were not performed.

## 2026-10-06 — Equal, non-repeating palette sections

The user clarified that the color pairs should not cycle back through the pattern. Grouped the eight existing motif rows into four consecutive two-row sections, each occupying exactly 25% of the band: purple/lilac, blue/yellow, coral/pink, green/yellow. Scaled tile width with row height to preserve shapes, and kept original asset IDs separate from new display offsets. Duration still scales with displayed tile width so the motion speed does not jump between groups. Confirmed all four desktop sections measure equally; production build passes.

## 2026-10-06 — Mixed reference palette

Sampled the dominant flat RGB colors from the user's reference rather than estimating them. Applied two-color pairs per existing pattern row, changing only fills in the derived SVG assets and the band's fallback background. Kept the original blue SVG untouched for provenance and left the sun, ship, navigation accent, and motion alone. Desktop and phone previews checked; production build passed. The artwork is decorative and carries no text or control meaning.

## 2026-10-06 — Navigation letter roll

Tried the user's requested letter animation as a quick upward roll, using a clipped duplicate of each character. Each letter takes 240ms with an 18ms stagger; pointer exit reverses all letters together in 150ms, so rapid hover changes stay interruptible without timers or React animation state. The link itself does not move. Keyboard focus triggers the same treatment, the accessible name stays a single complete phrase, and reduced-motion/mobile layouts remain static. Browser checks confirmed staggered in-flight transforms, the keyboard focus ring, correct link names, and a fitting 320px navigation row. Build passed; OS reduced-motion emulation and screen-reader software were not run (the CSS guard and accessible tree were inspected).

## 2026-10-06 — Responsive stamp frame

The original whole-frame mask and paper export stretched horizontally and vertically independently, turning circular cutouts into ellipses on narrow screens. Replaced the mask with four intersected CSS radial-gradient layers with fixed circular radii and rounded repeats. Oversized the original paper texture behind the mask (including overriding the global image max-width) so its baked-in edge cannot show through. Kept the sea and all existing motion intact. Responsive checks also exposed a portrait/client overlap at 744 × 800; capped the mobile portrait by available vertical space and kept the adjacent tile and bird aligned. Verified phone, tablet, reference desktop, and wide/short layouts; production build passes.

## 2026-10-06 — Seamless sea motifs

The broken arches, triangles, and hourglasses were joins in the artwork, not animation lag. Repeating the full 1240px export exposed cut motifs at its edges, while its internal arch copies also overlapped at inconsistent boundaries. Derived eight narrow row tiles from clean original path segments, choosing matching motif boundaries. Animating one tile width makes the loop seamless; scaling duration by tile width preserves the original speed rather than slowing each row down. The source Figma export is retained unchanged.

## 2026-10-06 — Hero-only page and default sound

Removed the temporary project layout at the user's request and restored the hero-only homepage. Audio now tries to play on arrival, but browsers can reject audible autoplay; in that case a real pointer or keyboard interaction retries playback. Muting cancels automatic retries so unrelated clicks cannot turn the sound back on. The original short-screen overflow fallback remains to keep navigation reachable.

## 2026-10-06 — Projects below the stamp

Kept the stamp composition at viewport height and added project placeholders after it in the existing homepage scroll container. This avoids changing the global overflow rules required by the old canvas routes. The hero scrolls as one unit over a consistent dark background, with no scroll-driven animation. Cards are deliberately non-interactive until project content is supplied; the audio control remains available while scrolling.

## 2026-10-06 — Short bird flight paths

The user now requested actual movement between points in addition to wing flaps. Added a slow curved out-and-back route to each bird wrapper using independent CSS translate, preserving original rotations and the nested wing animation. Desktop paths stay in nearby open areas; mobile uses separate smaller routes to avoid drifting off the paper. No changes to the sea, ship, audio, or typography.

## 2026-10-06 — Optional beach ambience

Added the user's MP3 unchanged as a local homepage asset. The requested small bottom-right control starts sound only on a user gesture, avoiding unsolicited audio and browser autoplay restrictions. Playback loops at a low default volume and pauses on route unmount. Async play errors are handled, stale play requests are ignored, and the small visual control retains a 44px tap target. Audio is not downloaded eagerly on arrival.

## 2026-10-06 — Ship artwork matched to the hero

Regenerated only the boat illustration using the hero screenshot as a style reference. The new ship has chunky charcoal shapes, cream sails, two blue geometric marks, and a small yellow pennant to connect it to the existing pattern and sun. Saved as `sailboat-v2.png`, retaining the original asset. All travel, rocking, sizing, and reduced-motion rules are unchanged.

## 2026-10-06 — A boat on the patterned sea

The user reinterpreted the blue pattern as the ocean and the yellow tile as the sun, and requested a small looping ship. Generated a charcoal-and-cream sailboat illustration with transparency and saved a lightweight, high-density PNG in the project. Its horizontal crossing and gentle swell use separate CSS wrappers so rocking never interferes with travel. The route starts and ends beyond the clipped blue band's edges; no visible teleport or JavaScript frame loop is needed. The existing sea, birds, sun, and portrait are unchanged. Reduced-motion keeps the boat visible and still; the motion button remains absent per the earlier request.

## 2026-10-06 — Wings move, bodies stay anchored

The user clarified that flying means subtle wing flaps, not floating or tilting the entire bird. Replaced whole-image motion with three clipped layers of each original SVG. Only the two wing images shear around their shoulder boundaries; the body and layout wrapper never animate. The original artwork is unchanged, phases differ per bird, and reduced-motion remains static.

## 2026-10-06 — Subtle bird flight

Added small, unsynchronized rise-and-fall and bank motions to all four existing bird exports. Kept the original silhouettes and layout rather than deforming the artwork or sending birds across the page. Transform-only CSS avoids per-frame React work, and reduced-motion leaves the birds still. The previously removed motion button remains absent per the user's earlier instruction.

## 2026-10-06 — Restored circle pops

At the user's request, undid only the sunburst-ray change and restored the preceding circle-pop implementation. Kept the sharper Bricx asset and all unrelated hero work intact.

## 2026-10-05 — Circling rays inside the yellow tile

Replaced the prior scale-pop effect with the user's sunburst direction: broad radial wedges contained within each original circle, rotating in alternating directions. CSS handles the interruptible reveal and pause-on-exit without React timers or per-frame state. Kept the original two-color palette, fixed square, and static circles; no layout or outer scale animation is introduced.

## 2026-10-05 — Bolder internal circle pops

The user refined the internal motion request: bold and poppy, but confined to the square. Replaced horizontal circle-row drift with staggered scaling of the individual circles (40% contraction, 118% overshoot, then settling) in a 1.2-second hover loop. The SVG background, wrapper, and row groups remain untransformed; overflow clipping contains all overshoot. On pointer exit the original circle arrangement returns. Reduced-motion and touch-only environments still keep the artwork static.

## 2026-10-05 — Animate the circles, not the tile

The user clarified that the yellow square must not pop, tilt, scale, or move. Replaced the image-level transform with inline SVG circles using the original asset's exact radius (14), centers (-1/27/55/83 and 13/41/69), and colors. Extra off-canvas circles cover the edges during a one-spacing (28-unit) horizontal loop. Only the circle groups move, alternating row directions, while the background rectangle and clipping viewport remain fixed. CSS starts the loop only on fine-pointer hover and pauses its phase on exit; reduced-motion and touch-only environments remain static.

## 2026-10-05 — Yellow tile hover

Added a decorative tilt/lift transition to the yellow tile using a fixed wrapper as its hit area and transforming only the original SVG image. This avoids edge flicker from moving the hover target. The image remains non-draggable and non-selectable, with no new button or keyboard stop because it performs no action. The effect is restricted to fine pointers with hover and no reduced-motion preference; touch-only and reduced-motion environments keep the original static appearance.

## 2026-10-05 — Full-width, opposing pattern rows

The user pointed out the truncated central rule and requested opposite row directions and no motion button. The current Figma source includes the corrected full-width rule, so refreshed its unmodified SVG export rather than painting over the old truncated line. Split the artwork into eight clipping windows at the gaps between motifs and repeat each window's full SVG background across an oversized transform track. Alternate animation-direction for adjacent rows; this keeps both edges covered for either direction without changing the artwork itself.

Removed the pause control and its React state per the explicit request, retaining the reduced-motion media query. This means there is no longer a manual on-page pause control; do not claim complete motion-accessibility compliance. Updated the architecture and changelog to reflect the new behavior.

## 2026-10-05 — Continuous vector pattern

Replaced the hero's raster pattern callsite with the user's supplied Figma vector band (`1021:8644`). Kept the exported SVG unmodified and repeated it on a clipped, oversized track. Translating by exactly one tile width makes the animation's endpoint equivalent to its start without a reset jump; a linear 60-second loop creates a slow leftward drift. The source artwork's own motif spacing remains unchanged.

The pause button controls CSS animation-play-state, so resume continues from the same position. Animation is opt-in under the no-preference motion query, and the entire source remains static for reduced-motion users. This avoids JavaScript frame loops and preserves selection/drag protections from the previous fix.

## 2026-10-05 — Hero selection overlays

The user reported a dark Bricx rectangle and selection highlighting across the hero. The existing transparent logo renders cleanly without selection; selecting the page reproduces image and background overlays. Kept the source asset intact, disabled selection on the hero only, and disabled native dragging/pointer interception on its images. Navigation remains normal clickable, keyboard-focusable links. Other portfolio pages keep their existing selection behavior.

## 2026-10-05 — Figma hero on its own branch

Created `codex/figma-hero` from the existing dirty `redesign` checkout without discarding prior changes. The implementation isolates the new hero from the old desktop/mobile shells, preserving the work, playground and builds content.

Figma's raw pattern image omitted its rendered color treatment, and the SVG paper's texture rendered differently in the browser. Individual rendered exports of those decorative layers preserve the design more closely. The Bricx export initially included the canvas backdrop; an isolated screenshot of that logo preserves transparency. All assets are local, with no expiring Figma URLs in the application. The hero itself remains semantic HTML, separate image layers, and CSS.

Verified the reference-size 1280 × 832 layout, phone reflow at 390px and 320px, visible keyboard focus, Playground/Work navigation, browser Back, and Work reload persistence. Production build passed. Screen-reader software and an automated accessibility audit were not run. Trial fonts are a publishing prerequisite, not a reason to substitute fonts silently in the local preview.

## 2026-10-05 — What is this project

We're building Piyush Jain's portfolio to present his design work, experiments, and products. The existing site combines an interactive desktop canvas with mobile sections and a scrolling playground. The next iteration introduces the supplied Figma hero without discarding the existing project content or uncommitted redesign work.
