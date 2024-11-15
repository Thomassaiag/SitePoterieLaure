import React from 'react'
import './ScrollToTop.css'
import { scrollUp } from '../../data/logos'

export const ScrollToTop = () => {

    const handleClick=()=>{
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }

  return (
    <div className='scrollToTopContainer'>
        <img src={scrollUp} alt='scroll-up'onClick={handleClick}/>
    </div>
  )
}
