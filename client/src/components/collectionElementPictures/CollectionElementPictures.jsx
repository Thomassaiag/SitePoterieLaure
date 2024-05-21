
import React,{useState, useEffect} from 'react'
import './CollectionElementPictures.css'
import { CollectionElementPicture } from '../collectionElementPicture/CollectionElementPicture'
import { NewPicture } from '../newPicture/NewPicture'
import { useParams } from 'react-router-dom'



export const CollectionElementPictures = ({collection_uid}) => {
    const [currentPictures, setCurrentPictures]=useState([])
    // let {id}=useParams
    


    const fetchCurrentPictures=async()=>{
        try {
            const response = await fetch(`http://localhost:5000/collections/${collection_uid}/pictures`)
            const jsonData=await response.json()
            setCurrentPictures(jsonData)
    }
        catch (error) {
            console.log('it didn t work')
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchCurrentPictures()
    },[collection_uid, currentPictures])




    return (
        <div className='collectionElementPicturesContainer'>
            <NewPicture className='collectionElementSinglePictureContainer' collectionUID={collection_uid}/>
            {
                currentPictures ? (
                    currentPictures.map((currentPicture)=>{
                        let {collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_picture_uid}=currentPicture
                        return(
                            <div className='collectionElementSinglePictureContainer' key={collection_element_picture_uid}>
                                <CollectionElementPicture className='collectionElementPicture'  collection_element_picture_url={collection_element_picture_url} collection_element_picture_alt={collection_element_picture_alt} collection_element_picture_uid={collection_element_picture_uid} collection_uid={collection_uid}/>
                            </div>    
                        )
                    })
                ):(
                    <p>Loading</p>
                )
            }
            </div>
    )
}
