import React, {useState} from 'react'
import './CollectionElementPicture.css'
import { PopUpPicture } from '../popUpPicture/PopUpPicture'
import { DeleteCollectionElement } from '../deleteCollectionElement/DeleteCollectionElement'

export const CollectionElementPicture = ({collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_picture_uid}) => {
  const buttonName='Effacer l\'image'
  const [showPopUpPicture, setShowPopUpPicture]=useState(false)
  const [collectionElementPictureToDeleteID, setCollectionElementPictureToDeleteID]=useState(collection_element_picture_uid)
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
    let response=await fetch('http://localhost:5000/admin/deleteElementPicture',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify({collectionElementPictureToDeleteID:collectionElementPictureToDeleteID})
    })
    let data=await response.json()
    console.log(data)
  }

  return (
    <>
    <div className='collectionPictureContainer'>
      <img className='collectionElementPicture' src={collection_element_picture_url} alt={collection_element_picture_alt} onClick={togglePopUpPicture} style={{cursor:'pointer'}}/>
    </div>
    <div className='deleteButtonContainer'>
      <DeleteCollectionElement buttonName={buttonName} elementToDeleteID={collection_element_picture_uid} handleDeleteClick={handleDeleteClick}/>
    </div>
    {showPopUpPicture && <PopUpPicture imageUrl={collection_element_picture_url} imageAlt={collection_element_picture_alt} imageUid={collection_element_picture_uid} collection_uid={collection_uid} onClose={togglePopUpPicture}/>}
    </>
  )
}
