import React from 'react'
import './ScrollToTop.css'

export const ScrollToTop = () => {

    const handleClick=()=>{
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }

  return (
    <div className='scrollToTopContainer'>
        <img src='/images/upChevron.jpg' alt='scroll-up'onClick={handleClick}/>
    </div>
  )
}
