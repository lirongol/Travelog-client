import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { ImLocation, ImArrowUp, ImArrowDown } from 'react-icons/im';
import moment from 'moment';
import MediaSlider from '../../MediaSlider/MediaSlider';
import { useSelector, useDispatch } from 'react-redux';
import { setPostId, deletePost, postUpVote, postDownVote } from '../../../redux/actions/postActions';

function Post({ post, setPostEditor }) {
   const [postDropdown, setPostDropdown] = useState(() => false);
   const user = useSelector(state => state?.auth?.existingUser);
   const dispatch = useDispatch();
   const isAuth = post.creatorId === user._id;

   const handlePostEdit = () => {
      if (isAuth) {
         dispatch(setPostId(post._id));
         setPostEditor(true);
      }
      setPostDropdown(false)
   }

   const handlePostDelete = () => {
      if (isAuth) {
         dispatch(deletePost(post._id));
      }
      setPostDropdown(false)
   }

   const handlePostUpVote = () => {
      dispatch(postUpVote(post._id));
   }

   const handlePostDownVote = () => {
      dispatch(postDownVote(post._id));
   }

   return (
      <>
         <div className="post-header">
            <div className="post-header-left">
               <div className="post-creator-avatar">
                  <Link to={`/${post.creator}`} className="link">
                     <img src={post.creatorProfileImg} alt="profile" />
                  </Link>
               </div>
               <div className="username-time">
                  <div className="creator-username">
                     <Link to={`/${post.creator}`} className="link">
                        <h4>{post.creator}</h4>
                     </Link>
                  </div>
                  <div className="post-time-ago">
                     <span>{moment(post.createdAt).fromNow()}</span>
                     <span>{post.isEdited && ', Edited'}</span>
                  </div>
               </div>
            </div>
            <div
               className="post-header-right"
               tabIndex="0"
               onBlur={() => setPostDropdown(false)}
            >
               <div
                  className="post-options"
                  style={postDropdown ? {color: 'var(--orange-1)'} : null}
                  onClick={() => setPostDropdown(pre => !pre)}
               >
                  <HiDotsHorizontal/>
               </div>
               {postDropdown && <div className="post-options-dropdown">
                  {isAuth && <div
                     className="dropdown-link"
                     style={{ padding: '7px' }}
                     onClick={handlePostEdit}
                  >
                     <AiOutlineEdit className="dropdown-icon" />
                     <h3>Edit</h3>
                  </div>}
                  {isAuth && <div
                     className="dropdown-link"
                     style={{ padding: '7px' }}
                     onClick={handlePostDelete}
                  >
                     <AiOutlineDelete className="dropdown-icon" />
                     <h3>Delete</h3>
                     {/* are you sure you want to delete this post?
                     any media attached to it will be deleted too */}
                  </div>}
               </div>}
            </div>
         </div>

         {post.location && <div className="post-location">
            <ImLocation />
            <span>{post.location}</span>
         </div>}

         {post.postText && <div className="post-text">
            <pre>{post.postText}</pre>
         </div>}

         {post.tags.length > 0 && <div className="post-tags">
            {post.tags.map(tag => {
               return (
                  <Link key={tag} className="tag" to={`/tags/${tag}`}>#{tag}</Link>
               )
            })}
         </div>}

         {post.media.length !== 0 &&
            <div className="post-media">
               {post.media.length === 1 &&
                  post.media.map(media => {
                     return <img src={media.url} key={media.filename} alt="post media" />;
                  })
               }
               
               {post.media.length > 1 &&
                  <MediaSlider media={post.media} />
               }
            </div>
         }

         {post.video[0]?.url &&
            <div className="post-media">
               <video controls>
                  <source src={post.video[0].url} type="video/mp4"/>
               </video>
            </div>
         }

         <div className="votes-container">
            <div className="vote" onClick={handlePostUpVote}>
               <div className="vote-icon">
                  <ImArrowUp
                     className={post.upVotes.indexOf(user?._id) !== -1 && 'selected-vote'}
                  />
               </div>
               <span>{post.upVotes.length}</span>
            </div>
            <div className="vote" onClick={handlePostDownVote}>
               <div className="vote-icon">
                  <ImArrowDown
                     className={post.downVotes.indexOf(user?._id) !== -1 && 'selected-vote'}
                     style={{color: 'var(--gray-1)'}}
                  />
               </div>
               <span>{post.downVotes.length}</span>
            </div>
         </div>
      </>
   )
}

export default Post;
