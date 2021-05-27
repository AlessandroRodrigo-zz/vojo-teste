import { IAuthor } from './Author.d';
export interface IArticle {
  author: IAuthor;
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
