import React, {useState} from 'react'
import './CollectionElementPicture.css'
import { PopUpPicture } from '../popUpPicture/PopUpPicture'

export const CollectionElementPicture = ({collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_picture_uid}) => {
  const [showPopUpPicture, setShowPopUpPicture]=useState(false)
  const togglePopUpPicture=()=>{
    setShowPopUpPicture(!showPopUpPicture)
  }



  return (
    <>
    <div className='collectionPictureContainer'>
      <img src={collection_element_picture_url} alt={collection_element_picture_alt} onClick={togglePopUpPicture}/>
    </div>

    {showPopUpPicture && <PopUpPicture imageUrl={collection_element_picture_url} imageAlt={collection_element_picture_alt} imageUid={collection_element_picture_uid} collection_uid={collection_uid} onClose={togglePopUpPicture}/>}
    </>
  )
}
