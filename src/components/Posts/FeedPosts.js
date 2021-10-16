import React, { useEffect } from 'react';
import './Posts.css';
import Post from './Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedPosts } from '../../redux/actions/getPosts';
import CircularProgress from '@material-ui/core/CircularProgress';

function FeedPosts({ setPostEditor }) {
   const posts = useSelector(state => state.feedPosts);
   const dispatch = useDispatch();

   useEffect(() => {
         dispatch(getFeedPosts());
   }, [dispatch]);

   return (
      <div className="posts-container">
         {!posts.length ?
            <CircularProgress style={{ color: 'var(--orange-1)' }} />
            :
            posts.map(post => <Post key={post._id} post={post} setPostEditor={setPostEditor} />)
         }
      </div>
   )
}

export default FeedPosts;
