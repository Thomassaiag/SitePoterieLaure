import React, {Fragment, useEffect, useState} from 'react'
import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'
import { UpdateCollectionElementInformations } from '../updateCollectionElementInformations/UpdateCollectionElementInformations'
import { useCollectionElementInformationsToUpdate } from '../contextProvider/CollectionElementInformationsToUpdateContextProvider'
import { useCollectionElementInformationsToUpdateDelete } from '../contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider'
import '../collectionElement/CollectionElement.css'


export const UpdateCollectionElement = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID, fetchCollectionElement, fetchElementInformations}) => {


  const {currentInformations}=useCollectionElementInformations()
  const {currentInformationsToUpdate}=useCollectionElementInformationsToUpdate()
  const {currentInformationsToUpdateDelete}=useCollectionElementInformationsToUpdateDelete()

  const[collectionElementAttributesToUpdate, setCollectionElementAttributesToUpdate]=useState({
    collectionElementDescriptionToUpdate:collectionElementDescription,
    collectionElementEmailToUpdate: collectionElementEmail,
    collectionElementCookingToUpdate: collectionElementCooking,
    collectionElementRecommandationToUpdate: collectionElementRecommandation,
    collectionUID: collectionUID,
    collectionElementInformationsToUpdate:currentInformations

  })


  useEffect(()=>{
    setCollectionElementAttributesToUpdate({
      collectionElementDescriptionToUpdate:collectionElementDescription,
      collectionElementEmailToUpdate: collectionElementEmail,
      collectionElementCookingToUpdate: collectionElementCooking,
      collectionElementRecommandationToUpdate: collectionElementRecommandation,
      collectionUID: collectionUID,
      collectionElementInformationsToUpdate:currentInformationsToUpdate
    })
  },[collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID, currentInformationsToUpdate])


  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      let response = await fetch('http://localhost:5000/admin/updateCollectionElementAttributes',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          descriptionToUpdate:collectionElementAttributesToUpdate.collectionElementDescriptionToUpdate,
          emailToUpdate:collectionElementAttributesToUpdate.collectionElementEmailToUpdate,
          cookingToUpdate:collectionElementAttributesToUpdate.collectionElementCookingToUpdate,
          recommandationToUpdate:collectionElementAttributesToUpdate.collectionElementRecommandationToUpdate,
          collectionUID:collectionElementAttributesToUpdate.collectionUID,
        })
      })
      let data= await response.json()
      console.log(data)
    } catch (error) {
      console.error({message: error})
    }
    
    try {
      let response=await fetch('http://localhost:5000/admin/updateCollectionElementInformations',{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          informationsToUpdate:collectionElementAttributesToUpdate.collectionElementInformationsToUpdate
        })
      })
      let data=await response.json()
      console.log(data)
      fetchCollectionElement()
      fetchElementInformations(collectionUID)
    } catch (error) {
      console.error({message: error})  
    }

    try {
      console.log(currentInformationsToUpdateDelete)
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




  // useEffect(()=>{
  //   console.log(collectionElementAttributesToUpdate)
  // },[collectionElementAttributesToUpdate])

  const updateCollectionElement=(e)=>{
    e.preventDefault()
    setCollectionElementAttributesToUpdate({...collectionElementAttributesToUpdate,
      [e.target.name]:e.target.value
    })
  }



  return (
    <form className='collectionElementInformationContainer' onSubmit={handleSubmit}>
      <div className='collectionElementLeftContainer'>
        <label
          htmlFor='collectionElementDescription'>Collection Description  
        </label>
        <input id='collectionElementDescription'
          type='text'
          value={collectionElementAttributesToUpdate.collectionElementDescriptionToUpdate}
          onChange={updateCollectionElement}
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
          onChange={updateCollectionElement}
          name='collectionElementEmailToUpdate'    
        />
        <input id='collectionElementCooking'
          type='text'
          value={collectionElementAttributesToUpdate.collectionElementCookingToUpdate}
          onChange={updateCollectionElement}
          name='collectionElementCookingToUpdate'        
        />
        <input id='collectionElementRecommandation'
          type='text'
          value={collectionElementAttributesToUpdate.collectionElementRecommandationToUpdate}
          onChange={updateCollectionElement}
          name='collectionElementRecommandationToUpdate'        
        />
      </div>
      <button>Update Collection</button>
    </form>
  )
}
