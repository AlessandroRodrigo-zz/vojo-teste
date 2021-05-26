export interface IArticle {
  author: { username: string; bio?: string; image?: string; following?: boolean };
  body: string;
  createdAt: string;
  description: string;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
  favorited?: boolean;
  favoritesCount: number;
}
