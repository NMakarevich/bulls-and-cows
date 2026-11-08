type base = 'bin' | 'oct' | 'dec' | 'hex';

const baseCharsQuantity: Record<base, number> = {
  bin: 2,
  oct: 8,
  dec: 10,
  hex: 16,
};

export default function countPossibleSecrets(base: base, length: number): number {
  console.log(base, length, baseCharsQuantity);
  return length;
}
