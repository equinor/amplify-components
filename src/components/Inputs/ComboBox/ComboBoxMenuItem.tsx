import { KeyboardEvent, MouseEvent, useMemo, useRef, useState } from 'react';

import { Icon, Menu } from '@equinor/eds-core-react';
import {
  arrow_drop_down,
  arrow_drop_up,
  checkbox,
  checkbox_indeterminate,
  checkbox_outline,
} from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import {
  MenuItemMultiselect,
  MenuItemParentSelect,
  MenuItemSpacer,
} from './ComboBox.styles';
import {
  ComboBoxMultiSelectMenuItemProps,
  ComboBoxOptionRequired,
  ComboBoxSingleSelectMenuItemProps,
} from './ComboBox.types';
import { getChildOffset } from './ComboBox.utils';

const { colors } = tokens;

export const ComboBoxMenuItem = <T extends ComboBoxOptionRequired>(
  props:
    | ComboBoxSingleSelectMenuItemProps<T>
    | ComboBoxMultiSelectMenuItemProps<T>
) => {
  const {
    index,
    childOffset,
    depth = 0,
    item,
    multiselect,
    itemRefs,
    onItemKeyDown,
    onItemSelect,
    selectableParent = true,
  } = props;
  const [openParent, setOpenParent] = useState(false);
  const focusingChildIndex = useRef<number>(-1);
  const childRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const parentIcon = useMemo(() => {
    if (!multiselect || !item.children || item.children.length === 0)
      return checkbox_outline;

    if (
      [item, ...item.children].every((option) =>
        props.values.find((i) => i.value === option.value)
      ) ||
      (!selectableParent &&
        item.children.every((option) =>
          props.values.find((i) => i.value === option.value)
        ))
    ) {
      return checkbox;
    } else if (
      [item, ...item.children].some((option) =>
        props.values.find((i) => i.value === option.value)
      )
    ) {
      return checkbox_indeterminate;
    }
    return checkbox_outline;
  }, [item, multiselect, props, selectableParent]);

  const spacers = useMemo(
    () =>
      new Array(depth)
        .fill(0)
        .map((num, index) => <MenuItemSpacer key={`spacer-${num + index}`} />),
    [depth]
  );

  const handleOnClick = (event: MouseEvent) => {
    event.stopPropagation();
    onItemSelect(item);
  };

  const handleOnParentClick = (event: MouseEvent) => {
    if (event.target instanceof HTMLButtonElement && selectableParent) {
      onItemSelect(item);
    } else {
      setOpenParent((prev) => !prev);
    }
  };

  const handleOnChildKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      focusingChildIndex.current += 1;
    } else if (event.key === 'ArrowUp') {
      focusingChildIndex.current -= 1;
    }

    if (focusingChildIndex.current <= -1) {
      // On first child and moving up
      itemRefs.current[index]?.focus();
      focusingChildIndex.current = -1;
    } else if (
      focusingChildIndex.current + childOffset ===
      childRefs.current.length
    ) {
      // Last child, move to next top level
      focusingChildIndex.current = -1;
      onItemKeyDown(event);
      setOpenParent(false);
    } else if (
      focusingChildIndex.current >= 0 &&
      focusingChildIndex.current < childRefs.current.length - childOffset
    ) {
      childRefs.current[focusingChildIndex.current + childOffset]?.focus();
    }
  };

  const handleOnParentKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!openParent && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
      onItemKeyDown(event);
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      setOpenParent((prev) => !prev);
    } else if (
      openParent &&
      event.key === 'ArrowDown' &&
      focusingChildIndex.current === -1
    ) {
      focusingChildIndex.current = 0;
      childRefs.current[focusingChildIndex.current + childOffset]?.focus();
    }
  };

  if (item.children && item.children.length > 0 && multiselect) {
    return (
      <>
        <MenuItemParentSelect
          $depth={depth}
          ref={(element: HTMLButtonElement | null) => {
            itemRefs.current[index] = element;
          }}
          index={index}
          closeMenuOnClick={false}
          onKeyDownCapture={handleOnParentKeyDown}
          onClick={handleOnParentClick}
        >
          {spacers}
          <Icon
            onClick={handleOnClick}
            color={
              selectableParent
                ? colors.interactive.primary__resting.rgba
                : colors.interactive.disabled__fill.rgba
            }
            data={parentIcon}
          />
          {item.label}
          <Icon
            color={colors.interactive.primary__resting.rgba}
            data={openParent ? arrow_drop_up : arrow_drop_down}
          />
        </MenuItemParentSelect>
        {openParent &&
          item.children.map((child, childIndex) => (
            <ComboBoxMenuItem
              key={`child-${childIndex}-${child.value}-${item.value}`}
              index={childOffset + childIndex}
              childOffset={childOffset + getChildOffset([], childIndex)}
              depth={depth + 1}
              multiselect
              item={child}
              itemRefs={childRefs}
              values={props.values}
              onItemKeyDown={handleOnChildKeyDown}
              onItemSelect={onItemSelect}
              selectableParent={selectableParent}
            />
          ))}
      </>
    );
  }

  if (multiselect) {
    return (
      <MenuItemMultiselect
        $depth={depth}
        ref={(element: HTMLButtonElement | null) => {
          itemRefs.current[index] = element;
        }}
        index={index}
        tabIndex={depth}
        closeMenuOnClick={false}
        onKeyDownCapture={onItemKeyDown}
        onClick={handleOnClick}
      >
        {spacers}
        <Icon
          color={colors.interactive.primary__resting.rgba}
          data={
            props.values.find((value) => value.value === item.value)
              ? checkbox
              : checkbox_outline
          }
        />
        {item.label}
      </MenuItemMultiselect>
    );
  }

  return (
    <Menu.Item
      $depth={depth}
      ref={(element: HTMLButtonElement | null) => {
        itemRefs.current[index] = element;
      }}
      index={index}
      onKeyDownCapture={onItemKeyDown}
      onClick={handleOnClick}
    >
      {item.label}
    </Menu.Item>
  );
};
