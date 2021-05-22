import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ArticleRepository from 'src/repositories/ArticleRepository';
import { useToast } from '@chakra-ui/react';
import { IArticle } from 'src/entities/Article';

type TFeedController = {
  state: { articles: IArticle[] };
  setState: Dispatch<SetStateAction<{ articles: IArticle[] }>>;
};

export default function useFeedController(): TFeedController {
  const [state, setState] = useState<{ articles: IArticle[] }>({
    articles: [],
  });
  const toast = useToast();

  useEffect(() => {
    mountHandler();
  }, []);

  async function mountHandler() {
    try {
      await Promise.allSettled([getArticlesHandler()]);
    } catch (e) {
      console.error(e.message);
      toast({ title: e.message, duration: 2000, status: 'error', isClosable: true });
    }
  }

  async function getArticlesHandler() {
    const { data, error } = await ArticleRepository.index();

    if (error) throw new Error('Não foi possível carregar o feed');

    setState((prevState) => ({ ...prevState, articles: data?.articles || [] }));
  }

  return {
    state,
    setState,
  };
}
