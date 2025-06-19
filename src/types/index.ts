export interface QuizAnswer {
  questionId: number;
  question: string;
  answer: string;
  value: number;
  isCustom?: boolean;
}

export interface Book {
  title: string;
  author: string;
  reason: string;
}

export interface RecommendationResult {
  genre: string;
  description: string;
  books: Book[];
}

export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    value: number;
    isOther?: boolean;
  }[];
  category: 'mood' | 'personality' | 'preference' | 'lifestyle';
}