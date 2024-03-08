import React from 'react'
import './Collection.css'
import { CollectionMainPic } from '../collectionMainPic/CollectionMainPic'

export const Collection = ({imageUrl, imageAlt, title}) => {
  return (
    <div className='collectionContainer'>
        <CollectionMainPic imageUrl={imageUrl} imageAlt={imageAlt}/>
        <p>{title}</p>
    </div>
  )
}
