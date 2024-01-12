import React from 'react'
import { Collection } from './Collection'
import {collections} from '../data/collections'
import {nanoid} from 'nanoid'

export const Collections = () => {
  return (
    <div>
        <p className='collectionsClass'>Ici vous trouverez mes collections passées et actuelles</p>
        <br/>
        <p>Certaines ne sont plus en vente mais vous donneront un aperçu de mon approche artistique, mon univers. </p>
        <div className='collectionsClassName'>
            {
                collections.map((collection)=>
                    {
                        return <Collection
                            key={nanoid()} 
                            imageUrl={collection.imageUrl} 
                            title={collection.title} 
                            imageAlt={collection.imageAlt}/>
                    })
            }
        </div>   
    </div>
  )
}
