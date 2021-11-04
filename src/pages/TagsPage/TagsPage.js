import React, { useEffect } from 'react';
import './TagsPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../../redux/actions/tags';
import { Link } from 'react-router-dom';

function TagsPage() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTags());
   }, [dispatch]);

   const {tagsInfo} = useSelector(state => state.tags);

   const num = () => Math.ceil(Math.random() * 55 + 150);

   return (
      <div className="tags-page">
         <div className="tags-container">
            {
               tagsInfo.map(tag => {
                  return (
                     <Link
                        key={tag}
                        className="tag-container"
                        to={`/tags/${tag[0]}`}
                        style={{borderTop: `10px solid rgb(${num()},${num()},${num()})`}}
                     >
                        <h1>#{tag[0]}</h1>
                        <h3>{tag[1].length} posts</h3>
                     </Link>
                  )
               })
            }
         </div>
      </div>
   )
}

export default TagsPage;
