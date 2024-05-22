import React from 'react'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'

export const CollectionElementNavigation = () => {
  return (
    <div className='navigationElementContainer'>
        <div className='navigationElementButtonContainer'>
          <img onClick={handleLeftClick} src='/images/leftChevron.jpg' alt='previousCollection'/>
          <div className='navigationElementCollectionPicture'>
            <CollectionMainPic imageUrl={previousCollectionPictureUrl} imageAlt={previousCollectionPictureAlt}/>
          </div>
        </div>
        <ScrollToTop/>
        <div className='navigationElementButtonContainer'>
          <div className='navigationElementCollectionPicture'>
            <CollectionMainPic  imageUrl={nextCollectionPictureUrl} imageAlt={nextCollectionPictureAlt}/>
          </div>
          <img onClick={handleRightClick} src='/images/rightChevron.jpg' alt='nextCollection'/>
        </div>
      </div>
  )
}
