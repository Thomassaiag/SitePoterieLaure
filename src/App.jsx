
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Collections } from './components/Collections'
import { Presentation } from './components/Presentation'

function App() {
  return (
    <>
      <Header/>
      <Presentation/>
      <Collections/>
      <Footer/>
    </>
  )
  }

export default App