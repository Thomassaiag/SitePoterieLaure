
import './App.css'
import {Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CollectionsPage } from './pages/CollectionsPage'
import { GaleriePage } from './pages/GaleriePage'
import { PortraitPage } from './pages/PortraitPage'
import { CollectionElementPage } from './pages/CollectionElementPage'
import { AdminPage } from './pages/AdminPage'
import { ContactPage } from './pages/ContactPage'
import { ConnectionPage } from './pages/ConnectionPage'
import { AccountCreationPage } from './pages/AccountCreationPage'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/collections' element={<CollectionsPage/>}/>
        <Route path='/galerie' element={<GaleriePage/>}/>
        <Route path='/portrait' element={<PortraitPage/>}/>
        <Route path='/collections/:id' element={<CollectionElementPage/>}/>
        <Route path='/contact/' element={<ContactPage/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/admin/creationcollection' element={<AdminPage/>}/>
        <Route path='connection/' element={<ConnectionPage/>}/>
        <Route path='/accountCreation' element={<AccountCreationPage/>}/>
      </Routes>
    </>
  )
  }

export default App