import React, { useState, createContext, useContext } from 'react'

const ConnectionStatus=createContext()

export const ConnectionStatusContextProvider = ({children}) => {

    const [connectionAttributes, setConnectionAttributes]=useState({
        adminConnection:false,
        connectedUserFirstName:'',
        invalidConnection: true
    })

    return (
    <>
        <ConnectionStatus.Provider value={{connectionAttributes, setConnectionAttributes}}>
            {children}
        </ConnectionStatus.Provider>
    </>
    )
}


export const useConnectionStatus=()=>useContext(ConnectionStatus)