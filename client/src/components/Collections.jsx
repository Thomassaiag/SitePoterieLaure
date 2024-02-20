import React,{useState, useEffect} from 'react'
import { Collection } from './Collection'
// import {collections} from '../data/collections'
import { Link } from 'react-router-dom'


export const Collections =()=>{

  const [collectionData, setCollectionData]=useState(null)

  
  const fetchCollections=async ()=>{
    try {
      console.log('testtest')
      const response = await fetch('http://localhost:5000/collections')
      const JsonData=await response.json()
      setCollectionData(JsonData)
      
    }
    catch (error) {
      console.log(error.message)
    }
  }
  
  useEffect(()=>{
    fetchCollections()
  },[])

  return (
    <div className='collectionContainer_Class'>
      <p className='collectionsTitle_Class'>Ici vous trouverez mes collections passées et actuelles</p>
      <br/>
      <p>Certaines ne sont plus en vente mais vous donneront un aperçu de mon approche artistique, mon univers. </p>
      <div className='collections_Class'>
        {
          collectionData ? (
            collectionData.map((collection)=>
            {
              const {collection_picture_url,collection_title, collection_picture_alt, collection_uid}=collection
              console.log(collection_uid)
              return (
                <Link to={`/collections/:${collection_uid}`} key={collection_uid}>
                  <Collection
                      imageUrl={collection_picture_url} 
                      title={collection_title} 
                      imageAlt={collection_picture_alt}/>
                </Link>)
            }) 
            ) : (
              <p>Loading...</p>
            )

          }
          </div>   
    </div>
  )
}
