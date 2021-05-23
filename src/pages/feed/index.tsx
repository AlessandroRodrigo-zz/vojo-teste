import React from 'react';
import useFeedController from './FeedController';
import FeedArticleCard from 'src/components/ui/organisms/feed/article/card';
import { Box, Stack, Text } from '@chakra-ui/react';

function Feed(): JSX.Element {
  const controller = useFeedController();

  return (
    <Box padding={4} maxW={1200} mx={'auto'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} color={'gray.700'}>
        Feed de artigos
      </Text>

      <Stack spacing={'4'} marginTop={'6'}>
        {controller.state.articles &&
          controller.state.articles.map((item) => <FeedArticleCard article={item} key={item.slug} />)}
      </Stack>
    </Box>
  );
}

export default Feed;
