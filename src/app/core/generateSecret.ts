import type { Base } from './countPossibleSecrets.ts';

export default function generateSecret(length: number, base: Base, random = Math.random): string {
  console.log(length, base, random);
  return '';
}
