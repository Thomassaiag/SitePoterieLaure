import React,{useState} from 'react'

export const FormulaireCreationCollection = () => {
    const [collectionTitle, setCollectionTitle]=useState([null])
    const [collectionDescription, setCollectionDescription]=useState([null])


    const handleSubmit=async(event)=>{
        event.preventDefault();
        try {
            const response=await fetch('http://localhost:5000/admin',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({collectionTitle, collectionDescription})
            })
            if(!response.ok){
                throw new Error('Network response was not OK')
            }
            else console.log('New Entry Created Successfuly')
        } catch (err) {
            console.error('Error adding New Collection', err)
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
                    name="collectionTitle"
                    value={collectionTitle}
                    onChange={(e)=>setCollectionTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description de la Collection</label> 
                <input
                    type='text'
                    name='collectionDescription'
                    value={collectionDescription}
                    onChange={(e)=>setCollectionDescription(e.target.value)}
                    required
                />
            </div>
            <button type='submit'>Créer Collection</button>
        </form>
    </div>
    )
}
