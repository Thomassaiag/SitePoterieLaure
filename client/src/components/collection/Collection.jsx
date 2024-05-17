import React from 'react'
import './Collection.css'
import { CollectionMainPic } from '../collectionMainPic/CollectionMainPic'
import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'
// import {deleteCollection} from '../../../public/images/deleteCollection.jpg'

export const Collection = ({imageUrl, imageAlt, title, collectionUid}) => {

  const {connectionAttributes}=useConnectionStatus()

  const deleteCollection=async(id)=>{
    try {
      const response=await fetch(`http://localhost:5000/admin/deleteCollection/`,{
        method: 'UPDATE',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: id
      })
      const data=response.json()
    } catch (error) {
      
    }
  }


  return (
    <div className='collectionContainer'>
        <CollectionMainPic imageUrl={imageUrl} imageAlt={imageAlt}/>
        <p>{title}</p>
        {connectionAttributes.adminConnection && <img className='deleteCollectionButton' src="../../../images/deleteCollection.jpg" alt="Delete Collection" onClick={deleteCollection(collectionUid)}/>}
        
    </div>
  )
}
