import React from 'react'

export const Collection = ({imageUrl, imageAlt, title}) => {
  return (
    <span className='collectionClass'>
        <img src={imageUrl} alt={imageAlt}/>
        <p>{title}</p>
    </span>
  )
}
