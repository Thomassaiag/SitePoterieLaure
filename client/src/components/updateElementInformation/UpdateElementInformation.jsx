import React, {useEffect, useState} from 'react'
import './UpdateElementInformation.css'

export const UpdateElementInformation = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID}) => {

    const[collectionInformationToUpdate, SetcollectionInformationToUpdate]=useState({
      collectionElementDescriptionToUpdate:collectionElementDescription,
      collectionElementEmailToUpdate: collectionElementEmail,
      collectionElementCookingToUpdate: collectionElementCooking,
      collectionElementRecommandationToUpdate: collectionElementRecommandation,
      collectionElementToUpdateID: collectionUID
    })

    const handleSubmit=async()=>{
      try {
        let response = await fetch('http://admin/updateCollectionElementInformation',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            
          })
        })
        let data=response.json()
        console.log(data)
        
      } catch (error) {
        console.error({message: error})
      }
    }


    const updateCollectionElementInformation=(e)=>{
      e.preventDefault()
      SetcollectionInformationToUpdate({...collectionInformationToUpdate,
        [e.target.name]:e.target.value
      })
    }

    useEffect(()=>{
      console.log(collectionInformationToUpdate)
    },[collectionInformationToUpdate])

    return (
      <div>UpdateElementInformation
        <form onSubmit={handleSubmit}>
          <label
            htmlFor='collectionElementDescription'>Collection Description  
          </label>
          <input id='collectionElementDescription'
            placeholder={collectionElementDescription}
            onChange={updateCollectionElementInformation}
            name='collectionElementDescriptionToUpdate'        
          />
          <label
            htmlFor='collectionElementEmail'>Informations techniques  
          </label>
          <input id='collectionElementEmail'
            value={collectionElementEmail}
            onChange={updateCollectionElementInformation}
            name='collectionElementEmailToUpdate'    
          />
          <input id='collectionElementCooking'
            placeholder={collectionElementCooking}
            onChange={updateCollectionElementInformation}
            name='collectionElementCookingToUpdate'        
          />
          <input id='collectionElementRecommandation'
            placeholder={collectionElementRecommandation}
            onChange={updateCollectionElementInformation}
            name='collectionElementRecommandationToUpdate'        
          />
          <button>Update Collection</button>


            


          
        </form>


      </div>
    )
}
