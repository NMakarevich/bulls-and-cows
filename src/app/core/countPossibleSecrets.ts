import type { Base } from './types.ts';
import { BASE_CHARS_COUNT } from './constants.ts';

export default function countPossibleSecrets(base: Base, length: number): number {
  const charsInBase = BASE_CHARS_COUNT[base];

  function count(chars: number, length: number): number {
    if (length === 0) {
      return 1;
    }

    return chars * count(chars - 1, length - 1);
  }

  return count(charsInBase, length);
}
