import React from 'react'
import './CollectionMainPic.css'

export const CollectionMainPic = ({imageUrl, imageAlt}) => {
  return (
    <img src={imageUrl} alt={imageAlt}/>
  )
}
