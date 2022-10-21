import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react';

import { Button, Icon, Input, Label } from '@equinor/eds-core-react';
import { arrow_drop_down, arrow_drop_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';
import { useOutsideClick } from '@equinor/eds-utils';

import OptionDrawer from './OptionDrawer';

import styled from 'styled-components';

const { colors, spacings, elevation } = tokens;

const StyledWrapper = styled.div`
  position: relative;
`;

const StyledInputWrapper = styled.div`
  position: relative;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  right: ${spacings.comfortable.small};
  height: ${spacings.comfortable.large};
  width: ${spacings.comfortable.large};
  top: 6px;
`;

const StyledList = styled.div`
  background: ${colors.ui.background__default.rgba};
  box-shadow: ${elevation.raised};
  overflow-y: scroll;
  max-height: 300px;
  padding: 0;
  margin-top: 4px;
  position: absolute;
  right: 0;
  left: 0;
  z-index: 50;
`;

const SearchChildren = <
  T extends { id: string; label: string; children?: T[] }
>(
  items: T[],
  search: string
): T[] => {
  const values = items.map((item) => {
    if (item.children && item.children.length > 0) {
      const children = SearchChildren(item.children, search).filter((c) => c);
      if (children.length > 0) {
        return { ...item, children: children };
      }
      return item.label.toLowerCase().includes(search.toLowerCase())
        ? { ...item, children: undefined }
        : undefined;
    }
    return item.label.toLowerCase().includes(search.toLowerCase())
      ? item
      : undefined;
  });

  return values.filter((v) => v) as T[];
};

export type SimpleMultiSelectDrawerProps<
  T extends { id: string; label: string; children?: T[] }
> = {
  disabled?: boolean;
  id?: string;
  items: T[];
  selectedItems: T[];
  label: string;
  meta?: string;
  onChange: (values: T[]) => void;
  placeholder?: string;
  readOnly?: boolean;
  style?: CSSProperties;
};

const SimpleMultiSelectDrawer = <
  T extends { id: string; label: string; children?: T[] }
>({
  disabled = false,
  id,
  items = [],
  selectedItems = [],
  label,
  meta,
  onChange,
  placeholder,
  readOnly = false,
  style,
}: SimpleMultiSelectDrawerProps<T>) => {
  const [search, setSearch] = useState<string>('');
  const [inputItems, setInputItems] = useState<T[]>(items);
  const [open, setOpen] = useState<boolean>(false);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(menuRef.current as HTMLElement, (e) => {
    if (
      !menuRef.current?.contains(e.target as Node) &&
      !inputWrapperRef.current?.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  });

  const handleToggle = (item: T, toggle: boolean) => {
    if (toggle) {
      onChange([...selectedItems, item]);
    } else {
      onChange(selectedItems.filter((i) => i.id !== item.id));
    }
  };

  useEffect(() => {
    if (search !== '') {
      setInputItems(SearchChildren(items, search));
    } else {
      setInputItems(items);
    }
  }, [search, items]);

  return (
    <StyledWrapper style={style}>
      <Label label={label} meta={meta} disabled={disabled} />
      <StyledInputWrapper ref={inputWrapperRef}>
        <Input
          id={id}
          disabled={disabled}
          value={search}
          readOnly={readOnly}
          onFocus={() => setOpen(true)}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          placeholder={placeholder}
        />
        <StyledButton
          variant="ghost_icon"
          aria-label="toggle options"
          title="open"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon data={open ? arrow_drop_up : arrow_drop_down} />
        </StyledButton>
      </StyledInputWrapper>
      <StyledList ref={menuRef}>
        {open &&
          inputItems.map((item) => (
            <OptionDrawer<T>
              key={item.id}
              onToggle={handleToggle}
              selectedItems={selectedItems}
              item={item}
              singleSelect
            />
          ))}
      </StyledList>
    </StyledWrapper>
  );
};

SimpleMultiSelectDrawer.displayName = 'SimpleMultiSelectDrawer';

export default SimpleMultiSelectDrawer;
