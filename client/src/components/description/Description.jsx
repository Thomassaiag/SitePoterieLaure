import React from 'react'
import './Description.css'

export const Description = ({descriptionText}) => {
  return (
    <p style={{textAlign:'justify'}}>
        {descriptionText.split('\n').map((line, index)=>{
          return(
            <React.Fragment key={index}>
              {line}<br/>
            </React.Fragment>
          )
        })}
    </p>
  )
}
