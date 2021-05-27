import React from 'react';
import { HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import FeedArticleCard from '../card';
import useFeedArticleListController from './FeedArticleListController';
import { IArticle } from 'src/entities/Article';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Pagination from 'src/components/ui/molecules/pagination';

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
        {controller.state.articles.length ? (
          controller.state.articles.map((item) => <FeedArticleCard article={item} key={item.slug} />)
        ) : (
          <Text>Ainda não há artigos disponíveis</Text>
        )}
      </Stack>

      {controller.state.articles.length ? (
        <Pagination
          setCurrentPageHandler={controller.setCurrentPage}
          currentPage={controller.state.page}
          countTotalPages={controller.countTotalPages}
        />
      ) : null}
    </Stack>
  );
}

export default FeedArticleList;
