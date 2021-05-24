import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import SessionRepository from '../../repositories/SessionRepository';
import { useUser } from '../../hooks/use_user';
import { useDefaultToast } from '../../hooks/use_default_toast';
import { useHistory } from 'react-router-dom';
import FeedbackMessageFactory from '../../utils/FeedbackMessageFactory';
import Feed from '../feed';

interface ISignInControllerState {
  loading: boolean;
}

type TSignInController = {
  state: ISignInControllerState;
  submitFormHandler: (formValues: { email: string; password: string }) => void;
  formValidateRules: {};
};

export default function useSignInController(): TSignInController {
  const [state, setState] = useState<ISignInControllerState>({ loading: false });
  const toast = useDefaultToast();
  const history = useHistory();

  const { setUser } = useUser();

  const submitFormHandler = useCallback(async ({ email, password }: { email: string; password: string }) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));

      const createdSession = await SessionRepository.create({ email, password });

      setUser({ ...createdSession.data.user });

      toast({
        title: 'Bem-vindo(a) de volta',
        description: 'Agora te redirecionaremos para o seu feed',
        status: 'success',
      });

      history.push({ pathname: '/' });
    } catch (e) {
      console.error(e);
      toast({
        title: 'Não foi possível acessar a conta',
        description: 'Por favor, tente novamente em alguns instantes',
        status: 'error',
      });
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, []);

  const formValidateRules: {} = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .email(FeedbackMessageFactory.emailFeedbackFactory())
        .required(FeedbackMessageFactory.requiredFeedbackFactory('e-mail')),
      password: yup.string().required(FeedbackMessageFactory.requiredFeedbackFactory('senha')),
    });
  }, []);

  return {
    state,
    submitFormHandler,
    formValidateRules,
  };
}
