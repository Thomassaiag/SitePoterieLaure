import React from 'react'
import './Presentation.css'

import image1 from '/images/Collections/porcelaine.jpg'
import image2 from '/images/Collections/terracota.jpg'
import image3 from '/images/Collections/terremoto.jpg'

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
      <img src={image1} alt='image1' />
      <img src={image2} alt='image2' />
      <img src={image3} alt='image2' />
    </div>
    </>
  )
}
