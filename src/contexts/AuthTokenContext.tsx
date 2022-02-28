/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

type SignInCredentials = {
  nickname: string;
  password: string;
};

type AuthTokenData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

const AuthTokenContext = createContext({} as AuthTokenData);
