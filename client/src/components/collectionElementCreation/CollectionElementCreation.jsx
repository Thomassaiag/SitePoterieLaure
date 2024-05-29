import React, {useEffect, useState} from 'react'

import '../collectionElement/CollectionElement.css'
import { CollectionElementInformationsCreation } from '../collectionElementInformationsCreation/CollectionElementInformationsCreation'

export const CollectionElementCreation = ({newCollectionUIDAndTitle}) => {


    const[collectionElementAttributesToCreate, setCollectionElementAttributesToCreate]=useState({
      collectionElementDescriptionToCreate:'',
      collectionElementEmailToCreate: '',
      collectionElementCookingToCreate: '',
      collectionElementRecommandationToCreate: '',
      collectionUID: '',
      collectionElementInformationsToCreate:''
    })


    const createCollectionElement=async(e)=>{
      e.preventDefault()
      try {
        let response = await fetch('http://localhost:5000/admin/createCollectionElement',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            descriptionToCreate:collectionElementAttributesToCreate.collectionElementDescriptionToCreate,
            emailToCreate:collectionElementAttributesToCreate.collectionElementEmailToCreate,
            cookingToCreate:collectionElementAttributesToCreate.collectionElementCookingToCreate,
            recommandationToCreate:collectionElementAttributesToCreate.collectionElementRecommandationToCreate,
            collectionUID:newCollectionUIDAndTitle.newCollectionUID,
            collectionTitle:newCollectionUIDAndTitle.newCollectionTitle,
          })
        })
        let data= await response.json()
        console.log(data)
        
        // try {
        //   let response=await fetch('http://localhost:5000/admin/createCollectionElementInformations',{
        //     method:'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body:JSON.stringify({
        //       informationsToCreate:collectionElementAttributesToCreate.collectionElementInformationsToCreate
        //     })
        //   })
        //   let data=response.json()
        //   console.log(data)

        // } catch (error) {
        //   console.error({message: error})  
        // }
      } catch (error) {
        console.error({message: error})
      }
    }


    const handleChange=(e)=>{
      e.preventDefault()
      setCollectionElementAttributesToCreate({...collectionElementAttributesToCreate,
        [e.target.name]:e.target.value
      })
    }



    return (

        <form className='collectionElementInformationContainer' onSubmit={createCollectionElement}>
          <div className='collectionElementLeftContainer'>
            <label
              htmlFor='collectionElementDescription'>Collection Description  
            </label>
            <input id='collectionElementDescription'
              type='text'
              value={collectionElementAttributesToCreate.collectionElementDescriptionToCreate}
              onChange={handleChange}
              name='collectionElementDescriptionToCreate'        
            />
          </div >
          <div className='collectionElementRightContainer'>
            <label
              htmlFor='collectionElementEmail'>Informations techniques  
            </label>

            <CollectionElementInformationsCreation/>


            <br></br>
            <input id='collectionElementEmail'
              type='text'
              value={collectionElementAttributesToCreate.collectionElementEmailToCreate}
              onChange={handleChange}
              name='collectionElementEmailToCreate'    
            />
            <input id='collectionElementCooking'
              type='text'
              value={collectionElementAttributesToCreate.collectionElementCookingToCreate}
              onChange={handleChange}
              name='collectionElementCookingToCreate'        
            />
            <input id='collectionElementRecommandation'
              type='text'
              value={collectionElementAttributesToCreate.collectionElementRecommandationToCreate}
              onChange={handleChange}
              name='collectionElementRecommandationToCreate'        
            />
          </div>
          <button>Ajouter les élements de la nouvelle Collection</button>

        </form>

    )
}
