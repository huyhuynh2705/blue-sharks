import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_DOMAIN });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

export const logIn = (form) => API.post('/auth/login', form);
export const signUp = (form) => API.post('/auth/signup', form);
export const updateMember = (form) => API.post('/member/update', form);
export const getMembers = (page) => API.get(`/members?page=${page}`);
