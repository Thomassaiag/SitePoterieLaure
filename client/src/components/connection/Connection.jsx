import React, { useState, useEffect } from 'react'

import './Connection.css'

export const Connection = () => {
    const [credentials, setCredentials]=useState({
        userEmail:'',
        userPassword:'',
    })

    const handleChange=(e)=>{
        e.preventDefault()
        setCredentials({...credentials,
            [e.target.name]:e.target.value
        }
        )
    }

    const handleClick=async ()=>{
        try {
            let response= await fetch(`http://localhost:5000/connection`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    userEmail=credentials.userEmail,
                    userPassword=credentials.userPassword
                )
            })
            const data=response.json()
            if(!response){

            }
            else console.log(data)
            
        } catch (error) {
            
        }

    }

    return (
        <div className='connectionContainer'>
            <div className='credentialContainer'>
                <form className='credentialForm'>
                    <div className='formInput'>
                        <div className='labelContainer'>
                            <label htmlFor='userEmail'>Votre Email :</label>
                        </div>
                        <input
                            id='userEmail'
                            type='email'
                            name='userEmail'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formInput'>
                        <div className='labelContainer'>
                            <label htmlFor='userPassword'>Mot de Passe :</label>
                        </div>
                        <input
                            id='userPassword'
                            type='text'
                            name='userPassword'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button className='loginButton' onClick={handleClick}>Login</button>
                    </div>
                </form>
            </div>
            <div>
                <p>Si vous n'avez pas de compte, vous pouvez en créer un : <a href='/accountCreation' style={{fontSize:20, fontWeight: "bold"}}>Créer un compte</a></p>
                

            </div>
            
        </div>
    )
}
