import { Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { BiChevronDown, BiCog, BiLogOut, BiPlus, BiUser } from 'react-icons/bi';
import React from 'react';
import useConnectedUserOptionsController from './ConnectedUserOptionsController';

const ConnectedUserOptions = (): JSX.Element => {
  const controller = useConnectedUserOptionsController();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<BiChevronDown />}
        variant={'solid'}
        color={'white'}
        bg={'transparent'}
        _hover={{ color: 'black', bg: 'white' }}
        _active={{ color: 'black', bg: 'gray.300' }}
        activeStyle={{ background: 'white', color: 'black' }}
      >
        Olá, {controller.user.username}!
      </MenuButton>
      <MenuList>
        <MenuItem icon={<BiPlus />}>Novo artigo</MenuItem>
        <MenuItem icon={<BiUser />}>Perfil</MenuItem>
        <MenuItem icon={<BiCog />}>Configurações</MenuItem>
        <MenuDivider />
        <MenuItem icon={<BiLogOut />} onClick={controller.logoutHandler}>
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ConnectedUserOptions;
