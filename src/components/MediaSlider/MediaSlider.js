import React, { useState } from 'react';
import './MediaSlider.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function MediaSlider({ media }) {
   const [currentIndex, setCurrentIndex] = useState(0);

   const handleNext = () => {
      if (currentIndex === media.length - 1) {
         setCurrentIndex(0);
      } else {
         setCurrentIndex(pre => pre + 1);
      }
   }

   const handlePrev = () => {
      if (currentIndex === 0) {
         setCurrentIndex(media.length - 1);
      } else {
         setCurrentIndex(pre => pre - 1);
      }
   }

   return (
      <div className="slider-container">

         {media.map((media, index) => {
            return (
               <img
                  src={media.url}
                  key={media.filename}
                  alt="post media"
                  className={index === currentIndex ? null : 'hide'}
               />
            )
         })}

         <div className="media-action next-media" onClick={handleNext}>
            <IoIosArrowForward />
         </div>

         <div className="media-action prev-media" onClick={handlePrev}>
            <IoIosArrowBack />
         </div>

         <div className="media-position-container">
            <div className="media-position">
               <span>{currentIndex + 1}/{media.length}</span>
            </div>
         </div>
      </div>
   )
}

export default MediaSlider;