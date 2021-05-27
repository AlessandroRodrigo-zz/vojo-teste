import { Box, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { IArticle } from 'src/entities/Article';
import useAuthorBlockInfoController from './AuthorBlockInfoController';

export default function AuthorBlockInfo({ article }: { article: IArticle }): JSX.Element {
  const controller = useAuthorBlockInfoController(article);

  return (
    <HStack spacing={'4'} alignItems={'flex-start'}>
      <Image
        src={article.author.image ?? 'https://w.wallhaven.cc/full/28/wallhaven-2813r9.png'}
        borderRadius={'50%'}
        boxSize={50}
        objectFit={'cover'}
        alt={article.author.username}
      />
      <Box>
        <Text fontSize={'lg'} fontWeight={'bold'} color={'teal.600'}>
          {article.author.username}
        </Text>
        <Text fontSize={'sm'} color={'gray.500'}>
          {controller.getFormattedCreatedAtArticle}
        </Text>
      </Box>
    </HStack>
  );
}
