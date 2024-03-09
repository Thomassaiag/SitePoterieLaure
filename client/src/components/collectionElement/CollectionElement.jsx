import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CollectionElementPictures } from '../collectionElementPictures/CollectionElementPictures'
import { CollectionElementInformations } from '../collectionElementInformations/CollectionElementInformations'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'
import './CollectionElement.css'
import { CollectionMainPic } from '../collectionMainPic/CollectionMainPic'


export const CollectionElement = () => {
  let navigate=useNavigate()
  let params=useParams()
  let {id}=params
 
  const [newId, setNewId]=useState(id)

  const [collectionElement, setCollectionElement]=useState([])
  const [previousCollectionPicture, setPreviousCollectionPicture]=useState([])
  const [nextCollectionPicture, setNextCollectionPicture]=useState([])
  const [numberOfCollections, setNumberOfCollections]=useState()
  
  useEffect(()=>{
    fetchCollectionElement()
    fetchNumberOfCollections()
  },[])
  

  const fetchCollectionElement=async()=>{
    try {
      let response= await fetch(`http://localhost:5000/collections/${newId}`)
      let jsonData= await response.json()
      setCollectionElement(jsonData[0])
    } catch (error) {
      
    }
  }
  
  const fetchNumberOfCollections=async()=>{
    try {
      let response=await fetch(`http://localhost:5000/numberOfCollections`)
      let jsonData= await response.json()
      setNumberOfCollections(jsonData[0].count)
    } catch (error) {
      
    }
  }

  const fetchNextPreviousCollection=async()=>{
    try {
      let response= await fetch(`http://localhost:5000/collections/${newId}/collection`)
      let jsonData= await response.json()
      setPreviousCollectionPicture(jsonData[0])
      setNextCollectionPicture(jsonData[1])
    } catch (error) {
      
    }
  }

  const handleLeftClick=()=>{
    setNewId((prevId)=>{
      if(prevId!=1){
        return parseInt(prevId)-1
      }
      else{
        return numberOfCollections
      }
    })
  }
  
  const handleRightClick=()=>{
    setNewId(prevID=>parseInt(prevID)+1)
  }
  
  useEffect(()=>{
    console.log(`Rerender id => ${id}`)
    console.log(`Rerender newId => ${newId}`)
    navigate(`/collections/${newId}`)
    fetchCollectionElement()
  },[newId])
  
  useEffect(()=>{
    fetchNextPreviousCollection()
    // console.log(`numberOfCollections => ${numberOfCollections}`)
  },[previousCollectionPicture, nextCollectionPicture])
  
  let {collection_element_name, collection_element_description, collection_element_email, collection_element_cooking, collection_element_recommandation }=collectionElement
  let {collection_picture_url: previousCollectionPictureUrl, collection_picture_alt: previousCollectionPictureAlt}=previousCollectionPicture
  let {collection_picture_url: nextCollectionPictureUrl, collection_picture_alt: nextCollectionPictureAlt}=nextCollectionPicture
  
    return (
    <div className='collectionElement'>
      {
        collectionElement ? (
          <div className='collectionElementContainer'>
            <div className='collectionElementTitleContainer'>
              <h1 className='collectionElementTitle'>Collection {collection_element_name}</h1>
            </div>
            <div className='collectionElementPicturesContainer'>
              <CollectionElementPictures collection_uid={newId}/>
            </div>
            <div className='collectionElementInformationContainer'>
              <div className='collectionElementLeftContainer'>
                <h2>En Quelques Mots</h2>
                <p>{collection_element_description}</p>
              </div>
              <div className='collectionElementRightContainer'>
                <h2 >Informations techniques</h2>
                <CollectionElementInformations collection_uid={newId}/>
                <p>{collection_element_email}</p>
                <p>{collection_element_cooking}</p>
                <p>{collection_element_recommandation}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading Data</p>
        )
      }
      <div className='navigationElementContainer'>
        <div className='navigationElementButtonContainer'>
          <img onClick={handleLeftClick} src='/images/leftChevron.jpg' alt='previousCollection'/>
          <div className='navigationElementCollectionPicture'>
            <CollectionMainPic imageUrl={previousCollectionPictureUrl} imageAlt={previousCollectionPictureAlt}/>
          </div>
        </div>
        <ScrollToTop/>
        <div className='navigationElementButtonContainer'>
          <div className='navigationElementCollectionPicture'>
            <CollectionMainPic  imageUrl={nextCollectionPictureUrl} imageAlt={nextCollectionPictureAlt}/>
          </div>
          <img onClick={handleRightClick} src='/images/rightChevron.jpg' alt='nextCollection'/>
        </div>
      </div>
    </div>
  )

}
