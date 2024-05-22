import React, {useEffect, useState} from 'react'

export const UpdateElementInformation = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation}) => {

    const[collectionInformationToUpdate, SetcollectionInformationToUpdate]=useState({
      collectionElementDescriptionToUpdate:collectionElementDescription,
      collectionElementEmailToUpdate: collectionElementEmail,
      collectionElementCookingToUpdate: collectionElementCooking,
      collectionElementRecommandationToUpdate: collectionElementRecommandation
    })

    const handleSubmit=()=>{
      return
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
