import React, {useEffect, useState} from 'react'


import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'
import { useCollectionElementInformationsToUpdate } from '../contextProvider/CollectionElementInformationsToUpdateContextProvider'

export const UpdateCollectionElementInformations = () => {

    const {currentInformations}=useCollectionElementInformations()
    const {currentInformationsToUpdate, setCurrentInformationsToUpdate}=useCollectionElementInformationsToUpdate()


    const updateCollectionElementInformations=(e)=>{
        e.preventDefault()
        // console.log(e.target.name)
        setCurrentInformationsToUpdate((prevInformations)=>{
            // console.log("prevInformations =>",prevInformations)
            // console.log(e.target.value)
            return prevInformations.map((prevInformation)=>{
                // console.log(prevInformation)
                let {collection_element_information_uid}=prevInformation
                if(parseInt(collection_element_information_uid)==parseInt(e.target.name)){
                    return {...prevInformation, collection_element_information_text: e.target.value}
                } else {
                    return prevInformation
                }  
            }) 
        })
    }


    useEffect(()=>{
        if(currentInformations.length>0){
            setCurrentInformationsToUpdate(currentInformations)
        }
        else setCurrentInformationsToUpdate([])
    },[currentInformations])

    useEffect(()=>{
        console.log(currentInformationsToUpdate)
    },[currentInformationsToUpdate])


  return (
    <div className='collectionElementInformationsContainer'>
    {
        currentInformationsToUpdate ?(
            currentInformationsToUpdate.map((currentInformationToUpdate)=>{
                let {collection_element_information_text, collection_element_information_uid}=currentInformationToUpdate
                return(
                    <input
                        name={collection_element_information_uid}
                        key={collection_element_information_uid}
                        value={collection_element_information_text}
                        onChange={(e)=>updateCollectionElementInformations(e)}
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
