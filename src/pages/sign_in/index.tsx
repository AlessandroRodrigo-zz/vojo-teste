import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

function SignIn(): JSX.Element {
  return (
    <Flex minW={600} bg={'gray.50'} flex={1}>
      <Stack spacing={8} mx={'auto'} maxW={600} minW={600} py={12} px={6}>
        <Stack align={'left'}>
          <Heading fontSize={'4xl'}>Acesse a sua conta</Heading>
          <Link fontSize={'lg'} color={'teal.600'} maxW={'fit-content'}>
            Já possui uma conta?
          </Link>
        </Stack>
        <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input variant={'filled'} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input variant={'filled'} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                <Checkbox>Lembrar minha conta</Checkbox>
                <Link color={'teal.600'}>Esqueceu a sua senha?</Link>
              </Stack>
              <Button colorScheme={'teal'} color={'white'}>
                Acessar conta
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignIn;
