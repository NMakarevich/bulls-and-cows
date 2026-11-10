import { createElement } from '../../../../utils/createElement.ts';
import './footer.css';

export default function footer() {
  return createElement('footer', {
    classList: ['footer'],
    children: [
      createElement('div', {
        classList: ['container'],
        children: [
          createElement('a', {
            classList: ['link'],
            attributes: { href: 'https://github.com/nmakarevich', target: '_blank' },
            children: ['NMakarevich'],
          }),
          createElement('span', { children: ['2026'] }),
          createElement('a', {
            classList: ['link'],
            attributes: { href: 'https://rs.school/courses/javascript', target: '_blank' },
            children: [
              createElement('img', {
                classList: ['link__image'],
                attributes: { src: 'rslogo.svg', alt: 'logo' },
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
