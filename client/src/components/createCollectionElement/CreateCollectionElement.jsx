import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import './CollectionElementCreation.css'
import '../updateCollectionElement/UpdateCollectionElement'



import { CreateCollectionElementInformations } from '../createCollectionElementInformations/CreateCollectionElementInformations'
import { useCollectionElementInformations } from '../../contextProvider/CollectionElementInformationsContextProvider'

import { useConnectionStatus } from '../../contextProvider/ConnectionStatusContextProvider'
import { handleInvalidToken } from '../../utils/auth'


const apiUrl=import.meta.env.VITE_API_URL


export const CreateCollectionElement = ({newCollectionData}) => {
  const navigate=useNavigate()
  const {setConnectionAttributes}=useConnectionStatus()
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
    const token=localStorage.getItem('token')
    try {
      const response=await fetch(`http://${apiUrl}/admin/createCollection`,{
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newCollectionData
      })
        
      if(response.status===401){
        handleInvalidToken(navigate, setConnectionAttributes)
        setCollectionCreationIssue(true)
      }

      if(!response.ok){
        setCollectionCreationIssue(true)
        throw new Error('netWork issue')
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
      let response = await fetch(`http://${apiUrl}/admin/createCollectionElement`,{
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
        let response=await fetch(`http://${apiUrl}/admin/createCollectionElementInformations`,{
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
    <form className='collectionElementUpdateCreatePresentationContainer' onSubmit={handleSubmit}>
      <div className='collectionElementLeftRightContainer'>
        <div className='collectionElementLeftContainer'>
          <label
            htmlFor='collectionElementDescription'>
              <h2>En Quelques Mots</h2>
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
          <label>
              <h2>Informations techniques</h2>
          </label>
          <div className='collectionElementInformationsContainer'>
            <CreateCollectionElementInformations/>
          </div>
          <br/>
          <div className='collectionElementEmailCookingRecoContainer'>
            <label htmlFor='collectionElementEmail'>Émail : </label>
            <input id='collectionElementEmail'
              type='text'
              value={collectionElementAttributesToCreate.collectionElementEmailToCreate}
              onChange={handleChange}
              name='collectionElementEmailToCreate'
              required
              />
            <br/>
            <label htmlFor='collectionElementCooking'>Cuisson : </label>
            <input id='collectionElementCooking'
              type='text'
              value={collectionElementAttributesToCreate.collectionElementCookingToCreate}
              onChange={handleChange}
              name='collectionElementCookingToCreate'
              required     
            />
            <br/>
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
      </div>
      <br></br>
      <br></br>
      <button className='collectionElementCreationButton'>Ajouter les élements de la nouvelle Collection</button>
      {collectionCreated && <p>La collection a été créée avec succès</p>}
      {collectionCreationIssue && <p>La collection n'a été créée</p>}
    </form>
  )
}
