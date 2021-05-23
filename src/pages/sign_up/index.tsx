import React from 'react';
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Link, Stack } from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

function SignUp(): JSX.Element {
  return (
    <Flex minW={600} bg={'gray.50'} flex={1}>
      <Stack spacing={8} mx={'auto'} maxW={600} minW={600} py={12} px={6}>
        <Stack align={'left'}>
          <Heading fontSize={'4xl'}>Cadastrar uma nova conta</Heading>
          <Link as={RouterLink} to={'/login'} fontSize={'lg'} color={'teal.600'} maxW={'fit-content'}>
            Já possui uma conta?
          </Link>
        </Stack>
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <Stack>
              <FormControl id="email">
                <FormLabel>E-mail</FormLabel>
                <Input variant={'filled'} type="email" />
              </FormControl>
              <FormControl id="user">
                <FormLabel>Usuário</FormLabel>
                <Input variant={'filled'} type="text" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Senha</FormLabel>
                <Input variant={'filled'} type="password" />
              </FormControl>
            </Stack>

            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Lembrar minha conta</Checkbox>
              </Stack>
              <Button colorScheme={'teal'} color={'white'}>
                Criar conta
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUp;
