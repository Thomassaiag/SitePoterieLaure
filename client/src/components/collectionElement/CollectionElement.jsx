import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
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
  
  useEffect(()=>{
    fetchCollectionElement()
  },[])

  let {collection_element_name, collection_element_picture_url, collection_element_picture_alt, collection_element_description, collection_element_information}=collectionElement

    return (
    <div>
      {
        collectionElement ? (
              <div className='collection_elementContainer'>
                <div className='collection_elementTitleContainer'>
                  <h1 className='collection_elementTitle'>Collection {collection_element_name}</h1>
                </div>
                <div className='collection_elementPicturesContainer'>
                  <img src={collection_element_picture_url} alt={collection_element_picture_alt}/>
                </div>
                <div className='collection_elementInformationContainer'>
                  <div className='collection_elementLeftContainer'>
                    <h2>En Quelques Mots</h2>
                    <p>{collection_element_description}</p>
                  </div>
                  <div className='collection_elementRightContainer'>
                    <h2 >Informations techniques</h2>
                    <p>{collection_element_information}</p>
                  </div>
                </div>
              </div>
        ) : (
          <p>Loading Data</p>
        )
      }
    </div>
  )

}
