import React from 'react'
import './Adminheader.css'
import { Link } from 'react-router-dom'


export const AdminHeader = () => {

  // const [createCollectionClicked, setCreateCollectionClicked]=useState(false)

  return (
    <div className='adminHeaderContainer'>
        <Link to='/admin/collectionCreation'>Création Collection</Link>
        <Link to='/collections'>Effacer/Mettre à jour Une collection</Link>
    </div>
  )
}
