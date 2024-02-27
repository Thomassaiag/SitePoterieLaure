import React from 'react'
import { Description } from '../Description'
import { portraitText } from '../../data/portraitText'
import './Portrait.css'
const logo  ='../../images/logoLaureSansNom.jpg'
const imageLeft='../../images/poteriePresentation.jpg'

export const Portrait= () => {
  return (
    <div className="portraitContainer">
      <div className='titleContainer'>
        <p className='TextTitle'>VL Céramique - Hand made by Laure</p>
      </div>
        <div className='presentationContainer'>
          <div>
            <img className='presentationPicture' src={imageLeft} alt="image" />
          </div>
          <div className='presentationContainerRight'>
            <p><Description descriptionText={portraitText}/></p>
            <img src={logo} alt="logo"/>
          </div>
        </div>
    </div>
  )
}
