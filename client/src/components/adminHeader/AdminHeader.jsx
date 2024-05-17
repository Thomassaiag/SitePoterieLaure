import React from 'react'
import './Adminheader.css'
import { Link } from 'react-router-dom'


export const AdminHeader = () => {
  return (
    <div className='adminHeaderContainer'>
        <Link to='/admin/creationcollection'>Création Collecton</Link>
        <Link to='/collections'>Effacer/Mettre à jour Une collection</Link>
    </div>
  )
}
