
import React,{useState, useEffect} from 'react'
import './CollectionElementPictures.css'
import { CollectionElementPicture } from '../collectionElementPicture/CollectionElementPicture'
import { NewPicture } from '../newPicture/NewPicture'
import { useParams } from 'react-router-dom'
import { useCollectionDeletionStatus } from '../contextProvider/CollectionDeletionStatusContextProvider'
import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'

export const CollectionElementPictures = ({collection_uid}) => {
    const [currentPictures, setCurrentPictures]=useState([])
    const {collectionDeletionStatus, setCollectionDeletionStatus}=useCollectionDeletionStatus()

    const {connectionAttributes}=useConnectionStatus()

    const fetchCurrentPictures=async()=>{
        try {
            const response = await fetch(`http://localhost:5000/collectionElement/${collection_uid}/pictures`)
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
        setCollectionDeletionStatus(false)
    },[collection_uid,collectionDeletionStatus])

    useEffect(()=>{
        console.log('adminstatus',connectionAttributes.adminStatus)
    },[connectionAttributes.adminStatus])


    return (
        <>
            {connectionAttributes.adminConnection &&
                <div className='collectionElementSinglePictureContainer'>
                    <NewPicture collectionUID={collection_uid}/>
                </div>
            }
            {currentPictures ? (
                currentPictures.map((currentPicture)=>{
                    let {collection_uid, collection_element_picture_url, collection_element_picture_alt, collection_element_picture_uid}=currentPicture
                    return(
                        <div className='collectionElementSinglePictureContainer' key={collection_element_picture_uid}>
                            <CollectionElementPicture collection_element_picture_url={collection_element_picture_url} collection_element_picture_alt={collection_element_picture_alt} collection_element_picture_uid={collection_element_picture_uid} collection_uid={collection_uid}/>
                        </div>    
                    )
                })
                ):(
                    <p>Loading</p>
                )
            }
            </>
    )
}
