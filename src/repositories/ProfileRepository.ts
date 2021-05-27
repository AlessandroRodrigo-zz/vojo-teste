import AbstractRepository from './AbstractRepository';

class ProfileRepository extends AbstractRepository {
  async create(username: string) {
    try {
      const response = await this.api.post(`/profiles/${username}/follow`);

      return { error: false, ...response };
    } catch (error) {
      return { error: true, ...error };
    }
  }
}
