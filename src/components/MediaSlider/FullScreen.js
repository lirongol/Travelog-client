import React from 'react';
import './MediaSlider';
import { CgClose } from 'react-icons/cg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function FullScreen({ setFsMode, setIdx, idx, images }) {

   const handleNext = () => {
      if (idx === images.length - 1) {
         setIdx(0);
      } else {
         setIdx(pre => pre + 1);
      }
   }

   const handlePrev = () => {
      if (idx === 0) {
         setIdx(images.length - 1);
      } else {
         setIdx(pre => pre - 1);
      }
   }

   return (
      <div className="fs-media-slider">
         <div className="nav-item fs-close-icon" onClick={() => setFsMode(false)}>
            <CgClose />
         </div>
         <div className="img-slider">
            {images.map((img, i) => {
               return (
                  <img
                     src={img.url}
                     key={img.filename}
                     alt="profile media"
                     className={i === idx ? null : 'hide'}
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
                  <span>{idx + 1}/{images.length}</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FullScreen;
