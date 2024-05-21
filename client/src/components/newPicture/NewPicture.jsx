import React, {useRef, useState} from 'react'
import './NewPicture'

export const NewPicture = ({collectionUID}) => {
    const fileInputRef=useRef(null)

    const[newCollectionElementPicture, setNewCollectionElementPicture]=useState(null)
    const[currentCollectionUID, setCurrentCollectionUID]=useState(collectionUID)


    const addNewCollectionElementPicture=()=>{
        console.log("addition of a new picture")
        fileInputRef.current.click()
    }
    const collectionPictureElement= new FormData()
    collectionPictureElement.append("file", newCollectionElementPicture)

    const handleFileChange=async(event)=>{
        event.preventDefault();
        setNewCollectionElementPicture(event.target.files[0])
        console.log(collectionPictureElement.file)
        console.log(collectionUID)
        if(newCollectionElementPicture){
            let response=await fetch('http://localhost/admin/editElement/addNewPicture',{
                method:"PUT",
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body:collectionPictureElement
            })
            let data=await response.json()
            console.log(data)
        }
        else console.log("no image was uploaded")

    }
    
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
                />
            </form>
        </div>
    )
}
