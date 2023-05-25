import Feedback from './Feedback/Feedback';
import { Account } from './Account';
import { Actions } from './Actions';
import FieldSelector from './FieldSelector';
import { Guidelines, GuidelineSections } from './Guidelines';
import Notifications from './Notifications';
import { ISettingsProps, Settings } from './Settings';
import { TopBar as BaseTopBar } from './TopBar';

type TopBarType = typeof BaseTopBar & {
  Account: typeof Account;
  Actions: typeof Actions;
  Guidelines: typeof Guidelines;
  Settings: typeof Settings;
  Notifications: typeof Notifications;
  Feedback: typeof Feedback;
  FieldSelector: typeof FieldSelector;
};

const TopBar = BaseTopBar as TopBarType;
TopBar.Account = Account;
TopBar.Actions = Actions;
TopBar.Guidelines = Guidelines;
TopBar.Settings = Settings;
TopBar.Notifications = Notifications;
TopBar.Feedback = Feedback;
TopBar.FieldSelector = FieldSelector;

export default TopBar;
export type { GuidelineSections, ISettingsProps, TopBarType };
