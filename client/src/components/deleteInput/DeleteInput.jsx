import React from 'react'
import { deleteInfo } from '../../data/logos'

export const DeleteInput = ({buttonName, discardInformationInput, collection_element_information_uid}) => {
    return (
        <>
            {/* <p>{buttonName}</p> */}
            <img className='deleteInputButton' src={deleteInfo} alt="Delete Input" onClick={(e)=>discardInformationInput(e, collection_element_information_uid)} style={{cursor: 'pointer'}}/>
        </> 
    )
}
