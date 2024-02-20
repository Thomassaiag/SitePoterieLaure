
// import './App.css'
import {Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { CollectionsPage } from './pages/CollectionsPage'
import { GaleriePage } from './pages/GaleriePage'
import { PortraitPage } from './pages/PortraitPage'
import { CollectionItemPage } from './pages/CollectionItemPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/collections' element={<CollectionsPage/>}/>
        <Route path='/galerie' element={<GaleriePage/>}/>
        <Route path='/portrait' element={<PortraitPage/>}/>
        <Route path='/collections/:id' element={<CollectionItemPage/>}/>
      </Routes>
    </>
  )
  }

export default App