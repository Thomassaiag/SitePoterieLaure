import React from 'react'
import "./footer.css"
import { ScrollToTop } from '../scrollToTop/ScrollToTop'


let copyrightYear=2023
let instagramLogo="../../images/logoInstagram.jpg"
let facebookLogo="../../images/logoFacebook.jpg"
let mailLogo="../../images/LogoEmail.jpg"

export const Footer = () => {
  return (
    <div className='footerContainer'>
    <ScrollToTop/>
    <footer className='footer_Class'>
      <span className='footerImageSpan_Class'>
          <img className='instagramLogo_Class'src={instagramLogo} alt="instagram"></img>
          <img className='facebookLogo_Class'src={facebookLogo} alt="facebook"></img>
          <img className='mailLogo_Class'src={mailLogo} alt="mail"></img>
      </span>
      <span className='footerTextSpan_Class'>
          <p>Condition Générales de Vente</p>
          <p>/</p>
          <p>Mentions Légales</p>
          <p>/</p>
          <p>Emballages et Livraisons</p>
          <p>/</p>
          <p>Confidentialité</p>
      </span>
      <p>@VL Céramique {copyrightYear}. Powered by Tom</p>
    </footer>
    </div>
  )
}
