import React, {useEffect, useState} from 'react'


import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'

export const UpdateCollectionElementInformations = ({collection_uid}) => {

    const {currentInformations}=useCollectionElementInformations()
    const [currentInformationsToUpdate, setCurrentInformationToUpdate]=useState(currentInformations)

    const updateCollectionElementInformations=(e)=>{
        e.preventDefault()
        console.log(e.target.name)
        setCurrentInformationToUpdate((prevInformations)=>{
            console.log("test")
            console.log("prevInformations =>",prevInformations)
            return prevInformations.map((prevInformation)=>{
                let {collection_element_information_text, collection_element_information_uid}=prevInformation
                console.log(parseInt(collection_element_information_uid)==parseInt(e.target.name))
                console.log(e.target.value)
                if(parseInt(collection_element_information_uid)==parseInt(e.target.name)){
                    return {...prevInformation, [collection_element_information_text]: e.target.value}
                } else {
                    return prevInformation
                }  
            })
        })
        return
    }

    useEffect(()=>{
        setCurrentInformationToUpdate(currentInformations)
    },[currentInformations])



  return (
    <div className='collectionElementInformationsContainer'>
    {
        currentInformations ?(
            currentInformations.map((currentInformation)=>{
                let {collection_element_information_text, collection_element_information_uid}=currentInformation
                return(
                    <input
                        name={collection_element_information_uid}
                        key={collection_element_information_uid}
                        value={collection_element_information_text}
                        onChange={updateCollectionElementInformations}
                    />
                )
            })
        ):(
            <p>Loading...</p>
        )
    }
    </div>
  )
}
