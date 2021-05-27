import React from 'react';
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Link, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ControlledInput from 'src/components/ui/molecules/controlled_input';
import { Formik } from 'formik';
import useSignInController from './SignInController';

function SignIn(): JSX.Element {
  const controller = useSignInController();

  return (
    <Flex minW={600} bg={'gray.50'} flex={1}>
      <Stack spacing={8} mx={'auto'} maxW={600} minW={600} py={12} px={6}>
        <Stack align={'left'}>
          <Heading fontSize={'4xl'}>Acesse a sua conta</Heading>
          <Link as={RouterLink} to={'/register'} fontSize={'lg'} color={'teal.600'} maxW={'fit-content'}>
            Ainda não possui conta?
          </Link>
        </Stack>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => controller.submitFormHandler(values)}
          validationSchema={controller.formValidateRules}
          validateOnChange
          validateOnBlur
          validateOnMount
        >
          {({ handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting, isValid }) => (
            <form onSubmit={handleSubmit}>
              <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
                <Stack spacing={4}>
                  <ControlledInput
                    label={'E-mail'}
                    formControlId={'email'}
                    inputProps={{ type: 'email' }}
                    isInvalid={!!errors.email && !!touched.email}
                    errorMessage={errors.email}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <ControlledInput
                    label={'Senha'}
                    formControlId={'password'}
                    inputProps={{ type: 'password' }}
                    isInvalid={!!errors.password && !!touched.password}
                    errorMessage={errors.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <Stack spacing={10}>
                    <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                      <Checkbox colorScheme="teal">Lembrar minha conta</Checkbox>
                      <Link color={'teal.600'}>Esqueceu a sua senha?</Link>
                    </Stack>
                    <Button
                      disabled={!isValid}
                      isLoading={isSubmitting}
                      type={'submit'}
                      colorScheme={'teal'}
                      color={'white'}
                    >
                      Acessar conta
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

export default SignIn;
