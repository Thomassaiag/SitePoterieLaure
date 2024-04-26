import React, { useState, useEffect } from 'react'
import { useAdminConnection } from '../contextProvider/ContextProvider'

import './Connection.css'

export const Connection = () => {
    const [credentials, setCredentials]=useState({
        userEmail:'',
        userPassword:'',
    })

    const {adminConnection, setAdminConnection}=useAdminConnection()
    const [invalidConnection, setInvalidConnection]=useState(false)
    const [loginClicked, setLoginClicked]=useState(false)

    useEffect(()=>{
        console.log(credentials)
    },[credentials])


    const handleChange=(e)=>{
        setInvalidConnection(false)
        e.preventDefault()
        setCredentials({...credentials,
            [e.target.name]:e.target.value
        }
        )
    }

    const handleFocus=(e)=>{
        e.preventDefault()
        if(invalidConnection){
            setLoginClicked(false)
            setInvalidConnection(false)
            e.target.value=""
        }
    }

    const handleClick=async (e)=>{
        e.preventDefault()
        setLoginClicked(true)
        try {
            console.log(credentials.userEmail)
            console.log(credentials.userPassword)
            let response= await fetch('http://localhost:5000/connection',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail:credentials.userEmail,
                    userPassword:credentials.userPassword
                }                )
            })
            let data= await response.json()
            if(!response){
                console.log("something went wrong")
            }
            else if(response.status==400){
                setInvalidConnection(true)
            }
            else {
                setInvalidConnection(false)
                if(data.adminStatus){
                    console.log(`data.adminStatus => ${data.adminStatus}`)
                    setAdminConnection(true) 
                } 
            console.log(`adminConnection => ${adminConnection}`)
            }
            
        } catch (error) {
            
        }

    }

    return (
        <div className='connectionContainer'>
            <div className='credentialContainer'>
                <form className='credentialForm' onSubmit={handleClick}>
                    <div className='formInput'>
                        <div className='labelContainer'>
                            <label htmlFor='userEmail'>Votre Email :</label>
                        </div>
                        <input
                            id='userEmail'
                            type='email'
                            name='userEmail'
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className='formInput'>
                        <div className='labelContainer'>
                            <label htmlFor='userPassword'>Mot de Passe :</label>
                        </div>
                        <input
                            id='userPassword'
                            type='password'
                            name='userPassword'
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                    <div>
                        <button className='loginButton' >Login</button>
                    </div>
                </form>
            </div>
            {loginClicked && invalidConnection && <p>Compte Inconnu ou password Incorrect, veuillez réessayer ou créer un comte</p>}
            {loginClicked && !invalidConnection && !adminConnection && <p>Vous êtes Connecté.e</p>}
            {loginClicked && adminConnection && <p>Vous êtes Connecté.e en tant qu'administrateur</p>}
            <div>
                <p>Si vous n'avez pas de compte, vous pouvez en créer un : <a href='/accountCreation' style={{fontSize:20, fontWeight: "bold"}}>Créer un compte</a></p>
            </div>
            
        </div>
    )
}
