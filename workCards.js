const MEDIA = '/work-v2/media/';
// Figma 1071:22785: row-major order, 590 × 372 cards with 20px gutters.
export const workCards = [
  { id: '22786', title: 'Built for people who actually ship things', crop: 'top' },
  { id: '22791', title: 'The AI that just works', composition: 'ai' },
  { id: '22790', title: 'Server animation', video: 'server', audio: true },
  { id: '22789', title: 'Inner Circle — Build Something Wonderful', video: 'inner-circle', audio: true },
  { id: '22796', title: 'Trading app interface', crop: 'top' },
  { id: '22798', title: 'Claim rewards interaction', video: 'claim-rewards', audio: true },
  { id: '22799', title: 'Code effect', video: 'code-effect' },
  { id: '22800', title: 'Crowwd — creators and initiatives', crop: 'top' },
  { id: '22803', title: 'Velar — DeFi liquidity on Bitcoin', composition: 'velar' },
  { id: '22804', title: 'What have you created?', video: 'created' },
  { id: 'bento-identity', title: 'Bento — animated brand identity', video: 'bento-identity', videoSrc: '/playground/twitter-gif-1988869773401215143.mp4', poster: `${MEDIA}bento-identity.png` },
  { id: '22811', title: 'Velar product metrics', composition: 'metrics' },
  { id: '22806', title: 'Nexus brand identity', crop: 'full' },
  { id: 'ship-future-ai', title: 'Ship the Future with AI — website concept', video: 'ship-future-ai', videoSrc: `${MEDIA}ship-future-ai-cropped.mp4`, poster: `${MEDIA}ship-future-ai-cropped.jpg` },
  { id: '22813', title: 'Character chat mobile app', crop: 'top' },
  { id: '22817', title: 'Based Fellowship', crop: 'top' },
  { id: '22819', title: 'Not another wrapper. A real workflow.', crop: 'top' },
  { id: '22825', title: 'GDUPI, Brunette, and Higher token cards', crop: 'top' },
  { id: '25883', title: 'AI workflow editorial design', crop: 'top' },
  { id: '25886', title: 'Token market table', composition: 'market' },
  { id: '25888', title: 'Velar staking interface', composition: 'staking' },
  { id: '25891', title: 'Knox technology and marketing', crop: 'top' },
  { id: '25893', title: 'Pending, successful, and failed status explorations', crop: 'top' },
  { id: '25922', title: 'NexusAIM editorial campaign', composition: 'editorial' },
  // Figma 1073:29141: preserve the four new row pairings after the original gallery.
  { id: '29142', nodeId: '1073:29142', title: 'Higher or Lower — card game interface', background: '#f1dcc7', layers: [
    { file: 'game-29803', x: 28, y: 35, width: 160.587, height: 302 },
    { file: 'game-29587', x: 214.38, y: 35, width: 160.587, height: 302 },
    { file: 'game-29695', x: 400.76, y: 35, width: 160.587, height: 302 },
  ] },
  { id: '29994', nodeId: '1074:29994', title: 'Crowwd — creator profile and project funding', background: '#f3f3f4', layers: [
    { file: 'crowwd-profile', x: 40, y: -141, width: 674, height: 473, crop: { height: '101.33%', top: '-0.03%' } },
  ] },
  { id: '29143', nodeId: '1073:29143', title: 'Velar — trading dashboard', background: '#ffe400', layers: [
    { file: 'velar-trading', x: 43.2485, y: 31, width: 503.503, height: 310, crop: { width: '100.14%', height: '100.64%', left: '-0.07%' } },
  ] },
  { id: '29144', nodeId: '1073:29144', title: 'Purple geometric brand identity', background: '#232528', layers: [
    { file: 'purple-brand', x: -117, y: 0, width: 824, height: 371, radius: 51.747, insetShadow: true },
  ] },
  { id: '29145', nodeId: '1073:29145', title: 'Bento — brand marks and campaign', background: '#f0512a', layers: [
    { file: 'bento-marks', x: 20, y: 51, width: 270, height: 270 },
    { file: 'bento-banner', x: 308, y: 51, width: 480, height: 270 },
  ] },
  { id: '29146', nodeId: '1073:29146', title: 'Wagadu — making DeFi accessible to all', background: '#05a139', layers: [
    { file: 'wagadu', x: 37, y: 41, width: 516, height: 290 },
  ] },
  // Figma 1140:15014: first pair moved above the Fellowship/events row.
  { id: 'leagues-mobile', nodeId: '1120:14', title: 'Leagues — wallet, add funds, and market discovery', background: '#f5f5f5', layers: [
    { file: 'leagues-wallet', x: 60, y: 35, width: 139, height: 302, radius: 10, border: '#ededed' },
    { file: 'leagues-funds', x: 226, y: 35, width: 138, height: 302, radius: 10, border: '#ededed' },
    { file: 'leagues-discover', x: 391, y: 35, width: 139, height: 302, radius: 10, border: '#ededed' },
  ] },
  { id: 'first-dollar-profile', nodeId: '1139:14463', title: 'First Dollar — creator profile', background: '#002ee7', layers: [
    { file: 'first-dollar-profile', x: 95, y: 24, width: 400, height: 322 },
  ] },
  { id: '29147', nodeId: '1073:29147', title: 'Based Fellowship — two-week program', background: '#fafafa', layers: [
    { file: 'fellowship-weeks', x: 56, y: 33, width: 478, height: 306.592 },
  ] },
  { id: '30385', nodeId: '1074:30385', title: 'AI Bootcamp with Emergent and ElevenLabs AI Voice Buildathon', background: '#eceae9', layers: [
    { file: 'event-30387', x: 24, y: 56.3, width: 260.374, height: 260.374 },
    { file: 'event-30435', x: 304.63, y: 56.3, width: 260.374, height: 260.374 },
  ] },
  { id: 'first-dollar-mobile', nodeId: '1139:14475', title: 'First Dollar — campaigns, navigation, and winners', background: '#f5f5f5', layers: [
    { file: 'first-dollar-campaigns', x: 60, y: 35, width: 139, height: 302, radius: 10, border: '#ededed' },
    { file: 'first-dollar-menu', x: 225, y: 35, width: 139, height: 302, radius: 10, border: '#ededed' },
    { file: 'first-dollar-winners', x: 390, y: 35, width: 139, height: 302, radius: 10, border: '#ededed' },
  ] },
  { id: 'first-dollar-showcase', nodeId: '1139:14470', title: 'First Dollar — creator showcase editor', background: '#002ee7', layers: [
    { file: 'first-dollar-showcase', x: 48, y: -184, width: 632, height: 508 },
  ] },
  { id: 'knox-brand', title: 'Knox — brand identity and stationery', src: '/playground/01.webp', inset: true },
  { id: 'first-dollar-onboarding', title: 'First Dollar — onboarding interaction', video: 'first-dollar-onboarding' },
];
