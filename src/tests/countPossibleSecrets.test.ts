import { describe, expect, it } from 'vitest';
import countPossibleSecrets from '../app/core/countPossibleSecrets.ts';

describe('countPossibleSecrets test', () => {
  it('should return 2 for "bin" and "2"', () => {
    const result = countPossibleSecrets('bin', 2);
    expect(result).toBe(2);
  });
  it('should return 90 for "dec" and "2"', () => {
    const result = countPossibleSecrets('dec', 2);
    expect(result).toBe(90);
  });
  it('should return 524160 for "hex" and "5"', () => {
    const result = countPossibleSecrets('hex', 5);
    expect(result).toBe(524160);
  });
  it('should return 1680 for "oct" and "4"', () => {
    const result = countPossibleSecrets('oct', 4);
    expect(result).toBe(1680);
  });
});
