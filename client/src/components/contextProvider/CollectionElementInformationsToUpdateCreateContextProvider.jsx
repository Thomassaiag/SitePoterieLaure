import React, { useState, createContext, useContext } from 'react'

const CollectionElementInformationsToUpdateCreate=createContext()

export const CollectionElementInformationsToUpdateCreateContextProvider = ({children}) => {

    const [currentInformationsToUpdateCreate, setCurrentInformationsToUpdateCreate]=useState([])

    return (
    <>
        <CollectionElementInformationsToUpdateCreate.Provider value={{currentInformationsToUpdateCreate, setCurrentInformationsToUpdateCreate}}>
            {children}
        </CollectionElementInformationsToUpdateCreate.Provider>
    </>
    )
}


export const useCollectionElementInformationsToUpdateCreate=()=>useContext(CollectionElementInformationsToUpdateCreate)