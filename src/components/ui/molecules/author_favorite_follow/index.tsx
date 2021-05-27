import { HStack } from '@chakra-ui/react';
import React from 'react';
import { IArticle } from 'src/entities/Article';
import AuthorBlockInfo from '../../atoms/author_block_info';
import FavoriteArticleButton from '../../atoms/favorite_article_button';
import FollowUserButton from '../../atoms/follow_user_button';
import useAuthorFavoriteFollowController from './AuthorFavoriteFollowController';

function AuthorFavoriteFollow(): JSX.Element {
  const controller = useAuthorFavoriteFollowController();

  return (
    <HStack spacing={4}>
      <AuthorBlockInfo article={controller.article} />
      <FollowUserButton />
      <FavoriteArticleButton />
    </HStack>
  );
}

export default AuthorFavoriteFollow;
