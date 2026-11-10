import type { Base } from '../../core/types.ts';

export type GameSession = {
  base: Base;
  length: number;
  guessHistory: GuessTurn[];
  secret: string;
};

export type GuessTurn = {
  guess: string;
  bulls: number;
  cows: number;
};

export type SecretVariantsStorage = Record<Base, Record<number, number>>;
