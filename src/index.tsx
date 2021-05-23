import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes';
import { UserProvider } from './contexts/user_context';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
