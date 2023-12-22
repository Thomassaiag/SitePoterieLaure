import React from 'react'

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
        <a href=''>Collections</a>
        <a href=''>Boutique</a>
        <a href=''>Galerie</a>
        <a href=''>Blog</a>
        <a href=''>Contact</a>
      </span>


    </div>
  )
}