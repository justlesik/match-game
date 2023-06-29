export interface CardSet {
  id: number;
  name: string;
  matched: boolean;
}

export const animals: Omit<CardSet, 'id'>[] = [
  { name: '🐶', matched: false },
  { name: '🐱', matched: false },
  { name: '🐭', matched: false },
  { name: '🐹', matched: false },
  { name: '🐰', matched: false },
  { name: '🦊', matched: false },
  { name: '🐻', matched: false },
  { name: '🐼', matched: false },
  { name: '🐯', matched: false },
  { name: '🦁', matched: false },
];
