import type { Base } from './types.ts';
import createDigitalValidator from './createDigitalValidator.ts';

export default function isValidGuess(guess: string, length: number, base: Base): boolean {
  if (guess.length !== length) return false;

  const isValidChar = createDigitalValidator(base);
  const set = new Set(guess.split(''));
  if (set.size !== length) return false;
  for (let i = 0; i < guess.length; i++) {
    if (!isValidChar(guess[i])) return false;
  }
  return true;
}
