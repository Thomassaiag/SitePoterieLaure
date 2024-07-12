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
    const handleSubmit=async()=>{
        try {
            let response=await fetch('http://localhost:5000/admin/udpatePortrait',{
                method:'PUT',
                headers:'',
                body:JSON.stringify({
                    portraitText:portraitTextInput
                })
            })
            if(!response.ok){
                console.log("Portrait text couldn\' be updated")
            }
        } catch (error) {
            
        }
        
    }

    return (
        <form className='UpdatePortraitContainer' onSubmit={handleSubmit}>
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
