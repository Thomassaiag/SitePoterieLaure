import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"


const logoLaureSansNom = '../../images/logoLaureSansNom.jpg'

export const Header = () => {
  return (
    <div className='headerContainer'>
      <div className='buttonContainer'>
        <button className='connectionButton'>Se Connecter</button>
      </div>
      <Link className='logoAndTitleContainer'to='/'>
          <img className='logo'src={logoLaureSansNom} alt='webSiteLogo'/>
          <div className='titleContainer'>
            <p>Laure Videau</p>
          </div>
      </Link>
      <div className='headerLinks'>
        <Link to='/collections'>collections</Link>
        <Link to=''>boutique</Link>
        <Link to='/galerie'>galerie</Link>
        <Link to='/portrait'>portrait</Link>
        <Link to=''>blog</Link>
        <Link to='/contact'>contact</Link>
        <Link to='/admin'>admin</Link>
      </div>
      <hr className='collectionsSeparator'></hr>
    </div>
  )
}