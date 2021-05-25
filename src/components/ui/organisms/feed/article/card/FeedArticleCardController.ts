import { useCallback, useMemo } from 'react';
import { IArticle } from 'src/entities/Article';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useDefaultToast } from '../../../../../../hooks/use_default_toast';
import FavoriteRepository from '../../../../../../repositories/FavoriteRepository';

type TFeedArticleCardController = {
  getFormattedCreatedAtArticle: string;
  favoriteHandler: (slug: string) => Promise<void>;
};

export default function useFeedArticleCardController(article: IArticle): TFeedArticleCardController {
  const toast = useDefaultToast();

  const getFormattedCreatedAtArticle = useMemo(() => {
    return format(new Date(article.createdAt), 'MMM d, Y', { locale: ptBR });
  }, []);

  const favoriteHandler = useCallback(async (slug: string) => {
    try {
      const response = await FavoriteRepository.create(slug);
    } catch (e) {
      console.error(e);
      toast({
        title: 'Não foi possível adicionar esse artigo aos favoritos',
        description: 'Tente novamente em alguns instantes',
        status: 'error',
      });
    }
  }, []);

  return {
    getFormattedCreatedAtArticle,
    favoriteHandler,
  };
}
