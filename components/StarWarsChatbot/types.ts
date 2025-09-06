export interface Message {
  content: string;
  isUser: boolean;
}

export interface ChatHistory {
  yoda: Message[];
  c3po: Message[];
}

export type Character = "yoda" | "c3po";
