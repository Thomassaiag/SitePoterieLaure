import React from 'react'
import { Header } from '../components/header/Header'
import { Footer } from '../components/footer/Footer'
import { FormulaireCreationCollection } from '../components/formulaireCreationCollection/FormulaireCreationCollection'


export const AdminPage = () => {
  return (
    <div>
        <Header/>
        <FormulaireCreationCollection/>
        <Footer/>
    </div>
  )
}
