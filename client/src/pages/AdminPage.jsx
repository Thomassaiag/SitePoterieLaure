import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { CollectionCreation } from '../components/collectionCreation/CollectionCreation'
import { AdminHeader } from '../components/adminHeader/AdminHeader'


export const AdminPage = () => {
  return (
    <div>
        <Header/>
        <AdminHeader/>
        <CollectionCreation/>
        <Footer className='footer'/>
    </div>
  )
}
