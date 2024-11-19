export type Word = {
  id: string;
  origin: string;
  translated: string;
  checked: boolean;
  listState: "straggle" | "passing" | "mastery";
  userId: string;
};
