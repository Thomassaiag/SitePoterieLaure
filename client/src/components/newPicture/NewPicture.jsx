import React, {useEffect, useRef, useState, Fragment} from 'react'
import './NewPicture'
import { useCollectionDeletionStatus } from '../contextProvider/CollectionDeletionStatusContextProvider'


export const NewPicture = ({collectionUID}) => {
    const fileInputRef=useRef(null)

    const[newCollectionElementPicture, setNewCollectionElementPicture]=useState()
    const[currentCollectionUID, setCurrentCollectionUID]=useState(collectionUID)
    const {collectionDeletionStatus, setCollectionDeletionStatus}=useCollectionDeletionStatus()
    const addNewCollectionElementPicture=(event)=>{
        event.stopPropagation()
        console.log("addition of a new picture")
        fileInputRef.current.click()
    }
    
    
    const handleFileChange=(event)=>{
        event.preventDefault();
        setNewCollectionElementPicture(event.target.files[0])
    }    
    
    const updateFile = async()=>{

        const collectionPictureElement= new FormData()
        collectionPictureElement.append('file', newCollectionElementPicture)
        collectionPictureElement.append('collectionUID', collectionUID)

        if(newCollectionElementPicture){
            let response=await fetch('http://localhost:14001/admin/editElement/addNewPicture',{
                method:'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body:collectionPictureElement
            })
            if(!response.ok){
                throw new Error('Network response was not OK')
            }
            else {
                setCollectionDeletionStatus(true)
                let data=await response.json()
                console.log(data)
            }
        }
        else console.log("no image was uploaded")        
    }
    
    
    useEffect(()=>{
        if(newCollectionElementPicture){
            updateFile()
        }
    },[newCollectionElementPicture])

    return (
        <>
            <div className='collectionPictureContainer' onClick={addNewCollectionElementPicture}>
                <img className='collectionElementPicture' src='../../../public/images/addPicture.jpg' alt='Ajouter une Photo' style={{cursor: 'pointer'}}/>
            </div>
            <div>
                <p>Ajouter une Photo</p>
            </div>
            <form>
                <input
                    type='file'
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    onClick={(event)=>event.stopPropagation()} 
                />
            </form>
        </>
    )
}
