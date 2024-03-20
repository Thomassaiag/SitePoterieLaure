import React from 'react'
import { imagesGalerie } from '../../data/imagesGalerie'
import './Galerie.css'



export const Galerie = () => {
  return (
    <div className='picturesContainer'>
        {imagesGalerie.map(image=>{
            return(
                <img key={image.id} src={image.imageUrl} alt={image.imageAlt}/>
            )
        })}
    </div>
  )
}
