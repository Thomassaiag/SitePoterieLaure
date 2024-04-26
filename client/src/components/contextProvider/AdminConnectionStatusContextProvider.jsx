import React, { useState, createContext, useContext } from 'react'

const AdminConnectionStatus=createContext()

export const AdminConnectionStatusContextProvider = ({children}) => {

    const [adminConnection, setAdminConnection]=useState(false)

    return (
    <>
        <AdminConnectionStatus.Provider value={{adminConnection, setAdminConnection}}>
            {children}
        </AdminConnectionStatus.Provider>
    </>
    )
}


export const useAdminConnection=()=>useContext(AdminConnectionStatus)