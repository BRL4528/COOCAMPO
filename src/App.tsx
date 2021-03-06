import React, { useContext } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { light } from './styles/theme/light';
import { dark } from './styles/theme/dark';
import 'react-toastify/dist/ReactToastify.css';

import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext';
import { SetToggleThemeContext } from './contexts/SetToggleThemeContext';

import GlobalStyle from './styles/global';

import AuthContext from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  const { toggleTheme } = useContext(SetToggleThemeContext);

  return (
    <BrowserRouter>
      <AuthContext>
        <SidebarDrawerProvider>
          <ChakraProvider theme={toggleTheme === 'light' ? light : dark}>
            <GlobalStyle />
            <Routes />
            <ToastContainer />
          </ChakraProvider>
        </SidebarDrawerProvider>
      </AuthContext>
    </BrowserRouter>
  );
};

export default App;
