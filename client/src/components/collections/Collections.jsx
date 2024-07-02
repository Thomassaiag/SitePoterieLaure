import React,{useState, useEffect} from 'react'
import { Collection } from '../collection/Collection'

import './Collections.css'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'

import { useCollectionDeletionStatus } from '../contextProvider/CollectionDeletionStatusContextProvider'

export const Collections =()=>{
  const {collectionDeletionStatus, setCollectionDeletionStatus}=useCollectionDeletionStatus()
  const [collectionData, setCollectionData]=useState(null)

  const fetchCollections=async ()=>{
    try {
      const response = await fetch('http://localhost:5000/collections')
      const JsonData=await response.json()
      setCollectionData(JsonData)
      setCollectionDeletionStatus(false)
    }
    catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(()=>{
    fetchCollections()
  },[collectionDeletionStatus])
  
  return (

    <div className='collectionsContainer'>

      <div className='collectionsTitleContainer'>
        <p>Ici vous trouverez mes collections passées et actuelles</p>

        <p>Certaines ne sont plus en vente mais vous donneront un aperçu de mon approche artistique, mon univers. </p>
      </div>
      <div className='collectionItemsContainer'>
        {
      
          collectionData ? (
            collectionData.map((collection)=>
            {
              const {collection_picture_url,collection_title, collection_picture_alt, collection_uid}=collection
              return (
                <div className='collectionItem' key={collection_uid}>
                  <Collection  
                    imageUrl={collection_picture_url} 
                    title={collection_title} 
                    imageAlt={collection_picture_alt}
                    collectionUid={collection_uid}
                  />
                </div>
              )
            }) 
            ) : (
              <p>Loading...</p>
            )
          }
          </div>

    </div>
  )
}
