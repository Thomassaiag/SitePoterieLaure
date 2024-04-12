import React, { useState, useEffect } from 'react'

import './Connection.css'

export const Connection = () => {
    const [credentials, setCredentials]=useState({
        email:'',
        password:'',
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
            let response= await fetch(`http://connection`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    email=credentials.email,
                    password=credentials.password
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
                            <label htmlFor='email'>Votre Email</label>
                        </div>
                        <input
                            id='email'
                            type='email'
                            name='email'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formInput'>
                        <div className='labelContainer'>
                            <label htmlFor='password'>Mot de Passe</label>
                        </div>
                        <input
                            id='password'
                            type='text'
                            name='password'
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
