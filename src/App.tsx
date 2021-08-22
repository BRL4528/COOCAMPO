import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyle from './styles/global';

import AuthContext from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthContext>
      <Routes />
      <ToastContainer />
      <GlobalStyle />
    </AuthContext>
  </BrowserRouter>
);

export default App;
