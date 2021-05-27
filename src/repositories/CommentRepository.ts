import AbstractRepository from './AbstractRepository';
import { AxiosRequestConfig } from 'axios';

class CommentRepository extends AbstractRepository {
  async create(
    slug: string,
    comment: string,
  ): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    try {
      const response = await this.api.post(`/articles/${slug}/comments`, { comment: { body: comment } });

      return { error: false, ...response };
    } catch (e) {
      return { error: true, ...e };
    }
  }

  async delete(
    slug: string,
    commentId: number,
  ): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    try {
      const response = await this.api.delete(`/articles/${slug}/comments/${commentId}`);

      return { error: false, ...response };
    } catch (e) {
      return { error: true, ...e };
    }
  }

  async index(slug: string): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    try {
      const response = await this.api.get(`/articles/${slug}/comments`);

      return { error: false, ...response };
    } catch (e) {
      return { error: true, ...e };
    }
  }
}

export default new CommentRepository();
