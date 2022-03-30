/* eslint-disable no-else-return */
import axios, { AxiosError } from 'axios';
import { useAuth } from '../hooks/auth';

const tokenGlobal = localStorage.getItem('@Samasc:token');
console.log('tokenGlobal', tokenGlobal);
let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onFailure: (err: AxiosError<any>) => void;
}[] = [];

export const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://localhost:3333',
  baseURL: 'https://deploy.cooasgo.samasc.com.br',
  headers: {
    authorization: `Bearer ${tokenGlobal}`,
  },
});

export const apiPowerBI = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://177.201.67.182:3333/',
  baseURL: 'https://powerbi.cooasgo.samasc.com.br/',
});

export const apiGeninfo = axios.create({
  baseURL: 'http://geninfo.cooasgo.com.br:8081/GeninfoPPR/api/v1/',
  auth: {
    username: 'ppr',
    password: 'C0Ox@G.1l',
  },
});

export const apiPowerBiDashboard = axios.create({
  baseURL:
    'https://api.powerbi.com/beta/e9a74b56-c008-4411-9616-0a7f17e12dad/datasets/fc14a445-b4bb-4435-a72a-7a4e88de65f8/',
});

api.interceptors.response.use(
  response => {
    console.log('retornou');
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        const token_refresh = localStorage.getItem('@Samasc:refresh_token');
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;
          api
            .post('/refresh-token', {
              refresh_token: token_refresh,
            })
            .then(response => {
              const { token } = response.data;

              localStorage.setItem('@Samasc:token', token);
              localStorage.setItem(
                '@Samasc:refresh_token',
                response.data.refresh_token,
              );

              api.defaults.headers.authorization = `Bearer ${token}`;
              failedRequestsQueue.forEach(request => request.onSuccess(token));
              failedRequestsQueue = [];
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }
        console.log('se deu certo');
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              console.log('token', token);
              originalConfig.headers.authorization = `Bearer ${token}`;

              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        const { signOut } = useAuth();
        console.log('saiu');
        signOut();
      }
    }
    return Promise.reject(error);
  },
);
