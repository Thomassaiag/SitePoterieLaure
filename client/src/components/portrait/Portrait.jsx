import React, {useEffect} from 'react'
import { Description } from '../description/Description'
import { portraitText } from '../../data/portraitText'
import './Portrait.css'
import { UpdatePortrait } from '../updatePortrait/UpdatePortrait'
const logo  ='../../images/logoLaureSansNom.jpg'
const imageLeft='../../images/poteriePresentation.jpg'

export const Portrait= () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <>
    <div className="portraitContainer">
      <p className='titleText'>VL Céramique - Hand made by Laure</p>
      <div className='presentationContainer'>
        <div className='presentationPictureContainer'>
          <img className='presentationPicture' src={imageLeft} alt="image" />
        </div>
        <div className='presentationContainerRight'>
          <Description descriptionText={portraitText}/>
          <img src={logo} alt="logo"/>
        </div>
      </div>
    </div>
    <UpdatePortrait portraitTextProp={portraitText} />
    </>
  )
}
