import React from 'react'
import './CollectionElementPicture.css'

export const CollectionElementPicture = ({collection_element_picture_url, collection_element_picture_alt}) => {
  return (
    <div className='collectionPictureContainer'>
      <img src={collection_element_picture_url} alt={collection_element_picture_alt}/>
    </div>
  )
}
