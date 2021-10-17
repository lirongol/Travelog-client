import axios from 'axios';

const API = axios.create({ baseURL: 'http://192.168.1.200:5000' });

API.interceptors.request.use(req => {
   if (localStorage.getItem('profile')) {
      const profile = JSON.parse(localStorage.getItem('profile'));
      req.headers.token = profile?.token;
   }
   return req;
})

// auth
export const login = loginData => API.post('/user/login', loginData);
export const register = registerData => API.post('/user/register', registerData);

// user
export const getUserInfo = username => API.get(`/user/${username}`);
export const followUser = username => API.patch(`/user/${username}`);

// post
export const getFeedPosts = (page, limit = 5) => (
   API.get(`/post/feedposts?page=${page}&limit=${limit}`)
);
export const createPost = newPost => API.post('/post', newPost);
export const updatePost = (id, post) => API.patch(`/post/${id}`, post);
export const postUpVote = id => API.patch(`/post/${id}/postupVote`);
export const postDownVote = id => API.patch(`/post/${id}/postdownVote`);
export const deletePost = id => API.delete(`/post/${id}`);