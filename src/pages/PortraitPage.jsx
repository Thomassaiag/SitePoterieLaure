import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import {Portrait} from '../components/Portrait'

export const PortraitPage = () => {
  return (
    <div className="portraitPage_Class">
        <Header/>
        <Portrait/>
        <Footer/>
    </div>
  )
}
