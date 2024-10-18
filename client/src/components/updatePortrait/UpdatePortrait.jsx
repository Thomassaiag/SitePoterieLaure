import React, { useState } from 'react'
import './UpdatePortrait.css'
import { NewPicture } from '../newPicture/NewPicture'

export const UpdatePortrait = ({portraitTextProp}) => {
    const [newPortraitText, setPortraitText]=useState({
        portraitTextInput:portraitTextProp
    })
    
    const handleChange=(e)=>{
        e.preventDefault()
        setPortraitText(prevPortraitText=>({
            ...prevPortraitText,
            [e.target.name]:e.target.value
        }))
    }
    const updatePortrait=async()=>{
        try {
            //TODO: create update fetch request to DB
            const response= await fetch('http://localhost/admin/portrait')
            const jsonData=response.json()
            console.log(jsonData)
        } catch (err) {
            console.log('message couldn\'t be updated',err)
        }
    }

    return (
        <form className='UpdatePortraitContainer' onSubmit={updatePortrait}>
            <NewPicture/>
            <textarea
                name='portraitTextInput'
                value={newPortraitText.portraitTextInput}
                placeholder={newPortraitText.portraitTextInput}
                onChange={handleChange}
            >    
            </textarea>
            <button className='' >Mettre à jour le portrait</button>
        </form>
        
    )
}
