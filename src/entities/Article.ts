export interface IArticle {
  UserEmail: string;
  author: { username: string; email: string; bio?: string; image?: string };
  body: string;
  createdAt: string;
  description: string;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}
