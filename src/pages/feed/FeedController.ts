import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import ArticleRepository from 'src/repositories/ArticleRepository';
import { IArticle } from 'src/entities/Article';
import TagRepository from 'src/repositories/TagRepository';
import { useDefaultToast } from 'src/hooks/use_default_toast';

interface IFeedControllerState {
  feedArticles: IArticle[];
  personalFeedArticles: IArticle[];
  tags: string[];
}

type TFeedController = {
  state: IFeedControllerState;
  setState: Dispatch<SetStateAction<IFeedControllerState>>;
  getArticlesFeedHandler: (limit: number, offset: number) => Promise<{ articles: IArticle[]; articlesCount: number }>;
  getArticlesPersonalFeedHandler: (
    limit: number,
    offset: number,
  ) => Promise<{ articles: IArticle[]; articlesCount: number }>;
};

export default function useFeedController(): TFeedController {
  const [state, setState] = useState<IFeedControllerState>({
    feedArticles: [],
    personalFeedArticles: [],
    tags: [],
  });
  const toast = useDefaultToast();

  useEffect(() => {
    mountHandler();
  }, []);

  async function mountHandler() {
    try {
      await Promise.allSettled([getTagsHandler()]);
    } catch (e) {
      mountErrorHandler(e);
    }
  }

  const mountErrorHandler = useCallback(
    (error) => {
      console.error(error.message);
      toast({ title: error.message, status: 'error' });
    },
    [toast],
  );

  const getArticlesFeedHandler = useCallback(
    async (limit: number, offset: number) => {
      const { data, error } = await ArticleRepository.index(limit, offset);

      if (error) throw new Error('Não foi possível carregar o feed');

      return { articles: data.articles, articlesCount: data.articlesCount };
    },
    [setState],
  );

  const getArticlesPersonalFeedHandler = useCallback(
    async (limit: number, offset: number) => {
      const { data, error } = await ArticleRepository.indexPersonalFeed(limit, offset);

      if (error) throw new Error('Não foi possível carregar o feed pessoal');

      return { articles: data.articles, articlesCount: data.articlesCount };
    },
    [setState],
  );

  const getTagsHandler = useCallback(async () => {
    const { data, error } = await TagRepository.index();

    if (error) throw new Error('Não foi possível carregar as tags');

    setState((prevState) => ({ ...prevState, tags: data?.tags || [] }));
  }, [setState]);

  return {
    state,
    setState,
    getArticlesFeedHandler,
    getArticlesPersonalFeedHandler,
  };
}
