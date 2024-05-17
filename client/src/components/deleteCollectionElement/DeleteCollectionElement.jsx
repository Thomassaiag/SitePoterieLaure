import React from 'react'

export const DeleteCollectionElement = ({elementToDeleteID, handleDeleteClick}) => {
    return (
        <div className='deleteCollectionButtonContainer'>
            <img className='deleteCollectionButton' src="../../../images/deleteCollection.jpg" alt="Delete Collection" onClick={()=>handleDeleteClick(elementToDeleteID)}/>
        </div> 
    )
}
