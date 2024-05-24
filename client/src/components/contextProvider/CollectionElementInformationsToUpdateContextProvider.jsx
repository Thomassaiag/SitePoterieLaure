import React, { useState, createContext, useContext } from 'react'

const CollectionElementInformationsToUpdate=createContext()

export const CollectionElementInformationsToUpdateContextProvider = ({children}) => {

    const [elementInformationToUpdate, setElementInformationToUpdate]=useState([])

    return (
    <>
        <CollectionElementInformationsToUpdate.Provider value={{elementInformationToUpdate, setElementInformationToUpdate}}>
            {children}
        </CollectionElementInformationsToUpdate.Provider>
    </>
    )
}


export const useCollectionElementInformationsToUpdate=()=>useContext(CollectionElementInformationsToUpdate)