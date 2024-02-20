import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

export const CollectionItem = () => {
  const [collectionItem, setCollectionItem]=useState([])
  let {id}=useParams()

  useEffect(()=>{
    fetchCollectionItem()
  },[])

  const fetchCollectionItem=async()=>{
    try {
      let response= await fetch(`http://localhost:5000/collections/${id}`)
      let jsonData= await response.json()
      setCollectionItem(jsonData)
    } catch (error) {
      
    }
  }

  return (
    <div>
      {
        collectionItem ? (
          collectionItem.map((item)=>{
            return(
              <div>
              </div>
            )
          })
        ) : (
          <p>Loading Data</p>
        )
      }
    </div>
  )
}
