import { useContext } from 'react';
import { IArticle } from 'src/entities/Article.d';
import { useArticle } from 'src/hooks/use_article';

type TFavoriteArticleButtonController = {
  article: IArticle;
};

export default function useFavoriteArticleButtonController(): TFavoriteArticleButtonController {
  const { article } = useArticle();

  return {
    article,
  };
}
