export default function isEnteredGuess(guessList: string[], guess: string): boolean {
  return guessList.some((guessInList) => guessInList.toLowerCase() === guess.toLowerCase());
}
