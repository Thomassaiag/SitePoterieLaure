import React from 'react'

let copyrightYear=2023

export const Footer = () => {
  return (
    <footer className='footerClass'>
        <span className='footerImageSpan_Class'>
            <img href="" alt="instagram"></img>
            <img href="" alt="facebook"></img>
            <img href="" alt="instagram"></img>
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
  )
}
