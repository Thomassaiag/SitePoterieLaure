import React, { useEffect, useState } from 'react'
import './Collection.css'
import { CollectionMainPic } from '../collectionMainPic/CollectionMainPic'
import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'
import { Link } from 'react-router-dom'
// import {deleteCollection} from '../../../public/images/deleteCollection.jpg'

export const Collection = ({imageUrl, imageAlt, title, collectionUid}) => {

  const {connectionAttributes}=useConnectionStatus()
  const [collectionToDelete, setCollectionToDelete]=useState(collectionUid)



  const deleteCollection=async(id)=>{
    setCollectionToDelete(id)  
    try {
      const response=await fetch(`http://localhost:5000/admin/deleteCollection/`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          collectionUID:collectionToDelete,
        })
      })
      const data=await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='collectionContainer'>
      <Link className='collectionItem' to={`/collections/${collectionUid}`}>
        <CollectionMainPic imageUrl={imageUrl} imageAlt={imageAlt}/>
      </Link>
        <p>{title}</p>
        <img className='deleteCollectionButton' src="../../../images/deleteCollection.jpg" alt="Delete Collection" onClick={()=>deleteCollection(collectionUid)}/>
        
    </div>
  )
}
