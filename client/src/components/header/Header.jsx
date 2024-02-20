import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"


const logoLaureSansNom = '../../images/logoLaureSansNom.jpg'

export const Header = () => {
  return (
    <div className='headerDiv_Class'>
      <div className='headerButtonDiv_Class'>
        <button className='connectionButton_Class'>Se Connecter</button>
      </div>
      <div className='headerLogoDiv_Class'>  
        <Link to='/'>
            <span className='headerNameTitle_Class'>Laure Videau</span>
            <div className='headerTitleDiv_Class'>
              <img className='headerWebSiteLogo_Class'src={logoLaureSansNom} alt='webSiteLogo'/>
            </div>
        </Link>
      </div>
      <div className='headerLinks_Class'>
        <Link to='/collections'>Collections</Link>
        <Link to=''>Boutique</Link>
        <Link to='/galerie'>Galerie</Link>
        <Link to='/portrait'>Portrait</Link>
        <Link to=''>Blog</Link>
        <Link to=''>Contact</Link>
      </div>
    </div>
  )
}