import type { Base } from './types.ts';

export default function createDigitalValidator(base: Base) {
  console.log(base);
  return function validateChar(char: string): boolean {
    return !!char;
  };
}
