import React, { useState, createContext, useContext } from 'react'

const AdminConnectionStatus=createContext()

export const ContextProvider = ({children}) => {

    const [adminConnection, setAdminConnectionConnection]=useState(false)

    return (
    <AdminConnectionStatus.Provider value={{adminConnection, setAdminConnectionConnection}}>
        {children}
    </AdminConnectionStatus.Provider>
    )
}


export const useAdminConnection=()=>useContext(AdminConnectionStatus)