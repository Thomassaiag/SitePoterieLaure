import React, {useState} from 'react'

export const UpdateElementInformation = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation}) => {

    const[collectionInformationToUpdate, SetcollectionInformationToUpdate]=useState({
      collectionElementDescriptionToUpdate:collectionElementDescription,
      collectionElementEmailToUpdate: collectionElementEmail,
      collectionElementCookingToUpdate: collectionElementCooking,
      collectionElementRecommandationToUpdate: collectionElementRecommandation
    })

    const UpdateCollectionElementInformation=()=>{
      return
    }

    return (
      <div>UpdateElementInformation
        <form onSubmit={UpdateCollectionElementInformation}>
          <label
            htmlFor='collectionElementDescription'>Collection Description  
          </label>
          <input id='collectionElementDescription'
            placeholder={collectionElementDescription}        
          />
          <label
            htmlFor='collectionElementEmail'>Informations techniques  
          </label>
          <input id='collectionElementEmail'
            value={collectionElementEmail}        
          />
          <input id='collectionElementCooking'
            placeholder={collectionElementCooking}        
          />
          <input id='collectionElementRecommandation'
            placeholder={collectionElementRecommandation}        
          />
          <button>Update Collection</button>


            


          
        </form>


      </div>
    )
}
