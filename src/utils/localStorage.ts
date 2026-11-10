import type { Base } from '../app/core/types.ts';

export type LocalStorage = {
  [key in Base]: Record<number, GameResult[]>;
};
type GameResult = {
  time: number;
  turns: number;
};

export function getGameResults() {
  const results = localStorage.getItem('bullsAndCowsResults');
  if (!results) return {} as LocalStorage;
  try {
    return JSON.parse(results) as LocalStorage;
  } catch {
    return {} as LocalStorage;
  }
}

export function saveGameResults(base: Base, length: number, result: GameResult) {
  const ls = getGameResults();
  if (!ls[base]) {
    ls[base] = {};
    ls[base][length] = [result];
  } else if (!ls[base][length]) {
    ls[base][length] = [result];
  } else {
    ls[base][length].push(result);
  }
  localStorage.setItem('bullsAndCowsResults', JSON.stringify(ls));
}
