import { useUser } from 'src/hooks/use_user';
import { IUser } from 'src/entities/User';
import { useDefaultToast } from 'src/hooks/use_default_toast';
import { useCallback } from 'react';

type TConnectedUserOptionsController = {
  logoutHandler: () => void;
  user: IUser;
};

export default function useConnectedUserOptionsController(): TConnectedUserOptionsController {
  const toast = useDefaultToast();
  const { setUser, user } = useUser();

  const logoutHandler = useCallback(() => {
    setUser({ username: '', email: '' });
    toast({
      title: 'Desconectado com sucesso!',
      description: 'Você pode continuar navegando como um visitante',
      status: 'success',
    });
  }, []);

  return {
    logoutHandler,
    user,
  };
}
