import React, { useState } from 'react'
import {nanoid} from  'nanoid'

export const CollectionElementInformationsCreation = () => {


    const [inputIDList, setInputIDList]=useState([{id:nanoid()}])

    const [collectionInformationsToCreate, setCollectionInformationsToCreate]=useState([])

    const addNewInformation=(e)=>{
        e.preventDefault()
        setInputIDList(prevInputIDList=>[...prevInputIDList,{id:nanoid()}])
    }

    const deleteInformation=(e,idToDelete)=>{
        e.preventDefault()
        setInputIDList(prevInputIDList=>prevInputIDList.filter(prevInputID=>prevInputID.id!=idToDelete))
    }


    const handleChange=(e)=>{
        e.preventDefault()
        setCollectionInformationsToCreate((collectionInformationsToCreate)=>{
            return collectionInformationsToCreate.map((collectionInformations)=>{
                if(collectionInformations.uid)
                return {...collectionInformations}
            })
        })
    }


    return (
        <div>
            {inputIDList.map((element)=>{
                const{id}=element
                return (
                    <div key={id}>
                    <input 
                        type='text'
                        name={id}
                        onChange={handleChange}
                    />
                    <button type='button' onClick={(e)=>deleteInformation(e, id)}>Delete Information</button>
                    </div>
                )
            })}
            <button type='button' onClick={addNewInformation}>Ajouter une nouvelle information</button>
        </div>
    )
}
