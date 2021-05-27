import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import UserRepository from 'src/repositories/UserRepository';
import { useUser } from 'src/hooks/use_user';
import { useHistory } from 'react-router-dom';
import { useDefaultToast } from '../../hooks/use_default_toast';
import InputFeedbackMessageFactory from '../../utils/InputFeedbackMessageFactory';

type TSignUpController = {
  submitFormHandler: (formValues: { email: string; username: string; password: string }) => void;
  formValidateRules: {};
};

type TSignUpForm = {
  email: string;
  username: string;
  password: string;
};

export default function useSignUpController(): TSignUpController {
  const { setUser } = useUser();
  const history = useHistory();
  const toast = useDefaultToast();

  const submitFormHandler = useCallback(async (formValues: TSignUpForm) => {
    try {
      await createUser(formValues);
    } catch (e) {
      errorHandler(e);
    }
  }, []);

  const createUser = useCallback(
    async (formValues: TSignUpForm) => {
      const { error, data } = await UserRepository.create(formValues);

      if (error) throw new Error('Não foi possível realizar o registro');

      setUser(data.user);

      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Parabéns, agora você será redirecionado para o seu feed',
        status: 'success',
      });

      history.push({ pathname: '/' });
    },
    [setUser],
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
      username: yup.string().required(InputFeedbackMessageFactory.requiredFeedbackFactory('usuário')),
      password: yup
        .string()
        .min(8, InputFeedbackMessageFactory.minCharacters(8))
        .required(InputFeedbackMessageFactory.requiredFeedbackFactory('senha')),
    });
  }, []);

  return {
    submitFormHandler,
    formValidateRules,
  };
}
