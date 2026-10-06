# Work page assets

Figma file `bCf51Jh7ebnEUdQ3Pyn4th`, frame `1071:22783` (1280 × 5144). The page structure, heading, grid, controls, navigation, and transition are implemented as native React/CSS. Project compositions are static artwork, not screenshots standing in for the page. All assets are local; no temporary Figma URLs are used at runtime.

## Artwork slots

Each numeric PNG is the unmodified exported artwork of the matching `1071:<id>` node. The eleven numeric exports used at runtime are now explicitly exported at 2× (1180px wide), replacing the blurry 516px-wide defaults. Isolated FILL-height frames still export at 9368px tall; top-positioned artwork is clipped at the original card bounds in CSS. Nexus is 1180 × 744. Centered compositions use high-resolution original source layers instead. Unused malformed full-card exports are retained only as source references.

| Slot | Runtime artwork |
| --- | --- |
| 22786 | `22786.png`, blue paired posters |
| 22791 | `ai-background.png` from 22792 and `ai-wordmark.svg` from 22794; native caption at the source geometry |
| 22796 | `22796.png`, trading app |
| 22800 | `22800.png`, Crowwd |
| 22803 | `velar-website.png`, original image fill over its orange gradient |
| 22806 | `22806.png`, Nexus brand composition, 590 × 372 |
| 22811 | `metrics.png` from 22812, 588.777 × 419 crop at (0, −23) |
| 22813 | `22813.png`, character-chat screens |
| 22817 | `22817.png`, Based Fellowship |
| 22819 | `22819.png`, green workflow poster |
| 22825 | `22825.png`, three token cards |
| 25883 | `25883.png`, AI workflow editorial pair |
| 25886 | `market.png` from 25887, centered 642 × 372 crop |
| 25888 | `velar-staking-0.png` from 25889 and `velar-staking-1.png` from 25890 |
| 25891 | `25891.png`, Knox |
| 25893 | `25893.png`, status-design artwork (not live controls) |
| 25922 | `editorial-0.png` from 25930 and `editorial-1.png` from 25932; native date/headline/brand typography |

`navbar-stamp.svg` is node `1071:25957`, retained as a design reference. The live compact stamp uses a charcoal overlay and the shared fixed-pitch CSS mask to avoid a background-image swap during navigation. Work navigation is `1071:25958`, using the existing Roobert SemiBold Italic font. The heading is `1071:22784`, using the existing Season Mix Regular font.

## Additional artwork — frame 1073:29141

Eight 590 × 372 cards, in source row order. Source PNGs are unmodified; individual game screens and event posters are 2× exports. The downloaded whole-card `29142.png` and `30385.png` are reference-only and not rendered.

| Card node | Local artwork and original placement |
| --- | --- |
| 1073:29142 | `game-29803.png`, `game-29587.png`, `game-29695.png`: 160.587 × 302 at x=28,214.38,400.76; y=35 |
| 1074:29994 | `crowwd-profile.png` from 1074:30383: 674 × 473 at (40,−141), retaining the inner 101.33% height crop |
| 1073:29143 | `velar-trading.png` from 1073:29976: centered 503.503 × 310, original inner crop |
| 1073:29144 | `purple-brand.png` from 1073:29978: 824 × 371 at (−117,0), rounded frame and inset shadows |
| 1073:29145 | `bento-marks.png` from 1074:29984: 270 square at (20,51); `bento-banner.png` from 1073:29981: 480 × 270 at (308,51) |
| 1073:29146 | `wagadu.png` from 1074:29987: centered 516 × 290 |
| 1073:29147 | `fellowship-weeks.png` from 1074:29991: 478 × 306.592 at (56,33) |
| 1074:30385 | `event-30387.png` and `event-30435.png`: 260.374 square at (24,56.3) and (304.63,56.3) |

## User-provided media

Sources are the exact files supplied from `/Users/PIYUSH/Documents/`. Originals are unchanged. Web derivatives use H.264/yuv420p, CRF 21, maximum 1440px width, AAC 128kbps where present, and fast-start metadata. Posters are the first frame. The GIF uses MP4 for native pause/reduced-motion control without audio.

| Slot | Source | Local derivative | Audio |
| --- | --- | --- | --- |
| 22789 | `CleanShot 2026-10-06 at 20.17.16.mp4` | `media/inner-circle.mp4` | Yes |
| 22790 | `server.mp4` | `media/server.mp4` | Yes |
| 22798 | `claim rewards.mp4` | `media/claim-rewards.mp4` | Yes |
| 22799 | `code effect.mp4` | `media/code-effect.mp4` | No |
| 22804 | `ezgif.com-gif-maker.gif` | `media/created.mp4` | No |
| 22805 | Reserved by the user for a later file | None | None |

DM Mono and Headland One were obtained from Google Fonts for the final artwork's exact typography. Their OFL licenses are bundled under `public/fonts/`. Other local trial-font licensing caveats remain in `public/fonts/README.md`.
