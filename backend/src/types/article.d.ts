export type Article = {
  id: string; //created by uuid
  title: string;
  content: string;
  published: boolean;
  userId: string; // Foreign Key
};
