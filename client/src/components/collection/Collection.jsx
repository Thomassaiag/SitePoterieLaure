import React from 'react'
import './Collection.css'
import { CollectionMainPicture } from '../collectionMainPicture/collectionMainPicture'

export const Collection = ({imageUrl, imageAlt, title}) => {
  return (
    <div className='collectionContainer'>
        <img src={imageUrl} alt={imageAlt}/>
        {/* <CollectionMainPicture className='collectionPicture' imageUrlPicture={imageUrl} imageAltPicture={imageAlt}/> */}
        <p>{title}</p>
    </div>
  )
}
