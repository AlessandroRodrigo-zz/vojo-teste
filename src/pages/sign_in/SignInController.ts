import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import SessionRepository from 'src/repositories/SessionRepository';
import { useUser } from 'src/hooks/use_user';
import { useDefaultToast } from 'src/hooks/use_default_toast';
import { useHistory } from 'react-router-dom';
import InputFeedbackMessageFactory from 'src/utils/InputFeedbackMessageFactory';

type TSignInController = {
  submitFormHandler: (formValues: { email: string; password: string }) => void;
  formValidateRules: {};
};

type TSignInForm = {
  email: string;
  password: string;
};

export default function useSignInController(): TSignInController {
  const toast = useDefaultToast();
  const history = useHistory();

  const { setUser } = useUser();

  const submitFormHandler = useCallback(async (formValues: TSignInForm) => {
    try {
      await createSession(formValues);
    } catch (e) {
      errorHandler(e);
    }
  }, []);

  const createSession = useCallback(
    async (formValues: TSignInForm) => {
      const { data, error } = await SessionRepository.create(formValues);

      if (error) throw new Error('Não foi possível realizar login');

      setUser(data.user);

      toast({
        title: 'Bem-vindo(a) de volta',
        description: 'Agora te redirecionaremos para o seu feed',
        status: 'success',
      });

      history.push({ pathname: '/' });
    },
    [setUser, history],
  );

  const errorHandler = useCallback((error: Error) => {
    console.error(error.message);

    toast({
      title: error.message,
      description: 'Por favor, tente novamente em alguns instantes',
      status: 'error',
    });
  }, []);

  const formValidateRules: {} = useMemo(() => {
    return yup.object().shape({
      email: yup
        .string()
        .email(InputFeedbackMessageFactory.emailFeedbackFactory())
        .required(InputFeedbackMessageFactory.requiredFeedbackFactory('e-mail')),
      password: yup.string().required(InputFeedbackMessageFactory.requiredFeedbackFactory('senha')),
    });
  }, []);

  return {
    submitFormHandler,
    formValidateRules,
  };
}
