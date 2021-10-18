import React, { useEffect, useRef, useCallback } from 'react';
import './Posts.css';
import Post from './Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedPosts } from '../../redux/actions/getPosts';
import CircularProgress from '@material-ui/core/CircularProgress';

function FeedPosts({ setPostEditor }) {
   const dispatch = useDispatch();
   const { posts, info } = useSelector(state => state.feedPosts);
   const user = useSelector(state => state?.auth?.existingUser);
   const observer = useRef(null);

   useEffect(() => {
      if (!posts.length && !info.noMorePosts) {
         dispatch(getFeedPosts(0));
      }
   }, [dispatch, posts, info]);

   // eslint-disable-next-line
   const loadMore = useCallback(lastPost => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
         if (entries[0].isIntersecting && !info.noMorePosts) {
            dispatch(getFeedPosts(info.nextPage));
         }
      })
      if (lastPost) observer.current.observe(lastPost);
   })

   return (
      <div className="posts-container">
         {!posts.length ?
            info.noMorePosts ?
               !user.following.length ? <div>Start following travelers to fill your feed</div> : null
               :
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
         {(posts.length > 0 &&  info.noMorePosts) && <div>
            You went through your whole feed, want to explore?
         </div>}
      </div>
   )
}

export default FeedPosts;
