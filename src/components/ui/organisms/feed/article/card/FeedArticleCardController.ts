import { useCallback, useMemo, useState, useEffect, useContext, createContext, Dispatch, SetStateAction } from 'react';
import { IArticle } from 'src/entities/Article';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useDefaultToast } from 'src/hooks/use_default_toast';
import FavoriteRepository from 'src/repositories/FavoriteArticleRepository';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';

interface IFeedArticleCardControllerState {
  statedArticle: IArticle;
  favoriteButtonLoading: boolean;
}

type TFeedArticleCardController = {
  getFormattedCreatedAtArticle: string;
  favoriteHandler: (slug: string) => Promise<void>;
  state: IFeedArticleCardControllerState;
  redirectToArticleHandler: () => void;
};
export default function useFeedArticleCardController(article: IArticle): TFeedArticleCardController {
  const [state, setState] = useState<IFeedArticleCardControllerState>({
    statedArticle: article,
    favoriteButtonLoading: false,
  });
  const toast = useDefaultToast();
  const history = useHistory();

  useEffect(() => {
    setState((prevState) => ({ ...prevState, statedArticle: article }));
  }, [article]);

  const getFormattedCreatedAtArticle = useMemo(() => {
    return format(new Date(article.createdAt), 'MMM d, Y', { locale: ptBR });
  }, []);

  const favoriteHandler = useCallback(
    async (slug: string) => {
      try {
        setState((prevState) => ({ ...prevState, favoriteButtonLoading: true }));

        let response: AxiosResponse;

        if (state.statedArticle.favorited) {
          response = await deleteFavorite(slug);
        } else {
          response = await createFavorite(slug);
        }

        setState((prevState) => ({ ...prevState, statedArticle: response.data.article }));
      } catch (e) {
        console.error(e);
        toast({
          title: 'Não foi possível adicionar esse artigo aos favoritos',
          description: 'Tente novamente em alguns instantes',
          status: 'error',
        });
      } finally {
        setState((prevState) => ({ ...prevState, favoriteButtonLoading: false }));
      }
    },
    [state.statedArticle],
  );

  const createFavorite = useCallback(
    async (slug: string) => {
      const response = await FavoriteRepository.create(slug);

      toast({ title: 'Artigo adicionado aos seus favoritos', status: 'success' });

      return response;
    },
    [state.statedArticle],
  );

  const deleteFavorite = useCallback(
    async (slug: string) => {
      const response = await FavoriteRepository.delete(slug);

      toast({ title: 'Artigo removido dos seus favoritos', status: 'success' });

      return response;
    },
    [state.statedArticle],
  );

  const redirectToArticleHandler = useCallback(() => {
    history.push({ pathname: `/article/${state.statedArticle.slug}` });
  }, [state.statedArticle]);

  return {
    getFormattedCreatedAtArticle,
    favoriteHandler,
    state,
    redirectToArticleHandler,
  };
}
