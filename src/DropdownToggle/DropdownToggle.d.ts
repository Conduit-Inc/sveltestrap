import { SvelteComponent } from 'svelte';
import { ButtonProps } from './Button';

export interface DropdownToggleProps extends ButtonProps {
  caret?: boolean;
  split?: boolean;
  tag?: 'a' | 'div' | 'span';
  nav?: boolean;
}

declare class DropdownToggle extends SvelteComponent<IDropdownToggleProps> {}
export default DropdownToggle;
