import React from 'react';
import useFeedController from './FeedController';
import { Box, Button, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Wrap, WrapItem } from '@chakra-ui/react';
import FeedArticleList from 'src/components/ui/organisms/feed/article/list';

function Feed(): JSX.Element {
  const controller = useFeedController();

  return (
    <Box bg={'gray.50'} flex={1}>
      <HStack align={'flex-start'} mt={'8'} maxW={1200} mx={'auto'} spacing={'4'}>
        <Tabs w={'70%'} colorScheme={'teal'}>
          <TabList>
            <Tab>Meu feed</Tab>
            <Tab>Feed global</Tab>
          </TabList>

          <TabPanels marginTop={'6'}>
            <TabPanel p={0}>
              <FeedArticleList fetchArticlesStrategy={controller.getArticlesPersonalFeedHandler} />
            </TabPanel>
            <TabPanel p={0}>
              <FeedArticleList fetchArticlesStrategy={controller.getArticlesFeedHandler} />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Box p={'5'} w={'30%'} bg={'white'} borderWidth={'1px'} borderRadius={'md'}>
          <Text fontSize={'md'} fontWeight={'bold'} color={'gray.700'}>
            Tags populares
          </Text>
          <Wrap spacing={2} mt={4}>
            {controller.state.tags &&
              controller.state.tags.map((item) => (
                <WrapItem key={item}>
                  <Button
                    size={'xs'}
                    cursor={'pointer'}
                    textTransform={'uppercase'}
                    fontWeight={'bold'}
                    borderRadius={'xl'}
                  >
                    {item}
                  </Button>
                </WrapItem>
              ))}
          </Wrap>
        </Box>
      </HStack>
    </Box>
  );
}

export default Feed;
