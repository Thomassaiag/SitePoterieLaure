import React from 'react'
import './CollectionMainPic.css'

export const CollectionMainPic = ({imageUrl, imageAlt}) => {
  return (
    <img className='collectionImage' src={imageUrl} alt={imageAlt}/>
  )
}
