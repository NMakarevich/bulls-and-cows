import header from './header/header.ts';
import { createElement } from '../../../utils/createElement.ts';
import button from '../button/button.ts';
import footer from './footer/footer.ts';

import './layout.css';

export default function layout() {
  const headerElement = header(newGame);
  const footerElement = footer();

  let guessField: HTMLInputElement;
  let guessList: HTMLOListElement;

  const handleGuess = () => {
    guessList.append(guessElement(guessField.value));
    guessField.value = '';
  };

  function newGame() {
    guessList.replaceChildren('');
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
          createElement('div', { classList: ['settings'] }),
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
