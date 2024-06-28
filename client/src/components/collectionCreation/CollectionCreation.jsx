import React,{useState, useEffect} from 'react'
import { CollectionElementCreation } from '../collectionElementCreation/CollectionElementCreation'

import './CollectionCreation.css'

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
    
    const[]=useState()

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
    
    const handleSubmit=(e)=>{
        e.preventDefault()

        let newCollectionData= new FormData();
        newCollectionData.append('file', collectionPicture)
        newCollectionData.append('collectionTitle', collectionText.collectionTitle)
        newCollectionData.append('collectionDescription', collectionText.collectionDescription)

        if(!collectionPicture){
            alert('Merci de sélectionner une image')
            return
        }
        else setCollectionCreated(true)
    }    



    // const handleSubmit=async(event)=>{
    //     event.preventDefault();

    //     let newCollectionData= new FormData();
    //     newCollectionData.append('file', collectionPicture)
    //     newCollectionData.append('collectionTitle', collectionText.collectionTitle)
    //     newCollectionData.append('collectionDescription', collectionText.collectionDescription)

    //     if(!collectionPicture){
    //         alert('Merci de sélectionner une image')
    //         return
    //     }
    //     try {
    //         const response=await fetch('http://localhost:5000/admin/createCollection',{
    //             method: 'POST',
    //             // headers: {
    //             //     'Content-Type': 'application/json'
    //             // },
    //             body: newCollectionData
    //         })
            
    //         if(!response.ok){
    //             throw new Error('Network response was not OK')
    //         }
    //         else {
    //             console.log('New Entry Created Successfuly')
    //             let data= await response.json()
    //             let newCollectionUID=data.message.collection_uid
    //             let newCollectionTitle=data.message.collection_title
    //             console.log('collection created => ',data)
    //             console.log('newCollectionUID => ',newCollectionUID)
    //             setCollectionCreated(true)
    //             setNewCollectionUIDAndTitle({...CollectionCreation,
    //                  newCollectionUID: newCollectionUID,
    //                  newCollectionTitle:newCollectionTitle
    //             })

    //         }    
    //     } catch (err) {
    //         console.error('Error adding New Collection', err)
    //     }
    
    // }

    return (
    <div>
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
            <button className='createCollectionButton' type='submit'>Créer La Collection</button>
        </form>
        <br />
        {collectionCreated && 
            <>
                <br />
                <CollectionElementCreation/> 
            </>
        }

            {/* <CollectionElementCreation newCollectionUIDAndTitle={newCollectionUIDAndTitle}/>  */}

    </div>
    )
}
