import React from 'react'
import { AccountCreation } from '../components/accountCreation/AccountCreation'
import {Header} from '../components/header/Header'
import {Footer} from '../components/footer/Footer'

export const AccountCreationPage = () => {
  return (
    <div>AccountCreation
        <Header/>
        <AccountCreation/>
        <Footer/>
    </div>
  )
}
