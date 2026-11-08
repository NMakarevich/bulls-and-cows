type GuessResult = {
  bulls: number;
  cows: number;
};

export default function evaluateGuess(secret: string, guess: string): GuessResult {
  return guess.split('').reduce<GuessResult>(
    (result, char, index) => {
      if (char.toLowerCase() === secret[index].toLowerCase()) {
        result.bulls += 1;
      } else if (secret.toLowerCase().includes(char.toLowerCase())) {
        result.cows += 1;
      }
      return result;
    },
    { bulls: 0, cows: 0 }
  );
}
