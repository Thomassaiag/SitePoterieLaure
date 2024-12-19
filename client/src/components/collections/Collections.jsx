import React,{useState, useEffect} from 'react'
import { Collection } from '../collection/Collection'
import './Collections.css'
import { useCollectionDeletionStatus } from '../../contextProvider/CollectionDeletionStatusContextProvider'
const apiUrl=import.meta.env.VITE_API_URL

export const Collections =()=>{
  const {collectionDeletionStatus, setCollectionDeletionStatus}=useCollectionDeletionStatus()
  const [collectionData, setCollectionData]=useState(null)

  useEffect(()=>{
    window.scrollTo(0,0)
    console.log(apiUrl)
  },[])

  const fetchCollections=async ()=>{
    try {
      const response = await fetch(`http://${apiUrl}/collections`)
      const JsonData=await response.json()
      if(!response.ok){
        const errorData= await response.json();
        throw new Error(errorData.message || "something went wrong when fetching Collections")
      }
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
