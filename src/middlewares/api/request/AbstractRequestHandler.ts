import { AxiosRequestConfig } from 'axios';

class AbstractRequestHandler {
  accepts(_requestObject: AxiosRequestConfig): boolean {
    return false;
  }

  process(_requestObject: AxiosRequestConfig): void {
    return;
  }
}

export default AbstractRequestHandler;
