export interface Choice {
  id: string;
  text: string;
  imageUrl: string;
}

export interface QNA {
  id: string;
  question: string;
  choices: Choice[];
  answer: string;
}
