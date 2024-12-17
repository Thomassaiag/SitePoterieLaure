import React, { useState, createContext, useContext, useEffect } from 'react'

const ConnectionStatus=createContext()

export const ConnectionStatusContextProvider = ({children}) => {

    
    const [connectionAttributes, setConnectionAttributes]=useState({
        adminConnection:false,
        connectedUserFirstName:'',
        invalidConnection: true
    })


    useEffect(()=>{
        const storedConnectionAttributes=localStorage.getItem('connectionAttributes')
        console.log(`storedConnectionAttributes => ${storedConnectionAttributes}`)
        if(storedConnectionAttributes){
            setConnectionAttributes(JSON.parse(storedConnectionAttributes))
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('connectionAttributes',JSON.stringify(connectionAttributes))
    },[connectionAttributes])

    useEffect(()=>{
        console.log(localStorage)
    },[])

    return (
    <>
        <ConnectionStatus.Provider value={{connectionAttributes, setConnectionAttributes}}>
            {children}
        </ConnectionStatus.Provider>
    </>
    )
}


export const useConnectionStatus=()=>useContext(ConnectionStatus)