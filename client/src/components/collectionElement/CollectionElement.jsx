import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { CollectionElementPictures } from '../collectionElementPictures/CollectionElementPictures'
import { CollectionElementInformations } from '../collectionElementInformations/CollectionElementInformations'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'
import './CollectionElement.css'

export const CollectionElement = () => {
  const [collectionElement, setCollectionElement]=useState([])
  let params=useParams()
  let {id}=params
  
  const fetchCollectionElement=async()=>{
    try {
      let response= await fetch(`http://localhost:5000/collections/${id}`)
      let jsonData= await response.json()
      setCollectionElement(jsonData[0])
    } catch (error) {
      
    }
  }
  
  const handleLeftClick=()=>{
    return
  }

   const handleRightClick=()=>{
    return
  }


   const handleUpClick=()=>{
    return
  }

  useEffect(()=>{
    fetchCollectionElement()
  },[])

  let {collection_element_name, collection_element_description, collection_element_email, collection_element_cooking, collection_element_recommandation }=collectionElement

    return (
    <div className='collectionElement'>
      {
        collectionElement ? (
          <div className='collectionElementContainer'>
            <div className='collectionElementTitleContainer'>
              <h1 className='collectionElementTitle'>Collection {collection_element_name}</h1>
            </div>
            <div className='collectionElementPicturesContainer'>
              <CollectionElementPictures/>
            </div>
            <div className='collectionElementInformationContainer'>
              <div className='collectionElementLeftContainer'>
                <h2>En Quelques Mots</h2>
                <p>{collection_element_description}</p>
              </div>
              <div className='collectionElementRightContainer'>
                <h2 >Informations techniques</h2>
                <CollectionElementInformations/>
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
        <button onclick={handleLeftClick}>
          Go Left
        </button>
        <ScrollToTop/>
        <button onclick={handleRightClick}>
          Go Right
        </button>
      </div>
    </div>
  )

}
