import React, { useState, createContext, useContext } from 'react'


const ConnectedUserFirstName=createContext()

export const ConnectedUserFirstNameContextProvider = ({children}) => {


    const [connectedUserFirstName, setConnectedUserFirstName]=useState('')

    return (
        <ConnectedUserFirstName.Provider value={{connectedUserFirstName, setConnectedUserFirstName}}>
            {children}
        </ConnectedUserFirstName.Provider>
    )
}

export const useConnectedUserFirstName=()=>useContext(ConnectedUserFirstName)