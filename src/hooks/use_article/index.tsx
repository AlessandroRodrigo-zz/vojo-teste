import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';
import { IArticle } from 'src/entities/Article';

interface IArticleContext {
  article: IArticle;
  setArticle: Dispatch<SetStateAction<IArticle>>;
}

const ArticleContext = createContext<IArticleContext>({
  article: {
    body: '',
    createdAt: '',
    description: '',
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: '',
    updatedAt: '',
    favorited: false,
    author: { username: '', bio: '', following: false, image: '' },
  },
  setArticle: () => {
    return;
  },
});

const ArticleProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [article, setArticle] = useState<IArticle>({
    body: '',
    createdAt: '',
    description: '',
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: '',
    updatedAt: '',
    favorited: false,
    author: { username: '', bio: '', following: false, image: '' },
  });

  return <ArticleContext.Provider value={{ article, setArticle }}>{children}</ArticleContext.Provider>;
};

const useArticle = (): IArticleContext => useContext(ArticleContext);

export { ArticleProvider, useArticle };
