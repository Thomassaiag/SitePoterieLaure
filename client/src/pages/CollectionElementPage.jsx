import React from 'react'
import { CollectionElement } from '../components/collectionElement/CollectionElement'
import {Header} from '../components/header/Header'
import { Footer } from '../components/footer/Footer'

export const CollectionElementPage = () => {
  return (
    <div>
        <Header/>
        <CollectionElement/>
        <Footer/>
    </div>
  )
}
