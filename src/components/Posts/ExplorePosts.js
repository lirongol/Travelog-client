import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExplorePosts, clearExplorePosts } from '../../redux/actions/explorePosts';
import Post from './Post/Post';
import CircularProgress from '@material-ui/core/CircularProgress';
import { HiOutlineRefresh } from 'react-icons/hi';
import './Posts.css';

function ExplorePosts({ setPostEditor }) {
   const dispatch = useDispatch();
   const { posts, info } = useSelector(state => state.explorePosts);
   const observer = useRef(null);
   const limit = 10;

   useEffect(() => {
      if (!posts.length && !info.noMorePosts) {
         dispatch(getExplorePosts(0, limit));
      }
   }, [dispatch, posts, info]);

   // eslint-disable-next-line
   const loadMore = useCallback(lastPost => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && !info.noMorePosts) {
            dispatch(getExplorePosts(info.nextPage, limit));
         }
      })
      if (lastPost) observer.current.observe(lastPost);
   });

   const refreshExplore = () => {
      dispatch(clearExplorePosts());
   }

   return (
      <div className="posts-container">
         <div className="explore-refresh-btn" onClick={refreshExplore}>
            <HiOutlineRefresh />
         </div>
         {!posts.length ? 
            <CircularProgress style={{ color: 'var(--orange-1)' }} />
            :
            posts.map((post, index) => {
               if (posts.length - 1 === index) {
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

export default ExplorePosts;
