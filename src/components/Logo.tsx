/**
 * ============================================================================
 * Logo.tsx — renders the user's REAL logo image (from src/logoAssets.ts).
 * ============================================================================
 *
 *   <Logo />                     → full logo (mark + wordmark)
 *   <Logo variant="white" />     → all-white version (for dark backgrounds)
 *   <Logo markOnly />            → just the mark (no text)
 *   <AlifMark />                 → the mark only, convenience component
 *
 * The actual image data lives in src/logoAssets.ts as base64 strings
 * (logoFull / logoWhite / mark / markWhite). To REPLACE the logo later,
 * regenerate that file with the new image — nothing here needs to change.
 * `size` is the rendered HEIGHT in pixels.
 * ============================================================================
 */
import React from 'react';
import { logoFull, logoWhite, mark, markWhite } from '../logoAssets';

/**
 * Logo now uses the user's ACTUAL supplied logo image (kept as-is,
 * including the "Tech Solutions" wordmark, per their request to use it
 * until they produce their own). No more SVG recreation.
 */

interface LogoProps {
  variant?: 'color' | 'white';
  size?: number;   // rendered height in px
  markOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'white', size = 46, markOnly = false }) => {
  const src = markOnly
    ? variant === 'white' ? markWhite : mark
    : variant === 'white' ? logoWhite : logoFull;
  return (
    <img
      src={src}
      alt="Alif"
      style={{ height: size, width: 'auto', display: 'block', userSelect: 'none' }}
      draggable={false}
    />
  );
};

export const AlifMark: React.FC<{ variant?: 'color' | 'white'; size?: number }> = ({
  variant = 'white',
  size = 120,
}) => (
  <img
    src={variant === 'white' ? markWhite : mark}
    alt="Alif"
    style={{ height: size, width: 'auto', display: 'block', userSelect: 'none' }}
    draggable={false}
  />
);

export default Logo;
