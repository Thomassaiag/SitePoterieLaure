import React from 'react'
import { CollectionElement } from '../components/collectionElement/CollectionElement'
import {Header} from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { UpdateCollectionElement } from '../components/updateCollectionElement/UpdateCollectionElement'
// import { CollectionElementNavigation } from '../components/collectionElementNavigation/CollectionElementNavigation'

export const CollectionElementPage = () => {
  return (
    <div>
        <Header/>
        <CollectionElement/>
        {/* <UpdateElementInformation /> */}
        {/* <CollectionElementNavigation /> */}
        <Footer className='footer'/>
    </div>
  )
}
