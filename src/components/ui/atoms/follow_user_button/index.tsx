import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { IArticle } from 'src/entities/Article';
import { BiMinus, BiPlus } from 'react-icons/bi';
import useFollowUserButtonController from './FollowUserButtonController';

export default function FollowUserButton(): JSX.Element {
  const controller = useFollowUserButtonController();

  return (
    <Box>
      {controller.article.author.following ? (
        <Button
          isLoading={controller.state.loading}
          onClick={controller.clickHandler}
          variant={'solid'}
          colorScheme={'teal'}
          leftIcon={<BiMinus />}
        >
          Deixar de seguir {controller.article.author.username}
        </Button>
      ) : (
        <Button
          onClick={controller.clickHandler}
          isLoading={controller.state.loading}
          _hover={{ color: 'black', bg: 'white' }}
          variant={'outline'}
          color={'white'}
          leftIcon={<BiPlus />}
        >
          Seguir {controller.article.author.username}
        </Button>
      )}
    </Box>
  );
}
