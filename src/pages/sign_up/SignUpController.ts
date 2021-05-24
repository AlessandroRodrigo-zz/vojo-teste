import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import UserRepository from 'src/repositories/UserRepository';
import { useUser } from 'src/hooks/use_user';
import { useHistory } from 'react-router-dom';
import { useDefaultToast } from '../../hooks/use_default_toast';

interface ISignUpControllerState {
  loading: boolean;
}

type TSignUpController = {
  submitFormHandler: (formValues: { email: string; username: string; password: string }) => void;
  state: ISignUpControllerState;
  formValidateRules: {};
};

export default function useSignUpController(): TSignUpController {
  const [state, setState] = useState<ISignUpControllerState>({ loading: false });
  const { setUser } = useUser();
  const history = useHistory();
  const toast = useDefaultToast();

  const submitFormHandler = useCallback(
    async ({ username, email, password }: { email: string; username: string; password: string }) => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));

        const createdUser = await UserRepository.create({ username, password, email });

        setUser({ ...createdUser.data.user });

        toast({
          title: 'Cadastro realizado com sucesso!',
          description: 'Parabéns, agora você será redirecionado para o seu feed',
          status: 'success',
        });

        history.push({ pathname: '/' });
      } catch (e) {
        console.error(e);
        toast({
          title: 'Não foi possível realizar o cadastro',
          description: 'Tente novamente em alguns instantes',
          status: 'error',
        });
      } finally {
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    },
    [],
  );

  const formValidateRules: {} = useMemo(() => {
    return yup.object().shape({
      email: yup.string().email('Insira um e-mail válido, por favor').required('Preencha o campo de e-mail, por favor'),
      username: yup.string().required('Preencha o campo de usuário, por favor'),
      password: yup.string().required('Preencha o campo de senha, por favor'),
    });
  }, []);

  return {
    state,
    submitFormHandler,
    formValidateRules,
  };
}
