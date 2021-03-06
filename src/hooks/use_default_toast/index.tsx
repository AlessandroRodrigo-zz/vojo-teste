import { IToast, useToast } from '@chakra-ui/react';

const useDefaultToast = (options: IToast = {}) =>
  useToast({ duration: 2000, variant: 'solid', position: 'bottom', isClosable: true, ...options });

export { useDefaultToast };
