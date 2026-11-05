import { createElement } from '../../../../utils/createElement.ts';
import button from '../../button/button.ts';
import './header.css';

export default function header(onClick: () => void) {
  return createElement('header', {
    classList: ['header'],
    children: [
      createElement('div', {
        classList: ['container'],
        children: [
          button({ text: 'Новая игра', onClick: onClick }),
          button({ text: 'Таблица лидеров', onClick: () => {} }),
        ],
      }),
    ],
  });
}
