import React, { useEffect } from 'react';
import './Posts.css';
import Post from './Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedPosts } from '../../redux/actions/getPosts';
import CircularProgress from '@material-ui/core/CircularProgress';

function FeedPosts({ setPostEditor }) {
   const dispatch = useDispatch();
   const { posts, info } = useSelector(state => state.feedPosts);

   useEffect(() => {
      if (!posts.length) {
         dispatch(getFeedPosts(0));
      }
   }, [dispatch, posts]);

   const getMore = () => {
      if (!info.noMorePosts) {
         dispatch(getFeedPosts(info.nextPage));
      }
   }

   return (
      <div className="posts-container">
         {!posts.length ?
            <CircularProgress style={{ color: 'var(--orange-1)' }} />
            :
            posts.map(post => <Post key={post._id} post={post} setPostEditor={setPostEditor} />)
         }
         {info.noMorePosts ? 'no more posts' : <button onClick={getMore}>load more</button>}
      </div>
   )
}

export default FeedPosts;
