import { useDefaultToast } from 'src/hooks/use_default_toast';
import { useContext, useCallback, useState } from 'react';
import { IArticle } from 'src/entities/Article';
import { useArticle } from 'src/pages/article/ArticleController';
import ProfileRepository from 'src/repositories/ProfileRepository';

interface IFollowUserButtonControllerState {
  loading: boolean;
}

type TFollowUserButtonController = {
  article: IArticle;
  state: IFollowUserButtonControllerState;
  clickHandler: () => Promise<void>;
};

export default function useFollowUserButtonController(): TFollowUserButtonController {
  const [state, setState] = useState<IFollowUserButtonControllerState>({ loading: false });

  const { article, setArticle } = useArticle();
  const toast = useDefaultToast();

  const clickHandler = useCallback(async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));

      if (article.author.following) {
        await unfollowUserHandler();
      } else {
        await followUserHandler();
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [article]);

  const unfollowUserHandler = useCallback(async () => {
    const { error, data } = await ProfileRepository.delete(article.author.username);

    if (error) throw new Error('Não foi possível deixar de seguir esse perfil');

    setArticle((prevState) => ({ ...prevState, author: data.profile }));
  }, [article]);

  const followUserHandler = useCallback(async () => {
    const { data, error } = await ProfileRepository.create(article.author.username);

    if (error) throw new Error('Não foi possível seguir esse perfil');

    setArticle((prevState) => ({ ...prevState, author: data.profile }));
  }, [article]);

  const errorHandler = useCallback((error: Error) => {
    console.error(error.message);
    toast({ title: error.message, description: 'Tente novamente em alguns instantes', status: 'error' });
  }, []);

  return {
    article,
    clickHandler,
    state,
  };
}
