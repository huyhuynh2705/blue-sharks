import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_DOMAIN });
// const API = axios.create({ baseURL: 'http://localhost:5000' });

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
export const filterMembers = (form, page) => API.post(`/members/filter?page=${page}`, form);
export const getActivities = (page) => API.get(`/activities?page=${page}`);
export const createActivity = (form) => API.post('/activities', form);
export const joinActivity = (activityId) => API.put(`/activities/${activityId}/join`);
export const deleteActivity = (activityId) => API.delete(`/activities/${activityId}/delete`);
export const updateActivity = (activityId, form) => API.put(`/activities/${activityId}`, form);
