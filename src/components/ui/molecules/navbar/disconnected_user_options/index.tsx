import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import React from 'react';

const DisconnectedUserOptions = (): JSX.Element => {
  return (
    <>
      <Button
        as={NavLink}
        to={'/login'}
        variant={'solid'}
        color={'white'}
        bg={'transparent'}
        activeStyle={{ background: 'white', color: 'black' }}
        _hover={{ color: 'black', bg: 'white' }}
      >
        Entrar
      </Button>

      <Button
        as={NavLink}
        to={'/register'}
        exact
        color={'white'}
        bg={'transparent'}
        activeStyle={{ background: 'white', color: 'black' }}
        variant={'solid'}
        _hover={{ color: 'black', bg: 'white' }}
      >
        Cadastrar
      </Button>
    </>
  );
};

export default DisconnectedUserOptions;
