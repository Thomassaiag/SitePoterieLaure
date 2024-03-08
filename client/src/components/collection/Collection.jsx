import React from 'react'
import './Collection.css'
import { TestCompoToDelete } from '../TestCompoToDelete'

export const Collection = ({imageUrl, imageAlt, title}) => {
  return (
    <div className='collectionContainer'>
        <img src={imageUrl} alt={imageAlt}/>
        <p>{title}</p>
        <p>test</p>
        <TestCompoToDelete/>
    </div>
  )
}
