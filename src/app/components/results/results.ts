import { getGameResults } from '../../../utils/localStorage.ts';
import { createElement } from '../../../utils/createElement.ts';
import type { Base } from '../../core/types.ts';

export default function results() {
  const results = getGameResults();

  if (Object.keys(results).length === 0) {
    return createElement('div', { children: ['Еще нет результатов'] });
  }

  return createElement('ul', {
    classList: ['base-list'],
    children: [
      ...Object.keys(results).map((base) => {
        return createElement('li', {
          classList: ['base-item'],
          children: [
            `${base}: `,
            createElement('ul', {
              classList: ['length-list'],
              children: [
                ...Object.keys(results[base as Base]).map((length) => {
                  return createElement('li', {
                    classList: ['length-item'],
                    children: [
                      `${length}: `,
                      createElement('ul', {
                        classList: ['results-list'],
                        children: [
                          ...[
                            ...results[base as Base][Number(length)].sort(
                              (a, b) => a.turns - b.turns || a.time - b.time
                            ),
                          ].map((result) => {
                            return createElement('li', {
                              classList: ['results-item'],
                              children: [`Ходов: ${result.turns}. Время: ${result.time}`],
                            });
                          }),
                        ],
                      }),
                    ],
                  });
                }),
              ],
            }),
          ],
        });
      }),
    ],
  });
}
