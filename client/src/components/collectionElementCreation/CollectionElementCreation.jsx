import React, {useEffect, useState} from 'react'

import '../collectionElement/CollectionElement.css'
import './CollectionElementCreation.css'

import { CollectionElementInformationsCreation } from '../collectionElementInformationsCreation/CollectionElementInformationsCreation'
import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'

export const CollectionElementCreation = ({newCollectionUIDAndTitle}) => {

    const {currentInformations}=useCollectionElementInformations()

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
        
        try {
          let response=await fetch('http://localhost:5000/admin/createCollectionElementInformations',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              informationsToCreate:currentInformations,
              collectionUID:newCollectionUIDAndTitle.newCollectionUID,
            })
          })
          let data=await response.json()
          console.log(data)

        } catch (error) {
          console.error({message: error})  
        }
      } catch (error) {
        console.error({message: error})
      }
    }

    useEffect(()=>{
      console.log('newCollectionUIDAndTitle =>',newCollectionUIDAndTitle)
    },[newCollectionUIDAndTitle])


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
            <textarea id='collectionElementDescription'
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


            <br/>
            <div className='inputContainer'>
              <label htmlFor='collectionElementEmail'>Email : </label>
              <input id='collectionElementEmail'
                type='text'
                value={collectionElementAttributesToCreate.collectionElementEmailToCreate}
                onChange={handleChange}
                name='collectionElementEmailToCreate'    
                />
            </div>
            <br/>
            <div className='inputContainer'>
              <label htmlFor='collectionElementCooking'>Cuisson : </label>
              <input id='collectionElementCooking'
                type='text'
                value={collectionElementAttributesToCreate.collectionElementCookingToCreate}
                onChange={handleChange}
                name='collectionElementCookingToCreate'        
              />
            </div>
            <br/>
            <div className='inputContainer'>
              <label htmlFor='collectionElementRecommandation'>Recommandations : </label>
              <input id='collectionElementRecommandation'
                type='text'
                value={collectionElementAttributesToCreate.collectionElementRecommandationToCreate}
                onChange={handleChange}
                name='collectionElementRecommandationToCreate'        
              />
              </div>
          </div>
          <br></br>
          <br></br>
          <button className='collectionElementCreationButton'>Ajouter les élements de la nouvelle Collection</button>

        </form>

    )
}
