type ElementOptions = {
  children?: HTMLElement[];
  classList?: string[];
  attributes?: Record<string, string | number | boolean>;
  setRef?: (element: Element) => void;
  eventHandlers?: EventHandler[];
};

type EventHandler = {
  type: keyof HTMLElementEventMap;
  callback: EventListener;
};

export function createElement(
  tag: keyof HTMLElementTagNameMap,
  options: ElementOptions = {}
): HTMLElement {
  const element = document.createElement(tag);
  console.log(options);
  return element;
}
