import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.1.200:5000' });

API.interceptors.request.use(req => {
   if (localStorage.getItem('profile')) {
      req.headers.token = JSON.parse(localStorage.getItem('profile')).token;
   }
   return req;
})

// auth
export const login = loginData => API.post('/user/login', loginData);
export const register = registerData => API.post('/user/register', registerData);

// user
export const getUserInfo = username => API.get(`/user/${username}`);
export const followUser = username => API.patch(`/user/${username}`);

// posts
export const getAllPosts = () => API.get('/post');
export const createPost = newPost => API.post('/post', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);
export const deletePost = id => API.delete(`/post/${id}`);
export const postUpVote = id => API.patch(`/post/${id}/postUpVote`);
export const postDownVote = id => API.patch(`/post/${id}/postDownVote`);