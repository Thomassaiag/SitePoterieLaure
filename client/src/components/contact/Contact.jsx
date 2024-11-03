import React from 'react'
import './Contact.css'
import { Newsletter } from '../newsletter/Newsletter'
import { ContactMessage } from '../contactMessage/ContactMessage'
import { ScrollToTop } from '../scrollToTop/ScrollToTop'


const logoInstragram='/images/logoInstagram.jpg'
const logoFacebook='/images/logoFacebook.jpg'




export const Contact = ({locationHash}) => {
  return (
    <div className='contactContainer'>
      <div className='socialMediaContainer'>
        <h1>Retrouvez VL Céramique sur instagram et Facebook</h1>
        <div className='socialMediaLogosContainer'>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"> 
            <img src={logoInstragram} alt='logo Instagram' />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> 
            <img src={logoFacebook} alt='logo Facebook' />
          </a>
        </div>
      </div>
      <Newsletter/>
      <ContactMessage id='contactMessage'locationHash={locationHash}/>

    </div>
  )
}
