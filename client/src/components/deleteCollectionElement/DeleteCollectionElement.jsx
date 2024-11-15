import React from 'react'
import './DeleteCollectionElement.css'
import { deleteInfo } from '../../data/logos'

export const DeleteCollectionElement = ({elementToDeleteID, handleDeleteClick, buttonName}) => {
    return (
        <>
            <p>{buttonName}</p>
            <img className='deleteCollectionButton' src={deleteInfo} alt="Delete Collection" onClick={()=>handleDeleteClick(elementToDeleteID)} style={{cursor: 'pointer'}}/>
        </> 
    )
}
