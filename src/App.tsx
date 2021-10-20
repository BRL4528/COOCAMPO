import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SidebarDrawerProvider } from './contexts/SidebarDrawerContext';

import GlobalStyle from './styles/global';

import AuthContext from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthContext>
      <SidebarDrawerProvider>
        <Routes />
        <ToastContainer />
        <GlobalStyle />
      </SidebarDrawerProvider>
    </AuthContext>
  </BrowserRouter>
);

export default App;
