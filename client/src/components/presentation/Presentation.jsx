import React from 'react'
import './Presentation.css'

import {navigationElements} from '../../data/navigationElements.js'
import {HomePageNavigationPicture} from '../homePageNavigationPicture/HomePageNavigationPicture'



export const Presentation = () => {
  return (
    <>
      <div className='presentationPictureContainer'>
        <img className='welcomePagePicture'src="/images/Page acceuil/mainPicture.jpg" alt="presentation"/>
        <div className='presentationTitle'>
          <h1>Créations céramiques utilitaires et décoratives</h1>
          <br/>
          <p>Fabriquées main en Normandie</p>
        </div>
      </div>
      <div className='navigationPicturesContainer'>
        {
          navigationElements.map((navigationElement)=>{
            const {id, picture, picDescription, navigation, buttonName}=navigationElement
            return (
              <div className='navigationElementContainer'>
                <HomePageNavigationPicture 
                  key={id}
                  picture={picture}
                  picDescription={picDescription}
                  navigation={navigation}
                  buttonName={buttonName}
                />
              </div>
            )
          })
        }
      </div>
    </>
  )
}
