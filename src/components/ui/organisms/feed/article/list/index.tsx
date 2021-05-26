import React from 'react';
import { HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import FeedArticleCard from '../card';
import useFeedArticleListController from './FeedArticleListController';
import { IArticle } from 'src/entities/Article';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function FeedArticleList({
  fetchArticlesStrategy = async () => {
    return { articles: [], articlesCount: 0 };
  },
}: {
  fetchArticlesStrategy: (limit: number, offset: number) => Promise<{ articles: IArticle[]; articlesCount: number }>;
}): JSX.Element {
  const controller = useFeedArticleListController(fetchArticlesStrategy);

  return (
    <Stack spacing={'4'} padding={0} alignItems={'flex-start'} mb={4}>
      <Stack spacing={'4'} w={'100%'}>
        {controller.state.articles &&
          controller.state.articles.map((item) => <FeedArticleCard article={item} key={item.slug} />)}
      </Stack>
      <HStack spacing={4} justifyContent={'flex-end'} w={'100%'}>
        <IconButton
          onClick={() => controller.setCurrentPage(controller.state.page - 1)}
          icon={<BiChevronLeft size={'20'} />}
          aria-label="prev-page-button"
        />
        <Text>
          Página <b>{controller.state.page}</b> de {controller.countTotalPages}
        </Text>
        <IconButton
          onClick={() => controller.setCurrentPage(controller.state.page + 1)}
          icon={<BiChevronRight size={'20'} />}
          aria-label="next-page-button"
        />
      </HStack>
    </Stack>
  );
}

export default FeedArticleList;
