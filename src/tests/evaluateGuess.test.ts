import { describe, expect, it } from 'vitest';
import evaluateGuess from '../app/core/evaluateGuess.ts';

describe('evaluateGuess', () => {
  it('should return { bulls: 0, cows: 2 } for secret = "01" and guess = "10', () => {
    const result = evaluateGuess('01', '10');
    expect(result).toEqual({ bulls: 0, cows: 2 });
  });
  it('should return { bulls: 2, cows: 2 } for secret = "3547" and guess = "3745"', () => {
    const result = evaluateGuess('3547', '3745');
    expect(result).toEqual({ bulls: 2, cows: 2 });
  });
  it('should return { bulls: 3, cows: 0 } for secret = "369" and guess = "369"', () => {
    const result = evaluateGuess('369', '369');
    expect(result).toEqual({ bulls: 3, cows: 0 });
  });
  it('should return { bulls: 3, cows: 2 } for secret = "127A69" and guess = "1A7239"', () => {
    const result = evaluateGuess('127A69', '1A7239');
    return expect(result).toEqual({ bulls: 3, cows: 2 });
  });
});
