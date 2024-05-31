import React, {useEffect, useState} from 'react'


import { useCollectionElementInformations } from '../contextProvider/CollectionElementInformationsContextProvider'
import { useCollectionElementInformationsToUpdate } from '../contextProvider/CollectionElementInformationsToUpdateContextProvider'
import { useCollectionElementInformationsToUpdateCreate } from '../contextProvider/CollectionElementInformationsToUpdateCreateContextProvider'
import { useCollectionElementInformationsToUpdateDelete } from '../contextProvider/CollectionElementInformationsToUpdateDeleteContextProvider'

export const UpdateCollectionElementInformations = () => {

    const {currentInformations}=useCollectionElementInformations()
    const {currentInformationsToUpdate, setCurrentInformationsToUpdate}=useCollectionElementInformationsToUpdate()
    const {currentInformationsToUpdateCreate, setCurrentInformationsToUpdateCreate}=useCollectionElementInformationsToUpdateCreate()
    const {currentInformationsToUpdateDelete, setCurrentInformationsToUpdateDelete}=useCollectionElementInformationsToUpdateDelete()
    // const [inputIDList, setInputIDList]=useState([])
    
    
    const updateCollectionElementInformations=(e)=>{
        e.preventDefault()
        // console.log(e.target.name)
        setCurrentInformationsToUpdate((prevInformations)=>{
            // console.log("prevInformations =>",prevInformations)
            // console.log(e.target.value)
            return prevInformations.map((prevInformation)=>{
                // console.log(prevInformation)
                let {collection_element_information_uid}=prevInformation
                if(parseInt(collection_element_information_uid)==parseInt(e.target.name)){
                    return {...prevInformation, collection_element_information_text: e.target.value}
                } else {
                    return prevInformation
                }  
            }) 
        })
    }

    const discardInformationInput=async(e,informationId)=>{
        e.preventDefault()
        if(currentInformationsToUpdate.length==1){
            alert('Vous devez conserver au moins une information')
        }else {
            console.log(informationId)
            console.log(currentInformationsToUpdateDelete)
            setCurrentInformationsToUpdateDelete((prevInformationsToUpdateDelete)=>{
                return [...prevInformationsToUpdateDelete, {collectionElementInformationUID:informationId}]
                
            })
            setCurrentInformationsToUpdate((prevInformationsToUpdate)=>{
                return prevInformationsToUpdate.filter((prevInformationToUpdate)=>prevInformationToUpdate.collection_element_information_uid!=informationId)
            })
            console.log('currentInformationsToUpdateDelete =>',currentInformationsToUpdateDelete)
        }
        // try {
        //     let response= await fetch('http://localhost:5000/admin/deleteInformationInput',{
        //         method:'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body:JSON.stringify({
        //             informationId:informationId
        //         })
        //     })
        //     let data=await response.json()
        //     console.log(data)
        // } catch (error) {
        //     console.log(`information didn't get deleted => ${error}`)
            
        // }
    }

    useEffect(()=>{
        if(currentInformations.length>0){
            setCurrentInformationsToUpdate(currentInformations)
            // setInputIDList((prevInputList)=>{
            //     return currentInformationsToUpdate.map((currentInformationToUpdate)=>{
            //         const {collection_element_information_uid}=currentInformationToUpdate
            //         return [...prevInputList,{inputUID:collection_element_information_uid}]
            //     })                
            // })
        }
        else setCurrentInformationsToUpdate([])
    },[currentInformations])


    useEffect(()=>{
        setCurrentInformationsToUpdateDelete([])
    },[currentInformations])


    useEffect(()=>{
        console.log('currentInformationsToUpdate => ',currentInformationsToUpdate)
    },[currentInformationsToUpdate])



    useEffect(()=>{
        console.log('currentInformationsToUpdateDelete when updated=> ',currentInformationsToUpdateDelete)
    },[currentInformationsToUpdateDelete])

    // useEffect(()=>{
    //     console.log('inputIDList=> ',inputIDList)
    // },[currentInformationsToUpdate])


  return (
    <div className='collectionElementInformationsContainer'>
    {
        currentInformationsToUpdate ?(
            currentInformationsToUpdate.map((currentInformationToUpdate)=>{
                let {collection_element_information_text, collection_element_information_uid}=currentInformationToUpdate
                return(
                    <div key={collection_element_information_uid}>
                    <input
                        name={collection_element_information_uid}
                        value={collection_element_information_text}
                        onChange={(e)=>updateCollectionElementInformations(e)}
                        />
                    <button type='button' onClick={(e)=>discardInformationInput(e,collection_element_information_uid)}>Effacer Information</button>
                    </div>
                )
            })
        ):(
            <p>Loading...</p>
        )
    }
    </div>
  )
}
