import React from 'react'

export const CollectionMainPicture = ({imageUrlPicture, imageAltPicture}) => {
    return (
        <div>
            <img src={imageUrlPicture} alt={imageAltPicture}/>
        </div>
    )
}
