import { useMemo } from 'react';
import { IArticle } from 'src/entities/Article';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type TFeedArticleCardController = {
  getFormattedCreatedAtArticle: string;
};

export default function useFeedArticleCardController(article: IArticle): TFeedArticleCardController {
  const getFormattedCreatedAtArticle = useMemo(() => {
    return format(new Date(article.createdAt), 'MMM d, Y', { locale: ptBR });
  }, []);

  return {
    getFormattedCreatedAtArticle,
  };
}
