import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { Collections } from '../components/collections/Collections'

export const CollectionsPage = () => {
  return (
    <div>
        <Header/>
        <Collections/>
        <Footer className='footer'/>
    </div>
  )
}
