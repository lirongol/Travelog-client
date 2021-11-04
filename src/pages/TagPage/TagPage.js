import React from 'react';
import './TagPage.css';
import { useParams } from 'react-router-dom';
import TagPosts from '../../components/Posts/TagPosts';

function TagPage({ setPostEditor }) {
   const { tag } = useParams();

   return (
      <div className="tag-page">
         <div className="tag-page-header">
            <h1>#{tag}</h1>
         </div>

         <div className="tag-posts-container">
            <TagPosts tag={tag} setPostEditor={setPostEditor} />
         </div>
      </div>
   )
}

export default TagPage;
