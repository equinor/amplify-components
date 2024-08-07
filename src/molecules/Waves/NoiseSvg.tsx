import { FC } from 'react';

export const NoiseSvg: FC = () => (
  <svg viewBox="0 0 1500 1500" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency={1.5}
        numOctaves={3}
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);
