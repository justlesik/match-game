import { Difficulty } from '../constants/difficulties.constant';

const difficultyToCardMap: { [key in Difficulty]: number } = {
  easy: 3,
  normal: 6,
  hard: 10,
};

export const getCardsByDifficulty = (cards: any[], difficulty: Difficulty) =>
  cards.slice(0, difficultyToCardMap[difficulty]);
