import React from 'react';
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Stack, Textarea } from '@chakra-ui/react';
import { Formik } from 'formik';
import useCommentBoxController from './CommentBoxController';
import CommentList from '../../molecules/comment/list';

function CommentBox(): JSX.Element {
  const controller = useCommentBoxController();

  return (
    <Box rounded={'md'} bg={'white'} borderWidth={'1px'} p={5}>
      <Formik
        initialValues={{ comment: '' }}
        onSubmit={(values) => controller.submitFormHandler(values)}
        validationSchema={controller.formValidateRules}
        validateOnChange
        validateOnBlur
        validateOnMount={true}
      >
        {({ handleSubmit, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="comment" isInvalid={!!errors.comment && !!touched.comment}>
                <FormLabel>Poste um novo comentário</FormLabel>
                <Textarea
                  variant={'filled'}
                  placeholder={'Escreva um comentário...'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  mb={0}
                />
                <FormErrorMessage>{errors.comment}</FormErrorMessage>
              </FormControl>

              <Box display={'flex'} justifyContent={'flex-end'} mt={2}>
                <Button type={'submit'} isLoading={isSubmitting} disabled={!isValid} colorScheme={'teal'}>
                  Postar comentário
                </Button>
              </Box>
            </Stack>
          </form>
        )}
      </Formik>

      <Box mt={8}>
        <CommentList deleteComment={controller.deleteComment} commentList={controller.state.comments} />
      </Box>
    </Box>
  );
}

export default CommentBox;
