import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ArticleRepository from 'src/repositories/ArticleRepository';
import { useToast } from '@chakra-ui/react';
import { IArticle } from 'src/entities/Article';
import TagRepository from 'src/repositories/TagRepository';

type TFeedController = {
  state: { articles: IArticle[]; tags: string[] };
  setState: Dispatch<SetStateAction<{ articles: IArticle[]; tags: string[] }>>;
};

export default function useFeedController(): TFeedController {
  const [state, setState] = useState<{ articles: IArticle[]; tags: string[] }>({
    articles: [],
    tags: [],
  });
  const toast = useToast();

  useEffect(() => {
    mountHandler();
  }, []);

  async function mountHandler() {
    try {
      await Promise.allSettled([getArticlesHandler(), getTagsHandler()]);
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

  async function getTagsHandler() {
    const { data, error } = await TagRepository.index();

    if (error) throw new Error('Não foi possível carregar as tags');

    setState((prevState) => ({ ...prevState, tags: data?.tags || [] }));
  }

  return {
    state,
    setState,
  };
}
