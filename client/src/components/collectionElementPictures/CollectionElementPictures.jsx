
import React,{useState, useEffect} from 'react'
import './CollectionElementPictures.css'
import { CollectionElementPicture } from '../collectionElementPicture/CollectionElementPicture'
import { useParams } from 'react-router-dom'



export const CollectionElementPictures = () => {
    const [currentPictures, setCurrentPictures]=useState([])
    let {id}=useParams()


    const fetchCurrentPictures=async()=>{
        try {
            const response = await fetch(`http://localhost:5000/collections/${id}/pictures`)
            const JsonData=await response.json()
            setCurrentPictures(JsonData)
    }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        fetchCurrentPictures()
    },[])


    return (
        <div className='collectionElementPicturesContainer'>
            {
                currentPictures ? (
                    currentPictures.map((currentPicture)=>{
                        let {collection_element_picture_url, collection_element_picture_alt, collection_element_picture_uid}=currentPicture
                        return(
                            <div className='collectionElementPictureContainer'key={collection_element_picture_uid}>
                                <CollectionElementPicture className='collectionElementPicture'  collection_element_picture_url={collection_element_picture_url} collection_element_picture_alt={collection_element_picture_alt} />
                            </div>    
                        )
                    })
                ):(
                    <p>Loading</p>
                )
            }</div>
    )
}
