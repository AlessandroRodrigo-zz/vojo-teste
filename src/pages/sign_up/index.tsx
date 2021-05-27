import React from 'react';
import { Box, Button, Checkbox, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useSignUpController from './SignUpController';
import { Formik } from 'formik';
import ControlledInput from 'src/components/ui/molecules/controlled_input';

function SignUp(): JSX.Element {
  const controller = useSignUpController();

  return (
    <Flex minW={600} bg={'gray.50'} flex={1}>
      <Stack spacing={8} mx={'auto'} maxW={600} minW={600} py={12} px={6}>
        <Stack align={'left'}>
          <Heading fontSize={'4xl'}>Cadastrar uma nova conta</Heading>
          <Link as={RouterLink} to={'/login'} fontSize={'lg'} color={'teal.600'} maxW={'fit-content'}>
            Já possui uma conta?
          </Link>
        </Stack>
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          onSubmit={(values) => controller.submitFormHandler(values)}
          validationSchema={controller.formValidateRules}
          validateOnChange
          validateOnBlur
          validateOnMount
        >
          {({ handleSubmit, handleChange, handleBlur, errors, touched, isValid, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
                <Stack spacing={4}>
                  <Stack>
                    <ControlledInput
                      label={'E-mail'}
                      formControlId={'email'}
                      inputProps={{ type: 'email' }}
                      errorMessage={errors.email}
                      isInvalid={!!errors.email && !!touched.email}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />

                    <ControlledInput
                      label={'Usuário'}
                      formControlId={'username'}
                      inputProps={{ type: 'text' }}
                      errorMessage={errors.username}
                      isInvalid={!!errors.username && !!touched.username}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />

                    <ControlledInput
                      label={'Senha'}
                      formControlId={'password'}
                      inputProps={{ type: 'password' }}
                      errorMessage={errors.password}
                      isInvalid={!!errors.password && !!touched.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                  </Stack>

                  <Stack spacing={10}>
                    <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                      <Checkbox colorScheme={'teal'}>Lembrar minha conta</Checkbox>
                    </Stack>
                    <Button
                      isLoading={isSubmitting}
                      disabled={!isValid}
                      colorScheme={'teal'}
                      color={'white'}
                      type={'submit'}
                    >
                      Criar conta
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
}

export default SignUp;
