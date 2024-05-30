import React, { useEffect, useState } from 'react'
import {nanoid} from  'nanoid'
import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'
export const CollectionElementInformationsCreation = () => {


    const [inputIDList, setInputIDList]=useState([{id:nanoid()}])
    const {currentInformations, setCurrentInformations}=useCollectionElementInformations()

    useEffect(()=>{
        setCurrentInformations([{
        informationInputId:inputIDList[0].id,
        informationInputText:''
    }])
    },[])

    // const [currentInformations, setCurrentInformations]=useState([{
    //     informationInputId:inputIDList[0].id,
    //     informationInputText:''
    // }])

    const addNewInformation=(e)=>{
        e.preventDefault()
        setInputIDList(prevInputIDList=>[...prevInputIDList,{id:nanoid()}])
    }
    
    const deleteInformation=(e,idToDelete)=>{
        e.preventDefault()
        if(inputIDList.length==1){
           alert("vous devez avoir au moins 1 information")
        } else {
            setInputIDList(prevInputIDList=>prevInputIDList.filter(prevInputID=>prevInputID.id!=idToDelete))
            setCurrentInformations(prevCollectionInformationsToCreate=>prevCollectionInformationsToCreate.filter(prevCollectionInformationToCreate=>prevCollectionInformationToCreate.informationInputId!=idToDelete))
        }
    }
    
    
    const handleChange=(e,inputId)=>{
        e.preventDefault()
        console.log("inputID =>",inputId)
        console.log("input value => ",e.target.value)
        setCurrentInformations((prevCollectionInformationsToCreate)=>{
            let identifiedElementIndex=prevCollectionInformationsToCreate.findIndex((prevCollectionInformationToCreate)=>prevCollectionInformationToCreate.informationInputId==inputId)
            console.log('identifiedElement Index=>',identifiedElementIndex)
            if(identifiedElementIndex!=-1){
                console.log('if')
                // return prevCollectionInformationsToCreate.splice(identifiedElementIndex,1,{informationInputId:inputId,informationInputText:e.target.value })
                return prevCollectionInformationsToCreate.map((prevCollectionInformationToCreate)=>{
                    const{informationInputId, informationInputText}=prevCollectionInformationToCreate
                    if(informationInputId==inputId){
                        return {...prevCollectionInformationToCreate,informationInputText:e.target.value}
                    }
                    else return prevCollectionInformationToCreate
                })
            } else {
                console.log('else')
                return [...prevCollectionInformationsToCreate,{informationInputId:inputId, informationInputText:e.target.value}]
            }
        })
    }

    useEffect(()=>{
        console.log(currentInformations)
    },[currentInformations])

        useEffect(()=>{
        console.log(currentInformations)
    },[])

    return (
        <div>
            {inputIDList.map((inputID)=>{
                const{id}=inputID
                return (
                    <div key={id}>
                    <input 
                        type='text'
                        name={id}
                        onChange={(e)=>handleChange(e,id)}
                        value={currentInformations.informationInputText}
                    />
                    <button type='button' onClick={(e)=>deleteInformation(e, id)}>Delete Information</button>
                    </div>
                )
            })}
            <button type='button' onClick={addNewInformation}>Ajouter une nouvelle information</button>
        </div>
    )
}
