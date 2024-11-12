import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { Contact } from '../components/contact/Contact'



export const ContactPage = () => {

  let location=useLocation()
  return (
    <div className='contactPageContainer'>
        <Header/>
        <Contact locationHash={location.hash}/>
        <Footer className='footer'/>
    </div>
  )
}
