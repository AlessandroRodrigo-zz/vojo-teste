import { IArticle } from 'src/entities/Article.d';
import React, { useCallback, useEffect, useState, useContext, createContext } from 'react';
import ArticleRepository from '../../repositories/ArticleRepository';
import { useDefaultToast } from '../../hooks/use_default_toast';
import { useParams } from 'react-router-dom';
import marked from 'marked';

interface IArticleControllerState {
  article: IArticle;
}

interface IArticleContext {
  article: IArticle;
  setArticle: React.Dispatch<React.SetStateAction<IArticle>>;
}

type TArticleController = {
  state: IArticleControllerState;
  ArticleContext: React.Context<IArticleContext>;
  articleContext: IArticle;
  setArticleContext: React.Dispatch<React.SetStateAction<IArticle>>;
};

const ArticleContext = createContext<IArticleContext>({
  article: {
    slug: '',
    tagList: [],
    title: '',
    description: '',
    createdAt: '',
    body: '',
    favoritesCount: 0,
    updatedAt: '',
    author: { username: '', image: '', bio: '', following: false },
  },
  setArticle: () => {
    return;
  },
});

export const useArticle = () => useContext(ArticleContext);

export default function useArticleController(): TArticleController {
  const [state, setState] = useState<IArticleControllerState>({
    article: {
      slug: '',
      tagList: [],
      title: '',
      description: '',
      createdAt: '',
      body: '',
      favoritesCount: 0,
      updatedAt: '',
      author: { username: '', image: '', bio: '', following: false },
    },
  });
  const toast = useDefaultToast();
  const { slug } = useParams<{ slug: string }>();

  const [articleContext, setArticleContext] = useState<IArticle>({
    slug: '',
    tagList: [],
    title: '',
    description: '',
    createdAt: '',
    body: '',
    favoritesCount: 0,
    updatedAt: '',
    author: { username: '', image: '', bio: '', following: false },
  });

  useEffect(() => {
    const newBody = marked(state.article.body);
    setState((prevState) => ({ ...prevState, article: { ...prevState.article, body: newBody } }));
  }, [state.article.body]);

  useEffect(() => {
    mountHandler();
  }, []);

  const mountHandler = useCallback(() => {
    try {
      getArticleHandler();
    } catch (e) {
      mountErrorHandler(e);
    }
  }, [state]);

  const mountErrorHandler = useCallback(
    (error: Error) => {
      console.error(error.message);
      toast({ title: error.message, description: 'Tente novamente em alguns instantes', status: 'error' });
    },
    [state],
  );

  const getArticleHandler = useCallback(async () => {
    const { data, error } = await ArticleRepository.find(slug);

    if (error) throw new Error('Não foi possível carregar esse artigo');

    setState((prevState) => ({ ...prevState, article: data.article }));
    setArticleContext(data.article);
  }, [state]);

  return {
    state,
    ArticleContext,
    articleContext,
    setArticleContext,
  };
}
