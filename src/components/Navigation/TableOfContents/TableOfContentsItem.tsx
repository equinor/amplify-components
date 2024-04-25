import { FC, useEffect, useMemo, useRef } from 'react';

import { GAP, HEIGHT } from './TableOfContents.constants';
import { Button, ChildContainer, Container } from './TableOfContents.styles';
import { TableOfContentsVariants } from './TableOfContents.types';
import { Badge } from 'src/components/DataDisplay/Badge/Badge';
import {
  TableOfContentsItemType,
  useTableOfContents,
} from 'src/providers/TableOfContentsProvider';

interface TableOfContentsItemProps extends TableOfContentsItemType {
  onlyShowSelectedChildren: boolean;
  variant: TableOfContentsVariants;
  activeParent?: boolean;
}

const TableOfContentsItem: FC<TableOfContentsItemProps> = ({
  label,
  value,
  count,
  disabled = false,
  children,
  variant,
  onlyShowSelectedChildren,
}) => {
  const { isActive, selected, setSelected } = useTableOfContents();
  const initialHeight = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (initialHeight.current === undefined) {
      initialHeight.current = 0;
    }
  }, []);

  const active = useMemo(
    () => isActive({ label, value, children }) && !disabled,
    [children, disabled, isActive, label, value]
  );

  const handleOnClick = () => {
    if (!disabled && selected !== value) setSelected(value);
  };

  const shouldShowChildren: boolean =
    (onlyShowSelectedChildren && active) || !onlyShowSelectedChildren;

  return (
    <Container $variant={variant} layoutScroll layoutRoot>
      <Button
        $active={selected === value}
        $variant={variant}
        onClick={handleOnClick}
        disabled={disabled}
      >
        <span title={label}>{label}</span>
        {count !== undefined && (
          <Badge variant={count === 0 ? 'empty' : 'light'} value={count} />
        )}
      </Button>
      {children && (
        <ChildContainer
          $shouldShowChildren={shouldShowChildren}
          $variant={variant}
          initial={{ height: initialHeight.current }}
          animate={{
            height: `
                  calc(
                    (${shouldShowChildren ? HEIGHT[variant] : '0'} * ${children.length})
                    ${
                      variant === 'buttons'
                        ? `+ (${GAP.buttons} * ${children.length - 1})`
                        : ''
                    }
                  )`,
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
    </Container>
  );
};

export default TableOfContentsItem;
