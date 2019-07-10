export interface Choice {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface QNA {
  id: string;
  question: string;
  choices: Choice[];
  answer: string;
}
