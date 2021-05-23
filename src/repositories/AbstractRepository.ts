import { AxiosInstance } from 'axios';
import standardAPIService from 'src/services/standardAPIService';

export default class AbstractRepository {
  protected api!: AxiosInstance;

  constructor(api: AxiosInstance = standardAPIService) {
    this.api = api;
  }
}
