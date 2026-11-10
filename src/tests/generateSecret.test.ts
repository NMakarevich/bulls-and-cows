import { describe, expect, it } from 'vitest';
import generateSecret from '../app/core/generateSecret.ts';

describe('generateSecret tests', () => {
  it('Should return 01 for "bin" and random = 0', () => {
    const result = generateSecret(2, 'bin', () => 0);
    expect(result).toBe('01');
  });
  it('Should return 4352 for "oct", length = 4 and random = 0.5', () => {
    const result = generateSecret(4, 'oct', () => 0.5);
    expect(result).toBe('4352');
  });
  it('Should return 765843 for "dec" length = 6 and random = 0.73', () => {
    const result = generateSecret(6, 'dec', () => 0.73);
    expect(result).toBe('765843');
  });
  it('Should return a9b for "hex" length = 3 and random = 0.65', () => {
    const result = generateSecret(3, 'hex', () => 0.65);
    expect(result).toBe('a9b');
  });
});
