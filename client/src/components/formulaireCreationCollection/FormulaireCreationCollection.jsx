import React,{useState} from 'react'

export const FormulaireCreationCollection = () => {
    const [collectionName, setCollectionName]=useState([null])
    const [collectionDescription, setCollectionDescription]=useState([null])


    const handleSubmit=async(event)=>{
        event.preventDefault()
        try {
            const response=await fetch('/admin',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({collectionName})
            })
            if(!response.ok){
                throw new Error('Network response was not OK')
            }
            else console.log('New Entry Created Successfuly')
        } catch (error) { 
        }
    }
  return (
    <div>
         <h1>Créer une nouvelle Collection</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom de la Collection</label> 
                <input
                    type="text"
                    id="collectionName"
                    value={collectionName}
                    onChange={(e)=>setCollectionName(e.target.value)}
                />
            </div>
            <div>
                <label>Description de la Collection</label> 
                <input
                    type='text'
                    id='collectionDescription'
                    value={collectionDescription}
                    onChange={(e)=>setCollectionDescription(e.target.value)}
                />
            </div>
            <button type='submit'>Créer Collection</button>
        </form>
    </div>
  )
}
