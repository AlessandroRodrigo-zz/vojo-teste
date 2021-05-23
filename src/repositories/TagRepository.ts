import AbstractRepository from './AbstractRepository';
import { AxiosRequestConfig } from 'axios';

class TagRepository extends AbstractRepository {
  async index(): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    try {
      const response = await this.api.get('/tags');

      return { error: false, ...response };
    } catch (e) {
      return { error: true, ...e };
    }
  }
}

export default new TagRepository();
