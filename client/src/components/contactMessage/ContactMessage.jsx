import React, {useEffect, useState} from 'react'
import './ContactMessage.css'
import { ContactButton } from '../contactButton/ContactButton'

export const ContactMessage = () => {

    const [emailData, setEmailData]=useState({
        firstName:"",
        lastName:"",
        object:"",
        senderEmail:"",
        senderMessage:"",
    })


    const handleTextChange=(e)=>{
        e.preventDefault()
        setEmailData({...emailData,
            [e.target.name]:e.target.value
        })
    }

    const handleKeyDown=(e)=>{
        if(e.key==='Enter'){
            e.preventDefault()
            setEmailData({...emailData,
                [e.target.name]:e.target.value+'\n'
            })
        }
    }
    useEffect(()=>{
        console.log(emailData.senderMessage)
    },[emailData])


    const sendMessage= async (e)=>{
        e.preventDefault()
        
        try {
            const response=await fetch('http://localhost:5000/contact/message',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName:emailData.firstName,
                    lastName:emailData.lastName,
                    object:emailData.object,
                    senderEmail:emailData.senderEmail,
                    senderMessage:emailData.senderMessage
                })
            })
            const data = await response.json()
            
            if(!response.ok){
                throw new Error('NetWork response was not ok')
            }
            else console.log(data)
        } catch (err) {
            console.error(`Error sending Email => ${err}`)

        }
    }

    return (
        <div className='contactMessageContainer'>
            <div className='contactezMoiContainer'>
                <h1>Contactez Moi</h1>
                <p>Si vous avez des questions n'hésitez pas à me contacter via le formulaire si dessous, je répondrais dans les meilleurs délais.</p> 
                <p>Il est possible que votre question soit déjà abordée dans la FAQ.</p>
            </div>
            <div className='contactFormContainer'>
                <form className='contactForm' onSubmit={sendMessage}>
                    <div className='NameFirstNameContainer'>
                        <label className="nameLabel" for='firstName'>Prénom</label>
                        <input
                            className='name'
                            name='firstName'
                            placeholder='Votre Prénom'
                            onChange={handleTextChange}
                        />
                        <label className="nameLabel" for='lastName'>Nom</label>
                        <input
                            className='name'
                            name='lastName'
                            placeholder='Votre Nom'
                            onChange={handleTextChange}
                        />
                    </div>
                    <div className='emailContainer'>
                        <label for='senderEmail'>Adresse Email</label>
                        <input
                            className='senderEmail'
                            name='senderEmail'
                            placeholder='Adresse email'
                            onChange={handleTextChange}
                        />
                    </div>
                    <div className='objectContainer'>
                        <label for='object'>Objet du Message</label>
                        <input
                            className='object'
                            name='object'
                            placeholder='Objet du Message'
                            onChange={handleTextChange}
                        />
                    </div>
                    <div className='messageContainer'>
                        <label className= "messageLabel"for='senderMessage'>Message</label>
                        <textarea
                            value={emailData.senderMessage}
                            className='senderMessage'
                            name='senderMessage'
                            placeholder='Message'
                            onChange={handleTextChange}
                            onKeyDown={handleKeyDown}
                        />
                    <div className='buttonContainer'>
                        <ContactButton/>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
