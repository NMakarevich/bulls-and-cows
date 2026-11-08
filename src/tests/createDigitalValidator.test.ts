import { describe, expect, it } from 'vitest';
import createDigitalValidator from '../app/core/createDigitalValidator.ts';

describe('createDigitalValidator', () => {
  it('should return true for "bin" and "0"', () => {
    const validator = createDigitalValidator('bin');
    expect(validator('0')).toBe(true);
  });
  it('should return false for "bin" and "2"', () => {
    const validator = createDigitalValidator('bin');
    expect(validator('2')).toBe(false);
  });
  it('should return true for "hex" and "A"', () => {
    const validator = createDigitalValidator('hex');
    expect(validator('A')).toBe(true);
  });
  it('should return true for "hex" and "a"', () => {
    const validator = createDigitalValidator('hex');
    expect(validator('a')).toBe(true);
  });
  it('should return false for "oct" and "b"', () => {
    const validator = createDigitalValidator('oct');
    expect(validator('oct')).toBe(false);
  });
  it('should return true for "oct" and "7"', () => {
    const validator = createDigitalValidator('oct');
    expect(validator('7')).toBe(true);
  });
});
