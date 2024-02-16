import React from 'react'

export const PresentationElement = ({imageUrl, imageAlt, text}) => {
    return (
    <div>
        <img src={imageUrl} alt= {imageAlt}/>
        <p>{text}</p>
        </div>
    )
}











