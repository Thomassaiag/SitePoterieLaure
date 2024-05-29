import React, { useState } from 'react'
import {nanoid} from  'nanoid'

export const CreateCollectionElementInformations = () => {


const [inputIDList, setInputIDList]=useState([
    {
        id:nanoid()
    }
])

const handleSubmit=(()=>{
    return
})

const addNewInformation=(e)=>{
    e.preventDefault()
    setInputIDList(prevInputIDList=>[...prevInputIDList,{id:nanoid()}])
}

const deleteInformation=(e,idToDelete)=>{
    e.preventDefault()
    setInputIDList(prevInputIDList=>prevInputIDList.filter(prevInputID=>prevInputID.id!=idToDelete))
}

  return (
    <div>
        <form onSubmit={handleSubmit}>
            {inputIDList.map((element)=>{
                const{id}=element
                return (
                    <div key={id}>
                    <input
                        type='text'
                        name={id}
                    />
                    <button onClick={(e)=>deleteInformation(e, id)}>Delete Information</button>
                    </div>
                )
            })}
        </form>
        <button onClick={addNewInformation}>Ajouter une nouvelle information</button>
    </div>
  )
}
