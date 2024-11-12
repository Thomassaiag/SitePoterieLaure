import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { Galerie } from '../components/galerie/Galerie'

export const GaleriePage = () => {
  return (
    <div>
        <Header/>
        <Galerie/>
        <Footer className='footer'/>
    </div>

  )
}
