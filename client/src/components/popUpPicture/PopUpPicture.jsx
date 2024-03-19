import React, {useEffect, useState} from 'react'
import './PopUpPicture.css'

export const PopUpPicture = ({imageUrl, imageAlt, imageUid, onClose, collection_uid}) => {
  
  const [newPictureUid, setNewPictureUid]=useState(imageUid)
  const [newImageUrl, setNewImageUrl]=useState(imageUrl)
  const [newImageAlt, setNewImageAlt]=useState(imageAlt)
  const [pictureUids, setPicturesUids]=useState([])
  const [newPicture, setNewPicture]=useState([])
  

 

  const fetchAllPicturesUID= async () =>{
    let response=await fetch(`http://localhost:5000/collections/${collection_uid}/pictures`)
    let jsonData = await response.json()
    jsonData=jsonData.map((element)=>{
      return element.collection_element_picture_uid
    })
    console.log(`jsonData => ${jsonData}`)
    setPicturesUids(jsonData)
    console.log(`picture UIDs => ${pictureUids}`)
  }

  const fetchPicture= async () =>{
    let response=await fetch(`http://localhost:5000/collections/${collection_uid}/pictures/${newPictureUid}`)
    let jsonData = await response.json()
    setNewPicture(jsonData[0])
  }

  useEffect(()=>{
    const fetchData = async ()=>{
      await fetchAllPicturesUID()
      console.log(`picture UIDs => ${pictureUids}`)
    }
    fetchData()
  },[])


  const displayPreviousPicture=()=>{
    setNewPictureUid((prevId)=>{
      console.log(`prevId =>${prevId}`)
      console.log(`pictureUids =>${pictureUids}`)
      console.log(`prevId index => ${pictureUids.indexOf(parseInt(prevId))}`)
      console.log(`previous Element => ${parseInt(pictureUids[pictureUids.indexOf(parseInt(prevId))-1])}`)

      if(pictureUids.indexOf(parseInt(prevId))!=0){
        return parseInt(pictureUids[pictureUids.indexOf(parseInt(prevId))-1])
      }
      else{
        return parseInt(pictureUids[pictureUids.length-1])
      }
    })
    console.log(`newPictureUid Previous Picture=> ${newPictureUid}`)
    fetchPicture()
    console.log(`newPicture => ${newPicture}`)
    let {collection_element_picture_url, collection_element_picture_alt}=newPicture
    setNewImageUrl(collection_element_picture_url)
    setNewImageAlt(collection_element_picture_alt)
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
    fetchPicture()
    let {collection_element_picture_url, collection_element_picture_alt}=newPicture
    setNewImageUrl(collection_element_picture_url)
    setNewImageAlt(collection_element_picture_alt)
  }


  return (
    
      <div className='overlay'>
        <div className='popup'>
          <div className='chevronPictureContainer'>
            <img src='/images/leftChevron.jpg' alt='previous picture' onClick={displayPreviousPicture}/>
          </div>
          <img className='popUpPicture' src={newImageUrl} alt={newImageAlt} onClick={onClose}/>
          <div className='chevronPictureContainer'>
            <img src='/images/rightChevron.jpg' alt='next picture' onClick={displayNextPicture}/>
          </div>
        </div>
      </div>
    
  )
}
