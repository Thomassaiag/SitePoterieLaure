import React, { useEffect, useState } from 'react'
import {nanoid} from  'nanoid'

export const CollectionElementInformationsCreation = () => {


    const [inputIDList, setInputIDList]=useState([{id:nanoid()}])

    const [collectionInformationsToCreate, setCollectionInformationsToCreate]=useState([{
        informationInputId:inputIDList[0].id,
        informationInputText:''
    }])

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
            setCollectionInformationsToCreate(prevCollectionInformationsToCreate=>prevCollectionInformationsToCreate.filter(prevCollectionInformationToCreate=>prevCollectionInformationToCreate.informationInputId!=idToDelete))
        }
    }
    
    
    const handleChange=(e,inputId)=>{
        e.preventDefault()
        console.log("inputID =>",inputId)
        console.log("input value => ",e.target.value)
        setCollectionInformationsToCreate((prevCollectionInformationsToCreate)=>{
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
        console.log(collectionInformationsToCreate)
    },[collectionInformationsToCreate])

        useEffect(()=>{
        console.log(collectionInformationsToCreate)
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
                        value={collectionInformationsToCreate.informationInputText}
                    />
                    <button type='button' onClick={(e)=>deleteInformation(e, id)}>Delete Information</button>
                    </div>
                )
            })}
            <button type='button' onClick={addNewInformation}>Ajouter une nouvelle information</button>
        </div>
    )
}
