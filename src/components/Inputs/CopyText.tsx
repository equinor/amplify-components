import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { Icon, Typography } from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import styled, { keyframes } from 'styled-components';

const { colors, spacings } = tokens;

const Wrapper = styled.div`
  position: relative;
  pointer-events: auto;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const spawn = keyframes`
  from {
    opacity: 0;
    background: none;
  }

  to {
    opacity: 1;
    background: ${colors.ui.background__light.hex};
  }
`;

const CopyIcon = styled.div`
  position: absolute;
  z-index: 1000;
  top: 50%;
  right: -${spacings.comfortable.x_small};
  transform: translate(100%, -50%);
  animation: ${spawn} 1s;
  background: ${colors.ui.background__light.hex};
  p,
  svg {
    color: ${colors.interactive.primary__hover.hex};
  }
  p {
    font-weight: 700;
    margin-top: 2px;
  }
  display: grid;
  grid-template-columns: auto 2.75rem;
  grid-gap: ${spacings.comfortable.xx_small};
  align-items: center;
`;

type IconText = 'Copy' | 'Copied!';

export interface CopyTextProps {
  textToCopy: string;
  children: ReactNode;
}

const CopyText: FC<CopyTextProps> = ({ children, textToCopy }) => {
  const isMounted = useRef(false);
  const [hovering, setHovering] = useState(false);
  const [iconText, setIconText] = useState<IconText>('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setIconText('Copied!');
    setTimeout(() => {
      if (isMounted.current) {
        setIconText('Copy');
      }
    }, 3000);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Wrapper
      onClick={handleCopy}
      onMouseOver={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      {children}
      {hovering && (
        <CopyIcon>
          <Icon data={copy} size={16} />
          <Typography variant="overline">{iconText}</Typography>
        </CopyIcon>
      )}
    </Wrapper>
  );
};

export default CopyText;
