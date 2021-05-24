import AbstractRepository from './AbstractRepository';
import { IUser } from '../entities/User';

class SessionRepository extends AbstractRepository {
  async create(user: IUser) {
    const response = await this.api.post('/users/login', { user });

    return { error: false, ...response };
  }
}

export default new SessionRepository();
