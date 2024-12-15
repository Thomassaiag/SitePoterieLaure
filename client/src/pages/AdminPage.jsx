import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { AdminHeader } from '../components/adminHeader/AdminHeader'

export const AdminPage = () => {
  return (
    <div>
        <Header/>
        <AdminHeader/>
        <Footer className='footer'/>
    </div>
  )
}
