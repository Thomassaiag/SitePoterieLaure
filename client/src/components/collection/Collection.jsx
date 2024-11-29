import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import './Collection.css'
import { CollectionMainPic } from '../collectionMainPic/CollectionMainPic'
import { DeleteCollectionElement } from '../deleteCollectionElement/DeleteCollectionElement'

import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'
import { useCollectionDeletionStatus } from '../contextProvider/CollectionDeletionStatusContextProvider'

import {handleInvalidToken} from '../../utils/auth'

const apiUrl=import.meta.env.VITE_API_URL



export const Collection = ({imageUrl, imageAlt, title, collectionUid}) => {
  const navigate=useNavigate()
  const buttonName='Effacer toute la collection'
  const {setCollectionDeletionStatus}=useCollectionDeletionStatus()

  const {connectionAttributes, setConnectionAttributes}=useConnectionStatus()
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
      const token=localStorage.getItem('token')
      const response=await fetch(`http://${apiUrl}/admin/deleteCollection/`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          collectionUID:collectionToDelete,
        })
      })
      if(response.status===401){
        console.log('invalid Token')
        handleInvalidToken(navigate, setConnectionAttributes)
      }

      if(!response.ok){
        throw new Error('netWork issue')
      }
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
