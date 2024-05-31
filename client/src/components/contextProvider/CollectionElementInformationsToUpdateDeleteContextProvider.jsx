import React, { useState, createContext, useContext } from 'react'

const CollectionElementInformationsToUpdateDelete=createContext()

export const CollectionElementInformationsToUpdateDeleteContextProvider = ({children}) => {

    const [currentInformationsToUpdateDelete, setCurrentInformationsToUpdateDelete]=useState([])

    return (
    <>
        <CollectionElementInformationsToUpdateDelete.Provider value={{currentInformationsToUpdateDelete, setCurrentInformationsToUpdateDelete}}>
            {children}
        </CollectionElementInformationsToUpdateDelete.Provider>
    </>
    )
}


export const useCollectionElementInformationsToUpdateDelete=()=>useContext(CollectionElementInformationsToUpdateDelete)