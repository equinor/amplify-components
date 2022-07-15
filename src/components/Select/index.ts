import MultiSelectDrawer from './MultiSelectDrawer';
import MultiSelectDrawerWithValidation from './MultiSelectDrawerWithValidation';
import OptionDrawer from './OptionDrawer';
import SimpleMultiSelectDrawer from './SimpleMultiSelectDrawer';
import SingleSelectDrawer from './SingleSelectDrawer';
import SingleSelectDrawerWithValidation from './SingleSelectDrawerWithValidation';

export {
  SingleSelectDrawer,
  SingleSelectDrawerWithValidation,
  MultiSelectDrawer,
  SimpleMultiSelectDrawer,
  MultiSelectDrawerWithValidation,
  OptionDrawer,
};

type SelectItem<T> = {
  object: T;
  id: string;
  label: string;
  children: SelectItem<T>[];
};

export type { SelectItem };
