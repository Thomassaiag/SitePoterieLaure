import React,{useState, useEffect} from 'react'
import { CollectionElementCreation } from '../collectionElementCreation/CollectionElementCreation'

import './CollectionCreation.css'

export const CollectionCreation = () => {
    // const [collectionText, setCollectionText]=useState({
    //     collectionTitle:'',
    //     collectionDescription:''
    // })
    // const [collectionPicture, setCollectionPicture]=useState(null)

    const [collectionCreated, setCollectionCreated]=useState(false)

    // const [newCollectionUIDAndTitle, setNewCollectionUIDAndTitle]=useState({
    //     newCollectionUID:'',
    //     newCollectionTitle:''
    // })
    
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

        // let newCollectionData= new FormData();
        // newCollectionData.append('file', collectionPicture)
        // newCollectionData.append('collectionTitle', collectionText.collectionTitle)
        // newCollectionData.append('collectionDescription', collectionText.collectionDescription)

        if(!collectionPicture){
            alert('Merci de sélectionner une image')
            return
        }
        else setCollectionCreated(true)
    }    

    // const handleSubmit=async(event)=>{
    //     event.preventDefault();
    //     let collectionPicture=newCollectionData.get('file')

    //     if(!collectionPicture){
    //         alert('Merci de sélectionner une image')
    //         return
    //     }
    //     try {
    //         const response=await fetch('http://localhost:5000/admin/createCollection',{
    //             method: 'POST',
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
    //             setNewCollectionUIDAndTitle({...newCollectionUIDAndTitle,
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
                <CollectionElementCreation newCollectionData={newCollectionData}/> 
            </>
        }

            {/* <CollectionElementCreation newCollectionData={newCollectionData}/>  */}

    </div>
    )
}
