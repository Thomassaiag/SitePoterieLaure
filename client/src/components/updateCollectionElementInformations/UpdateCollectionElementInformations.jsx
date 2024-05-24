import React, {useEffect, useState} from 'react'


import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'

export const UpdateCollectionElementInformations = ({collection_uid}) => {

    const {currentInformations}=useCollectionElementInformations()
    const [currentInformationsToUpdate, setCurrentInformationToUpdate]=useState(currentInformations)
    // const [currentInformationToUpdateText,setCurrentInformationToUpdateText]=useState()

    const updateCollectionElementInformations=(e)=>{
        e.preventDefault()
        // console.log(e.target.name)
        setCurrentInformationToUpdate((prevInformations)=>{
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
        // setCurrentInformationToUpdateText((prevCurrentInformationsToUpdate)=>{
        //     if (prevCurrentInformationsToUpdate){

        //         let elementInformation = prevCurrentInformationsToUpdate.find((collectionElementInformation)=>collectionElementInformation.collection_element_information_uid===informationId)
        //         console.log(elementInformation)
        //         return elementInformation!==undefined ? elementInformation.collection_element_information_text : undefined
        //     }
        // })
        // e.target.value=currentInformationToUpdateText
    }


    useEffect(()=>{
        if(currentInformations.length>0){
            setCurrentInformationToUpdate(currentInformations)
        }
    },[currentInformations])

    useEffect(()=>{
        console.log(currentInformationsToUpdate)
    },[currentInformationsToUpdate])


    // const findInformationTextForInformationUID=(e,id, defaultValue)=>{
    //     e.preventDefault()
    //     if(currentInformationsToUpdate){
    //         let informationElement=currentInformationsToUpdate.find((currentInformation)=>currentInformation.collection_element_information_uid==id)
    //         console.log(informationElement.collection_element_information_text)
    //         return informationElement.collection_element_information_text
    //     } else {
    //         console.log(defaultValue)
    //         return defaultValue
    //     } 
    // }

  return (
    <div className='collectionElementInformationsContainer'>
    {
        currentInformationsToUpdate ?(
            currentInformationsToUpdate.map((currentInformation)=>{
                let {collection_element_information_text, collection_element_information_uid}=currentInformation
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
