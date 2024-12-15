import React, {useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './NewPicture'
import { useCollectionDeletionStatus } from '../../contextProvider/CollectionDeletionStatusContextProvider'
import { addInfo } from '../../data/logos'

import { useConnectionStatus } from '../../contextProvider/ConnectionStatusContextProvider'
import { handleInvalidToken } from '../../utils/auth'

const apiUrl=import.meta.env.VITE_API_URL

export const NewPicture = ({collectionUID}) => {
    const navigate=useNavigate()
    const fileInputRef=useRef(null)

    const {setConnectionAttributes}=useConnectionStatus()
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
        const token=localStorage.getItem('token')

        if(newCollectionElementPicture){
            try {
                let response=await fetch(`http://${apiUrl}/admin/editElement/addNewPicture`,{
                    method:'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body:collectionPictureElement
                })

                if(response.status===401){
                    handleInvalidToken(navigate, setConnectionAttributes)
                }
                if(!response.ok){
                    throw new Error('Network response was not OK')
                }
                else {
                    setCollectionDeletionStatus(true)
                    let data=await response.json()
                    console.log(data)
                }
                
            } catch (error) {
                
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
            <img className='collectionElementPicture' src={addInfo} alt='Ajouter une Photo' style={{cursor: 'pointer'}}/>
            <p>Ajouter une Photo</p>

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
