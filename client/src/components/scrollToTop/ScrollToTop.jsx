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
        <button onClick={handleClick}>Scroll to Top</button>
    </div>
  )
}
