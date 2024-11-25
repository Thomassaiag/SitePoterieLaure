import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'
import './Connection.css'
const apiUrl=import.meta.env.VITE_API_URL

export const Connection = () => {
    const [credentials, setCredentials]=useState({
        userEmail:'',
        userPassword:'',
    })

    const {connectionAttributes, setConnectionAttributes}=useConnectionStatus()
    const [loginClicked, setLoginClicked]=useState(false)

    useEffect(()=>{
        console.log(credentials)
    },[credentials])

    useEffect(()=>{
        console.log(`adminConnection Connection=>${connectionAttributes.adminConnection}`)
        console.log(`connectedUserFirstName Connection=>${connectionAttributes.connectedUserFirstName}`)
        console.log(`invalidConnection Connection=>${connectionAttributes.invalidConnection}`)
    },[connectionAttributes])


    const handleChange=(e)=>{
        setConnectionAttributes(prevConnectionAttributes=>({
            ...prevConnectionAttributes,
            invalidConnection:true
        }))
        e.preventDefault()
        setCredentials({...credentials,
            [e.target.name]:e.target.value
        })
    }

    const handleFocus=(e)=>{
        e.preventDefault()
        if(connectionAttributes.invalidConnection){
            setLoginClicked(false)
            e.target.value=""
        }
    }

    const handleClick=async (e)=>{
        e.preventDefault()
        setLoginClicked(true)
        try {
            console.log(credentials.userEmail)
            console.log(credentials.userPassword)
            let response= await fetch(`http://${apiUrl}/user/login`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail:credentials.userEmail,
                    userPassword:credentials.userPassword
            })
            })
            let data= await response.json()
            console.log(`data => ${data}`)
            if(!response){
                console.log("something went wrong")
            }
            else if(response.status==400){
                console.log("Invalid Connection")
                setConnectionAttributes(prevConnectionAttributes=>({
                    ...prevConnectionAttributes,
                    invalidConnection:true
                }))
            }
            else {
                const newConnectionAttributes={
                    invalidConnection:false,
                    connectedUserFirstName: data.userFirstName,
                    adminConnection: data.adminStatus || false
                }
                setConnectionAttributes(newConnectionAttributes)
                localStorage.setItem('connectionAttributes',JSON.stringify(newConnectionAttributes))
            }    
        } catch (error) {
            console.log(('Error during login',error))
        }

    }

    return (
        <div className='connectionContainer'>
            {connectionAttributes.invalidConnection && 
            // <div className='credentialContainer'>
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
            // </div>
            }
            {loginClicked && connectionAttributes.invalidConnection && <p>Compte Inconnu ou password Incorrect, veuillez réessayer ou créer un comte</p>}
            {!connectionAttributes.invalidConnection && !connectionAttributes.adminConnection && <p>Vous êtes Connecté.e</p>}
            {loginClicked && connectionAttributes.adminConnection && <p>Vous êtes Connecté.e en tant qu'administrateur</p>}
            {connectionAttributes.invalidConnection && <div>
                <p>Si vous n'avez pas de compte, vous pouvez en créer un : <Link classeName='accountCreationLink' to='/accountCreation'>Créer un compte</Link></p>
            </div>}
            
        </div>
    )
}
