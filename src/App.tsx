import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AuthContext from './hooks';

import Routes from './routes';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthContext>
      <Routes />
      <GlobalStyle />
    </AuthContext>
  </BrowserRouter>
);

export default App;
