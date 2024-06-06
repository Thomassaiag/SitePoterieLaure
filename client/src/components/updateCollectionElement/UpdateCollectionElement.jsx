import React, {Fragment, useEffect, useState} from 'react'
import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'
import { UpdateCollectionElementInformations } from '../updateCollectionElementInformations/UpdateCollectionElementInformations'
import { useCollectionElementInformationsToUpdate } from '../contextProvider/CollectionElementInformationsToUpdateContextProvider'
import { useCollectionElementInformationsToUpdateDelete } from '../contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider'

import '../collectionElement/CollectionElement.css'


export const UpdateCollectionElement = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID, fetchCollectionElement, fetchElementInformations}) => {


  const {currentInformations}=useCollectionElementInformations()
  const {currentInformationsToUpdate}=useCollectionElementInformationsToUpdate()
  const {currentInformationsToUpdateDelete, setCurrentInformationsToUpdateDelete}=useCollectionElementInformationsToUpdateDelete()
  const [currentInformationsToUpdateCreate, setCurrentInformationsToUpdateCreate ]=useState([])
  const [currentInformationsToUpdateFinal, setCurrentInformationsToUpdateFinal]=useState([])
  const [fetchCompleted, setFetchCompleted]=useState(false)


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
    try {
      let response = await fetch('http://localhost:5000/admin/updateCollectionElementAttributes',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          descriptionToUpdate:collectionElementDescriptionToUpdate,
          emailToUpdate:collectionElementEmailToUpdate,
          cookingToUpdate:collectionElementCookingToUpdate,
          recommandationToUpdate:collectionElementRecommandationToUpdate,
          collectionUID:collectionUID,
        })
      })
      let data= await response.json()
      console.log(data)
    } catch (error) {
      console.error('element attributes didn`t get updated ',{message: error})
    }
  }

  const updateCollectionElementInformations=async(informationsToUpdate)=>{
    try {
      let response=await fetch('http://localhost:5000/admin/updateCollectionElementInformations',{
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
        let response= await fetch('http://localhost:5000/admin/deleteInformationInput',{
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
        let response=await fetch('http://localhost:5000/admin/createCollectionElementInformations',{
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
      console.log(data)
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
    e.preventDefault()
    setFetchCompleted(false)
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
    setFetchCompleted(true)
  }
  
  useEffect(()=>{
    if(fetchCompleted){
      resetUpdateStateValues()
    }
  },[fetchCompleted])



  const handleChange=(e)=>{
    e.preventDefault()
    setCollectionElementAttributesToUpdate((prevCollectionElementAttributesToUpdate)=>({
      ...prevCollectionElementAttributesToUpdate,
      [e.target.name]:e.target.value
    }))
  }



  return (
    <form className='collectionElementInformationContainer' onSubmit={updateCollectionElement}>
      <div className='collectionElementLeftContainer'>
        <label
          htmlFor='collectionElementDescription'>Collection Description  
        </label>
        <input id='collectionElementDescription'
          type='text'
          value={collectionElementAttributesToUpdate.collectionElementDescriptionToUpdate}
          onChange={handleChange}
          name='collectionElementDescriptionToUpdate'        
        />
      </div >
      <div className='collectionElementRightContainer'>
        <label
          htmlFor='collectionElementEmail'>Informations techniques  
        </label>
        <UpdateCollectionElementInformations/>
        <br></br>
        <input id='collectionElementEmail'
          type='text'
          value={collectionElementAttributesToUpdate.collectionElementEmailToUpdate}
          onChange={handleChange}
          name='collectionElementEmailToUpdate'    
        />
        <input id='collectionElementCooking'
          type='text'
          value={collectionElementAttributesToUpdate.collectionElementCookingToUpdate}
          onChange={handleChange}
          name='collectionElementCookingToUpdate'        
        />
        <input id='collectionElementRecommandation'
          type='text'
          value={collectionElementAttributesToUpdate.collectionElementRecommandationToUpdate}
          onChange={handleChange}
          name='collectionElementRecommandationToUpdate'        
        />
      </div>
      <button>Update Collection</button>
    </form>
  )
}
