import { IArticle } from 'src/entities/Article.d';
import { useCallback, useState } from 'react';
import ArticleRepository from '../../repositories/ArticleRepository';
import { useDefaultToast } from '../../hooks/use_default_toast';

interface IArticleControllerState {
  article: IArticle;
}

type TArticleController = {
  state: IArticleControllerState;
};

export default function useArticleController(): TArticleController {
  const [state, setState] = useState<IArticleControllerState>({
    article: {
      slug: '',
      tagList: [],
      title: '',
      description: '',
      createdAt: '',
      body: '',
      favoritesCount: 0,
      updatedAt: '',
      author: { username: '', image: '', bio: '', following: false },
    },
  });
  const toast = useDefaultToast();

  const mountHandler = useCallback(() => {
    try {
      getArticleHandler(state.article.slug);
    } catch (e) {
      mountErrorHandler(e);
    }
  }, [state]);

  const mountErrorHandler = useCallback(
    (error: Error) => {
      console.error(error.message);
      toast({ title: error.message, description: 'Tente novamente em alguns instantes', status: 'error' });
    },
    [state],
  );

  const getArticleHandler = useCallback(
    async (slug: string) => {
      const { data, error } = await ArticleRepository.find(slug);

      if (error) throw new Error('Não foi possível carregar esse artigo');

      setState((prevState) => ({ ...prevState, article: data.article }));
    },
    [state],
  );

  return {
    state,
  };
}
