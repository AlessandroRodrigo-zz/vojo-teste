import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import React from 'react';

const Navbar: React.FunctionComponent = ({ children }): JSX.Element => {
  return (
    <Stack minH={'100vh'} spacing={0}>
      <Box bg={'teal.600'}>
        <HStack justifyContent={'space-between'} p={4} maxWidth={1200} mx={'auto'}>
          <Text fontSize={'2xl'} fontWeight={'bold'} color={'white'}>
            VOJO Blog
          </Text>

          <HStack spacing={8}>
            <Button
              as={NavLink}
              to={'/'}
              exact
              opacity={0.7}
              activeStyle={{ opacity: 1 }}
              variant={'link'}
              color={'white'}
            >
              Início
            </Button>

            <Button
              as={NavLink}
              to={'/login'}
              variant={'link'}
              color={'white'}
              opacity={0.7}
              activeStyle={{ opacity: 1 }}
            >
              Entrar
            </Button>

            <Button
              as={NavLink}
              to={'/register'}
              exact
              opacity={0.7}
              activeStyle={{ opacity: 1 }}
              variant={'link'}
              color={'white'}
            >
              Cadastrar
            </Button>
          </HStack>
        </HStack>
      </Box>
      {children}
    </Stack>
  );
};

export default Navbar;
