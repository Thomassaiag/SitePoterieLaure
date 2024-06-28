import React, {useEffect, useState} from 'react'

import '../collectionElement/CollectionElement.css'
import './CollectionElementCreation.css'

import { CollectionElementInformationsCreation } from '../collectionElementInformationsCreation/CollectionElementInformationsCreation'
import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'

export const CollectionElementCreation = () => {

  const {currentInformations}=useCollectionElementInformations()

  const[collectionElementAttributesToCreate, setCollectionElementAttributesToCreate]=useState({
    collectionElementDescriptionToCreate:'',
    collectionElementEmailToCreate: '',
    collectionElementCookingToCreate: '',
    collectionElementRecommandationToCreate: '',
    collectionUID: '',
    collectionElementInformationsToCreate:''
  })

  const [newCollectionUIDAndTitle, setNewCollectionUIDAndTitle]=useState({
    newCollectionUID:'',
    newCollectionTitle:''
  })

  const createCollection=async(e)=>{
    e.preventDefault()

    if(!collectionPicture){
        alert('Merci de sélectionner une image')
        return
    }
    try {
      const response=await fetch('http://localhost:5000/admin/createCollection',{
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        body: newCollectionData
      })
        
      if(!response.ok){
          throw new Error('Network response was not OK')
      }
      else {
        console.log('New Entry Created Successfuly')
        let data= await response.json()
        let newCollectionUID=data.message.collection_uid
        let newCollectionTitle=data.message.collection_title
        console.log('collection created => ',data)
        console.log('newCollectionUID => ',newCollectionUID)
        setCollectionCreated(true)
        setNewCollectionUIDAndTitle({...CollectionCreation,
              newCollectionUID: newCollectionUID,
              newCollectionTitle:newCollectionTitle
        })
      }    
    } catch (err) {
        console.error('Error adding New Collection', err)
    }
    
    


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
    <form className='collectionElementInformationContainer' onSubmit={createCollection}>
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
