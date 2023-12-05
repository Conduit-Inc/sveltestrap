import { FadeProps } from '../Fade';
import { SvelteComponent } from 'svelte';
import { Color } from '../shared';

export interface AlertProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap['div']> {
  closeAriaLabel?: string;
  closeClassName?: string;
  color?: Color;
  dismissible?: boolean;
  fade?: boolean;
  heading?: string;
  isOpen?: boolean;
  toggle?: () => void;
  transition?: FadeProps;
}

export default class Alert extends SvelteComponent<
  AlertProps,
  {},
  { default: {}; heading: {} }
> {}
