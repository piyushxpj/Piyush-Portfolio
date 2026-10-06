# Hero V2 asset provenance

Source: Figma `bCf51Jh7ebnEUdQ3Pyn4th`, frame `1012:7579` (1280 × 832). Assets were downloaded from the Figma design-context response; no temporary URLs are used by the application.

| Local asset | Design slot | Intrinsic dimensions / usage |
| --- | --- | --- |
| `paper.svg` | `1012:7580` | 1240 × 792; background within the responsive stamp frame |
| `stamp-mask.svg` | mask under `1012:7581` | 1240 × 792; retained reference, replaced at runtime by the existing responsive circular CSS mask |
| `pattern.png` | image fill of `1012:7583` | 1851 × 850; original raster retained as reference, no longer rendered |
| `pattern-animated.svg` | recreation of `1012:7583` | 1851 × 850; authored vector patterns and five independently animated tracks, cropped to the footer |
| `portrait.png` | `1012:7591` | 166 × 148 transparent PNG, displayed 83 × 74 on desktop |
| `coinbase.svg` | `1063:9885` | 94 × 16 |
| `dacoit.svg` | `1063:9886` | 40 × 16 |
| `base.svg` | `1063:9887` | 62 × 16 |
| `velar.svg` | `1063:9890` | 70 × 16 |
| `/clients/bricx.webp` | `1063:9891` | Reused existing sharp transparent mark, displayed 54px wide |
| `inner-circle.svg` | `1063:9907` | 56 × 15 |
| `bento.svg` | `1063:9908` | 61 × 17 |

Original exported SVG files and paths are unchanged. The whole-frame reference screenshot is not an implementation asset. At the user's explicit request, `pattern-animated.svg` recreates the raster artwork using actual vector paths, not an embedded bitmap. Waves, stripes, triangles, and arches loop independently inside stationary diagonal clips; reduced-motion keeps them static. This is a vector reinterpretation, not an exact automatic trace. The old V1 patterns, ship, birds, and sun remain in their original files but are not mounted in V2.

Fonts copied from the user's installed `/Library/Fonts/`: Morganite Bold Italic and Roobert TRIAL SemiBold Italic. Existing Roobert regular/semibold files are shared. Check web licensing before publishing; see `public/fonts/README.md`.

V2 is silent and does not mount `HeroAmbience.jsx` or a sound control. The preserved V1 still owns its beach/bird audio; provenance remains in `public/hero/ASSETS.md`.
