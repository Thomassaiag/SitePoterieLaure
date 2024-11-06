import {React, useEffect} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import "./header.css"
import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'


const logoLaureSansNom = '../../images/logoLaureSansNom.jpg'

export const Header = () => {
  let navigate=useNavigate()
  let location=useLocation()


  const {connectionAttributes, setConnectionAttributes}=useConnectionStatus()

  const navigateToConnection=()=>{
    navigate('/connection')
  }


  const navigateToHomePage=()=>{
    navigate('/')
  }

  
  const handleDisconnection=()=>{
    localStorage.clear()
    setConnectionAttributes(prevConnectionAttributes=>({
      ...prevConnectionAttributes,
        adminConnection:false,
        connectedUserFirstName:'',
        invalidConnection: true
    }))
    navigateToHomePage()
  }


  useEffect(()=>{
    console.log(`connectionAttributes => ${connectionAttributes.invalidConnection}`)
  },[connectionAttributes])

  return (
    <div className='headerContainer'>
      <div className='buttonContainer'>
        {connectionAttributes.invalidConnection && <button className='connectionButton' onClick={navigateToConnection}>Se Connecter</button>}
        {!connectionAttributes.invalidConnection && 
          <>
            <p>Bonjour, {connectionAttributes.connectedUserFirstName}</p>
            <button className='connectionButton' onClick={handleDisconnection}>Se Déconnecter</button>
          </>
        }
      </div>
      <Link className='logoAndTitleContainer'to='/'>
          <img className='logo'src={logoLaureSansNom} alt='webSiteLogo'/>
          <div className='titleContainer'>
            <p>Laure Videau</p>
          </div>
      </Link>

      <nav className='headerLinks'>
        <Link 
          to='/collections'
          className={`nav-link ${location.pathname === '/collections' ? 'active' : ''}`}
        >
          collections
        </Link>
        {/* <Link to=''>boutique</Link> */}
        <Link 
          to='/galerie'
          className={`nav-link ${location.pathname==='/galerie' ? 'active' : ''}`}
        >
          galerie
        </Link>
        <Link
          to='/portrait'
          className={`nav-link ${location.pathname==='/portrait' ? 'active' : ''}`}
          >
            portrait
          </Link>
        {/* <Link to=''>blog</Link> */}
        <Link
          to='/contact'
          className={`nav-link ${location.pathname==='/contact' ? 'active' : ''}`}
          >
            contact
        </Link>
        {connectionAttributes.adminConnection && <Link to='/admin'>admin</Link>}
      </nav>
      
      <div className='collectionsSeparatorContainer'>
        <hr className='collectionsSeparator'></hr>
      </div>
    </div>
  )
}