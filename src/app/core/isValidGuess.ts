import type { Base } from './types.ts';
import createDigitalValidator from './createDigitalValidator.ts';

export default function isValidGuess(guess: string, length: number, base: Base): boolean {
  if (guess.length !== length) return false;

  const isValidChar = createDigitalValidator(base);
  for (let i = 0; i < guess.length; i++) {
    if (!isValidChar(guess[i])) return false;
  }
  return true;
}
