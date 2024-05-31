import React, {Fragment, useEffect, useState} from 'react'
import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'
import { UpdateCollectionElementInformations } from '../updateCollectionElementInformations/UpdateCollectionElementInformations'
import { useCollectionElementInformationsToUpdate } from '../contextProvider/CollectionElementInformationsToUpdateContextProvider'
import { useCollectionElementInformationsToUpdateDelete } from '../contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider'
import { useCollectionElementInformationsToUpdateCreate } from '../contextProvider/CollectionElementInformationsToUpdateCreateContextProvider' 
import '../collectionElement/CollectionElement.css'


export const UpdateCollectionElement = ({collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID, fetchCollectionElement, fetchElementInformations}) => {


  const {currentInformations}=useCollectionElementInformations()
  const {currentInformationsToUpdate, setCurrentInformationsToUpdate}=useCollectionElementInformationsToUpdate()
  const {currentInformationsToUpdateDelete}=useCollectionElementInformationsToUpdateDelete()
  const {currentInformationsToUpdateCreate, setCurrentInformationsToUpdateCreate }=useCollectionElementInformationsToUpdateCreate()
  const [currentInformationsToUpdateFinal, setCurrentInformationsToUpdateFinal]=useState([])

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
      collectionElementInformationsToUpdate:currentInformationsToUpdateFinal
    }))
  },[collectionElementDescription, collectionElementEmail, collectionElementCooking, collectionElementRecommandation, collectionUID, currentInformationsToUpdateFinal])


  const updateCollectionElement=async(e)=>{
    e.preventDefault()
    console.log(currentInformations)
    currentInformationsToUpdate.forEach((currentInformationToUpdate)=>{
      const {collection_element_information_uid, collection_element_information_text}=currentInformationToUpdate
      console.log(collection_element_information_uid)
      console.log(collection_element_information_text)

      if(!currentInformations.find((currentInformation)=>currentInformation.collection_element_information_uid==collection_element_information_uid)){
        console.log('id not found')
        setCurrentInformationsToUpdateCreate((prevInformationsToUpdateCreate)=>{
          return [...prevInformationsToUpdateCreate,{
            collection_element_information_uid:collection_element_information_uid,
            collection_uid: currentInformations[0].collection_uid,
            collection_element_information_text:collection_element_information_text
          }]
        })
      } else {
        console.log('else')
        setCurrentInformationsToUpdateFinal((prevInformationsToUpdateFinal)=>{
          return [...prevInformationsToUpdateFinal,{collection_element_information_uid: collection_element_information_uid, collection_element_information_text: collection_element_information_text}]
        })
      }
    })

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });

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
          informationsToUpdate:currentInformationsToUpdateFinal
        })
      })
      let data=await response.json()
      console.log(data)
    } catch (error) {
      console.error({message: error})  
    }
    if(currentInformationsToUpdateDelete.length>0){

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
    fetchCollectionElement()
    fetchElementInformations(collectionUID)
    // setCurrentInformationsToUpdateFinal([])
  }
  
  
  

  useEffect(()=>{
    console.log('collection Element Attributes To Update =>',collectionElementAttributesToUpdate)
  },[collectionElementAttributesToUpdate])


  useEffect(()=>{
    console.log('collection element information to Create ',currentInformationsToUpdateCreate)
  },[currentInformationsToUpdateCreate])


  useEffect(()=>{
    console.log('collection element information to Update final ',currentInformationsToUpdateFinal)
  },[currentInformationsToUpdateFinal])

    useEffect(()=>{
    console.log('collection element information to Delete ',currentInformationsToUpdateDelete)
  },[currentInformationsToUpdateDelete])

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
