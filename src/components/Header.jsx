import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div>
      <button className='connectionButton_Class'>Se Connecter</button>
      <div className='textImageContainer_class'>
        <div className='titleDiv_Class'>
          <p className='nameTitle_Class'>Laure Videau</p>
          <p className='subTitle_Class'>céramique</p>
        </div>
        <img className='webSiteLogo_Class'src="" alt='webSiteLogo'/>
      </div>
      <span className='links_Class'>
        <Link to='/collections'>Collections</Link>
        <Link to='/boutique'>Boutique</Link>
        <Link to=''>Galerie</Link>
        <Link to=''>Blog</Link>
        <Link to=''>Contact</Link>
      </span>


    </div>
  )
}