import React, {useEffect, useState} from 'react'
import './ContactMessage.css'
import { ContactButton } from '../contactButton/ContactButton'

export const ContactMessage = ({locationHash}) => {

    const [emailData, setEmailData]=useState({
        firstName:"",
        lastName:"",
        object:"",
        senderEmail:"",
        senderMessage:"",
    })

    const [messageSent, setMessageSent]=useState(false)
    const [messageSentIssue, setMessageSentIssue]=useState(false)

    const handleTextChange=(e)=>{
        e.preventDefault()
        setMessageSent(false)
        setMessageSentIssue(false)
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
        if(locationHash){
            let sectionid=locationHash.replace("#","")
            const scrollToSection=()=>{
                let section=document.getElementById(sectionid)
                if(section){
                    section.scrollIntoView({behavior:"smooth",block:'start'})
                }
            }
            scrollToSection()
        } else {
            window.scrollTo({top:0, behavior: "smooth"})
        }
    },[locationHash])

    const sendMessage= async (e)=>{
        e.preventDefault()
        setMessageSent(false)
        setMessageSentIssue(false)
        console.log(emailData)
        try {
            const response=await fetch('http://localhost:14001/contact/message',{
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
                setMessageSentIssue(true)
                throw new Error('NetWork response was not ok')
            }
            else setMessageSent(true)
        } catch (err) {
            console.error(`Error sending Email => ${err}`)
            setMessageSentIssue(true)

        }
    }

    return (
        <div className='contactMessageContainer'>
            <div className='contactezMoiContainer'>
                <h1>Contactez moi</h1>
                <p>Si vous avez des questions n'hésitez pas à me contacter via le formulaire si dessous, je répondrais dans les meilleurs délais.</p> 
                <p>Il est possible que votre question soit déjà abordée dans la FAQ.</p>
            </div>
            <div className='contactFormContainer'>
                <form className='contactForm' onSubmit={sendMessage}>
                    <div className='nameFirstNameContainer'>
                        <div className='nameContainer'>
                            <label className="nameLabel" htmlFor='firstName'>Prénom</label>
                            <input
                                id='firstName'
                                className='name'
                                name='firstName'
                                placeholder='Votre Prénom'
                                onChange={handleTextChange}
                                required
                                />
                        </div>
                        <div className='nameContainer'>
                            <label className="nameLabel" htmlFor='lastName'>Nom</label>
                            <input
                                id='lastName'
                                className='name'
                                name='lastName'
                                placeholder='Votre Nom'
                                onChange={handleTextChange}
                                required
                                />
                        </div>
                    </div>
                    <div className='emailContainer'>
                        <label htmlFor='senderEmail'>Adresse Email</label>
                        <input
                            type='email'
                            id='senderEmail'
                            className='senderEmail'
                            name='senderEmail'
                            placeholder='Adresse email'
                            onChange={handleTextChange}
                            required
                        />
                    </div>
                    <div className='objectContainer'>
                        <label htmlFor='object'>Objet du Message</label>
                        <input
                            id='object'
                            className='object'
                            name='object'
                            placeholder='Objet du Message'
                            onChange={handleTextChange}
                            required
                        />
                    </div>
                    <div className='messageContainer'>
                        <label className= "messageLabel" htmlFor='senderMessage'>Message</label>
                        <textarea
                            id='senderMessage'
                            value={emailData.senderMessage}
                            className='senderMessage'
                            name='senderMessage'
                            placeholder='Message'
                            onChange={handleTextChange}
                            onKeyDown={handleKeyDown}
                            required
                        />
                    <div className='buttonContainer'>
                        <ContactButton/>
                    </div>
                    </div>
                </form>
            </div>
            {messageSent && <p>Votre message a bien été envoyé</p>}
            {messageSentIssue && <p>Votre message n'a pas été envoyé</p>}
        </div>
    )
}
