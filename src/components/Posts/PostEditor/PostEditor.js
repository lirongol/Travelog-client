import React, { useState, useRef, useEffect } from 'react';
import './PostEditor.css';
import { CgClose } from 'react-icons/cg';

function PostEditor({ setPostEditor }) {
   const [text, setText] = useState('');
   const postText = useRef();

   useEffect(() => {
      postText.current.focus();
   }, [postText]);

   const handleSubmit = e => {
      e.preventDefault();
   }

   return (
      <div className="backdrop post-editor-container" onMouseUp={() => setPostEditor(false)}>
         <div className="post-editor" onMouseUp={e => e.stopPropagation()}>
            <div className="post-editor-header">
               <h3>Create Post</h3>
               <div className="post-editor-close-icon" onClick={() => setPostEditor(false)}>
                  <CgClose />
               </div>
            </div>
            <form onSubmit={handleSubmit}>
               <div className="post-text-container">
                  <div
                     className="post-text-input"
                     contentEditable
                     onInput={e => setText(e.target.innerText)}
                     ref={postText}
                  >
                  </div>
                  {!text && <span className="placeholder">Write your text here</span>}
               </div>
            </form>
         </div>
      </div>
   )
}

export default PostEditor;
