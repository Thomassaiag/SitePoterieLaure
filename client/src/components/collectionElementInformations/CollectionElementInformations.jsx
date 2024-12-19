import React, {useEffect, useState} from 'react'
import './CollectionElementInformations.css'
import { useCollectionElementInformations } from '../../contextProvider/CollectionElementInformationsContextProvider'
import { useCollectionElementInformationsToUpdate } from '../../contextProvider/CollectionElementInformationsToUpdateContextProvider'

export const CollectionElementInformations = ({collection_uid, fetchElementInformations}) => {

const {currentInformations}=useCollectionElementInformations()
const {currentInformationsToUpdate}=useCollectionElementInformationsToUpdate()

useEffect(()=>{
    fetchElementInformations(collection_uid)
},[collection_uid])

useEffect(()=>{
    if(currentInformations.length>0){
        console.log('currentInformations =>',currentInformations)
    }
},[currentInformations])

  return (
    <ul className='collectionElementInformationsContainer'>
    {
        currentInformations ?(
            currentInformations.map((currentInformation)=>{
                let {collection_element_information_text, collection_element_information_uid}=currentInformation
                return(
                    <li key={collection_element_information_uid}>{collection_element_information_text}</li>
                )
            })
        ):(
            <p>Loading...</p>
        )
    }
    </ul>
  )
}
