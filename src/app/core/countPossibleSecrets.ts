export type Base = 'bin' | 'oct' | 'dec' | 'hex';

const baseCharsQuantity: Record<Base, number> = {
  bin: 2,
  oct: 8,
  dec: 10,
  hex: 16,
};

export default function countPossibleSecrets(base: Base, length: number): number {
  const charsInBase = baseCharsQuantity[base];

  function count(chars: number, length: number): number {
    if (length === 0) {
      return 1;
    }

    return chars * count(chars - 1, length - 1);
  }

  return count(charsInBase, length);
}
