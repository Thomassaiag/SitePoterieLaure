import React, {useEffect, useState} from 'react'
import {nanoid} from 'nanoid'


import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'
import { useCollectionElementInformationsToUpdate } from '../contextProvider/CollectionElementInformationsToUpdateContextProvider'
import { useCollectionElementInformationsToUpdateCreate } from '../contextProvider/CollectionElementInformationsToUpdateCreateContextProvider'
import { useCollectionElementInformationsToUpdateDelete } from '../contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider'

export const UpdateCollectionElementInformations = () => {

    const {currentInformations}=useCollectionElementInformations()
    const {currentInformationsToUpdate, setCurrentInformationsToUpdate}=useCollectionElementInformationsToUpdate()
    const {currentInformationsToUpdateCreate, setCurrentInformationsToUpdateCreate}=useCollectionElementInformationsToUpdateCreate()
    const {currentInformationsToUpdateDelete, setCurrentInformationsToUpdateDelete}=useCollectionElementInformationsToUpdateDelete()
    // const [inputIDList, setInputIDList]=useState([])
    
    
    const updateCollectionElementInformations=(e)=>{
        e.preventDefault()
        console.log(e.target.name)
        setCurrentInformationsToUpdate((prevInformations)=>{
            // console.log("prevInformations =>",prevInformations)
            console.log(e.target.value)
            return prevInformations.map((prevInformation)=>{
                // console.log(prevInformation)
                let {collection_element_information_uid}=prevInformation
                // if(currentInformations.find((currentInformation)=>currentInformation.collection_element_information_uid==collection_element_information_uid))
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

                console.log(informationId)
                console.log(currentInformationsToUpdateDelete)
                setCurrentInformationsToUpdateDelete((prevInformationsToUpdateDelete)=>{
                    return [...prevInformationsToUpdateDelete, {collectionElementInformationUID:informationId}]
                    
                })
            }
            setCurrentInformationsToUpdate((prevInformationsToUpdate)=>{
                return prevInformationsToUpdate.filter((prevInformationToUpdate)=>prevInformationToUpdate.collection_element_information_uid!=informationId)
            })
            console.log('currentInformationsToUpdateDelete =>',currentInformationsToUpdateDelete)
        }

    }

    const addInformationInput =(e)=>{
        e.preventDefault()
        setCurrentInformationsToUpdate((prevInformationsToUpdate)=>{
            return [...prevInformationsToUpdate, {
                collection_element_information_uid: nanoid(),
                collection_uid:currentInformationsToUpdate[0].collection_uid,
                collection_element_information_text:''
            }]
        })
        return
    }

    useEffect(()=>{
        if(currentInformations.length>0){
            setCurrentInformationsToUpdate(currentInformations)
            // setInputIDList((prevInputList)=>{
            //     return currentInformationsToUpdate.map((currentInformationToUpdate)=>{
            //         const {collection_element_information_uid}=currentInformationToUpdate
            //         return [...prevInputList,{inputUID:collection_element_information_uid}]
            //     })                
            // })
        }
        else setCurrentInformationsToUpdate([])
    },[currentInformations])


    useEffect(()=>{
        setCurrentInformationsToUpdateDelete([])
    },[currentInformations])


    useEffect(()=>{
        console.log('currentInformationsToUpdate => ',currentInformationsToUpdate)
    },[currentInformationsToUpdate])



    useEffect(()=>{
        console.log('currentInformationsToUpdateDelete when updated=> ',currentInformationsToUpdateDelete)
    },[currentInformationsToUpdateDelete])

    // useEffect(()=>{
    //     console.log('inputIDList=> ',inputIDList)
    // },[currentInformationsToUpdate])


  return (
    <div className='collectionElementInformationsContainer'>
    {
        currentInformationsToUpdate ?(
            currentInformationsToUpdate.map((currentInformationToUpdate)=>{
                let {collection_element_information_text, collection_element_information_uid}=currentInformationToUpdate
                return(
                    <div key={collection_element_information_uid}>
                    <input
                        name={collection_element_information_uid}
                        value={collection_element_information_text}
                        onChange={(e)=>updateCollectionElementInformations(e)}
                        />
                    <button type='button' onClick={(e)=>discardInformationInput(e,collection_element_information_uid)}>Effacer Information</button>
                    </div>
                )
            })
        ):(
            <p>Loading...</p>
        )
    }
    <button onClick={addInformationInput}>Ajouter une information</button>
    </div>
  )
}
