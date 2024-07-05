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
    const updatePortrait=()=>{
        return
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
