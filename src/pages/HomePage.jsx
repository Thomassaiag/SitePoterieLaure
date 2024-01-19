import React from 'react'
import {Header} from '../components/Header'
import { Footer } from '../components/Footer'
import {Presentation} from '../components/Presentation'


export const HomePage = () => {
  return (
    <div>
        <Header/>
        <Presentation/>
        <Footer/>
    </div>
  )
}
