import AbstractRepository from './AbstractRepository';
import { IUser } from '../entities/User';
import { AxiosRequestConfig } from 'axios';

class UserRepository extends AbstractRepository {
  async create(user: IUser): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    try {
      const response = await this.api.post('/users', { user });

      return { error: false, ...response };
    } catch (e) {
      return { error: true, ...e };
    }
  }
}

export default new UserRepository();
