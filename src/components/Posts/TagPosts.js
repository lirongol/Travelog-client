import React, { useEffect, useRef, useCallback } from 'react';
import './Posts.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTagPosts } from '../../redux/actions/tags';
import CircularProgress from '@material-ui/core/CircularProgress';
import Post from './Post/Post';
import { useLocation } from 'react-router-dom';

function TagPosts({ tag, setPostEditor }) {
   const dispatch = useDispatch();
   const location = useLocation();
   const observer = useRef(null);
   const limit = 10;

   const { posts, info } = useSelector(state => state.tags);

   useEffect(() => {
      dispatch(getTagPosts(tag, 0, limit));
      // eslint-disable-next-line
   }, [location]);

   // eslint-disable-next-line
   const loadMore = useCallback(lastPost => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && !info.noMorePosts) {
            dispatch(getTagPosts(tag, info.nextPage, limit));
         }
      })
      if (lastPost) observer.current.observe(lastPost);
   });

   return (
      <div className="posts-container">
         {!posts.length ? info.noMorePosts ? <p>no posts with this tag</p> :
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
}

export default TagPosts;
