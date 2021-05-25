import AbstractRequestHandler from './AbstractRequestHandler';
import { IUser } from 'src/entities/User';
import { AxiosRequestConfig } from 'axios';

class AuthenticateTokenHandler extends AbstractRequestHandler {
  accepts(_requestObject: AxiosRequestConfig): boolean {
    const user = localStorage.getItem('@user');

    if (user) {
      const formattedUser: IUser = JSON.parse(user);

      return !!formattedUser.token;
    }

    return false;
  }

  process(_requestObject: AxiosRequestConfig) {
    const user = localStorage.getItem('@user');

    if (user) {
      const formattedUser: IUser = JSON.parse(user);

      _requestObject.headers.common.authorization = `Token ${formattedUser.token}`;
    }
  }
}

export default new AuthenticateTokenHandler();
