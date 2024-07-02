import React, {useEffect, useState} from 'react'

import '../collectionElement/CollectionElement.css'
import './CollectionElementCreation.css'

import { CollectionElementInformationsCreation } from '../collectionElementInformationsCreation/CollectionElementInformationsCreation'
import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'

export const CollectionElementCreation = ({newCollectionData}) => {

  const {currentInformations}=useCollectionElementInformations()
  const [collectionCreated, setCollectionCreated]=useState(false)
  const [collectionCreationIssue, setCollectionCreationIssue]=useState(false)

  const[collectionElementAttributesToCreate, setCollectionElementAttributesToCreate]=useState({
    collectionElementDescriptionToCreate:'',
    collectionElementEmailToCreate: '',
    collectionElementCookingToCreate: '',
    collectionElementRecommandationToCreate: '',
    collectionUID: '',
    collectionTitle:'',
    collectionElementInformationsToCreate:''
  })

  const createCollection=async(e)=>{
    e.preventDefault()
    setCollectionCreated(false)
    setCollectionCreationIssue(false)
    try {
      const response=await fetch('http://localhost:5000/admin/createCollection',{
        method: 'POST',
        body: newCollectionData
      })
        
      if(!response.ok){
          setCollectionCreationIssue(true)
          throw new Error('Network response was not OK')
      }
      else {
        console.log('New Entry Created Successfuly')
        let data= await response.json()
        let newCollectionUID=data.message.collection_uid
        let newCollectionTitle=data.message.collection_title
        return{
          newCollectionUID,
          newCollectionTitle
        }
      }

    } catch (err) {
        console.error('Error adding New Collection', err)
        setCollectionCreationIssue(true)
    }    
  }

  const createCollectionAttributes=async()=>{
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
          collectionUID:collectionElementAttributesToCreate.collectionUID,
          collectionTitle:collectionElementAttributesToCreate.collectionTitle,
        })
      })
      let data= await response.json()
      
      try {
        let response=await fetch('http://localhost:5000/admin/createCollectionElementInformations',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            informationsToCreate:currentInformations,
            collectionUID:collectionElementAttributesToCreate.collectionUID,
          })
        })
        let data=await response.json()
      } catch (error) {
        setCollectionCreationIssue(true)
        console.error({message: error})  
      }
    } catch (error) {
      setCollectionCreationIssue(true)
      console.error({message: error})
    } 

  }

  const handleChange=(e)=>{
    e.preventDefault()
    setCollectionCreated(false)
    setCollectionElementAttributesToCreate({...collectionElementAttributesToCreate,
      [e.target.name]:e.target.value
    })
  }


  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const {newCollectionUID, newCollectionTitle} = await createCollection(e)
      setCollectionElementAttributesToCreate((prevCollectionElementAttributesToCreate)=>({...prevCollectionElementAttributesToCreate,
        collectionUID: newCollectionUID,
        collectionTitle:newCollectionTitle
      }))
      setCollectionCreated(true)
    } catch (error) {
      console.log('collection did\'t get created', error)
    }

  }


  useEffect(()=>{
    if(collectionCreated){
      createCollectionAttributes()
    }
  },[collectionCreated])


  return (
    <form className='collectionElementInformationContainer' onSubmit={handleSubmit}>
      <div className='collectionElementLeftContainer'>
        <label
          htmlFor='collectionElementDescription'>Collection Description  
        </label>
        <textarea id='collectionElementDescription'
          type='text'
          value={collectionElementAttributesToCreate.collectionElementDescriptionToCreate}
          onChange={handleChange}
          name='collectionElementDescriptionToCreate'
          required     
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
            required
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
            required     
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
            required        
          />
          </div>
      </div>
      <br></br>
      <br></br>
      <button className='collectionElementCreationButton'>Ajouter les élements de la nouvelle Collection</button>
      {collectionCreated && <p>La collection a été créée avec succès</p>}
      {collectionCreationIssue && <p>La collection n'a été créée</p>}
    </form>
  )
}
