import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CollectionElementPictures } from '../collectionElementPictures/CollectionElementPictures'
import { CollectionElementInformations } from '../collectionElementInformations/CollectionElementInformations'

import './CollectionElement.css'
import { CollectionMainPic } from '../collectionMainPic/CollectionMainPic'
import { UpdateCollectionElement } from '../updateCollectionElement/UpdateCollectionElement'
import { useCollectionElementInformations } from '../../contextProvider/CollectionElementInformationsContextProvider'
import { useConnectionStatus } from '../../contextProvider/ConnectionStatusContextProvider'

import { nextCollection } from '../../data/logos'
import { previousCollection } from '../../data/logos'
const apiUrl=import.meta.env.VITE_API_URL


export const CollectionElement = () => {
  let navigate=useNavigate()
  let params=useParams()
  let {id}=params
 
  const [newId, setNewId]=useState(id)

  //States initialisation
  const [collectionElement, setCollectionElement]=useState({})
  const [previousCollectionPicture, setPreviousCollectionPicture]=useState([])
  const [nextCollectionPicture, setNextCollectionPicture]=useState([])
  const [collectionUids, setCollectionUids]=useState([])
  const [collectionElementDescription, setCollectionElementDescription]=useState('')
  const [collectionElementName, setCollectionElementName]=useState()
  const [collectionElementEmail, setCollectionElementEmail]=useState()
  const [collectionElementCooking, setCollectionElementCooking]=useState()
  const [collectionElementRecommandation, setCollectionElementRecommandation]=useState()
  const {currentInformations, setCurrentInformations}=useCollectionElementInformations()

  const {connectionAttributes}=useConnectionStatus()

  //fetch collection Uids to then fetch next/previous pictures
  useEffect(()=>{
    fetchAllCollectionUids()
  },[])

  //fetch all collection element (description, email, cooking, recommandation)
  useEffect(()=>{
    fetchCollectionElement()
    console.log(collectionElement)
  },[])


  useEffect(()=>{
    let {collection_element_title, collection_element_description, collection_element_email, collection_element_cooking, collection_element_recommandation }=collectionElement
    setCollectionElementDescription(collection_element_description)
    setCollectionElementName(collection_element_title)
    setCollectionElementEmail(collection_element_email)
    setCollectionElementCooking(collection_element_cooking)
    setCollectionElementRecommandation(collection_element_recommandation)
  },[collectionElement])


  //fetch all collection element (description, email, cooking, recommandation)
  const fetchCollectionElement=async()=>{
    try {
      let response= await fetch(`http://${apiUrl}/collectionElement/${newId}`)
      if(!response.ok){
        throw new Error('netWork issue')
      }else {
        let jsonData= await response.json()
        setCollectionElement(jsonData[0])
      }
    } catch (error) {
      console.error('collection Element couldn\'t be fetched', {message:error})
    }
  }

  //Fetch collection information only as on a separate table
  const fetchElementInformations=async(collectionUid)=>{
    try {
      let response=await fetch(`http://${apiUrl}/collectionElement/${collectionUid}/information`)
      if(!response.ok){
        throw new Error('netWork issue')
      } else {
        let jsonData=await response.json()
        setCurrentInformations(jsonData)
      }
    } catch (error) {
      console.error('collection Information couldn\'t be fetched', {message:error})
    }
  }

  //fetch collection Uids to then fetch next/previous pictures
  const fetchAllCollectionUids=async()=>{
    try {
      let response=await fetch(`http://${apiUrl}/collections/allCollectionsUids`)
      
      if(!response.ok){
        throw new Error('netWork issue')
        
      } else {
        let jsonData= await response.json()
        jsonData= await jsonData.map(element=>element.collection_uid)
        setCollectionUids(jsonData)
      }

          
    } catch (error) {
      console.error('collection UIDs couldn\'t be fetched', {message:error})
    }
  }

  //fetch previous and next collection pictures based on current collection UID, after right or left click
  const fetchNextPreviousCollection=async()=>{
    try {
      let response= await fetch(`http://${apiUrl}/collections/${newId}/collection`)
      if(!response.ok){
        throw new Error('netWork issue')
      } else {
        let jsonData= await response.json()
        setPreviousCollectionPicture(jsonData[0])
        setNextCollectionPicture(jsonData[1])
      }
    } catch (error) {
      console.error('collection UIDs couldn\'t be fetched', {message:error})
    }
  }

  //get previous collection UID
  const handleLeftClick=()=>{
    setNewId((prevId)=>{
      if(collectionUids.indexOf(parseInt(prevId))!=0){
        return parseInt(collectionUids[collectionUids.indexOf(parseInt(prevId))-1])
      }
      else{
        return parseInt(collectionUids[collectionUids.length-1])
      }
    })
  }
  
  //get next collection UID
  const handleRightClick=()=>{
    setNewId((prevId)=>{
      if(collectionUids.indexOf(parseInt(prevId))!=collectionUids.length-1){
        return parseInt(collectionUids[collectionUids.indexOf(parseInt(prevId))+1])
      }
      else{
        return parseInt(collectionUids[0])
      }
    })
  }
  
  //when collection Id changes, we fetch all new collection elements
  useEffect(()=>{
    navigate(`/collections/${newId}`)
    fetchCollectionElement()
  },[newId])
  
  //when collection Id changes, we fetch new next & previous collection picture
   useEffect(()=>{
    fetchNextPreviousCollection()
  },[newId])
  
  
  let {collection_picture_url: previousCollectionPictureUrl, collection_picture_alt: previousCollectionPictureAlt}=previousCollectionPicture
  let {collection_picture_url: nextCollectionPictureUrl, collection_picture_alt: nextCollectionPictureAlt}=nextCollectionPicture
  
  
    return (
    <div className='collectionElement'>
      {
        (collectionElement && collectionElementDescription) ? (
          <div className='collectionElementContainer'>
            <div className='collectionElementTitleContainer'>
              <h1 className='collectionElementTitle'>Collection {collectionElementName}</h1>
            </div>
            <div className='collectionElementPicturesContainer'>
              <CollectionElementPictures collection_uid={newId}/>
            </div>
            <div className='collectionElementPresentationContainer'>
              <div className='collectionElementPresentationLeftContainer'>
                <h2>En Quelques Mots</h2>
                <p style={{textAlign:'justify'}}>
                  {collectionElementDescription.replace(/\\n/g,'\n').split('\n').map((line, index)=>{
                    return(
                      <React.Fragment key={index}>
                        {line}<br/><br/>
                      </React.Fragment>
                    )
                  })}
                </p>
              </div>
              <div className='collectionElementPresentationRightContainer'>
                <h2 >Informations techniques</h2>
                <CollectionElementInformations collection_uid={newId} fetchElementInformations={fetchElementInformations}/>
                <p style={{textAlign:'left'}}>{collectionElementEmail}</p>
                <p style={{textAlign:'left'}}>{collectionElementCooking}</p>
                <p style={{textAlign:'left'}}>{collectionElementRecommandation}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading Data</p>
        )
      }
      {connectionAttributes.adminConnection && 
        <UpdateCollectionElement collectionElementDescription={collectionElementDescription} collectionElementEmail={collectionElementEmail} collectionElementCooking={collectionElementCooking} collectionElementRecommandation={collectionElementRecommandation} collectionUID={newId} fetchCollectionElement={fetchCollectionElement} fetchElementInformations={fetchElementInformations}/>
      } 


      <div className='navigationElementContainer'>
        <div className='navigationElementButtonContainer'>
          <img className='previousNextCollection' onClick={handleLeftClick} src={previousCollection} alt='previousCollection'/>
          <div className='navigationElementCollectionPicture'>
            <CollectionMainPic imageUrl={previousCollectionPictureUrl} imageAlt={previousCollectionPictureAlt}/>
          </div>
        </div>
        <div className='navigationElementButtonContainer'>
          <div className='navigationElementCollectionPicture'>
            <CollectionMainPic  imageUrl={nextCollectionPictureUrl} imageAlt={nextCollectionPictureAlt}/>
          </div>
          <img className='previousNextCollection' onClick={handleRightClick} src={nextCollection} alt='nextCollection'/>
        </div>
      </div>
    </div>
  )

}
