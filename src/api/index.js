import axios from 'axios';
import { production } from '../config';

const API = axios.create({ baseURL: production ? 'https://travelogapi.herokuapp.com' : 'http://localhost:5000' });

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
export const getProfileFollowers = username => API.get(`/user/${username}/followers`);
export const getProfileFollowing = username => API.get(`/user/${username}/following`);
export const getProfileImages = username => API.get(`/user/${username}/images`);
export const getProfileVideos = username => API.get(`/user/${username}/videos`);
export const followProfile = username => API.patch(`/user/followprofile/${username}`);
export const updateBio = bio => API.patch('/user/updatebio', bio);
export const updateProfileImg = img => API.patch('/user/updateprofileimg', img);

// post
export const getFeedPosts = (page, limit) => API.get(`/post/feedposts?page=${page}&limit=${limit}`);
export const refreshFeedPosts = limit => API.get(`/post/refreshfeed?limit=${limit}`);
export const getProfilePosts = (userId, page, limit) => API.get(`/post/profileposts/${userId}?page=${page}&limit=${limit}`);
export const refreshProfilePosts = (userId, limit) => API.get(`/post/refreshprofileposts/${userId}?limit=${limit}`);
export const getExplorePosts = (page, limit) => API.get(`/post/exploreposts?page=${page}&limit=${limit}`);
export const getTagPosts = (tag, page, limit) => API.get(`/post/tagposts/${tag}?page=${page}&limit=${limit}`);
export const getVideoPosts = (page, limit) => API.get(`/post/videoposts?page=${page}&limit=${limit}`);
export const createPost = newPost => API.post('/post', newPost);
export const updatePost = (id, post) => API.patch(`/post/${id}`, post);
export const postUpVote = id => API.patch(`/post/${id}/postupVote`);
export const postDownVote = id => API.patch(`/post/${id}/postdownVote`);
export const deletePost = id => API.delete(`/post/${id}`);

// app
export const getTags = () => API.get('/app/tags');

// search
export const search = (q, limit) => API.get(`/search?q=${q}&limit=${limit}`);

// chat
export const getChats = () => API.get('/chat');
export const sendMsg = (userId, message) => API.post(`/chat/sendmessage/t/${userId}`, { message });
export const newChat = receiverId => API.post(`/chat/new/t/${receiverId}`)