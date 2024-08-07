import { Select } from 'src/molecules/Select/Select';
import {
  CommonSelectProps,
  GroupedSelectProps,
  ListSelectProps,
  SelectOptionRequired,
  SingleSelectCommon,
} from 'src/molecules/Select/Select.types';

export type SingleSelectProps<T extends SelectOptionRequired> =
  CommonSelectProps &
    SingleSelectCommon<T> &
    (GroupedSelectProps<T> | ListSelectProps<T>);

export function SingleSelect<T extends SelectOptionRequired>(
  props: SingleSelectProps<T>
) {
  return <Select {...props} />;
}
