import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { ImLocation, ImArrowUp, ImArrowDown } from 'react-icons/im';
import moment from 'moment';
import MediaSlider from '../../MediaSlider/MediaSlider';

function Post({ post, setPostEditor }) {
   const [postDropdown, setPostDropdown] = useState(() => false);
   const user = JSON.parse(localStorage.getItem('profile')).existingUser;

   return (
      <div className="post">
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
                  <div className="dropdown-link" style={{ padding: '7px' }}>
                     <AiOutlineEdit className="dropdown-icon" />
                     <h3>Edit</h3>
                  </div>
                  <div className="dropdown-link" style={{ padding: '7px' }}>
                     <AiOutlineDelete className="dropdown-icon" />
                     <h3>Delete</h3>
                  </div>
               </div>}
            </div>
         </div>

         {post.location && <div className="post-location">
            <ImLocation />
            <span>{post.location}</span>
         </div>}

         {post?.postText !== '' && <div className="post-text">
            <pre>{post?.postText}</pre>
         </div>}

         {post.media.length !== 0 &&
            <div className="post-media">
               {post.media.length === 1 &&
                  post.media.map(media => {
                     return <img src={media.url} key={media.filename} alt="post media" />
                  })
               }
               
               {post.media.length > 1 &&
                  <MediaSlider media={post.media} />
               }
            </div>
         }

         <div className="votes-container">
            <div className="vote">
               <div className="vote-icon">
                  <ImArrowUp className={post.upVotes.indexOf(user?._id) !== -1 && 'selected-vote'} />
               </div>
               <span>{post.upVotes.length}</span>
            </div>
            <div className="vote">
               <div className="vote-icon">
                  <ImArrowDown className={post.downVotes.indexOf(user?._id) !== -1 && 'selected-vote'} />
               </div>
               <span>{post.downVotes.length}</span>
            </div>
         </div>
      </div>
   )
}

export default Post;