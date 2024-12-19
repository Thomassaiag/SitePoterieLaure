import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { CreateCollection } from '../components/createCollection/CreateCollection'
import { AdminHeader } from '../components/adminHeader/AdminHeader'

export const CollectionCreationPage = () => {
  return (
    <div>
        <Header/>
        <AdminHeader/>
        <CreateCollection/>
        <Footer className='footer'/>
    </div>
  )
}
