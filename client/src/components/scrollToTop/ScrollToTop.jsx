import React from 'react'

export const ScrollToTop = () => {

    const handleClick=()=>{
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }

  return (
    <div>
        <img src='/images/upChevron.jpg' alt='scroll-up'onClick={handleClick}/>
    </div>
  )
}
