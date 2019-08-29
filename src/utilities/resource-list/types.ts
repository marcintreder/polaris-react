import {CheckboxHandles} from '../../types';

export type ResourceListSelectedItems = string[] | 'All';

export type CheckableButtonNode = CheckboxHandles;
export type CheckableButtonKey = 'plain' | 'bulkSm' | 'bulkLg';
export type CheckableButtons = Map<CheckableButtonKey, CheckableButtonNode>;

export const SELECT_ALL_ITEMS = 'All';
