import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { IArticle } from 'src/entities/Article';
import { useMemo } from 'react';

type TAuthorBlockInfoController = {
  getFormattedCreatedAtArticle: string;
};

export default function useAuthorBlockInfoController(article: IArticle): TAuthorBlockInfoController {
  const getFormattedCreatedAtArticle = useMemo(() => {
    try {
      return format(new Date(article.createdAt), 'MMM d, Y', { locale: ptBR });
    } catch (e) {
      console.error(e);
      return format(new Date(), 'MMM d, Y', { locale: ptBR });
    }
  }, []);

  return {
    getFormattedCreatedAtArticle,
  };
}
