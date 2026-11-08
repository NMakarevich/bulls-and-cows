import type { Base } from './types.ts';
import { BASE_CHARS_COUNT, CHARS } from './constants.ts';

export default function generateSecret(length: number, base: Base, random = Math.random): string {
  const availableChars = CHARS.slice(0, BASE_CHARS_COUNT[base]);

  let result = '';

  for (let i = 0; i < length; i += 1) {
    const charIndex = Math.floor(random() * availableChars.length);
    result += availableChars.splice(charIndex, 1)[0];
  }

  return result;
}
