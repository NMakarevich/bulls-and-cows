import header from './header/header.ts';
import { createElement } from '../../../utils/createElement.ts';
import button from '../button/button.ts';
import footer from './footer/footer.ts';
import select from '../select/select.ts';

import './layout.css';

export default function layout() {
  const headerElement = header(resetGame);
  const footerElement = footer();

  let guessField: HTMLInputElement;
  let guessList: HTMLOListElement;
  let settings: HTMLElement;
  let startGameButton: HTMLButtonElement;

  const baseSelect = select({ options: ['bin', 'oct', 'dec', 'hex'] });

  const getLengthOptions = () => {
    const base = baseSelect.dataset.value;
    if (!base) return [];
    if (base === 'bin') return [2];
    return [2, 3, 4, 5, 6];
  };

  let lengthSelect = select({ options: getLengthOptions() });

  const handleGuess = () => {
    guessList.append(guessElement(guessField.value));
    guessField.value = '';
  };

  const handleChangeBase = () => {
    const newSelect = select({ options: getLengthOptions() });
    settings.replaceChild(newSelect, lengthSelect);
    lengthSelect = newSelect;
  };

  baseSelect.addEventListener('change', handleChangeBase);

  function startGame() {
    baseSelect.setAttribute('disabled', '');
    lengthSelect.setAttribute('disabled', '');
    startGameButton.disabled = true;
  }

  function resetGame() {
    guessList.replaceChildren('');
    baseSelect.removeAttribute('disabled');
    lengthSelect.removeAttribute('disabled');
    startGameButton.disabled = false;
  }

  const guessElement = (data: string) => {
    return createElement('li', { classList: ['guess-list__item'], children: [data] });
  };

  const mainElement = createElement('main', {
    classList: ['main'],
    children: [
      createElement('div', {
        classList: ['container'],
        children: [
          createElement('div', {
            classList: ['settings'],
            children: [
              baseSelect,
              lengthSelect,
              button({
                text: 'Начать игру',
                onClick: startGame,
                setRef: (ref) => (startGameButton = ref),
              }),
            ],
            setRef: (ref) => (settings = ref),
          }),
          createElement('div', {
            classList: ['controls'],
            children: [
              createElement('input', {
                classList: ['guess-field'],
                attributes: { type: 'text', name: 'guess' },
                setRef: (ref) => (guessField = ref as typeof guessField),
              }),
              button({ text: 'Угадать', onClick: handleGuess }),
            ],
          }),
          createElement('ol', {
            classList: ['guess-list'],
            setRef: (ref) => (guessList = ref as typeof guessList),
          }),
        ],
      }),
    ],
  });

  const render = () => {
    document.body.append(headerElement, mainElement, footerElement);
  };

  return { render } as const;
}
