import React, { useState, createContext, useContext } from 'react'

const CollectionElementInformations=createContext()

export const CollectionElementInformationsContextProvider = ({children}) => {

    const [currentInformations, setCurrentInformations]=useState([])

    return (
    <>
        <CollectionElementInformations.Provider value={{currentInformations, setCurrentInformations}}>
            {children}
        </CollectionElementInformations.Provider>
    </>
    )
}


export const useCollectionElementInformations=()=>useContext(CollectionElementInformations)