export type Difficulty = 'easy' | 'normal' | 'hard';

export const difficulties: { [key in Difficulty]: Difficulty } = {
  easy: 'easy',
  normal: 'normal',
  hard: 'hard',
};
