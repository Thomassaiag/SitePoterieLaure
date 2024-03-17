import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import './PopUpPicture.css'

export const PopUpPicture = ({imageUrl, imageAlt, onClose}) => {
  let {id}=useParams

  const [newPictureID, setNewPictureID]=useEffect(id)
  const [pictureIDs, setPicturesID]=useEffect([])
  

  const displayPreviousPicture=()=>{
    setNewPictureID((prevId)=>{
      if(pictureIDs.indexOf(parseInt(prevId))!=0){
        return parseInt(pictureIDs[pictureIDs.indexOf(parseInt(prevId))-1])
      }
      else{
        return parseInt(pictureIDs[pictureIDs.length-1])
      }
    })
  }

  const displayNextPicture=()=>{
    setNewPictureID((prevId)=>{
      if(pictureIDs.indexOf(parseInt(prevId))!=picturesIDs.length-1){
        return parseInt(pictureIDs[pictureIDs.indexOf(parseInt(prevId))+1])
      }
      else{
        return parseInt(pictureIDs[0])
      }
    })
    return
  }


  return (
    
      <div className='overlay' onClick={onClose}>
        <div className='popup'>
          <div className='chevronPictureContainer'>
            <img src='/images/leftChevron.jpg' alt='previous picture' onClick={displayPreviousPicture}/>
          </div>
          <img className='popUpPicture' src={imageUrl} alt={imageAlt}/>
          <div className='chevronPictureContainer'>
            <img src='/images/rightChevron.jpg' alt='next picture' onClick={displayNextPicture}/>
          </div>
        </div>
      </div>
    
  )
}
