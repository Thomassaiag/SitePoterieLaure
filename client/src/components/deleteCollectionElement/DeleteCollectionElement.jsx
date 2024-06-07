import React from 'react'

export const DeleteCollectionElement = ({elementToDeleteID, handleDeleteClick}) => {
    return (
        <>
            <p>Effacer la collection</p>
            <img className='deleteCollectionButton' src="../../../images/deleteCollection.jpg" alt="Delete Collection" onClick={()=>handleDeleteClick(elementToDeleteID)}/>
        </> 
    )
}
