import React, { useState, createContext, useContext } from 'react'

const CollectionDeletionStatusContext=createContext()

export const CollectionDeletionStatusContextProvider = ({children}) => {

    const [collectionDeletionStatus, setCollectionDeletionStatus]=useState(false)

    return (
    <>
        <CollectionDeletionStatusContext.Provider value={{collectionDeletionStatus,setCollectionDeletionStatus}}>
            {children}
        </CollectionDeletionStatusContext.Provider>
    </> 
    )
}


export const useCollectionDeletionStatus=()=>useContext(CollectionDeletionStatusContext)