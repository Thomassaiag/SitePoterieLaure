import React from 'react'
import './PopUpPicture.css'

export const PopUpPicture = ({imageUrl, imageAlt, onClose}) => {
  return (
    
      <div className='overlay'>
        <div className='popup'>
          <div className='chevronPictureContainer'>
            <img src='/images/leftChevron.jpg' alt='previous picture'/>
          </div>
          <img className='popUpPicture' src={imageUrl} alt={imageAlt} onClick={onClose}/>
          <div className='chevronPictureContainer'>
            <img src='/images/rightChevron.jpg' alt='next picture'/>
          </div>
        </div>
      </div>
    
  )
}
