import { createElement } from '../../../../utils/createElement.ts';
import button from '../../button/button.ts';
import './header.css';

export default function header(newGame: () => void, showResults: () => void) {
  return createElement('header', {
    classList: ['header'],
    children: [
      createElement('div', {
        classList: ['container'],
        children: [
          button({ text: 'Новая игра', onClick: newGame }),
          button({ text: 'Таблица лидеров', onClick: showResults }),
        ],
      }),
    ],
  });
}
