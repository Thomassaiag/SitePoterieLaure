import React from 'react'
import './Presentation.css'

import {navigationElements} from '../../data/navigationElements.js'
import {HomePageNavigationPicture} from '../homePageNavigationPicture/HomePageNavigationPicture'



export const Presentation = () => {
  return (
    <>
      <div className='presentationPictureContainer'>
        <img className='welcomePagePicture'src="/images/Page acceuil/mainPicture.jpg" alt="presentation"/>
        <div>
          <p>Créations céramiques utilitaires et décoratives</p>
          <br/>
          <p>Fabriquées main en Normandie</p>
        </div>
      </div>
      <div className='imageContainer'>
        {
          navigationElements.map((navigationElement)=>{
            const {id, picture, picDescription, navigation, buttonName}=navigationElement
            return (
              <HomePageNavigationPicture 
                key={id}
                picture={picture}
                picDescription={picDescription}
                navigation={navigation}
                buttonName={buttonName}
              />
            )
          })
        }
      </div>
    </>
  )
}
