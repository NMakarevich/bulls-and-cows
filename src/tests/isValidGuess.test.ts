import { describe, expect, it } from 'vitest';
import isValidGuess from '../app/core/isValidGuess.ts';

describe('isValidGuess', () => {
  it('should return false if length is mismatch', () => {
    const result = isValidGuess('2345', 3, 'oct');
    expect(result).toBe(false);
  });
  it('should return false if chars is not match base: guess = 259, base = "oct"', () => {
    const result = isValidGuess('259', 3, 'oct');
    expect(result).toBe(false);
  });
  it('should return true for guess = "0173" length = 4 and base = "oct"', () => {
    const result = isValidGuess('0173', 4, 'oct');
    expect(result).toBe(true);
  });
  it('should return true for guess = "A9C" length = 3 and base = "hex"', () => {
    const result = isValidGuess('A9C', 3, 'hex');
    expect(result).toBe(true);
  });
  it('should return false for guess = "010" length = 2 and base = "bin"', () => {
    const result = isValidGuess('010', 2, 'bin');
    expect(result).toBe(false);
  });
});
