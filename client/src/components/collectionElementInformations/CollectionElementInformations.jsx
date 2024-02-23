import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

export const CollectionElementInformations = () => {

const [currentInformations, setCurrentInformations]=useState([])
let {id}=useParams()
const fetchElementInformations=async()=>{
    let response=await fetch(`http://localhost:5000/collections/${id}/information`)
    let jsonData=await response.json()
    setCurrentInformations(jsonData)
}

useEffect(()=>{
    fetchElementInformations()
},[])

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
