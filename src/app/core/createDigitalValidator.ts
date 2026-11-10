import type { Base } from './types.ts';
import { BASE_CHARS_COUNT, CHARS } from './constants.ts';

export default function createDigitalValidator(base: Base) {
  const availableChars = CHARS.slice(0, BASE_CHARS_COUNT[base]);
  return function validateChar(char: string): boolean {
    return availableChars.includes(char.toLowerCase());
  };
}
