import React, { useState, createContext, useContext } from 'react'

const CollectionElementInformationsToUpdateDelete=createContext()

export const CollectionElementInformationsToUpdateDeleteContextProvider = ({children}) => {

    const [currentInformationsToUpdateDelete, setCurrentInformationsToUpdate]=useState([])

    return (
    <>
        <CollectionElementInformationsToUpdateDelete.Provider value={{currentInformationsToUpdateDelete, setCurrentInformationsToUpdate}}>
            {children}
        </CollectionElementInformationsToUpdateDelete.Provider>
    </>
    )
}


export const useCollectionElementInformationsToUpdateDelete=()=>useContext(CollectionElementInformationsToUpdateDelete)