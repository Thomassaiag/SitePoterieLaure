import {React, useEffect} from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { useConnectionStatus } from '../../contextProvider/ConnectionStatusContextProvider'

import "./header.css"
import {nanoid} from  'nanoid'
import { laureLogo } from '../../data/logos'


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
        invalidConnection: true,
        invalidToken: false
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
          <img className='logo'src={laureLogo} alt='webSiteLogo'/>
          <div className='titleContainer'>
            <p>Laure Videau</p>
          </div>
      </Link>
      <nav className='headerLinks'>
        {navigationLinks.map(navigationLink=>{
          return (
            <Link key={nanoid()}
              to={navigationLink.pathname}
              className={`nav-link ${location.pathname.startsWith(navigationLink.pathname) ? 'active' : ''}`}
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