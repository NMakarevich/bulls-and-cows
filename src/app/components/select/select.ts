import { createElement } from '../../../utils/createElement.ts';
import type { SelectProps } from './types.ts';

import './select.css';

export default function select(selectProps: SelectProps): HTMLElement {
  const { options } = selectProps;
  let isOpen = false;

  let selectComponentRef: HTMLElement;
  let selectFieldRef: HTMLElement;

  function handleSelectOption(event: Event) {
    const { target } = event;
    if (target instanceof HTMLElement && target.role === 'option') {
      const value = target.dataset.value;
      if (value) {
        selectComponentRef.dataset.value = value;
        selectFieldRef.replaceChildren(value);
        const event = new Event('change');
        selectComponentRef.dispatchEvent(event);
      }
    }
    selectFieldRef.classList.remove('open');
    isOpen = false;
  }

  function toggleSelect(event: Event) {
    const { target } = event;
    if (target instanceof HTMLElement && target.role === 'combobox') {
      selectFieldRef.classList.toggle('open');
      isOpen = !isOpen;
    }
  }

  document.addEventListener('click', (event: Event) => {
    if (!isOpen) return;
    const { target } = event;
    if (target instanceof HTMLElement && !target.closest('.select')) {
      selectFieldRef.classList.remove('open');
      isOpen = false;
    }
  });

  return createElement('div', {
    classList: ['select'],
    setRef: (element) => (selectComponentRef = element),
    attributes: {
      'data-value': options[0],
    },
    children: [
      createElement('div', {
        attributes: {
          role: 'combobox',
        },
        classList: ['select-field'],
        setRef: (element) => (selectFieldRef = element),
        eventHandlers: [{ type: 'click', callback: toggleSelect }],
        children: [String(options[0])],
      }),
      createElement('ul', {
        classList: ['select-options'],
        attributes: { role: 'listbox' },
        children: [
          ...options.map((option) =>
            createElement('li', {
              classList: ['select-option'],
              attributes: { role: 'option', 'data-value': option },
              eventHandlers: [{ type: 'click', callback: handleSelectOption }],
              children: [String(option)],
            })
          ),
        ],
      }),
    ],
  });
}
