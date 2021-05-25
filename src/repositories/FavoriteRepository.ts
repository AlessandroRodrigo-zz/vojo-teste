import { AxiosRequestConfig } from 'axios';
import AbstractRepository from './AbstractRepository';

class FavoriteRepository extends AbstractRepository {
  async create(slug: string): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    const response = await this.api.post(`/${slug}/favorite`);

    return { error: false, ...response };
  }
}

export default new FavoriteRepository();
