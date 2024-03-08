import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

export const CollectionElementInformations = ({collection_uid}) => {

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
