import React, { useEffect, useState, useRef } from 'react'
import {nanoid} from  'nanoid'
import { useCollectionElementInformations } from '../../contextProvider/CollectionElementInformationsContextProvider'
import './CollectionElementInformationsCreation.css'
import { addInfo } from '../../data/logos'
import { deleteInfo } from '../../data/logos'


export const CollectionElementInformationsCreation = () => {


    const [inputIDList, setInputIDList]=useState([{id:nanoid()}])
    const {currentInformations, setCurrentInformations}=useCollectionElementInformations()
    const inputRef=useRef(null)


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
        setCurrentInformations((prevCollectionInformationsToCreate)=>{
            let identifiedElementIndex=prevCollectionInformationsToCreate.findIndex((prevCollectionInformationToCreate)=>prevCollectionInformationToCreate.informationInputId==inputId)
            if(identifiedElementIndex!=-1){
                // return prevCollectionInformationsToCreate.splice(identifiedElementIndex,1,{informationInputId:inputId,informationInputText:e.target.value })
                return prevCollectionInformationsToCreate.map((prevCollectionInformationToCreate)=>{
                    const{informationInputId, informationInputText}=prevCollectionInformationToCreate
                    if(informationInputId==inputId){
                        return {...prevCollectionInformationToCreate,informationInputText:e.target.value}
                    }
                    else return prevCollectionInformationToCreate
                })
            } else {
                return [...prevCollectionInformationsToCreate,{informationInputId:inputId, informationInputText:e.target.value}]
            }
        })
    }

    useEffect(()=>{
        if(inputRef.current){
            inputRef.current.focus()
        }
    },[inputIDList])

    return (
        <>
            {inputIDList.map((inputID)=>{
                const{id}=inputID
                return (
                    <div className='InputContainer'key={id}>
                        <input 
                            ref={inputRef}
                            type='text'
                            name={id}
                            onChange={(e)=>handleChange(e,id)}
                            value={currentInformations.informationInputText}
                            required
                            />
                        <div className='deleteButtonContainer'>
                            <img src={deleteInfo} alt="Delete Input" onClick={(e)=>deleteInformation(e, id)} style={{cursor:'pointer'}}></img>
                        </div>
                    </div>
                )
            })}
            <div className='AddInputButtonContainer'>
                <p>Ajouter Une Information</p>
                <img className='AddInputButton' src={addInfo} alt="Add Information Collection" onClick={addNewInformation} style={{cursor: 'pointer'}}/>
            </div>
        </>
    )
}
