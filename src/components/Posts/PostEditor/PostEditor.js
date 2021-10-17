import React, { useState, useRef, useEffect } from 'react';
import './PostEditor.css';
import { CgClose } from 'react-icons/cg';
import { RiImageAddFill } from 'react-icons/ri';
import { AiOutlineVideoCameraAdd, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import { BiArrowBack } from 'react-icons/bi';
import { ImLocation } from 'react-icons/im';
import FileBase64 from 'react-file-base64';
import LocationSearch from '../../LocationSearch/LocationSearch';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, setPostId, updatePost } from '../../../redux/actions/postActions';

function PostEditor({ setPostEditor }) {
   const [postData, setPostData] = useState({
      postText: '',
      location: '',
      selectedFiles: '',
      selectedVideo: '',
      media: [],
      video: []
   });
   const [mouseDown, setMouseDown] = useState(() => false);
   const [locationForm, setLocationForm] = useState(() => false);
   const dispatch = useDispatch();
   const postText = useRef();

   const postId = useSelector(state => state.postId);
   const post = useSelector(state => (
      state.feedPosts.posts.find(post => post._id === postId)
   ));

   useEffect(() => {
      if (post) {
         setPostData({ ...post, selectedFiles: '', selectedVideo: '' });
         postText.current.innerText = post.postText;
      } else {
         postText?.current?.focus();
      }
      // eslint-disable-next-line
   }, [post])

   const handleSubmit = e => {
      e.preventDefault();
      if (postId) {
         dispatch(updatePost(postId, postData));
      } else {
         dispatch(createPost(postData));
      }
      setPostEditor(false);
      dispatch(setPostId(null));
   }

   const handleEditorClose = () => {
      dispatch(setPostId(null));
      setPostEditor(false);
   }

   const handleAddImages = () => {
      const inputImg = document.querySelector('input[type="file"]');
      inputImg.click();
   }

   const handleAddVideo = () => {
      const inputVideo = document.querySelectorAll('input[type="file"]')[1];
      inputVideo.click();
   }

   return (
      <div
         className="backdrop post-editor-container"
         onMouseDown={() => setMouseDown(true)}
         onMouseUp={() => mouseDown && handleEditorClose()}
      >
         <div
            className="post-editor"
            onMouseDown={e => { e.stopPropagation(); setMouseDown(false) }}
            onMouseUp={e => e.stopPropagation()}
         >
            <div className="post-editor-header">
               <h3>{locationForm ? 'Search Location' : postId ? 'Edit Post' : 'Create Post'}</h3>
               {!locationForm && <div className="post-editor-close-icon" onClick={handleEditorClose}>
                  <CgClose />
               </div>}
               {locationForm && <div className="location-search-back-icon" onClick={() => setLocationForm(false)}>
                  <BiArrowBack />
               </div>}
            </div>

            {locationForm && <div className="location-search-form">
               <LocationSearch postData={postData} setPostData={setPostData} setLocationForm={setLocationForm} />
            </div>}

            <form className="post-editor-form" onSubmit={handleSubmit} style={locationForm ? { display: 'none' } : null}>
               
               {postData.location && <div className="location-preview">
                  <div>
                     <ImLocation style={{display: 'flex', marginRight: '3px'}} />
                  </div>
                  <span>{postData.location}</span>
               </div>}

               <div className="post-text-container">
                  <div
                     className="post-text-input"
                     contentEditable
                     onInput={e => setPostData({...postData, postText: e.target.innerText})}
                     ref={postText}
                  >
                  </div>
                  {postData.postText === '' && <span className="placeholder">Write your text here</span>}
               </div>

               {postData.selectedFiles && <div className="previews">
                     {postData.selectedFiles.map((file, index) => {
                        return (
                           <div className="preview-media" key={Math.random()}>
                              <div className="delete-media" onClick={() => {
                                 setPostData({...postData,
                                    selectedFiles: postData.selectedFiles.filter((f, i) => i !== index)
                                 })
                              }}>
                                 <AiOutlineDelete style={{color: 'red'}} />
                              </div>
                              <img src={file} alt="preview" />
                           </div>
                        )
                     })}
               </div>}

               {postData.media && <div className="previews">
                     {postData.media.map((file, index) => {
                        return (
                           <div className="preview-media" key={file._id}>
                              <div className="delete-media" onClick={() => {
                                 setPostData({...postData,
                                    media: postData.media.filter((f, i) => i !== index)
                                 })
                              }}>
                                 <AiOutlineDelete style={{color: 'red'}} />
                              </div>
                              <img src={file.url} alt="preview" />
                           </div>
                        )
                     })}
               </div>}

               {postData.selectedVideo.length !== 0 && <div className="previews">
                  <div className="video-preview">
                     <div className="delete-media" onClick={() => setPostData({ ...postData, selectedVideo: ''})}>
                        <AiOutlineDelete style={{color: 'red'}} />
                     </div>
                     <video controls>
                        <source src={postData.selectedVideo} type="video/mp4"/>
                     </video>
                  </div>
               </div>}

               {postData?.video[0]?.url && <div className="previews">
                  <div className="video-preview">
                     <div className="delete-media" onClick={() => setPostData({ ...postData, video: ''})}>
                        <AiOutlineDelete style={{color: 'red'}} />
                     </div>
                     <video controls>
                        <source src={postData.video[0].url} type="video/mp4"/>
                     </video>
                  </div>
               </div>}

               <div className="add-to-post-section">
                  <div className="add-to-post" tabIndex="0" onClick={handleAddImages}>
                     <RiImageAddFill className="add-to-post-icon img-icon" />
                     <FileBase64
                        type="file"
                        accept="image"
                        multiple
                        onDone={files => setPostData({
                           ...postData,
                           selectedFiles: [
                              ...postData.selectedFiles,
                              ...files.map(f => f.base64)
                           ]
                        })}
                     />
                  </div>
                  <div className="add-to-post" tabIndex="0" onClick={handleAddVideo}>
                     <AiOutlineVideoCameraAdd className="add-to-post-icon video-icon" />
                     <FileBase64
                        type="file"
                        accept="Video/*"
                        onDone={file => setPostData({ ...postData, selectedVideo: file.base64 })}
                     />
                  </div>
                  <div className="add-to-post" tabIndex="0" onClick={() => setLocationForm(true)}>
                     <MdOutlineAddLocationAlt className="add-to-post-icon location-icon" />
                  </div>
               </div>

               <div className="btn-container">
                  <button
                     className="btn"
                     style={
                        postData.postText ||
                        postData.selectedFiles ||
                        postData.selectedVideo
                        ? null : { backgroundColor: '#ff604eab', cursor: 'not-allowed' }}
                     disabled={
                        postData.postText ||
                        postData.selectedFiles ||
                        postData.selectedVideo
                        ? false : true}
                  >
                     {postId ? 'Save' : 'Post'}
                  </button>
               </div>

            </form>
         </div>
      </div>
   )
}

export default PostEditor;
