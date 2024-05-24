import React, { useState, createContext, useContext } from 'react'

const CollectionElementInformationsToUpdate=createContext()

export const CollectionElementInformationsToUpdateContextProvider = ({children}) => {

    const [currentInformationsToUpdate, setCurrentInformationsToUpdate]=useState([])

    return (
    <>
        <CollectionElementInformationsToUpdate.Provider value={{currentInformationsToUpdate, setCurrentInformationsToUpdate}}>
            {children}
        </CollectionElementInformationsToUpdate.Provider>
    </>
    )
}


export const useCollectionElementInformationsToUpdate=()=>useContext(CollectionElementInformationsToUpdate)