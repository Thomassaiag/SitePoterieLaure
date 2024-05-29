import React, {useEffect, useRef, useState} from 'react'
import './NewPicture'

export const NewPicture = ({collectionUID}) => {
    const fileInputRef=useRef(null)

    const[newCollectionElementPicture, setNewCollectionElementPicture]=useState()
    const[currentCollectionUID, setCurrentCollectionUID]=useState(collectionUID)

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
            let response=await fetch('http://localhost:5000/admin/editElement/addNewPicture',{
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
                let data=await response.json()
            }
        }
        else console.log("no image was uploaded")        
    }
    
    
    useEffect((event)=>{
        updateFile()
    },[newCollectionElementPicture])

    return (
        <div onClick={addNewCollectionElementPicture}>
            <p>Ajouter une Photo</p>
            <img className='newPicture' src='../../../public/images/addPicture.jpg' alt='Ajouter une Photo'/>
            <form>
                <input
                    type='file'
                    ref={fileInputRef}
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    onClick={(event)=>event.stopPropagation()} 
                />
            </form>
        </div>
    )
}
