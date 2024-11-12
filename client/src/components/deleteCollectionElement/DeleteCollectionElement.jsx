import React from 'react'
import './DeleteCollectionElement.css'

export const DeleteCollectionElement = ({elementToDeleteID, handleDeleteClick, buttonName}) => {
    return (
        <>
            <p>{buttonName}</p>
            <img className='deleteCollectionButton' src="../../../images/deleteCollection.jpg" alt="Delete Collection" onClick={()=>handleDeleteClick(elementToDeleteID)} style={{cursor: 'pointer'}}/>
        </> 
    )
}
