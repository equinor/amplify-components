import { FC, useEffect, useMemo, useRef } from 'react';

import { Typography } from '@equinor/eds-core-react';

import { GAP, HEIGHT } from './TableOfContents.constants';
import {
  Button,
  ChildContainer,
  Container,
  CountDot,
} from './TableOfContents.styles';
import { TableOfContentsVariants } from './TableOfContents.types';
import {
  TableOfContentsItemType,
  useTableOfContents,
} from 'src/providers/TableOfContentsProvider';
import { getValues } from 'src/providers/TableOfContentsProvider.utils';
import { spacings } from 'src/style';

import { AnimatePresence } from 'framer-motion';

interface TableOfContentsItemProps extends TableOfContentsItemType {
  index?: number;
  onlyShowSelectedChildren: boolean;
  variant: TableOfContentsVariants;
}

const TableOfContentsItem: FC<TableOfContentsItemProps> = ({
  index = 1,
  label,
  value,
  count,
  disabled = false,
  children,
  variant,
  onlyShowSelectedChildren,
}) => {
  const { items, isActive, selected, setSelected } = useTableOfContents();
  const initialHeight = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (initialHeight.current === undefined) {
      initialHeight.current = 0;
    }
  }, []);

  const active = useMemo(
    () => isActive({ label, value, children }, variant) && !disabled,
    [children, disabled, isActive, label, value, variant]
  );

  const handleOnClick = () => {
    if (!active && !disabled) setSelected(value);
  };

  const shouldShowChildren: boolean =
    (onlyShowSelectedChildren && active) || !onlyShowSelectedChildren;

  return (
    <Container $variant={variant} layoutScroll layoutRoot>
      <Button
        $active={active}
        $variant={variant}
        onClick={handleOnClick}
        disabled={active || disabled}
      >
        <span title={label}>{label}</span>
        {count !== undefined && (
          <CountDot className="count-dot">
            <Typography as="span" variant="label" group="navigation">
              {count}
            </Typography>
          </CountDot>
        )}
      </Button>
      {children && (
        <AnimatePresence>
          {shouldShowChildren && (
            <ChildContainer
              $variant={variant}
              initial={{ height: initialHeight.current }}
              animate={{
                height: `
                  calc(
                    (${HEIGHT[variant]} * ${children.length}) 
                    ${
                      variant === 'buttons'
                        ? `+ (${GAP.buttons} * ${children.length - 1})`
                        : ''
                    }
                  )`,
              }}
              exit={{
                height: 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {children.map((child) => (
                <TableOfContentsItem
                  key={child.value}
                  onlyShowSelectedChildren={onlyShowSelectedChildren}
                  variant={variant}
                  {...child}
                />
              ))}
            </ChildContainer>
          )}
        </AnimatePresence>
      )}
    </Container>
  );
};

export default TableOfContentsItem;
