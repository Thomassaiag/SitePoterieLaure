import React from 'react'
import './Presentation.css'

import {navigationElements} from '../../data/navigationElements.js'
import {HomePageNavigationPicture} from '../homePageNavigationPicture/HomePageNavigationPicture'



export const Presentation = () => {
  return (
    <div className='presentationMainContainer'>
      <div className='presentationPictureContainer'>
          <h1>Créations céramiques utilitaires et décoratives</h1>
          <br/>
          <p>Fabriquées main en Normandie</p>
      </div>
      <div className='navigationPicturesContainer'>
        {
          navigationElements.map((navigationElement)=>{
            const {id, picture, picDescription, navigation, buttonName}=navigationElement
            return (
              // <div className='navigationElementContainer' key={id}>
                <HomePageNavigationPicture className='navigationElementContainer' key={id}
                  picture={picture}
                  picDescription={picDescription}
                  navigation={navigation}
                  buttonName={buttonName}
                />
              /* </div> */
            )
          })
        }
      </div>
    </div>
  )
}
