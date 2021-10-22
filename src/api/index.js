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

// profile
export const getProfile = username => API.get(`/user/${username}`);
export const followProfile = username => API.patch(`/user/followprofile/${username}`);
export const updateBio = bio => API.patch('/user/updatebio', bio);

// post
export const getFeedPosts = (page, limit) => (
   API.get(`/post/feedposts?page=${page}&limit=${limit}`)
);
export const refreshFeedPosts = limit => (
   API.get(`/post/refreshfeed?limit=${limit}`)
);
export const getProfilePosts = (userId, page, limit) => (
   API.get(`/post/profileposts/${userId}?page=${page}&limit=${limit}`)
);
export const refreshProfilePosts = (userId, limit) => (
   API.get(`/post/refreshprofileposts/${userId}?limit=${limit}`)
)
export const createPost = newPost => API.post('/post', newPost);
export const updatePost = (id, post) => API.patch(`/post/${id}`, post);
export const postUpVote = id => API.patch(`/post/${id}/postupVote`);
export const postDownVote = id => API.patch(`/post/${id}/postdownVote`);
export const deletePost = id => API.delete(`/post/${id}`);