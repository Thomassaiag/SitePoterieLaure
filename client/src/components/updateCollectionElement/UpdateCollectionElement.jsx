import React, {Fragment, useEffect, useState} from 'react'
import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'
import { UpdateCollectionElementInformations } from '../updateCollectionElementInformations/UpdateCollectionElementInformations'
import '../collectionElement/CollectionElement.css'

export const UpdateCollectionElement = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID}) => {


    const {currentInformations, setCurrentInformations}=useCollectionElementInformations()

    const[collectionElementInformationToUpdate, SetcollectionElementInformationToUpdate]=useState({
      collectionElementDescriptionToUpdate:collectionElementDescription,
      collectionElementEmailToUpdate: collectionElementEmail,
      collectionElementCookingToUpdate: collectionElementCooking,
      collectionElementRecommandationToUpdate: collectionElementRecommandation,
      collectionUID: collectionUID,
      // collectionInformations:currentInformations

    })


    useEffect(()=>{
      SetcollectionElementInformationToUpdate({
        collectionElementDescriptionToUpdate:collectionElementDescription,
        collectionElementEmailToUpdate: collectionElementEmail,
        collectionElementCookingToUpdate: collectionElementCooking,
        collectionElementRecommandationToUpdate: collectionElementRecommandation,
        collectionUID: collectionUID,
        // collectionInformations:currentInformations
      })
    },[collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID, currentInformations])


    const handleSubmit=async()=>{
      try {
        let response = await fetch('http://localhost:5000/admin/updateCollectionElementInformation',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            descriptionToUpdate:collectionElementInformationToUpdate.collectionElementDescriptionToUpdate,
            emailToUpdate:collectionElementInformationToUpdate.collectionElementEmailToUpdate,
            cookingToUpdate:collectionElementInformationToUpdate.collectionElementCookingToUpdate,
            recommandationToUpdate:collectionElementInformationToUpdate.collectionElementRecommandationToUpdate,
            collectionUID:collectionElementInformationToUpdate.collectionUID
          })
        })
        let data=response.json()
        console.log(data)
        
      } catch (error) {
        console.error({message: error})
      }
      return
    }

    // useEffect(()=>{
    //   console.log(collectionElementInformationToUpdate)
    // },[collectionElementInformationToUpdate])

    const updateCollectionElement=(e)=>{
      e.preventDefault()
      SetcollectionElementInformationToUpdate({...collectionElementInformationToUpdate,
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
              value={collectionElementInformationToUpdate.collectionElementDescriptionToUpdate}
              onChange={updateCollectionElement}
              name='collectionElementDescriptionToUpdate'        
            />
          </div >
          <div div className='collectionElementRightContainer'>
            <label
              htmlFor='collectionElementEmail'>Informations techniques  
            </label>
            <UpdateCollectionElementInformations/>
            <br></br>
            <input id='collectionElementEmail'
              type='text'
              value={collectionElementInformationToUpdate.collectionElementEmailToUpdate}
              onChange={updateCollectionElement}
              name='collectionElementEmailToUpdate'    
            />
            <input id='collectionElementCooking'
              type='text'
              value={collectionElementInformationToUpdate.collectionElementCookingToUpdate}
              onChange={updateCollectionElement}
              name='collectionElementCookingToUpdate'        
            />
            <input id='collectionElementRecommandation'
              type='text'
              value={collectionElementInformationToUpdate.collectionElementRecommandationToUpdate}
              onChange={updateCollectionElement}
              name='collectionElementRecommandationToUpdate'        
            />
          </div>
          <button>Update Collection</button>

        </form>

    )
}
