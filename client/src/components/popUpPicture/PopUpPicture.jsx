import React from 'react'

export const PopUpPicture = ({imageUrl, imageAlt}) => {
  return (
    <div className='popUpPictureContainer'>PopUpPicture
        <img src={imageUrl} alt={imageAlt}/>
        <img src='images/leftChevron.jpg' alt='previous picture'/>
        <img src='images/rightChevron.jpg' alt='next picture'/>
    </div>
  )
}
