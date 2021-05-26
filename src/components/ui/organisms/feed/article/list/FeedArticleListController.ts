import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IArticle } from 'src/entities/Article';
import { throttle, debounce } from 'lodash';

interface IFeedArticleListControllerState {
  articles: IArticle[];
  articlesCount: number;
  page: number;
  limit: number;
  paginationLoading: boolean;
}

type TFeedArticleListController = {
  state: IFeedArticleListControllerState;
  setState: React.Dispatch<React.SetStateAction<IFeedArticleListControllerState>>;
  countTotalPages: number;
  setCurrentPage: (page: number) => void;
};

export default function useFeedArticleListController(
  fetchArticlesStrategy: (limit: number, offset: number) => Promise<{ articles: IArticle[]; articlesCount: number }>,
): TFeedArticleListController {
  const [state, setState] = useState<IFeedArticleListControllerState>({
    articles: [],
    articlesCount: 0,
    page: 1,
    limit: 5,
    paginationLoading: false,
  });

  useEffect(() => {
    mountHandler();
  }, [state.page]);

  const mountHandler = useCallback(
    debounce(async () => {
      try {
        const { articles, articlesCount } = await fetchArticlesStrategy(state.limit, currentOffset);

        setState((prevState) => ({ ...prevState, articles, articlesCount }));
      } catch (error) {
        console.error(error);
      }
    }, 250),
    [state.articles, state.articlesCount],
  );

  const setCurrentPage = useCallback(
    (page: number) => {
      setState((prevState) => ({ ...prevState, page }));
    },
    [state],
  );

  const countTotalPages = useMemo(() => {
    return Math.ceil(state.articlesCount / state.limit);
  }, [state]);

  const currentOffset = useMemo(() => {
    return (state.page - 1) * state.limit;
  }, [state]);

  return {
    state,
    setState,
    countTotalPages,
    setCurrentPage,
  };
}
