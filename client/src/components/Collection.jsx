import React from 'react'

export const Collection = ({imageUrl, imageAlt, title}) => {
  return (
    <span className='collection_Class'>
        <img src={imageUrl} alt={imageAlt}/>
        <p>{title}</p>
    </span>
  )
}
