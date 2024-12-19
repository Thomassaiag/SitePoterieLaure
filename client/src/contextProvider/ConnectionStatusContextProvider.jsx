import React, { useState, createContext, useContext, useEffect } from 'react'

const ConnectionStatus=createContext()

export const ConnectionStatusContextProvider = ({children}) => {

    //State initialiation with check for admin connection, userFirstame for greetings, invalid Connection
    const [connectionAttributes, setConnectionAttributes]=useState({
        adminConnection:false,
        connectedUserFirstName:'',
        invalidConnection: true
    })

    //when component mounts we check if we already have someone logged
    useEffect(()=>{
        const storedConnectionAttributes=localStorage.getItem('connectionAttributes')
        if(storedConnectionAttributes){
            setConnectionAttributes(JSON.parse(storedConnectionAttributes))
        }
    },[])


    //when connection attribute gets updated, we used localstorage to store the connectionAttributes object
    useEffect(()=>{
        localStorage.setItem('connectionAttributes',JSON.stringify(connectionAttributes))
    },[connectionAttributes])

    return (
    <>
        <ConnectionStatus.Provider value={{connectionAttributes, setConnectionAttributes}}>
            {children}
        </ConnectionStatus.Provider>
    </>
    )
}


export const useConnectionStatus=()=>useContext(ConnectionStatus)