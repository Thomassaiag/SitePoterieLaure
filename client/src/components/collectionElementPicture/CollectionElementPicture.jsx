import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './CollectionElementPicture.css'
import { PopUpPicture } from '../popUpPicture/PopUpPicture'
import { DeleteCollectionElement } from '../deleteCollectionElement/DeleteCollectionElement'
import { useCollectionDeletionStatus } from '../contextProvider/CollectionDeletionStatusContextProvider'
import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'
import { handleInvalidToken } from '../../utils/auth'

const apiUrl=import.meta.env.VITE_API_URL

export const CollectionElementPicture = ({collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_picture_uid}) => {
  
  const navigate=useNavigate()

  const buttonName='Effacer l\'image'
  const [showPopUpPicture, setShowPopUpPicture]=useState(false)
  const [collectionElementPictureToDeleteID, setCollectionElementPictureToDeleteID]=useState(collection_element_picture_uid)
  const {setCollectionDeletionStatus}=useCollectionDeletionStatus()


  const {connectionAttributes, setConnectionAttributes}=useConnectionStatus()

  const togglePopUpPicture=()=>{
    setShowPopUpPicture(!showPopUpPicture)
  }

  const handleDeleteClick=(elementToDeleteID)=>{
    let userConfirmed=window.confirm("Confirmer-vous la suppression de l'image ?")
    if (userConfirmed){
      deleteCollectionElementPicture(elementToDeleteID)
    }
  }


  const deleteCollectionElementPicture=async(elementToDeleteID)=>{
    setCollectionElementPictureToDeleteID(elementToDeleteID)
    const token=localStorage.getItem('token')
    try {
      let response=await fetch(`http://${apiUrl}/admin/editElement/deleteElementPicture`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({collectionElementPictureToDeleteID:collectionElementPictureToDeleteID})
      })
      if(response.status===401){
        handleInvalidToken(navigate, setConnectionAttributes)
      }

      if(!response.ok){
        throw new Error('netWork issue')
      }


      else {
        setCollectionDeletionStatus(true)
        let data=await response.json()
        console.log(data) 
      }
    } catch (error) {
      
    }
  }

  return (
    <>
    <img className='collectionElementPicture' src={collection_element_picture_url} alt={collection_element_picture_alt} onClick={togglePopUpPicture} style={{cursor:'pointer'}}/>
    {connectionAttributes.adminConnection && <div className='deleteButtonContainer'>
      <DeleteCollectionElement buttonName={buttonName} elementToDeleteID={collection_element_picture_uid} handleDeleteClick={handleDeleteClick}/>
    </div>}
    {showPopUpPicture && <PopUpPicture imageUrl={collection_element_picture_url} imageAlt={collection_element_picture_alt} imageUid={collection_element_picture_uid} collection_uid={collection_uid} onClose={togglePopUpPicture}/>}
    </>
  )
}
