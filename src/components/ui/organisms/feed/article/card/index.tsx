import React from 'react';
import { IArticle } from 'src/entities/Article';
import { Badge, Box, Button, HStack, Icon, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import useFeedArticleCardController from './FeedArticleCardController';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

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
      <HStack spacing={'4'} alignItems={'flex-start'}>
        <Image
          src={controller.state.statedArticle.author.image ?? 'https://w.wallhaven.cc/full/28/wallhaven-2813r9.png'}
          borderRadius={'50%'}
          boxSize={50}
          objectFit={'cover'}
          alt={controller.state.statedArticle.author.username}
        />
        <Box>
          <Text fontSize={'lg'} fontWeight={'bold'} color={'teal.600'}>
            {controller.state.statedArticle.author.username}
          </Text>
          <Text fontSize={'sm'} color={'gray.500'}>
            {controller.getFormattedCreatedAtArticle}
          </Text>
        </Box>
      </HStack>

      <HStack mt={'3'} borderRadius={'lg'}>
        {controller.state.statedArticle.tagList &&
          controller.state.statedArticle.tagList.map((item) => (
            <Badge borderRadius={'lg'} px={'2'} key={item}>
              {item}
            </Badge>
          ))}
      </HStack>

      <Stack marginTop={'4'} spacing={0}>
        <Text noOfLines={2} fontSize={'xl'} fontWeight={'bold'} color={'gray.600'}>
          {controller.state.statedArticle.title}
        </Text>

        <Text noOfLines={4} fontSize={'md'} fontWeight={'normal'}>
          {controller.state.statedArticle.description}
        </Text>
      </Stack>
      <Button mt={'2'} variant={'link'} w={'fit-content'}>
        Ler mais...
      </Button>

      <Box position={'absolute'} top={'1.25rem'} right={'1.25rem'}>
        <IconButton
          icon={<Icon as={controller.state.statedArticle.favorited ? MdFavorite : MdFavoriteBorder} />}
          colorScheme={controller.state.statedArticle.favorited ? 'teal' : undefined}
          aria-label={'favorite'}
          isLoading={controller.state.favoriteButtonLoading}
          onClick={() => controller.favoriteHandler(controller.state.statedArticle.slug)}
        />
      </Box>
    </Box>
  );
}

export default FeedArticleCard;
