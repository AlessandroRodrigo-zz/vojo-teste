import { IComment } from './../../../../entities/Comment.d';
import { useCallback, useMemo, useState, useEffect } from 'react';
import * as yup from 'yup';
import InputFeedbackMessageFactory from 'src/utils/InputFeedbackMessageFactory';
import { useDefaultToast } from 'src/hooks/use_default_toast';
import { useArticle } from 'src/pages/article/ArticleController';
import CommentRepository from 'src/repositories/CommentRepository';

interface ICommentBoxControllerState {
  comments: IComment[];
}

type TCommentForm = {
  comment: string;
};

type TCommentBoxController = {
  formValidateRules: {};
  submitFormHandler: (values: TCommentForm) => void;
  state: ICommentBoxControllerState;
  deleteComment: (commentId: number) => Promise<void>;
};

export default function useCommentBoxController(): TCommentBoxController {
  const [state, setState] = useState<ICommentBoxControllerState>({ comments: [] });
  const toast = useDefaultToast();
  const { article } = useArticle();

  useEffect(() => {
    if (article.slug) {
      getComments();
    }
  }, [article]);

  const submitFormHandler = useCallback(
    async (values: TCommentForm) => {
      try {
        await createComment(values.comment);
        await getComments();
      } catch (e) {
        errorHandler(e);
      }
    },
    [article],
  );

  const deleteComment = useCallback(
    async (commentId: number) => {
      const { error } = await CommentRepository.delete(article.slug, commentId);

      if (error) errorHandler(new Error('Não foi possível deletar esse comentário'));

      await getComments();
    },
    [article, state.comments],
  );

  const createComment = useCallback(
    async (comment: string) => {
      const { error } = await CommentRepository.create(article.slug, comment);

      if (error) throw new Error('Não foi possível publicar esse comentário');

      toast({ title: 'Comentário publicado com sucesso', status: 'success' });
    },
    [article],
  );

  const errorHandler = useCallback((error: Error) => {
    console.error(error.message);
    toast({ title: error.message, description: 'Tente novamente em alguns instantes', status: 'error' });
  }, []);

  const formValidateRules = useMemo(() => {
    return yup.object().shape({
      comment: yup.string().required(InputFeedbackMessageFactory.requiredFeedbackFactory('comentário')),
    });
  }, []);

  const getComments = useCallback(async () => {
    const { data, error } = await CommentRepository.index(article.slug);

    if (error) errorHandler(new Error('Não foi possível carregar os comentários desse artigo'));

    setState((prevState) => ({ ...prevState, comments: data?.comments || [] }));
  }, [state, article]);

  return {
    formValidateRules,
    submitFormHandler,
    state,
    deleteComment,
  };
}
