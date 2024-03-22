import React, {useState} from 'react'
import './Newsletter.css'

export const Newsletter = () => {

    const[email, setEmail]=useState('')

    const postEmail=async (e)=>{
        e.preventDefault()

        if(!email){
            alert('Merci de fournir un email valide')
            return
        }
        try {
            const response=await fetch('http://localhost:5000/contact',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({email})
            })
            const data= await response.json()
            console.log(data.message)
            if(response.status==400){
                alert('ce mail existe déjà dans notre base, veuillez en renseigner un autre')
                
            }
            
        } catch (err) {
            console.error('probleme', err)
        }

    }

    const handleChange=(e)=>{
        setEmail(e.target.value)
    }    

    
    return (
        <div className='newsLetterContainer'>
            <h1>NewsLetter</h1>
            <p>Pour recevoir la newsletter renseignez votre e-mail ci-dessous.</p>
            <p>La newsletter vous informera de l'ouverture de la boutique, de ma participation aux marchés etc. Elle n'a pas pour vocation d'être un envoi régulier.</p>
            <form className='newsletterForm' onSubmit={postEmail}>
                <input 
                    type='email'
                    className='emailField'
                    placeholder={email ? "":"Entrer votre email"}
                    name='email'
                    value={email}
                    onChange={handleChange}
                    // onClick={(e)=>e.target.value=''}
                />
                <button className='newsletterButton'>Envoyer</button>
            </form>
        </div>
    )
}
