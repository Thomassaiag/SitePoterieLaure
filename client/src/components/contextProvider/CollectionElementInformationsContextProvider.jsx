import React, { useState, createContext, useContext } from 'react'

const CollectionElementInformations=createContext()

export const CollectionElementInformationsContextProvider = ({children}) => {

    const [collectionElementInformations, setCollectionElementInformations]=useState([])

    return (
    <>
        <CollectionElementInformations.Provider value={{collectionElementInformations, setCollectionElementInformations}}>
            {children}
        </CollectionElementInformations.Provider>
    </>
    )
}


export const useConnectionStatus=()=>useContext(CollectionElementInformations)