import React, { useState, useRef, useEffect } from 'react';
import './PostEditor.css';
import { CgClose } from 'react-icons/cg';
import { RiImageAddFill } from 'react-icons/ri';
import { AiOutlineVideoCameraAdd, AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import FileBase64 from 'react-file-base64';

function PostEditor({ setPostEditor }) {
   const [postData, setPostData] = useState({
      postText: '',
      location: '',
      selectedFiles: '',
      selectedVideo: ''
   });
   const [mouseDown, setMouseDown] = useState(false);
   const postText = useRef();

   useEffect(() => {
      postText.current.focus();
   }, [postText]);

   useEffect(() => {
      const files = postData.selectedFiles;
      if (typeof files === 'object' && files.length === 0) {
         setPostData({ ...postData, selectedFiles: '' });
      }
   }, [postData]);

   const handleSubmit = e => {
      e.preventDefault();
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
      <div className="backdrop post-editor-container" onMouseDown={() => setMouseDown(true)} onMouseUp={() => mouseDown && setPostEditor(false)}>
         <div className="post-editor" onMouseDown={e => { e.stopPropagation(); setMouseDown(false)}} onMouseUp={e => e.stopPropagation()}>
            <div className="post-editor-header">
               <h3>Create Post</h3>
               <div className="post-editor-close-icon" onClick={() => setPostEditor(false)}>
                  <CgClose />
               </div>
            </div>
            <form className="post-editor-form" onSubmit={handleSubmit}>

               <div className="post-text-container">
                  <div
                     className="post-text-input"
                     contentEditable
                     onInput={e => setPostData({ ...postData, postText: e.target.innerText })}
                     ref={postText}
                  >
                  </div>
                  {!postData.postText && <span className="placeholder">Write your text here</span>}
               </div>

               {postData.selectedFiles && <div className="previews">
                     {postData.selectedFiles.map(file => {
                        return (
                           <div className="preview-media" key={Math.random()}>
                              <div className="delete-media" onClick={() => {
                                 setPostData({...postData,
                                    selectedFiles: postData.selectedFiles.filter(f => f !== file)
                                 })
                              }}>
                                 <AiOutlineDelete style={{color: 'red'}} />
                              </div>
                              <img src={file} alt="preview" />
                           </div>
                        )
                     })}
               </div>}

               {postData.selectedVideo && <div className="previews">
                  <div className="video-preview">
                     <div className="delete-media" onClick={() => setPostData({ ...postData, selectedVideo: ''})}>
                        <AiOutlineDelete style={{color: 'red'}} />
                     </div>
                     <video controls>
                        <source src={postData.selectedVideo} type="video/mp4"/>
                     </video>
                  </div>
               </div>}

               <div className="add-to-post-section">
                  <div className="add-to-post" onClick={handleAddImages}>
                     <RiImageAddFill className="add-to-post-icon img-icon" />
                     <FileBase64
                        type="file"
                        accept="image"
                        multiple
                        onDone={files => setPostData({ ...postData, selectedFiles: files.map(f => f.base64) })}
                     />
                  </div>
                  <div className="add-to-post" onClick={handleAddVideo}>
                     <AiOutlineVideoCameraAdd className="add-to-post-icon video-icon" />
                     <FileBase64
                        type="file"
                        accept="Video/*"
                        onDone={file => setPostData({ ...postData, selectedVideo: file.base64 })}
                     />
                  </div>
                  <div className="add-to-post">
                     <MdOutlineAddLocationAlt className="add-to-post-icon location-icon" />
                  </div>
               </div>

               <div className="btn-container">
                  <button
                     className="btn"
                     style={postData.postText || postData.selectedFiles || postData.selectedVideo ? null : {backgroundColor: '#ff604eab', cursor: 'not-allowed'}}
                     disabled={postData.postText || postData.selectedFiles || postData.selectedVideo ? false : true}
                     onClick={() => console.log(postData)}
                  >
                     Post
                  </button>
               </div>

            </form>
         </div>
      </div>
   )
}

export default PostEditor;
