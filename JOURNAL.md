# Journal

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
