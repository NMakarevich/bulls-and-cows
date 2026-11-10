import type { Base } from './types.ts';

export const BASE_LIST = ['bin', 'oct', 'dec', 'hex'] as const;

export const BASE_CHARS_COUNT: Record<Base, number> = {
  bin: 2,
  oct: 8,
  dec: 10,
  hex: 16,
};

export const CHARS = '0123456789abcdef'.split('');
