/**
 * ============================================================================
 * theme.ts — ALL COLOURS and gradients for the site. Edit colours HERE only.
 * ============================================================================
 *
 * HOW IT WORKS
 *   • `theme`     = the named colour palette (navy, cyan, violet, amber, the
 *                   light background/surface colours, and the text colours).
 *   • `gradients` = reusable gradient strings built from those colours
 *                   (the aurora cyan→violet, the amber "flame", the page
 *                   background wash, text gradients, etc.).
 *   • Every component imports from here, so changing a value in this file
 *     recolours the whole site consistently.
 *
 * HOW TO CHANGE COLOURS
 *   • Brand hue ............ edit `cyan` / `navy` / `violet` / `amber`.
 *   • Page background ...... edit `bg` (and `bg2` for the alternating bands).
 *   • Card surfaces ........ edit `panel` / the `glass` look is in GlobalStyles.
 *   • Text colours ......... edit `text` (headings/body), `textDim` (muted),
 *                            `textFaint` (captions).
 *   • The main gradient .... edit `gradients.aurora`.
 *   • Footer colour ........ `FOOTER_BLUE` (kept = logo navy, per request).
 *
 * The palette was built with the colour-wheel method anchored on the logo:
 * logo navy + cyan, an ANALOGOUS violet, and a SPLIT-COMPLEMENT amber accent.
 * ============================================================================
 */
export const theme = {
  // --- Logo core ---
  navy: '#032855',
  navyDeep: '#02182f',
  blue: '#0A3A6B',
  cyan: '#01B8F4',
  cyanSoft: '#3FD0FF',

  // --- Wheel: analogous violet ---
  violet: '#6D5EF0',
  violetSoft: '#9A8DFF',

  // --- Wheel: split-complement amber (accent) ---
  amber: '#FFA94D',
  amberSoft: '#FFC98A',

  // --- Light surfaces (airy, with a cool blue undertone from the logo) ---
  bg: '#F7FAFF',        // page canvas — barely-blue white
  bg2: '#EEF4FD',       // raised band
  panel: '#FFFFFF',     // card
  panelHi: '#FFFFFF',   // hover card
  stroke: 'rgba(3,40,85,0.10)',       // hairline on light
  strokeHi: 'rgba(1,160,230,0.45)',   // cyan-tinted hover border

  // --- Text (navy-based ink, never pure black) ---
  text: '#0B2444',      // deep navy ink
  textDim: '#51657F',   // muted slate
  textFaint: '#90A2BA', // faint captions

  // --- White (for use on gradient/dark fills) ---
  white: '#ffffff',
};

// Footer uses the logo's navy-blue shade with the white logo on top
export const FOOTER_BLUE = theme.navy;

export const gradients = {
  // Signature multi-stop aurora — cyan → violet (logo-anchored, wheel-expanded)
  aurora: `linear-gradient(120deg, ${theme.cyan} 0%, #2E8CF0 40%, ${theme.violet} 100%)`,
  auroraSoft: `linear-gradient(120deg, ${theme.cyanSoft} 0%, ${theme.violetSoft} 100%)`,
  // Accent gradient (amber split-complement) for key CTAs / highlights
  flame: `linear-gradient(120deg, ${theme.amber} 0%, #FF7E5F 100%)`,
  // Light canvas with soft colored auras
  canvas: `radial-gradient(1100px 650px at 78% -8%, rgba(109,94,240,0.12), transparent 60%),
           radial-gradient(950px 600px at 8% 4%, rgba(1,184,244,0.14), transparent 58%),
           ${theme.bg}`,
  // Text gradient (deeper stops so it reads on light)
  textCyanViolet: `linear-gradient(100deg, #0A9BE0, ${theme.violet})`,
  textCyanAmber: `linear-gradient(100deg, #0A9BE0 30%, #F08A2C)`,
  // Glass panel sheen (light frosted)
  glass: 'linear-gradient(160deg, rgba(255,255,255,0.9), rgba(255,255,255,0.6))',
};
