# Hero asset provenance

Source: Figma `bCf51Jh7ebnEUdQ3Pyn4th`, frame `1025:1136`.

- `stamp-paper.png`: rendered layer `1025:1137`, including its subtle texture.
- `stamp-mask.svg`: mask from `1025:1138`, used to clip the decorative pattern.
- `blue-pattern.svg`: refreshed from the user-supplied node `1021:8644` with its corrected full-width divider; intrinsic size 1240 × 253. Eight CSS windows display independent horizontal bands of the unmodified asset, alternating animation direction without aspect-ratio distortion.
- `blue-pattern-rendered.png`: retained earlier raster export of layer `1025:1142`; no longer used by the hero.
- `portrait-background.png` and `portrait-foreground.png`: the two fills of `1025:1152`.
- `yellow-tile.svg`: reference artwork from `1025:1153`. Per the user's request to animate its circles independently, the hero renders these original circle positions, radii and colors as inline SVG with a fixed clipping viewport and hover-only per-circle transforms.
- `bird-top.svg`, `bird-portrait.svg`, `bird-left.svg`, `bird-right.svg`: `1025:1166`, `1025:1194`, `1025:1195`, `1021:8642`.
- Client marks: nodes `1025:1170` through `1025:1193`. Bricx uses the existing transparent 612 × 212 asset at `/clients/bricx.webp` instead of the small 54 × 19 Figma render, retaining its display size with better high-density-screen resolution.

Exports are kept unmodified. The whole-frame reference screenshot is not shipped or used as the hero.

## Supplied beach audio (2026-10-06)

`beach-ambience.mp3` is an unchanged copy of the user-provided `/Users/PIYUSH/Downloads/freesound_community-beach-ambiance-16328.mp3` (224.376 seconds, stereo MP3, approximately 4.3 MB). Provided for homepage integration; its redistribution/license terms have not been independently verified. No external audio service is used.

## Generated sailboat (2026-10-06)

### Current version: geometric folk-print ship

`sailboat-v2.png` is the active 384 × 256 transparent asset, generated with the built-in image-generation tool using the hero screenshot as a style reference and the previous boat as the edit target. Original: `/Users/PIYUSH/.codex/generated_images/01a023a2-1d5a-7d22-a2f4-e81cd707f525/exec-0081c7c0-1b6b-41bf-9e48-87d9ad811b7e.png`. CSS motion and sizing are unchanged; the first version below remains available.

Prompt:

> Use case: style-transfer. Image 1 is ONLY a style reference: the portfolio's bold blue geometric folk-print sea, yellow circle tile, rough black bird silhouettes, and off-white paper. Do not reproduce the website or photo. Image 2 is the boat to redesign. Deliver ONLY one replacement sailing ship sprite on true transparent background. Preserve image 2's right-facing side profile, level hull, boat placement and approximate occupied footprint within a 3:2 landscape canvas, with transparent surrounding margins, so it swaps into its existing animation. Redesign it as a bold, charming mid-century folk-art woodblock stamp: thick chunky charcoal hull, a sturdy mast, two large simple warm-cream triangular sails, and one tiny golden-yellow pennant echoing the sun tile. Use flat solid cut-paper shapes, confident slightly irregular edges, very restrained ink grain. Include just two simple dark-blue geometric marks on one sail echoing the reference's diamonds/triangles, not lots of decoration. It must read clearly at 80px wide. No realistic planking, fine rigging, thin hatch lines, gradients, shading, 3D, shiny surfaces, soft shadows, halo or glow. No background scene, sea, waves, people, birds, lettering, logo, border, or other objects. The result should look like another asset from the same playful geometric print system, not a detailed nautical drawing.

### Previous version

`sailboat.png` was created with the built-in image-generation tool, then resized to 384 × 256 for the small hero decoration with alpha preserved. Original retained at `/Users/PIYUSH/.codex/generated_images/01a023a2-1d5a-7d22-a2f4-e81cd707f525/exec-67da115c-b7a6-456a-821c-e4fd956666b7.png`. This illustration is not a Figma export.

Generation prompt:

> Use case: illustration-story. Asset type: a single small transparent-background boat sprite for a designer's beach-themed portfolio website, displayed only about 80 CSS pixels wide. Primary request: one charming small sailing boat in side profile, bow pointing right, level hull, one mast and two simple triangular sails. Style: bold handmade charcoal/black ink print with lightly imperfect dry-brush edges, similar to tiny sketched black seabird silhouettes. Very simple readable silhouette, not realistic, not emoji, not glossy or 3D. Dark charcoal hull and mast, warm off-white opaque sails with a few sparse black sketch lines. Flat limited palette, no gradients. Entire boat fully visible, centered and tightly framed with only a small transparent margin around it. Truly transparent background. No ocean, waves, water, wake, ground, shadow, sun, birds, border, text, logo, people, or additional objects. Keep the boat level so the website can animate gentle rocking itself.
