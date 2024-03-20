import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { Contact } from '../components/contact/Contact'

export const ContactPage = () => {
  return (
    <div className='contactPageContainer'>
        <Header/>
        <Contact/>
        <Footer className='footer'/>
    </div>
  )
}
