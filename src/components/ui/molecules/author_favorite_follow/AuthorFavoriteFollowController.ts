import { IArticle } from 'src/entities/Article.d';
import { useArticle } from 'src/pages/article/ArticleController';

type TAuthorFavoriteFollowController = {
  article: IArticle;
};

export default function useAuthorFavoriteFollowController(): TAuthorFavoriteFollowController {
  const { article } = useArticle();

  return {
    article,
  };
}
