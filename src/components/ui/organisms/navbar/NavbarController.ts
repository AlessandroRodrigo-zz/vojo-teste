import { useMemo } from 'react';
import { useUser } from 'src/hooks/use_user';

type TNavbarController = {
  hasConnectedUser: boolean;
};

export default function useNavbarController(): TNavbarController {
  const { user } = useUser();

  const hasConnectedUser = useMemo(() => {
    return !!user.token;
  }, []);

  return {
    hasConnectedUser,
  };
}
