import React, {useEffect, useState} from 'react'
import './PopUpPicture.css'
import { deleteInfo } from '../../data/logos'
import { nextCollection } from '../../data/logos'
import { previousCollection } from '../../data/logos'

const apiUrl=import.meta.env.VITE_API_URL

export const PopUpPicture = ({imageUrl, imageAlt, imageUid, onClose, collection_uid}) => {
  
  const [newPictureUid, setNewPictureUid]=useState(imageUid)
  const [newImageUrl, setNewImageUrl]=useState(imageUrl)
  const [newImageAlt, setNewImageAlt]=useState(imageAlt)
  const [pictureUids, setPicturesUids]=useState([])
  const [newPicture, setNewPicture]=useState({})
  

  const fetchAllPicturesUID= async () =>{
    let response=await fetch(`http://${apiUrl}/collectionElement/${collection_uid}/pictures`)
    let jsonData = await response.json()
    jsonData= await jsonData.map((element)=>{
      return element.collection_element_picture_uid
    })
    setPicturesUids(jsonData)
  }
  
  const fetchPicture= async () =>{
    let response=await fetch(`http://${apiUrl}/collectionElement/${collection_uid}/pictures/${newPictureUid}`)
    let jsonData = await response.json()
    setNewPicture(jsonData[0])
  }

  useEffect(()=>{
    fetchPicture()
  },[newPictureUid])

  useEffect(()=>{
    let {collection_element_picture_url, collection_element_picture_alt}=newPicture
    setNewImageUrl(collection_element_picture_url)
    setNewImageAlt(collection_element_picture_alt)
  },[newPicture])



  useEffect(()=>{
      fetchAllPicturesUID()
    },[])


  const displayPreviousPicture=()=>{
    setNewPictureUid((prevId)=>{
      let prevIdIndex=pictureUids.indexOf(parseInt(prevId))
      if(pictureUids.indexOf(parseInt(prevId))!=0){
        return parseInt(pictureUids[prevIdIndex-1])
      }
      else{
        return parseInt(pictureUids[pictureUids.length-1])
      }
    })
  }


  const displayNextPicture=()=>{
    setNewPictureUid((prevId)=>{
      if(pictureUids.indexOf(parseInt(prevId))!=pictureUids.length-1){
        return parseInt(pictureUids[pictureUids.indexOf(parseInt(prevId))+1])
      }
      else{
        return parseInt(pictureUids[0])
      }
    })
  }


  return (
      <div className='overlay'>
        <div className='popup'>
          <div className='chevronPictureContainer'>
            <img src={previousCollection} alt='previous picture' onClick={displayPreviousPicture} style={{cursor:'pointer'}}/>
          </div>
          <div className='pictureContainer'>
            <div className='closePopUpContainer'>
              <picture className='positioned-picture'>
                <img className='closePopUp' src={deleteInfo} alt='closePopUp' onClick={onClose} style={{cursor: 'pointer'}}/>
              </picture>
            </div>
            <img className='popUpPicture' src={newImageUrl} alt={newImageAlt}/>
          </div>
          <div className='chevronPictureContainer'>
            <img src={nextCollection} alt='next picture' onClick={displayNextPicture} style={{cursor:'pointer'}}/>
          </div>
        </div>
      </div>
    
  )
}
