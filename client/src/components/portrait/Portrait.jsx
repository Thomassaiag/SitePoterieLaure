import React from 'react'
import { Description } from '../description/Description'
import { portraitText } from '../../data/portraitText'
import './Portrait.css'
const logo  ='../../images/logoLaureSansNom.jpg'
const imageLeft='../../images/poteriePresentation.jpg'

export const Portrait= () => {
  return (
    <div className="portraitContainer">
      <div className='titleContainer'>
        <p className='titleText'>VL Céramique - Hand made by Laure</p>
      </div>
        <div className='presentationContainer'>
          <div className='presentationPictureContainer'>
            <img className='presentationPicture' src={imageLeft} alt="image" />
          </div>
          <div className='presentationContainerRight'>
            <Description descriptionText={portraitText}/>
            <br/>
            <img src={logo} alt="logo"/>
          </div>
        </div>
    </div>
  )
}
