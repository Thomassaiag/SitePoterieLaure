import React,{useEffect} from 'react'
import { imagesGalerie } from '../../data/imagesGalerie'
import './Galerie.css'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'



export const Galerie = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

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
