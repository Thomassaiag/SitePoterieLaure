import React, {Fragment, useEffect, useState} from 'react'

import '../collectionElement/CollectionElement.css'

export const UpdateElementInformation = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID}) => {

    const[collectionElementInformationToUpdate, SetcollectionElementInformationToUpdate]=useState({
      collectionElementDescriptionToUpdate:collectionElementDescription,
      collectionElementEmailToUpdate: collectionElementEmail,
      collectionElementCookingToUpdate: collectionElementCooking,
      collectionElementRecommandationToUpdate: collectionElementRecommandation,
      collectionUID: collectionUID
    })


    useEffect(()=>{
      SetcollectionElementInformationToUpdate({
        collectionElementDescriptionToUpdate:collectionElementDescription,
        collectionElementEmailToUpdate: collectionElementEmail,
        collectionElementCookingToUpdate: collectionElementCooking,
        collectionElementRecommandationToUpdate: collectionElementRecommandation,
        collectionUID: collectionUID

      })
    },[collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID])


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

    useEffect(()=>{
      console.log(collectionElementInformationToUpdate)
    },[collectionElementInformationToUpdate])

    const updateCollectionElementInformation=(e)=>{
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
              onChange={updateCollectionElementInformation}
              name='collectionElementDescriptionToUpdate'        
            />
          </div >
          <div div className='collectionElementRightContainer'>
            <label
              htmlFor='collectionElementEmail'>Informations techniques  
            </label>
            <input id='collectionElementEmail'
              type='text'
              value={collectionElementInformationToUpdate.collectionElementEmailToUpdate}
              onChange={updateCollectionElementInformation}
              name='collectionElementEmailToUpdate'    
            />
            <input id='collectionElementCooking'
              type='text'
              value={collectionElementInformationToUpdate.collectionElementCookingToUpdate}
              onChange={updateCollectionElementInformation}
              name='collectionElementCookingToUpdate'        
            />
            <input id='collectionElementRecommandation'
              type='text'
              value={collectionElementInformationToUpdate.collectionElementRecommandationToUpdate}
              onChange={updateCollectionElementInformation}
              name='collectionElementRecommandationToUpdate'        
            />
          </div>
          <button>Update Collection</button>

        </form>

    )
}
