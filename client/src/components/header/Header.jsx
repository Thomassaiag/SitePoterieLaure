import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./header.css"

const logoLaureSansNom = '../../images/logoLaureSansNom.jpg'

export const Header = () => {
  let navigate=useNavigate()

  const navigateToConnection=()=>{
    navigate('/connection')
  }

  return (
    <div className='headerContainer'>
      <div className='buttonContainer'>
        <button className='connectionButton' onClick={navigateToConnection}>Se Connecter</button>
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
      <div className='collectionsSeparatorContainer'>
        <hr className='collectionsSeparator'></hr>
      </div>
    </div>
  )
}