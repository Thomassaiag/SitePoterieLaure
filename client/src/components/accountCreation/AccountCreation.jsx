import {React, useState, useEffect} from 'react'
import './AccountCreation.css'

export const AccountCreation = () => {
const [credentials, setCredentials]=useState({
        userFirstName:'',
        userLastName:'',
        userEmail:'',
        userPassword:'',
    })

    const [invalidCreation, setInvalidCreation]=useState(false)

    useEffect(()=>{
        console.log(credentials)
    },[credentials])

    const handleChange=(e)=>{
        e.preventDefault()
        setCredentials({...credentials,
            [e.target.name]:e.target.value
        }
        )
    }

    const handleClick=async (e)=>{
        e.preventDefault()
        try {
            console.log(credentials.userEmail)
            console.log(credentials.userPassword)
            let response= await fetch('http://localhost:5000/accountCreation',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  userFirstName:credentials.userFirstName,
                  userLastName:credentials.userLastName,
                  userEmail:credentials.userEmail,
                  userPassword:credentials.userPassword
                })
            })
            let data= await response.json()
            if(!response){
                console.log("something went wrong")
            }
            else if(response.status==400){
                setInvalidCreation(true)
            }
            else setInvalidCreation(false)
            console.log(data)
            
        } catch (error) {
            
        }

    }

    return (
        <div className='accountCreationContainer'>
            <div className='credentialContainer'>
                <form className='credentialForm' onSubmit={handleClick}>
                    <div className='formInput'>
                      <div className='labelContainer'>
                        <label htmlFor='userFirstName'>Votre Prénom :</label>
                      </div>
                      <input
                        id='userFirstName'
                        type='text'
                        name='userFirstName'
                        onChange={handleChange}
                      />
                    </div>
                    <div className='formInput'>
                      <div className='labelContainer'>
                        <label htmlFor='userLastName'>Votre Nom de Famille :</label>
                      </div>
                      <input
                        id='userLastName'
                        type='text'
                        name='userLastName'
                        onChange={handleChange}
                      />
                    </div>                    
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
                            type='password'
                            name='userPassword'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='formInput'>
                        <div className='labelContainer'>
                            <label htmlFor='userPasswordConfirmation'>Répéter votre Mot de Passe :</label>
                        </div>
                        <input
                            id='userPasswordConfirmation'
                            type='password'
                            name='userPasswordConfirmation'
                            onChange={handleChange}
                        />
                    </div>                    
                    <div>
                        <button className='accountCreationButton' >Créer mon Compte</button>
                    </div>
                </form>
            </div>
            {invalidCreation && <p>Ce Compte existe déjà</p>}
            
        </div>
    )
}
