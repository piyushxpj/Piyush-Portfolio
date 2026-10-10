# Work page assets

Figma file `bCf51Jh7ebnEUdQ3Pyn4th`, frame `1071:22783` (1280 × 5144). The page structure, heading, grid, controls, navigation, and transition are implemented as native React/CSS. Project compositions are static artwork, not screenshots standing in for the page. All assets are local; no temporary Figma URLs are used at runtime.

## Artwork slots

Runtime optimization (2026-10-07): PNG filenames below identify preserved originals. The page serves corresponding WebP variants from `optimized/` using `workImageManifest.json`. Regenerate with `npm run optimize:work` (requires `cwebp`); the script never deletes or overwrites original artwork. Top-aligned numeric exports are trimmed to the visible card bounds; other composition sources retain their proportions and CSS crops. Output quality is 88 with sharp YUV conversion, responsive widths up to 600/1200/1600px and no upscaling.

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

## Additional artwork — frame 1140:15014

Four 590 × 372 cards added before the final Knox card, preserving source pairings. Leagues/profile now occupy cards 31–32 above Fellowship/events at 33–34; First Dollar mobile/showcase stay at 35–36. The gallery retains its existing 20px gutter. Eight original PNG image assets are preserved in `artwork/`; `npm run optimize:work` generates responsive WebP versions. Phone layers have the source 10px corner radius and #ededed border; card geometry scales proportionally.

| Card node | Local artwork and original placement |
| --- | --- |
| 1120:14 | `leagues-wallet.png` (1139:14459): 139 × 302 at (60,35); `leagues-funds.png` (1139:14461): 138 × 302 at (226,35); `leagues-discover.png` (1139:14462): 139 × 302 at (391,35); #f5f5f5 background |
| 1139:14463 | `first-dollar-profile.png` (1139:14468): 400 × 322 at (95,24); #002ee7 background |
| 1139:14475 | `first-dollar-campaigns.png` (1139:14634), `first-dollar-menu.png` (1139:14635), `first-dollar-winners.png` (1139:14636): each 139 × 302 at x=60,225,390, y=35; #f5f5f5 background |
| 1139:14470 | `first-dollar-showcase.png` (1139:14473): 632 × 508 at (48,−184), clipped by the card; #002ee7 background |

## User-provided media

### Reused Experiments pieces

Bento identity occupies card 11, beside Velar metrics at card 12. Ship the Future with AI occupies card 14, beside Nexus. Knox remains the final card. They reference the preserved Experiments assets directly, avoiding duplicate media. Both videos use centered `object-fit: cover` to fill the 590 × 372 frames edge to edge. The Knox artwork uses a centered 84% image area with `object-fit: contain`, leaving breathing room inside the unchanged card frame per the user's follow-up.

| Work card | Existing source | Work poster |
| --- | --- | --- |
| Bento — animated brand identity | `/playground/twitter-gif-1988869773401215143.mp4` | `media/bento-identity.png` |
| Ship the Future with AI — website concept | `media/ship-future-ai-cropped.mp4` (original: `/playground/twitter-gif-2037805436561453374.mp4`) | `media/ship-future-ai-cropped.jpg` |
| Knox — brand identity and stationery | `/playground/01.webp` | Not applicable |

Both videos are silent and reuse Work's visibility-aware playback, play/pause, and reduced-motion handling. Posters are first frames extracted from the existing videos. The supplied screenshots identify the pieces; they are not substituted for the original assets.

Ship the Future's 720 × 534 source has a baked-in white margin. Its Work derivative uses FFmpeg `crop=636:450:42:42`, H.264 CRF 18, yuv420p and fast-start metadata. The 2px safety inset removes anti-aliased border pixels. Its JPEG poster is extracted from the cropped clip. The card retains centered `object-fit: cover`; the original clip and uncropped PNG poster remain unchanged.

### Original supplied clips

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
