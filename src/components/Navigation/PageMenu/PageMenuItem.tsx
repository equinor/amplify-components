import { FC, useMemo } from 'react';

import { Button, Container } from './PageMenuItem.styles';
import { PageMenuItemType, usePageMenu } from 'src/providers/PageMenuProvider';

interface PageMenuItemProps extends PageMenuItemType {
  onlyShowSelectedChildren: boolean;
  layer?: number;
}

const PageMenuItem: FC<PageMenuItemProps> = ({
  label,
  value,
  children,
  onlyShowSelectedChildren,
  layer = 0,
}) => {
  const { isActive, setSelected } = usePageMenu();

  const active = useMemo(
    () => isActive({ label, value, children }),
    [children, isActive, label, value]
  );

  const handleOnClick = () => {
    if (!active) setSelected(value);
  };

  if (children) {
    return (
      <Container $layer={layer}>
        <Button $active={active} onClick={handleOnClick} disabled={active}>
          {label}
        </Button>
        {((onlyShowSelectedChildren && active) || !onlyShowSelectedChildren) &&
          children.map((child) => (
            <PageMenuItem
              key={`${value}-child-${child.value}`}
              onlyShowSelectedChildren={onlyShowSelectedChildren}
              layer={layer + 1}
              {...child}
            />
          ))}
      </Container>
    );
  }

  return (
    <Button $active={active} onClick={handleOnClick} disabled={active}>
      {label}
    </Button>
  );
};

export default PageMenuItem;
