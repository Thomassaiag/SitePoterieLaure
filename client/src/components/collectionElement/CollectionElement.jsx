import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CollectionElementPictures } from '../collectionElementPictures/CollectionElementPictures'
import { CollectionElementInformations } from '../collectionElementInformations/CollectionElementInformations'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'
import './CollectionElement.css'

export const CollectionElement = () => {
  let navigate=useNavigate()
  let params=useParams()
  let {id}=params
 
  const [newId, setNewId]=useState(id)

  const [collectionElement, setCollectionElement]=useState([])
  
  useEffect(()=>{
    fetchCollectionElement()
  },[])
  

  const fetchCollectionElement=async()=>{
    try {
      let response= await fetch(`http://localhost:5000/collections/${newId}`)
      let jsonData= await response.json()
      setCollectionElement(jsonData[0])
    } catch (error) {
      
    }
  }
  
  const handleLeftClick=()=>{
    setNewId(prevID=>parseInt(prevID)-1)
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
        <div>
        <img src='' alt=''/>
        <button onClick={handleLeftClick}>
          Collection précédente
        </button>

        </div>
          
        <ScrollToTop/>
        <button onClick={handleRightClick}>
          Collection suivante
        </button>
      </div>
    </div>
  )

}
