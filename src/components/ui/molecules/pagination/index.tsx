import React from 'react';
import { HStack, IconButton, Text } from '@chakra-ui/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

export default function Pagination({
  currentPage,
  setCurrentPageHandler,
  countTotalPages,
}: {
  currentPage: number;
  setCurrentPageHandler: (page: number) => void;
  countTotalPages: number;
}): JSX.Element {
  return (
    <HStack spacing={4} justifyContent={'flex-end'} w={'100%'}>
      <IconButton
        onClick={() => setCurrentPageHandler(currentPage - 1)}
        icon={<BiChevronLeft size={'20'} />}
        aria-label="prev-page-button"
      />
      <Text>
        Página <b>{currentPage}</b> de {countTotalPages}
      </Text>
      <IconButton
        onClick={() => setCurrentPageHandler(currentPage + 1)}
        icon={<BiChevronRight size={'20'} />}
        aria-label="next-page-button"
      />
    </HStack>
  );
}
