import { type Base, baseCharsQuantity } from './countPossibleSecrets.ts';

export default function generateSecret(length: number, base: Base, random = Math.random): string {
  const chars = '0123456789ABCDEF'.split('');
  const availableChars = chars.slice(0, baseCharsQuantity[base]);

  let result = '';

  for (let i = 0; i < length; i += 1) {
    const charIndex = Math.floor(random() * availableChars.length);
    result += availableChars.splice(charIndex, 1)[0];
  }

  return result;
}
