import React,{useState, useEffect} from 'react'
import { CollectionElementCreation } from '../collectionElementCreation/CollectionElementCreation'

export const CollectionCreation = () => {
    const [collectionText, setCollectionText]=useState({
        collectionTitle:'',
        collectionDescription:''
    })
    const [collectionPicture, setCollectionPicture]=useState(null)

    const [collectionCreated, setCollectionCreated]=useState(false)

    const [newCollectionUIDAndTitle, setNewCollectionUIDAndTitle]=useState({
        newCollectionUID:'',
        newCollectionTitle:''
    })
    


    const handleFileChange=(event)=>{
        event.preventDefault();
        setCollectionPicture(event.target.files[0])
    }


    const handleTextChange=(e)=>{
        setCollectionText({
            ...collectionText,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit=async(event)=>{
        event.preventDefault();

        let newCollectionData= new FormData();
        newCollectionData.append('file', collectionPicture)
        newCollectionData.append('collectionTitle', collectionText.collectionTitle)
        newCollectionData.append('collectionDescription', collectionText.collectionDescription)

        if(!collectionPicture){
            alert('Merci de sélectionner une image')
            return
        }
        try {
            const response=await fetch('http://localhost:5000/admin/createCollection',{
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: newCollectionData
            })
            
            if(!response.ok){
                throw new Error('Network response was not OK')
            }
            else {
                console.log('New Entry Created Successfuly')
                let data= await response.json()
                let newCollectionUID=data.message.collection_uid
                let newCollectionTitle=data.message.collection_title
                console.log('collection created => ',data)
                console.log('newCollectionUID => ',newCollectionUID)
                setCollectionCreated(true)
                setNewCollectionUIDAndTitle({...CollectionCreation,
                     newCollectionUID: newCollectionUID,
                     newCollectionTitle:newCollectionTitle
                })

            }    
        } catch (err) {
            console.error('Error adding New Collection', err)
        }
    
    }

    return (
    <div>
        <h1>Créer une nouvelle Collection</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='collectionTitle'>Nom de la Collection</label> 
                <input
                    id='collectionTitle'
                    type="text"
                    name="collectionTitle"
                    onChange={handleTextChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='collectionPicture'>Choisir une image principale pour la Collection</label> 
                <input
                    id='collectionPicture'
                    type='file'
                    name='collectionPicture'
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <label htmlFor='collectionDescription'>Titre de la Collection</label> 
                <input
                    id='collectionDescription'
                    type='text'
                    name='collectionDescription'
                    onChange={handleTextChange}
                    required
                />
            </div>

            <button type='submit'>Créer Collection</button>
        </form>
        {/* {collectionCreated ? 
            <>
                <br />
                <CollectionElementCreation newCollectionUIDAndTitle={newCollectionUIDAndTitle}/> 
            </> : <></>
        } */}

            <br />
            <CollectionElementCreation newCollectionUIDAndTitle={newCollectionUIDAndTitle}/> 

    </div>
    )
}
