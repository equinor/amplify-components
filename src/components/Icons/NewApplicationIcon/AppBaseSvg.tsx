import { FC } from 'react';

interface WaveShapeWithNoiseProps {
  index?: number;
  isAltWave?: boolean;
  hasLargeWaves?: boolean;
}
const smallWavesPathData = [
  'M484.113 48.5628C513.945 48.3631 531.572 36.2852 547.903 24.3397L547.608 23.9361L547.903 24.3397C548.573 23.8492 549.242 23.3589 549.908 22.8698C565.602 11.3589 580.422 0.5 604.431 0.5C628.552 0.5 643.639 11.4614 659.545 23.0298L659.56 23.0412C660.156 23.4741 660.752 23.9079 661.35 24.3419C677.754 36.2468 695.327 48.2911 724.5 48.5607V724.5H0.5V48.5618C30.1815 48.2968 47.7561 36.2527 64.0414 24.3406C64.712 23.8501 65.3804 23.3598 66.0471 22.8708C81.7404 11.3598 96.5604 0.500978 120.569 0.500978C144.691 0.500978 159.778 11.4624 175.683 23.0308C176.284 23.4675 176.885 23.9051 177.488 24.3428L177.782 23.9382L177.488 24.3428C194.079 36.3837 211.866 48.5663 241.639 48.5663C271.413 48.5663 289.158 36.3833 305.708 24.3421L305.414 23.9378L305.708 24.3421C306.31 23.9043 306.91 23.4667 307.509 23.03C323.374 11.4618 338.422 0.500978 362.542 0.500978C386.664 0.500978 401.751 11.4623 417.656 23.0308C418.257 23.4675 418.858 23.9051 419.462 24.3428C436.052 36.3837 453.839 48.5663 483.613 48.5663H484.113V48.5628Z',
  'M726 778H1.00018L1 1C52.7372 1 64.1022 52.4428 121.833 52.4428C181.63 52.4428 191.962 1 242.667 1C293.371 1 304.736 52.4428 363.5 52.4428C422.264 52.4428 433.629 1 484.333 1C535.038 1 546.403 52.4428 605.167 52.4428C663.931 52.4428 675.295 1 726 1L726 778Z',
];
const largeWavesPathData = [
  'M724.5 72.4992V724.499H0.5V72.4954C45.0646 72.1639 71.4097 54.1288 95.8591 36.259C96.8643 35.5244 97.8662 34.79 98.8657 34.0574C122.391 16.8154 144.667 0.5 180.75 0.5C217 0.5 239.677 16.9687 263.52 34.2966C264.42 34.9507 265.321 35.6061 266.226 36.2618L266.519 35.857L266.226 36.2618C291.089 54.2924 317.699 72.5 362.25 72.5C406.801 72.5 433.348 54.2919 458.15 36.2609L457.856 35.8565L458.15 36.2609C459.052 35.6052 459.952 34.9498 460.849 34.2956C484.632 16.9679 507.25 0.5 543.5 0.5C579.75 0.5 602.427 16.9687 626.27 34.2965C627.17 34.9507 628.072 35.6061 628.976 36.2618C653.746 54.2248 680.25 72.3636 724.5 72.4992Z',
  'M726 726H1.00018L1 1C78.6059 1 95.6533 73 182.25 73C271.945 73 287.443 1 363.5 1C439.557 1 456.604 73 544.75 73C632.896 73 649.943 1 726 1L726 726Z',
];

export const WaveShape: FC<WaveShapeWithNoiseProps> = ({
  index,
  isAltWave,
  hasLargeWaves,
}) => {
  return (
    <svg
      className={'waveShape'}
      width="100%"
      height="100%"
      viewBox="0 0 725 725"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.5}
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <linearGradient id="gradient" x1="0" y1="0%" x2="0" y2="100%">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </linearGradient>
      </defs>

      <g id={'wavePattern' + index} x="0" y="0" width="100%" height="100%">
        {!isAltWave ? (
          <path
            d={hasLargeWaves ? largeWavesPathData[0] : smallWavesPathData[0]}
            fill="url(#gradient)"
          />
        ) : (
          <path
            d={hasLargeWaves ? largeWavesPathData[1] : smallWavesPathData[1]}
            fill="url(#gradient)"
          />
        )}
      </g>
    </svg>
  );
};

export const NoiseShape: FC<WaveShapeWithNoiseProps> = ({
  index,
  isAltWave,
  hasLargeWaves,
}) => {
  return (
    <svg
      className={'noiseShape'}
      width="100%"
      height="100%"
      viewBox="0 0 725 725"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={0.75}
            numOctaves={3}
            stitchTiles="stitch"
          />

          <feColorMatrix
            type="matrix"
            values="
          0 0 0 2 0
          0 0 0 2 0
          0 0 0 2 0
          0 0 0 10 0"
          />
        </filter>
        <mask id={'noiseMask' + index} x="0" y="0" width="100%" height="100%">
          {!isAltWave ? (
            <path
              d={hasLargeWaves ? largeWavesPathData[0] : smallWavesPathData[0]}
              fill="white"
            />
          ) : (
            <path
              d={hasLargeWaves ? largeWavesPathData[1] : smallWavesPathData[1]}
              fill="white"
            />
          )}
        </mask>
      </defs>
      <g>
        <rect
          width="100%"
          height="100%"
          filter="url(#noiseFilter)"
          mask={'url(#noiseMask' + index + ')'}
        />
      </g>
    </svg>
  );
};
