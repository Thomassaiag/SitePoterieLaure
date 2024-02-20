import React from 'react'
import { CollectionItem } from '../components/CollectionItem'
import {Header} from '../components/header/Header'
import { Footer } from '../components/Footer'

export const CollectionItemPage = () => {
  return (
    <div>
        <Header/>
        <CollectionItem/>
        <Footer/>
    </div>
  )
}
