import React from 'react'
import {Header} from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import {Presentation} from '../components/presentation/Presentation'


export const HomePage = () => {
  return (
    <div>
        <Header/>
        <Presentation/>
        <Footer className='footer'/>
    </div>
  )
}
