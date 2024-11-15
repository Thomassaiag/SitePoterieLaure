import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./footer.css"
import { ScrollToTop } from '../scrollToTop/ScrollToTop'


let copyrightYear=new Date().getFullYear()
import {logoInstagram} from  '../../data/logos'
import {logoFacebook} from '../../data/logos'
import {logoEmail} from '../../data/logos'


export const Footer = () => {

  let navigate=useNavigate()

  const handleClick=(e)=>{
    e.preventDefault(e)
    navigate('/contact#contactMessage')
  }


  return (
    <div className='footerWithScrollContainer'>
      <ScrollToTop/>
      <div className='footerContainer'>
        <div className='footerLogoContainer'>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"> 
            <img src={logoInstagram} alt="instagram"></img>
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">     
            <img src={logoFacebook} alt="facebook"></img>
          </a>
            <img src={logoEmail} alt="mail" onClick={handleClick}></img>
        </div>
        <div className='footerTextContainer'>
            <p>Condition Générales de Vente</p>
            <p>/</p>
            <p>Mentions Légales</p>
            <p>/</p>
            <p>Emballages et Livraisons</p>
            <p>/</p>
            <p>Confidentialité</p>
        </div>
        <div className='footerCopyright'>
          <p>@VL Céramique {copyrightYear}. Powered by Tom</p>
        </div>
      </div>
    </div>
  )
}
