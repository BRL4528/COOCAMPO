import axios from 'axios';

export const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  // baseURL: 'http://localhost:3333',
  baseURL: 'https://digitalocean.samasc.site',
});

export const apiPowerBI = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: 'http://192.168.1.48:3333/',
});

export const apiGeninfo = axios.create({
  baseURL: 'http://geninfo.cooasgo.com.br:8081/GeninfoPPR/api/v1/',
  auth: {
    username: 'ppr',
    password: 'C0Ox@G.1l',
  },
});
