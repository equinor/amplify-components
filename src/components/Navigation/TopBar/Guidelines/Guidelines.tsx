import React, { forwardRef, ReactElement } from 'react';

import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';

import Colorbox from './Colorbox';
import Item from './Item';
import Section from './Section';
import { spacings } from 'src/style';
import { GuidelineItem } from 'src/types/Guidelines';

import styled from 'styled-components';

const { elevation, colors } = tokens;

const StyledSideSheet = styled.div`
  width: 320px;
  height: calc(100vh - 64px);
  background-color: ${colors.ui.background__default.rgba};
  box-shadow: ${elevation.raised};
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 64px;
  z-index: 100;
`;

const Content = styled.div`
  height: calc(
    100vh - 64px - 57px
  ); // 64px is height of top bar, 57 is height of header in side sheet
  padding: ${spacings.medium};
  overflow: auto;
`;

export interface GuidelineSections {
  sectionName: string;
  items: GuidelineItem[];
}

export interface GuidelineProps {
  open: boolean;

  /**
   * @deprecated Use Guideline.Section and Guideline.Item as children instead.
   */
  sections: GuidelineSections[];
  children?: ReactElement | ReactElement[];
}

export const Guidelines = forwardRef<HTMLDivElement, GuidelineProps>(
  ({ open, sections, children }, ref) => {
    if (!open) return null;
    return (
      <StyledSideSheet ref={ref}>
        <Content>
          {sections?.map((section, index) => (
            <Section
              key={`section-${section.sectionName}`}
              title={section.sectionName}
            >
              {section.items.map((item, itemIndex) => {
                if ('element' in item) {
                  return (
                    <Item key={`${itemIndex}-${index}`} title={item.title}>
                      {item.element}
                    </Item>
                  );
                }
                return (
                  <Item key={`${itemIndex}-${index}`} title={item.title}>
                    {item.colorBox && (
                      <Colorbox
                        data-testid={`color-box-${item.title}`}
                        $color={item.color}
                      />
                    )}
                    <Icon data={item.icon} color={item.color} size={24} />
                  </Item>
                );
              })}
            </Section>
          ))}
          {children}
        </Content>
      </StyledSideSheet>
    );
  }
);
Guidelines.displayName = 'TopBar.Guidelines';
