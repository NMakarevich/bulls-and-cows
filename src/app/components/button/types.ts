export type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick: () => void;
  classList?: string[];
  ref?: HTMLElement;
};
