import {React, useEffect} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import "./header.css"
import { useConnectionStatus } from '../contextProvider/ConnectionStatusContextProvider'


const logoLaureSansNom = '../../images/logoLaureSansNom.jpg'

export const Header = () => {
  let navigate=useNavigate()
  let location=useLocation()

  const navigationLinks=[
    {link:'collections',
      pathname:'/collections'
    },
    {link:'galerie',
      pathname:'/galerie'
    },
    {link:'portrait',
      pathname:'/portrait'
    },
    {link:'contact',
      pathname:'/contact'
    },
  ]


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
        {navigationLinks.map(navigationLink=>{
          return (
            <Link 
              to={navigationLink.pathname}
              className={`nav-link ${location.pathname === navigationLink.pathname ? 'active' : ''}`}
            >
              {navigationLink.link}
            </Link>
          )
          
        })}
        {connectionAttributes.adminConnection && <Link 
          to='/admin'
          className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            admin
          </Link>
        }
      </nav>      
      <div className='collectionsSeparatorContainer'>
        <hr className='collectionsSeparator'></hr>
      </div>
    </div>
  )
}