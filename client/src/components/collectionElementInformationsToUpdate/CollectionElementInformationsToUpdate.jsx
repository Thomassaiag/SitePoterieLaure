import React, {useEffect, useState} from 'react'
import './CollectionElementInformations.css'

export const CollectionElementInformationsToUpdate = ({collection_uid}) => {

const [currentInformations, setCurrentInformations]=useState([])

const fetchElementInformations=async()=>{
    let response=await fetch(`http://localhost:5000/collections/${collection_uid}/information`)
    let jsonData=await response.json()
    setCurrentInformations(jsonData)
}

useEffect(()=>{
    fetchElementInformations()
},[collection_uid])

  return (
    <di className='collectionElementInformationsContainer'>
    {
        currentInformations ?(
            currentInformations.map((currentInformation)=>{
                let {collection_element_information_text, collection_element_information_uid}=currentInformation
                return(
                    <input key={collection_element_information_uid}>{collection_element_information_text}</input>
                )
            })
        ):(
            <p>Loading...</p>
        )
    }
    </di>
  )
}
