import axios from 'axios';

export const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://localhost:3333',
  baseURL: 'https://deploy.cooasgo.samasc.com.br',
});

export const apiPowerBI = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://192.168.1.48:3333/',
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
