import React,{useEffect} from 'react'
import { imagesGalerie } from '../../data/imagesGalerie'
import './Galerie.css'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'



export const Galerie = () => {

  const midIndex= Math.ceil(imagesGalerie.length/2)
  const column1=imagesGalerie.slice(0,midIndex)
  const column2=imagesGalerie.slice(midIndex)

  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div className='galerieContainer'>
      <div className='picturesContainer'>
        <div className='pictureContainerColumn'>
          {column1.map(image=>{
            return(
              <img key={image.id} src={image.imageUrl} alt={image.imageAlt}/>
            )
          })}
        </div>
        <div className='pictureContainerColumn'>
          {column2.map(image=>{
            return(
              <img key={image.id} src={image.imageUrl} alt={image.imageAlt}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}
