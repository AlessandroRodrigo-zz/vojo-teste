import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import AuthorBlockInfo from 'src/components/ui/atoms/author_block_info';
import { IComment } from 'src/entities/Comment';
import { MdDelete } from 'react-icons/md';
import { useUser } from 'src/hooks/use_user';

export default function CommentCard({
  comment,
  deleteComment,
}: {
  comment: IComment;
  deleteComment: (commentId: number) => Promise<void>;
}): JSX.Element {
  const { user } = useUser();

  return (
    <Box borderWidth="1px" borderRadius="md" p={5} position={'relative'}>
      <AuthorBlockInfo
        article={{
          author: comment.author,
          body: '',
          createdAt: '',
          description: '',
          favoritesCount: 0,
          slug: '',
          tagList: [],
          title: '',
          updatedAt: '',
          favorited: false,
        }}
      />
      <Box mt={4}>
        <Text>{comment.body}</Text>
      </Box>

      {user.username === comment.author.username ? (
        <Box onClick={() => deleteComment(comment.id)} position={'absolute'} right={'1.25rem'} top={'1.25rem'}>
          <IconButton icon={<MdDelete />} aria-label="comment-button-delete" />
        </Box>
      ) : null}
    </Box>
  );
}
