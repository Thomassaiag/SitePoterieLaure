import React, { Fragment, useEffect, useState } from 'react'
import './Collection.css'
import { CollectionMainPic } from '../collectionMainPic/CollectionMainPic'
import { DeleteCollectionElement } from '../deleteCollectionElement/DeleteCollectionElement'
const apiUrl=import.meta.env.VITE_API_URL

import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'
import { Link } from 'react-router-dom'

import { useCollectionDeletionStatus } from '../contextProvider/CollectionDeletionStatusContextProvider'

export const Collection = ({imageUrl, imageAlt, title, collectionUid}) => {
  const buttonName='Effacer toute la collection'
  const {setCollectionDeletionStatus}=useCollectionDeletionStatus()

  const {connectionAttributes}=useConnectionStatus()
  const [collectionToDelete, setCollectionToDelete]=useState(collectionUid)

  const handleDeleteClick=(id)=>{
    const userConfirmed=window.confirm("vous êtes sur le point d'effacer une collection, confirmez-vous ?")
    if (userConfirmed){
      deleteCollection(id)
    }
  }

  const deleteCollection=async(id)=>{
    setCollectionToDelete(id)
    setCollectionDeletionStatus(true)
    try {
      const response=await fetch(`http://${apiUrl}/admin/deleteCollection/`,{
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
    <>
      <Link className='collectionItemLink' to={`/collections/${collectionUid}`}>
        <CollectionMainPic imageUrl={imageUrl} imageAlt={imageAlt}/>
      </Link>
      <p>{title}</p>
      {connectionAttributes.adminConnection && 
      <div className='deleteButtonContainer'>
        <DeleteCollectionElement buttonName={buttonName} handleDeleteClick={handleDeleteClick} elementToDeleteID={collectionUid}/>
      </div>}
    </>
  )
}
