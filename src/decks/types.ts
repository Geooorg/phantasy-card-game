export interface Card {
  id: string;
  image: string;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  back: string;
  cards: Card[];
  open: Card[];
}
