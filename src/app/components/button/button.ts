import type { ButtonProps } from './types.ts';
import { createElement } from '../../../utils/createElement.ts';
import './button.css';

export default function button(props: ButtonProps) {
  return createElement('button', {
    classList: ['button', ...(props.classList ?? [])],
    children: [props.text],
    setRef: (ref) => {
      if (props.setRef) {
        props.setRef(ref as HTMLButtonElement);
      }
    },
    attributes: { type: String(props.type ?? 'button') },
    eventHandlers: [{ type: 'click', callback: props.onClick }],
  });
}
