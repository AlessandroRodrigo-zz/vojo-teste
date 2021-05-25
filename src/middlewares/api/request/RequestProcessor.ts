import AuthenticateTokenHandler from './AuthenticateTokenHandler';
import { AxiosRequestConfig } from 'axios';

class RequestProcessor {
  public handlers: any[];

  constructor() {
    this.handlers = [AuthenticateTokenHandler];
  }

  run(requestObject: AxiosRequestConfig) {
    this.handlers.map((requestHandler) => {
      if (requestHandler.accepts(requestObject)) {
        requestHandler.process(requestObject);
      }
      return null;
    });
  }
}

export default new RequestProcessor();
