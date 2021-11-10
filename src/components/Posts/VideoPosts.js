import React, { useEffect, useRef, useCallback } from 'react';
import './Posts.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoPosts } from '../../redux/actions/videoPosts';
import Post from './Post/Post';
import CircularProgress from '@material-ui/core/CircularProgress';

function VideoPosts({ setPostEditor }) {
   const dispatch = useDispatch();
   const observer = useRef(null);
   const limit = 10;

   const { posts, info } = useSelector(state => state.videoPosts);

   useEffect(() => {
      if (!posts.length) {
         dispatch(getVideoPosts(0, limit));
      }
      // eslint-disable-next-line
   }, []);

   // eslint-disable-next-line
   const loadMore = useCallback(lastPost => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && !info.noMorePosts) {
            dispatch(getVideoPosts(info.nextPage, limit));
         }
      })
      if (lastPost) observer.current.observe(lastPost);
   });

   return (
      <div className="posts-container">
         {!posts.length ? <CircularProgress style={{ color: 'var(--orange-1)' }} /> :
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
}

export default VideoPosts;
