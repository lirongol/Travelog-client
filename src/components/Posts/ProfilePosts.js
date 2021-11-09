import React, { useEffect, useCallback, useRef } from 'react';
import './Posts.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilePosts, refreshProfilePosts } from '../../redux/actions/profilePosts';
import Post from './Post/Post';
import CircularProgress from '@material-ui/core/CircularProgress';

function ProfilePosts({ setPostEditor }) {
   const dispatch = useDispatch();
   const { posts, info } = useSelector(state => state.profilePosts);
   const profile = useSelector(state => state?.profile);
   const observer = useRef(null);
   const limit = 10;

   useEffect(() => {
      if (!posts.length && !info.noMorePosts) {
         dispatch(getProfilePosts(profile._id, 0, 10));
      }
   }, [dispatch, posts, info, profile]);

   useEffect(() => {
      if (posts.length) {
         dispatch(refreshProfilePosts(profile._id, info.nextPage * limit));
      }
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      const int = setInterval(() => {
         dispatch(refreshProfilePosts(profile._id, info.nextPage * limit));
      }, 10000)
      return () => {
         clearInterval(int);
      }
   }, [dispatch, info, profile]);

   // eslint-disable-next-line
   const loadMore = useCallback(lastPost => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && !info.noMorePosts) {
            dispatch(getProfilePosts(profile._id, info.nextPage, limit));
         }
      })
      if (lastPost) observer.current.observe(lastPost);
   });

   return (
      <div className="posts-container">
         {!posts.length ?
            info.noMorePosts ?
               'no posts'
               :
               <CircularProgress style={{ color: 'var(--orange-1)' }} />
            : 
            posts.map((post, index) => {
               if (posts.length - 4 === index) {
                  return (
                     <div className="post" key={post._id} ref={loadMore}>
                        <Post post={post} setPostEditor={setPostEditor} />
                     </div>
                  )
               } else {
                  return (
                     <div className="post" key={post._id}>
                        <Post post={post} setPostEditor={setPostEditor} />
                     </div>
                  )
               }
            })
         }
      </div>
   )
};

export default ProfilePosts;
