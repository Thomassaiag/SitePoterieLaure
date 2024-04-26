import React, { useState, createContext } from 'react'

const ConnectionStatus=createContext()

export const ConnectionContext = ({children}) => {

    const [invalidConnection, setInvalidConnection]=useState(false)

    return (
    <ConnectionStatus.Provider value={{invalidConnection, setInvalidConnection}}>
        {children}
    </ConnectionStatus.Provider>
    )
}
