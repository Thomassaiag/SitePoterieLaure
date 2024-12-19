import React,{useState, useEffect} from 'react'
import { CreateCollectionElement } from '../CreatecollectionElement/CreateCollectionElement'
import './CreateCollection.css'

export const CreateCollection = () => {

    const [collectionCreated, setCollectionCreated]=useState(false)

    const[newCollectionData, setNewCollectionData]=useState(new FormData())

    const handleFileChange=(e)=>{
        e.preventDefault();
        newCollectionData.set('file',e.target.files[0])
        setNewCollectionData(newCollectionData)    
    }


    const handleTextChange=(e)=>{
        e.preventDefault()
        const {name, value}=e.target
        newCollectionData.set(name,value)
        setNewCollectionData(newCollectionData)
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        let collectionPicture=newCollectionData.get('file')

        if(!collectionPicture){
            alert('Merci de sélectionner une image')
            return
        }
        else setCollectionCreated(true)
    }


    return (

        <div className='CollectionCreationContainer'>
            <form className='collectionCreationForm' onSubmit={handleSubmit}>
                <div className='collectionCreationInput'>
                    <label htmlFor='collectionTitle'>Nom de la Collection : </label> 
                    <input
                        id='collectionTitle'
                        type="text"
                        name="collectionTitle"
                        onChange={handleTextChange}
                        required
                    />
                </div>
                <br></br>
                <div className='collectionCreationInput'>
                    <label htmlFor='collectionPicture'>Image principale pour la Collection : </label> 
                    <input
                        id='collectionPicture'
                        type='file'
                        name='collectionPicture'
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <br></br>
                <div className='collectionCreationInput'>
                    <label htmlFor='collectionDescription'>Titre de la Collection : </label> 
                    <input
                        id='collectionDescription'
                        type='text'
                        name='collectionDescription'
                        onChange={handleTextChange}
                        required
                    />
                </div>
                <br></br>
                <br></br>
                <button className='createCollectionButton' type='submit' style={{cursor: 'pointer'}}>Ajouter les détails de la Collection</button>
            </form>
            <br />
            {/* {collectionCreated && 
                <>
                    <br />
                    <CollectionElementCreation newCollectionData={newCollectionData}/> 
                </>
            } */}
                <CreateCollectionElement newCollectionData={newCollectionData}/> 
        </div>

    )
}
