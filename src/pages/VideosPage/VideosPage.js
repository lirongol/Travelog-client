import React from 'react';
import './VideosPage.css';
import VideoPosts from '../../components/Posts/VideoPosts';

function VideosPage() {
   return (
      <div className="videos-page">
         <h1 className="page-title">Videos</h1>
         <VideoPosts />
      </div>
   )
}

export default VideosPage;
