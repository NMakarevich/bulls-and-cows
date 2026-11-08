type GuessResult = {
  bulls: number;
  cows: number;
};

export default function evaluateGuess(secret: string, guess: string): GuessResult {
  console.log(secret, guess);
  return { bulls: 0, cows: 0 };
}
