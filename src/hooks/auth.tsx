import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
// import { useCookies } from 'react-cookie';
import { api } from '../services/api';

interface User {
  id: string;
  name: string;
  nickname: string;
  status: string;
  tag: string;
  email: string;
  dashboard: boolean;
  goals_and_sub_goals: boolean;
  sector: boolean;
  employers: boolean;
  module_analyze: boolean;
  imports: boolean;
  report: boolean;
  service_send_email: boolean;
  schedule: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  nickname: string;
  password: string;
}

interface AuthContextData {
  user: User;
  // eslint-disable-next-line no-unused-vars
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  // eslint-disable-next-line no-unused-vars
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const authChannels = new BroadcastChannel('auth');

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Samasc:token');
    const user = localStorage.getItem('@Samasc:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ nickname, password }) => {
    const response = await api.post('sessions', {
      nickname,
      password,
    });
    const { token, refresh_token, access } = response.data;
    const user = access;
    localStorage.setItem('@Samasc:token', token);
    localStorage.setItem('@Samasc:refresh_token', refresh_token);
    localStorage.setItem('@Samasc:user', JSON.stringify(user));

    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Samasc:token');
    localStorage.removeItem('@Samasc:refresh_token');
    localStorage.removeItem('@Samasc:user');

    authChannels.postMessage('signOut');

    setData({} as AuthState);
  }, []);

  useEffect(() => {
    authChannels.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          signOut();
          break;
        default:
          break;
      }
    };
  }, [signOut]);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Samasc:user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
