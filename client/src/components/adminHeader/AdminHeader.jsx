import React from 'react'
import './Adminheader.css'
import { Link } from 'react-router-dom'


export const AdminHeader = () => {
  return (
    <div className='adminHeaderContainer'>
        <Link to='/admin/creationcollection'>Création Collecton</Link>
        <Link to='admin/creationelementcollection'>Creation Element de collection</Link>
    </div>
  )
}
