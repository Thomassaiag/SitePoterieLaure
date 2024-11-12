import React, { useEffect, useState } from 'react'
import './UpdatePortrait.css'
const apiUrl=import.meta.env.VITE_API_URL

export const UpdatePortrait = ({portraitTextProp, fetchPortraitInformation}) => {


    const [newPortraitText, setNewPortraitText]=useState({
        portraitTextInput:portraitTextProp
    })


    useEffect(()=>{
        console.log(newPortraitText.portraitTextInput)
    },[])

    const [newPortraitData, setNewPortraitData]=useState(new FormData())

    const handleChange=(e)=>{
        e.preventDefault()
        setNewPortraitText(prevPortraitText=>({
            ...prevPortraitText,
            [e.target.name]:e.target.value
        }))
    }

    const handleFileChange=(e)=>{
        e.preventDefault();
        newPortraitData.set('portraitPictureFile',e.target.files[0])
        setNewPortraitData(newPortraitData)
    }

    const updatePortrait=async(e)=>{
        e.preventDefault();
        const portraitPicture=newPortraitData.get("portraitPictureFile")
        newPortraitData.set('portraitText',newPortraitText.portraitTextInput)
        const portraitText=newPortraitData.get("portraitText")

        if(!portraitPicture){
            if(!confirm("Vous ne mettez pas à jour l'image")){
                return
            } else {
                try {
                    const response= await fetch(`http://${apiUrl}/admin/updatePortraitText`,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            portraitText:portraitText
                        })
                    })
                    if(response.ok){
                        fetchPortraitInformation()
                    } else if (response.status===404){
                        console.error('The element you were trying to update wasn\'t found')
                        alert("L\'element à mettre à jour n'a pas été trouvé")
                    } else {
                        console.error(`Erreur : ${response.status}`)
                    }
                } catch (err) {
                    console.log('message couldn\'t be updated',err)
                }
            }
        } else {
            try {
                console.log("all portrait change")
                const response= await fetch(`http://${apiUrl}/admin/updatePortrait`,{
                    method: 'PUT',
                    body:newPortraitData
                })
                if(response.ok){
                    fetchPortraitInformation()
                } else if (response.status===404){
                    console.error('The element you were trying to update wasn\'t found')
                    alert("L\'element à mettre à jour n'a pas été trouvé")
                } else {
                    console.error(`Erreur : ${response.status}`)
                }
            } catch (err) {
                console.log('message couldn\'t be updated',err)
            }
        }

    }

    return (
        <form className='UpdatePortraitContainer' onSubmit={updatePortrait}>
            <div className='portraitPictureUpdate'>
                <label htmlFor='portraitPicture'>Image pour le Portrait : </label> 
                <input
                    id='portraitPicture'
                    type='file'
                    name='portraitPicture'
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
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
