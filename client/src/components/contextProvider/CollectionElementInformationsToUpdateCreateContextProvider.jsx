import React, { useState, createContext, useContext } from 'react'

const CollectionElementInformationsToUpdateCreate=createContext()

export const CollectionElementInformationsToUpdateCreateContextProvider = ({children}) => {

    const [currentInformationsToUpdateCreate, setCurrentInformationsToCreate]=useState([])

    return (
    <>
        <CollectionElementInformationsToUpdateCreate.Provider value={{currentInformationsToUpdateDelete: currentInformationsToUpdateCreate, setCurrentInformationsToUpdate: setCurrentInformationsToCreate}}>
            {children}
        </CollectionElementInformationsToUpdateCreate.Provider>
    </>
    )
}


export const useCollectionElementInformationsToUpdateCreate=()=>useContext(CollectionElementInformationsToUpdateCreate)