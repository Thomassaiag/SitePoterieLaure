import React, {useEffect, useRef} from 'react'
import {nanoid} from 'nanoid'
import './UpdateCollectionElementInformations.css'
import { addInfo } from '../../data/logos'
import { deleteInfo } from '../../data/logos'



import { useCollectionElementInformations } from '../../contextProvider/CollectionElementInformationsContextProvider'
import { useCollectionElementInformationsToUpdate } from '../../contextProvider/CollectionElementInformationsToUpdateContextProvider'
import { useCollectionElementInformationsToUpdateDelete } from '../../contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider'

export const UpdateCollectionElementInformations = ({collectionUID}) => {
    const inputRef=useRef(null)
    const {currentInformations}=useCollectionElementInformations()
    const {currentInformationsToUpdate, setCurrentInformationsToUpdate}=useCollectionElementInformationsToUpdate()
    const {currentInformationsToUpdateDelete, setCurrentInformationsToUpdateDelete}=useCollectionElementInformationsToUpdateDelete()
    
    const updateCollectionElementInformations=(e)=>{
        e.preventDefault()
        setCurrentInformationsToUpdate((prevInformations)=>{
            return prevInformations.map((prevInformation)=>{
                let {collection_element_information_uid}=prevInformation
                if(collection_element_information_uid==e.target.name){
                    return {...prevInformation, collection_element_information_text: e.target.value}
                } else {
                    return prevInformation
                }  
            }) 
        })
    }

    const discardInformationInput=async(e,informationId)=>{
        e.preventDefault()
        if(currentInformationsToUpdate.length==1){
            alert('Vous devez conserver au moins une information')
        }else {
            if(currentInformations.find((currentInformation)=>currentInformation.collection_element_information_uid==informationId)){
                setCurrentInformationsToUpdateDelete((prevInformationsToUpdateDelete)=>{
                    return [...prevInformationsToUpdateDelete, {collectionElementInformationUID:informationId}]
                    
                })
            }
            setCurrentInformationsToUpdate((prevInformationsToUpdate)=>{
                return prevInformationsToUpdate.filter((prevInformationToUpdate)=>prevInformationToUpdate.collection_element_information_uid!=informationId)
            })
        }

    }

    const addInformationInput =(e)=>{
        e.preventDefault()
        setCurrentInformationsToUpdate((prevInformationsToUpdate)=>{
            return [...prevInformationsToUpdate, {
                collection_element_information_uid: nanoid(),
                collection_uid:collectionUID,
                collection_element_information_text:''
            }]
        })
    }
    // useEffect(()=>{
    //     if(inputRef.current){
    //         inputRef.current.focus()
    //     }
    // },[currentInformationsToUpdate])


    useEffect(()=>{
        if(currentInformations.length>0){
            setCurrentInformationsToUpdate(currentInformations)
        }
        else setCurrentInformationsToUpdate([])
    },[currentInformations])


    useEffect(()=>{
        setCurrentInformationsToUpdateDelete([])
    },[currentInformations])


  return (
    <>
        {currentInformationsToUpdate ?(
            currentInformationsToUpdate.map((currentInformationToUpdate)=>{
                let {collection_element_information_text, collection_element_information_uid}=currentInformationToUpdate
                return(
                    <div className='collectionElementInformationUpdateCreateContainer' key={collection_element_information_uid}>
                        <input className='collectionElementInformation'
                            ref={inputRef}
                            name={collection_element_information_uid}
                            value={collection_element_information_text}
                            onChange={(e)=>updateCollectionElementInformations(e)}
                        />
                        <img src={deleteInfo} alt="Delete Input" onClick={(e)=>discardInformationInput(e,collection_element_information_uid)} style={{cursor: 'pointer'}}/>
                    </div>
                )
            })
            ):(
                <p>Loading...</p>
            )
        }
        <div className='AddInputContainer'>
            <p>Ajouter Une Information</p>
            <img  src={addInfo} alt="Add Information Collection" onClick={addInformationInput} style={{cursor: 'pointer'}}/>
            {/* <img button onClick={addInformationInput}>Ajouter une information</button> */}
        </div>
    </>
  )
}
