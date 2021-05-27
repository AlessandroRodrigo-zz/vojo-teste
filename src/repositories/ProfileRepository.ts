import { AxiosRequestConfig } from 'axios';
import AbstractRepository from './AbstractRepository';

class ProfileRepository extends AbstractRepository {
  async create(username: string): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    try {
      const response = await this.api.post(`/profiles/${username}/follow`);

      return { error: false, ...response };
    } catch (error) {
      return { error: true, ...error };
    }
  }

  async delete(username: string): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    try {
      const response = await this.api.delete(`/profiles/${username}/follow`);

      return { error: false, ...response };
    } catch (error) {
      return { error: true, ...error };
    }
  }
}

export default new ProfileRepository();
