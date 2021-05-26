import AbstractRepository from './AbstractRepository';
import { AxiosRequestConfig } from 'axios';

class ArticleRepository extends AbstractRepository {
  async index(
    limit: number,
    offset: number,
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
      const response = await this.api.get('/articles', { params: { limit, offset } });

      return { error: false, ...response };
    } catch (e) {
      return { error: true, ...e };
    }
  }

  async indexPersonalFeed(
    limit: number,
    offset: number,
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
      const response = await this.api.get('/articles/feed', { params: { limit, offset } });

      return { error: false, ...response };
    } catch (e) {
      return { error: true, ...e };
    }
  }
}

export default new ArticleRepository();
