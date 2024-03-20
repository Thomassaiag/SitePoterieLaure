import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import {Portrait} from '../components/portrait/Portrait'

export const PortraitPage = () => {
  return (
    <div className="portraitPage_Class">
        <Header/>
        <Portrait/>
        <Footer className='footer'/>
    </div>
  )
}
