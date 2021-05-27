import { IAuthor } from './Author.d';

export interface IComment {
  author: IAuthor;
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}
