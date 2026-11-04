type ElementOptions = {
  children?: Array<HTMLElement | string>;
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
  const { classList, children, attributes, setRef, eventHandlers } = options;
  if (classList) {
    element.classList.add(...classList);
  }
  if (children) {
    element.append(...children);
  }
  if (attributes) {
    for (const key in attributes) {
      element.setAttribute(key, String(attributes[key]));
    }
  }
  if (setRef) {
    setRef(element);
  }
  if (eventHandlers) {
    eventHandlers.forEach(({ type, callback }) => {
      element.addEventListener(type, callback);
    });
  }

  return element;
}
