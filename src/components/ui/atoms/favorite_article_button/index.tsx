import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import useFavoriteArticleButtonController from './FavoriteArticleButtonController';

export default function FavoriteArticleButton(): JSX.Element {
  const controller = useFavoriteArticleButtonController();

  return (
    <Box>
      {controller.article.favorited ? (
        <Button
          isLoading={controller.state.loading}
          onClick={controller.clickHandler}
          leftIcon={<MdFavorite />}
          variant="solid"
        >
          Remover artigo aos favoritos ({controller.article.favoritesCount})
        </Button>
      ) : (
        <Button
          isLoading={controller.state.loading}
          onClick={controller.clickHandler}
          leftIcon={<MdFavoriteBorder />}
          variant="outline"
          color="white"
          _hover={{ bg: 'white', color: 'black' }}
        >
          Adicionar artigo aos favoritos ({controller.article.favoritesCount})
        </Button>
      )}
    </Box>
  );
}
