import React from 'react'
import './Collection.css'

export const Collection = ({imageUrl, imageAlt, title}) => {
  return (
    <div className='collectionContainer'>
        <img src={imageUrl} alt={imageAlt}/>
        <p>{title}</p>
    </div>
  )
}
