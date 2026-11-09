import { describe, expect, it } from 'vitest';
import isEnteredGuess from '../app/core/isEnteredGuess.ts';

describe('isEnteredGuess', () => {
  const guessList = ['0123', 'abc', '01', '239'];
  it('should return true when guess is entered previously', () => {
    const isEntered = isEnteredGuess(guessList, 'abc');
    expect(isEntered).toBeTruthy();
  });
  it('should return true when guess is entered previously', () => {
    const isEntered = isEnteredGuess(guessList, 'ABC');
    expect(isEntered).toBeTruthy();
  });
  it('should return false when guess is not entered previously', () => {
    const isEntered = isEnteredGuess(guessList, 'ABD');
    expect(isEntered).toBeFalsy();
  });
});
