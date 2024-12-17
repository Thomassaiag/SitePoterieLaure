import React, {Fragment, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCollectionElementInformations } from '../../contextProvider/CollectionElementInformationsContextProvider'
import { UpdateCollectionElementInformations } from '../updateCollectionElementInformations/UpdateCollectionElementInformations'
import { useCollectionElementInformationsToUpdate } from '../../contextProvider/CollectionElementInformationsToUpdateContextProvider'
import { useCollectionElementInformationsToUpdateDelete } from '../../contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider'

import { useConnectionStatus } from '../../contextProvider/ConnectionStatusContextProvider'

import { handleInvalidToken } from '../../utils/auth'


import '../collectionElement/CollectionElement.css'
import './UpdateCollectionElement.css'
const apiUrl=import.meta.env.VITE_API_URL

export const UpdateCollectionElement = (
  {
    collectionElementDescription,
    collectionElementEmail,
    collectionElementCooking,
    collectionElementRecommandation,
    collectionUID,
    fetchCollectionElement,
    fetchElementInformations
  }) => {

  const {setConnectionAttributes}=useConnectionStatus()

  const navigate=useNavigate()
  const {currentInformations}=useCollectionElementInformations()
  const {currentInformationsToUpdate}=useCollectionElementInformationsToUpdate()
  const {currentInformationsToUpdateDelete, setCurrentInformationsToUpdateDelete}=useCollectionElementInformationsToUpdateDelete()
  const [currentInformationsToUpdateCreate, setCurrentInformationsToUpdateCreate ]=useState([])
  const [currentInformationsToUpdateFinal, setCurrentInformationsToUpdateFinal]=useState([])
  const [collectionUpdated, setCollectionUpdated]=useState(false)
  const [collectionUpdateIssue, setCollectionUpdateIssue]=useState(false)


  const[collectionElementAttributesToUpdate, setCollectionElementAttributesToUpdate]=useState({
    collectionElementDescriptionToUpdate:collectionElementDescription,
    collectionElementEmailToUpdate: collectionElementEmail,
    collectionElementCookingToUpdate: collectionElementCooking,
    collectionElementRecommandationToUpdate: collectionElementRecommandation,
    collectionUID: collectionUID,
    collectionElementInformationsToUpdate:currentInformations

  })


  useEffect(()=>{
    setCollectionElementAttributesToUpdate((prevCollectionElementAttributesToUpdate)=>({
      ...prevCollectionElementAttributesToUpdate,
      collectionElementDescriptionToUpdate:collectionElementDescription,
      collectionElementEmailToUpdate: collectionElementEmail,
      collectionElementCookingToUpdate: collectionElementCooking,
      collectionElementRecommandationToUpdate: collectionElementRecommandation,
      collectionUID: collectionUID,
      collectionElementInformationsToUpdate:currentInformationsToUpdate
    }))
  },[collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID, currentInformationsToUpdate])



  const udpateCollectionElementAttributesOnly = async (collectionElementDescriptionToUpdate, collectionElementEmailToUpdate, collectionElementCookingToUpdate, collectionElementRecommandationToUpdate, collectionUID)=>{
    const token=localStorage.getItem('token')
    //API fetch with as a protected route, using Token
    try {
      let response = await fetch(`http://${apiUrl}/admin/editElement/updateCollectionElementAttributes`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({
          descriptionToUpdate:collectionElementDescriptionToUpdate,
          emailToUpdate:collectionElementEmailToUpdate,
          cookingToUpdate:collectionElementCookingToUpdate,
          recommandationToUpdate:collectionElementRecommandationToUpdate,
          collectionUID:collectionUID,
        })
      })

      //
      if(response.status===401){
        handleInvalidToken(navigate, setConnectionAttributes)
      }

      if(!response.ok){
        throw new Error('netWork issue')
      }
      else {
        console.log(response.message)
      }
    } catch (error) {
      console.error('element attributes didn`t get updated ',{message: error})
    }
  }

  const updateCollectionElementInformations=async(informationsToUpdate)=>{
    try {
      let response=await fetch(`http://${apiUrl}/admin/editElement/updateCollectionElementInformations`,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          informationsToUpdate:informationsToUpdate
        })
      })
      let data=await response.json()
      console.log(data)
    } catch (error) {
      console.error('information didn\'t get updated ',{message: error})  
    }
  }


  const deleteCollectionElementInformations=async (currentInformationsToUpdateDelete)=>{
    if(currentInformationsToUpdateDelete.length>0){
      try {
        let response= await fetch(`http://${apiUrl}/admin/editElement/deleteInformationInput`,{
          method:'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            informationIdToDeleteList:currentInformationsToUpdateDelete
          })
        })
        let data=await response.json()
        console.log(data)
      } catch (error) {
        console.log(`information didn't get deleted => ${error}`)       
      }
    }
    else console.log('No information to Delete')
  }



  const createCollectionElementInformation=async(collectionElementInformationToCreate, collectionUID)=>{
    if(collectionElementInformationToCreate.length>0){
      try {  
        let response=await fetch(`http://${apiUrl}/admin/createCollectionElementInformations`,{
          method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          informationsToCreate:collectionElementInformationToCreate,
          collectionUID:collectionUID
        })
      })
      let data=await response.json(response)
      } catch (error) {
        console.log('something went wrong on information deletion : ',error)
      }
    }
    else console.log('no information to create')
  }
  

  const resetUpdateStateValues=async()=>{
    await setCurrentInformationsToUpdateDelete([])
    setCurrentInformationsToUpdateCreate([])
    setCurrentInformationsToUpdateFinal ([])
  }

  
  const updateCollectionElement=async(e)=>{
    try {
      
    
      e.preventDefault()
      setCollectionUpdated(false)
      const tempCurrentInformationsToUpdateCreate=[]
      const tempCurrentInformationsToUpdateFinal=[]

      currentInformationsToUpdate.forEach((currentInformationToUpdate)=>{
        const {collection_element_information_uid, collection_element_information_text}=currentInformationToUpdate
        console.log(collection_element_information_uid)
        console.log(collection_element_information_text)

        if(!currentInformations.find((currentInformation)=>currentInformation.collection_element_information_uid==collection_element_information_uid)){
          console.log('id not found')
          tempCurrentInformationsToUpdateCreate.push({
              informationInputText:collection_element_information_text
            })
        } else {
          console.log('else')
          tempCurrentInformationsToUpdateFinal.push({
            collection_element_information_uid: collection_element_information_uid, collection_element_information_text: collection_element_information_text
          })
        }  
      })
        
      setCurrentInformationsToUpdateCreate(tempCurrentInformationsToUpdateCreate)
      setCurrentInformationsToUpdateFinal(tempCurrentInformationsToUpdateFinal)

      
      await udpateCollectionElementAttributesOnly(
        collectionElementAttributesToUpdate.collectionElementDescriptionToUpdate,
        collectionElementAttributesToUpdate.collectionElementEmailToUpdate,
        collectionElementAttributesToUpdate.collectionElementCookingToUpdate,
        collectionElementAttributesToUpdate.collectionElementRecommandationToUpdate,
        collectionElementAttributesToUpdate.collectionUID
        )

      await updateCollectionElementInformations(tempCurrentInformationsToUpdateFinal)
      await deleteCollectionElementInformations(currentInformationsToUpdateDelete)
      await createCollectionElementInformation(tempCurrentInformationsToUpdateCreate, collectionUID)

      await fetchCollectionElement()
      await fetchElementInformations(collectionUID)
      setCollectionUpdated(true)
    } catch (error) {
      console.error(error)
      setCollectionUpdateIssue(true)
    }
  }
  
  useEffect(()=>{
    if(collectionUpdated){
      resetUpdateStateValues()
    }
  },[collectionUpdated])



  const handleChange=(e)=>{
    e.preventDefault()
    setCollectionUpdated(false)
    setCollectionElementAttributesToUpdate((prevCollectionElementAttributesToUpdate)=>({
      ...prevCollectionElementAttributesToUpdate,
      [e.target.name]:e.target.value
    }))
  }

  useEffect(()=>{
    setCollectionUpdated(false)
  }, [collectionUID])


  return (
      <form  className='collectionElementUpdateCreatePresentationContainer'onSubmit={updateCollectionElement}>
        <div className='collectionElementLeftRightContainer'>
          <div className='collectionElementLeftContainer'>
            <label
              htmlFor='collectionElementDescription'>          
              <h2>En Quelques Mots</h2>
            </label>
            <textarea 
              id='collectionElementDescription'
              type='text'
              value={collectionElementAttributesToUpdate.collectionElementDescriptionToUpdate ?? collectionElementDescription}
              onChange={handleChange}
              name='collectionElementDescriptionToUpdate'        
            />
          </div >
          <div className='collectionElementRightContainer'>
            <h2>Informations techniques</h2>
            <div className='collectionElementInformationsContainer'>
              <UpdateCollectionElementInformations collectionUID={collectionUID}/>
            </div>
            <br></br>
            <div className='collectionElementEmailCookingRecoContainer'>
              <label htmlFor='collectionElementEmail'>Émail :</label>
              <input id='collectionElementEmail'
                type='text'
                value={collectionElementAttributesToUpdate.collectionElementEmailToUpdate ?? collectionElementEmail}
                onChange={handleChange}
                name='collectionElementEmailToUpdate'    
              />
              <br/>
              <label htmlFor='collectionElementCooking'>Cuisson :</label>
              <input id='collectionElementCooking'
                type='text'
                value={collectionElementAttributesToUpdate.collectionElementCookingToUpdate ?? collectionElementCooking}
                onChange={handleChange}
                name='collectionElementCookingToUpdate'        
              />
              <br/>
              <label htmlFor='collectionElementRecommandation'>Recommandation :</label>
              <input id='collectionElementRecommandation'
                type='text'
                value={collectionElementAttributesToUpdate.collectionElementRecommandationToUpdate ?? collectionElementRecommandation}
                onChange={handleChange}
                name='collectionElementRecommandationToUpdate'        
              />
            </div>
            {collectionUpdated && <p>Informations mises à Jour</p>}
            {collectionUpdateIssue && <p>Informations non mises à Jour</p>}
          </div>         
        </div>
        <div className='updateCollectionButtonContainer'>
          <button className='updateCollectionButton' style={{cursor: 'pointer'}}>Mise à jour collection</button>
        </div>
      </form>

  )
}
