import { Box, Stack } from '@chakra-ui/react';
import React from 'react';
import { IComment } from 'src/entities/Comment';
import CommentCard from '../card';

export default function CommentList({
  commentList,
  deleteComment,
}: {
  commentList: IComment[];
  deleteComment: (commentId: number) => Promise<void>;
}): JSX.Element {
  return (
    <Stack spacing={4}>
      {commentList &&
        commentList.map((item) => <CommentCard deleteComment={deleteComment} key={item.id} comment={item} />)}
    </Stack>
  );
}
