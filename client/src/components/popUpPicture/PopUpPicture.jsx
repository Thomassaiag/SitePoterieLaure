import React, {useEffect, useState} from 'react'
import './PopUpPicture.css'

export const PopUpPicture = ({imageUrl, imageAlt, imageUid, onClose}) => {
  
  const [newPictureUid, setNewPictureUid]=useState(imageUid)
  const [newImageUrl, setNewImageUrl]=useState(imageUrl)
  const [newImageAlt, setNewImageAlt]=useState(imageAlt)
  const [pictureUids, setPicturesUids]=useState([])
  

  const displayPreviousPicture=()=>{
    setNewPictureUid((prevId)=>{
      if(pictureUids.indexOf(parseInt(prevId))!=0){
        return parseInt(pictureUids[pictureUids.indexOf(parseInt(prevId))-1])
      }
      else{
        return parseInt(pictureUids[pictureUids.length-1])
      }
    })
  }
  const fetchAllPicturesUID= async () =>{
    let response=await fetch(`http://localhost:5000/collections/${collection_uid}/pictures`)
    let jsonData = await response.json()
    setPicturesUids=jsonData.map((element)=>{
      return element.collection_element_picture_uid
    })
  }
  useEffect(()=>{
    fetchAllPicturesUID()
    console.log(`picture UIDs => ${pictureUids}`)
  },[])


  const displayNextPicture=()=>{
    setNewPictureID((prevId)=>{
      if(pictureIDs.indexOf(parseInt(prevId))!=pictureIDs.length-1){
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
          <img className='popUpPicture' src={newImageUrl} alt={newImageAlt}/>
          <div className='chevronPictureContainer'>
            <img src='/images/rightChevron.jpg' alt='next picture' onClick={displayNextPicture}/>
          </div>
        </div>
      </div>
    
  )
}
