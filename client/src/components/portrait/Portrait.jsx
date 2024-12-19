import React, {useEffect, useState} from 'react'
import { Description } from '../description/Description'
import './Portrait.css'
import { UpdatePortrait } from '../updatePortrait/UpdatePortrait'
import { laureLogo } from '../../data/logos'

import { useConnectionStatus } from '../../contextProvider/ConnectionStatusContextProvider'
const apiUrl=import.meta.env.VITE_API_URL

export const Portrait= () => {

  let [portraitData, setPortraitData]=useState()
  const {connectionAttributes}=useConnectionStatus()


  const fetchPortraitInformation=async()=>{
    try {
      let response=await fetch(`http://${apiUrl}/portrait`)
      if(!response.ok){
        const errorData= await response.json();
        throw new Error(errorData.message || "something went wrong when fetching portrait")
      }
      let jsonData= await response.json() 
      setPortraitData(jsonData[0])
    } catch (error) {
      throw new Error(error.message || 'NetWork error occured')
    }
  }

  useEffect(()=>{
    window.scrollTo(0,0)
    fetchPortraitInformation()
  },[])

  return (
    <>

    <div className="portraitContainer">
      <div className='portraitGridContainer'>


      <h1 className='titleText'>VL Céramique - Hand made by Laure</h1>
      <div className='portraitPresentationPictureContainer'>
        {
          portraitData ? (

            <img className='presentationPicture' src={portraitData.portrait_picture_url} alt={portraitData.portrait_picture_alt} />
            
          ) : <p>Data Loading</p>
        }
      </div>
      <div className='portraitPresentationContainer'>
        {
          portraitData?.portrait_description ? (
            <Description descriptionText={portraitData.portrait_description ? portraitData.portrait_description : ""}/>

          ) : <p>Pas d'information de Portrait</p>
        }
      </div>
      <div className='logoContainer'>
        <img src={laureLogo} alt="logo"/>
      </div>
    </div>
    </div>
    {connectionAttributes.adminConnection && portraitData && portraitData.portrait_description !== undefined && <UpdatePortrait portraitTextProp={portraitData.portrait_description} fetchPortraitInformation={fetchPortraitInformation} /> }
    </>
  )
}
