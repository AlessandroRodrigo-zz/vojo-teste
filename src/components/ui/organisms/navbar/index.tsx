import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import React from 'react';
import useNavbarController from './NavbarController';
import ConnectedUserOptions from 'src/components/ui/molecules/navbar/connected_user_options';
import DisconnectedUserOptions from 'src/components/ui/molecules/navbar/disconnected_user_options';

const Navbar: React.FunctionComponent = ({ children }): JSX.Element => {
  const controller = useNavbarController();

  return (
    <Stack minH={'100vh'} spacing={0}>
      <Box bg={'teal.600'}>
        <HStack justifyContent={'space-between'} py={4} maxWidth={1200} mx={'auto'}>
          <Text fontSize={'xl'} fontWeight={'bold'} color={'white'}>
            VOJO Blog
          </Text>

          <HStack spacing={2}>
            <Button
              as={NavLink}
              to={'/'}
              exact
              color={'white'}
              bg={'transparent'}
              activeStyle={{ background: 'white', color: 'black' }}
              variant={'solid'}
              _hover={{ color: 'black', bg: 'white' }}
            >
              Início
            </Button>
            {controller.hasConnectedUser ? <ConnectedUserOptions /> : <DisconnectedUserOptions />}
          </HStack>
        </HStack>
      </Box>
      {children}
    </Stack>
  );
};

export default Navbar;
