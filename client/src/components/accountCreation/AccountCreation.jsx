import {React, useState} from 'react'
import './AccountCreation.css'
const apiUrl=import.meta.env.VITE_API_URL


export const AccountCreation = () => {
const [credentials, setCredentials]=useState({
        userFirstName:'',
        userLastName:'',
        userEmail:'',
        userPassword:'',
        userPasswordConfirmation:''
    })


    const checkPassword=((a,b)=>a===b)

    const [invalidCreation, setInvalidCreation]=useState(false)
    const [buttonClicked, setButtonClicked]=useState(false)

    const handleChange=(e)=>{
        e.preventDefault()
        setCredentials({...credentials,
            [e.target.name]:e.target.value
        })
    }

    const handleClick=async (e)=>{
        e.preventDefault()
        if(!checkPassword(credentials.userPassword, credentials.userPasswordConfirmation)){ 
            userPassword.value=""
            userPasswordConfirmation.value=""
            alert("Vos Mots de passe ne sont pas identiques")
        }
        else{
            try {
                let response= await fetch(`http://${apiUrl}/user/createUserAccount`,{
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
                if(!response){
                    console.log("something went wrong")
                }
                else if(response.status==400){
                    setInvalidCreation(true)
                    userEmail.value=""
                }
                else {
                    let {token, user, message}= await response.json()
                    setInvalidCreation(false)
                    setButtonClicked(true)
                    localStorage.setItem('token',token)
                }
                
            } catch (error) {
                
            }
        }

    }

    return (
        <div className='accountCreationContainer'>
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

            {buttonClicked && invalidCreation && <p>Ce compte existe déjà</p>}
            {buttonClicked && !invalidCreation && <p>Compte créé avec succès !</p>}
            
        </div>
    )
}
