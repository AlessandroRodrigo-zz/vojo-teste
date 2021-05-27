import { Box, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import useArticleController from './ArticleController';
import AuthorFavoriteFollow from 'src/components/ui/molecules/author_favorite_follow';
import CommentBox from '../../components/ui/organisms/comment_box';

export default function Article(): JSX.Element {
  const controller = useArticleController();

  if (!controller.state.article.slug) return <div />;

  return (
    <controller.ArticleContext.Provider
      value={{ article: controller.articleContext, setArticle: controller.setArticleContext }}
    >
      <Box bg={'gray.50'} flex={1}>
        <Box bg={'gray.700'} py={4}>
          <Box maxW={1200} mx={'auto'}>
            <Text fontSize="5xl" fontWeight="bold" color="white">
              {controller.state.article.title}
            </Text>

            <Box mt={4}>
              <AuthorFavoriteFollow />
            </Box>
          </Box>
        </Box>
        <Box maxW={1200} mx={'auto'} mt={4}>
          <Box my={4}>
            <Text fontSize="lg" dangerouslySetInnerHTML={{ __html: controller.state.article.body }} />
          </Box>

          <Divider />

          <Box mt={4} bg={'gray.700'} p={4} borderRadius={4}>
            <AuthorFavoriteFollow />
          </Box>

          <Box mt={6}>
            <CommentBox />
          </Box>
        </Box>
      </Box>
    </controller.ArticleContext.Provider>
  );
}
