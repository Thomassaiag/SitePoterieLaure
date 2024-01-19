import React from 'react'
import { Collection } from './Collection'
import {collections} from '../data/collections'
import { Link } from 'react-router-dom'


export const Collections = () => {
  return (
    <div className='collectionContainer_Class'>
        <p className='collectionsTitle_Class'>Ici vous trouverez mes collections passées et actuelles</p>
        <br/>
        <p>Certaines ne sont plus en vente mais vous donneront un aperçu de mon approche artistique, mon univers. </p>
        <div className='collections_Class'>
            {
                collections.map((collection)=>
                    {
                        return (
                          <Link to='/collections/{collection.id}' key={collection.id}>
                            <Collection
                                imageUrl={collection.imageUrl} 
                                title={collection.title} 
                                imageAlt={collection.imageAlt}/>
                          </Link>)
                    })
            }
        </div>   
    </div>
  )
}
