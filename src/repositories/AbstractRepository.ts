import { AxiosInstance, AxiosRequestConfig } from 'axios';
import standardAPIService from '../services/standardAPIService';

export default class AbstractRepository {
  protected api!: AxiosInstance;

  constructor(api: AxiosInstance = standardAPIService) {
    this.api = api;
  }

  async create(): Promise<void> {
    return;
  }

  async update(): Promise<void> {
    return;
  }

  async find(): Promise<void> {
    return;
  }

  async index(): Promise<{
    headers: any;
    request?: any;
    data: any;
    statusText: string;
    error: boolean;
    config: AxiosRequestConfig;
    status: number;
  }> {
    return {
      headers: {},
      request: {},
      data: {},
      statusText: '',
      error: false,
      config: {},
      status: 200,
    };
  }
}
