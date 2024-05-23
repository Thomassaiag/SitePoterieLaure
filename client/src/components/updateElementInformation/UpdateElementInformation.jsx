import React, {useEffect, useState} from 'react'
import './UpdateElementInformation.css'

export const UpdateElementInformation = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID}) => {

    const[collectionElementInformationToUpdate, SetcollectionElementInformationToUpdate]=useState({
      collectionElementDescriptionToUpdate:collectionElementDescription,
      collectionElementEmailToUpdate: collectionElementEmail,
      collectionElementCookingToUpdate: collectionElementCooking,
      collectionElementRecommandationToUpdate: collectionElementRecommandation,
      collectionElementToUpdateID: collectionUID
    })


    useEffect(()=>{
      SetcollectionElementInformationToUpdate({
        collectionElementDescriptionToUpdate:collectionElementDescription,
        collectionElementEmailToUpdate: collectionElementEmail,
        collectionElementCookingToUpdate: collectionElementCooking,
        collectionElementRecommandationToUpdate: collectionElementRecommandation,
        collectionElementToUpdateID: collectionUID

      })
    },[collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID])


    const handleSubmit=async()=>{
      try {
        let response = await fetch('http://admin/updateCollectionElementInformation',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            descriptionToUpdate:collectionElementInformationToUpdate.collectionElementDescriptionToUpdate,
            emailToUpdate:collectionElementInformationToUpdate.collectionElementEmailToUpdate,
            cookingToUpdate:collectionElementInformationToUpdate.collectionElementCookingToUpdate,
            recommandationToUpdate:collectionElementInformationToUpdate.collectionElementRecommandationToUpdate,
            IDToUpdate:collectionElementInformationToUpdate.collectionElementToUpdateID
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
      <div>UpdateElementInformation
        <form onSubmit={handleSubmit}>
          <label
            htmlFor='collectionElementDescription'>Collection Description  
          </label>
          <input id='collectionElementDescription'
            type='text'
            value={collectionElementInformationToUpdate.collectionElementDescriptionToUpdate}
            onChange={updateCollectionElementInformation}
            name='collectionElementDescriptionToUpdate'        
          />
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
          <button>Update Collection</button>


            


          
        </form>


      </div>
    )
}
