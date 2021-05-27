import React from 'react';
import { IArticle } from 'src/entities/Article';
import { Badge, Box, Button, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import useFeedArticleCardController from './FeedArticleCardController';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import AuthorBlockInfo from '../../../../atoms/author_block_info';

function FeedArticleCard({ article }: { article: IArticle }): JSX.Element {
  const controller = useFeedArticleCardController(article);

  return (
    <Box
      _hover={{ shadow: 'md' }}
      transition={'all .1s ease'}
      cursor={'pointer'}
      borderWidth={'1px'}
      borderRadius={'md'}
      padding={'5'}
      position={'relative'}
      bg={'white'}
    >
      <AuthorBlockInfo article={controller.state.statedArticle} />

      <HStack mt={'3'} borderRadius={'lg'}>
        {controller.state.statedArticle.tagList &&
          controller.state.statedArticle.tagList.map((item) => (
            <Badge borderRadius={'lg'} px={'2'} key={item}>
              {item}
            </Badge>
          ))}
      </HStack>

      <Stack marginTop={'4'} spacing={0}>
        <Button
          maxW={'fit-content'}
          variant={'link'}
          noOfLines={2}
          fontSize={'xl'}
          fontWeight={'bold'}
          color={'gray.600'}
          onClick={controller.redirectToArticleHandler}
        >
          {controller.state.statedArticle.title}
        </Button>

        <Button
          onClick={controller.redirectToArticleHandler}
          maxW={'fit-content'}
          variant={'link'}
          noOfLines={4}
          fontSize={'md'}
          fontWeight={'normal'}
        >
          {controller.state.statedArticle.description}
        </Button>
      </Stack>
      <Button onClick={controller.redirectToArticleHandler} mt={'2'} variant={'link'} w={'fit-content'}>
        Ler mais...
      </Button>

      <Box position={'absolute'} top={'1.25rem'} right={'1.25rem'}>
        <Button
          colorScheme={controller.state.statedArticle.favorited ? 'teal' : undefined}
          aria-label={'favorite'}
          isLoading={controller.state.favoriteButtonLoading}
          onClick={() => controller.favoriteHandler(controller.state.statedArticle.slug)}
        >
          <HStack>
            <Icon as={controller.state.statedArticle.favorited ? MdFavorite : MdFavoriteBorder} />
            <Text>{controller.state.statedArticle.favoritesCount}</Text>
          </HStack>
        </Button>
      </Box>
    </Box>
  );
}

export default FeedArticleCard;
