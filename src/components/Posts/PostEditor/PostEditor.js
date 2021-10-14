import React, { useState, useRef, useEffect } from 'react';
import './PostEditor.css';
import { CgClose } from 'react-icons/cg';

function PostEditor({ setPostEditor }) {
   const [postData, setPostData] = useState({
      postText: '',
      location: '',
      selectedFiles: ''
   });
   const [mouseDown, setMouseDown] = useState(false);
   const postText = useRef();

   useEffect(() => {
      postText.current.focus();
   }, [postText]);

   const handleSubmit = e => {
      e.preventDefault();
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
               <div className="btn-container">
                  <button
                     className="btn"
                     style={postData.postText || postData.selectedFiles ? null : {backgroundColor: '#ff604eab', cursor: 'not-allowed'}}
                     disabled={postData.postText || postData.selectedFiles ? false : true}
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
