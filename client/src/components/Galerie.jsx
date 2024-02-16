import React from 'react'
import { imagesGalerie } from '../data/imagesGalerie'



export const Galerie = () => {
  return (
    <span className='galerieSpan_Class'>
        {imagesGalerie.map(image=>{
            return(
                <img key={image.id} src={image.imageUrl} alt={image.imageAlt}/>
            )
        })}
    </span>
  )
}
