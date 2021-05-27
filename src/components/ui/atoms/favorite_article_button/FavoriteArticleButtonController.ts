import { useCallback, useState } from 'react';
import { IArticle } from 'src/entities/Article.d';
import { useArticle } from 'src/pages/article/ArticleController';
import { useDefaultToast } from 'src/hooks/use_default_toast';
import ArticleRepository from 'src/repositories/ArticleRepository';

interface IFavoriteArticleButtonControllerState {
  loading: boolean;
}

type TFavoriteArticleButtonController = {
  article: IArticle;
  state: IFavoriteArticleButtonControllerState;
  clickHandler: () => Promise<void>;
};

export default function useFavoriteArticleButtonController(): TFavoriteArticleButtonController {
  const [state, setState] = useState<IFavoriteArticleButtonControllerState>({ loading: false });
  const { article, setArticle } = useArticle();
  const toast = useDefaultToast();

  const clickHandler = useCallback(async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));

      if (article.favorited) {
        await disfavorArticle();
      } else {
        await favorArticle();
      }
    } catch (e) {
      errorHandler(e);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  }, [article]);

  const favorArticle = useCallback(async () => {
    const { data, error } = await ArticleRepository.favor(article.slug);

    if (error) throw new Error('Não foi possível favoritar esse artigo');

    setArticle(data.article);
  }, [article]);

  const disfavorArticle = useCallback(async () => {
    const { data, error } = await ArticleRepository.disfavor(article.slug);

    if (error) throw new Error('Não foi possível desfavoritar esse artigo');

    setArticle(data.article);
  }, [article]);

  const errorHandler = useCallback((error: Error) => {
    console.error(error.message);
    toast({ title: error.message, description: 'Tente novamente em alguns instantes', status: 'error' });
  }, []);

  return {
    article,
    state,
    clickHandler,
  };
}
