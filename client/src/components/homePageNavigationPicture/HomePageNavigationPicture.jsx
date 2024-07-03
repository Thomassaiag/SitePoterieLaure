import React from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePageNavigationPicture.css'


export const HomePageNavigationPicture = ({picture, alt, navigation, buttonName}) => {

  let navigate=useNavigate()

  const handleClick=(e)=>{
    e.preventDefault(e)
    navigate(navigation)
  }

  return (
    <div className='pictureContainer'>
      <img src={picture} alt={alt}/>
      <div className='navigationButtonContainer'>
        <button className='navigationButton' onClick={handleClick}>{buttonName}</button>
      </div>
    </div>
  )
}