import React, {useEffect, useState} from 'react'
import { Description } from '../description/Description'
import './Portrait.css'
import { UpdatePortrait } from '../updatePortrait/UpdatePortrait'
const logo  ='../../images/logoLaureSansNom.jpg'

export const Portrait= () => {

  let [portraitData, setPortraitData]=useState()

  const fetchPortraitInformation=async()=>{
    try {
      let response=await fetch('http://localhost:14001/portrait')
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
      <p className='titleText'>VL Céramique - Hand made by Laure</p>
      <div className='portraitPresentationContainer'>
        <div className='portraitPresentationPictureContainer'>
          {
            portraitData ? (

              <img className='presentationPicture' src={portraitData.portrait_picture_url} alt={portraitData.portrait_picture_alt} />
              
            ) : <p>Data Loading</p>
          }
        </div>
        <div className='presentationContainerRight'>
          {
            portraitData?.portrait_description ? (
              <Description descriptionText={portraitData.portrait_description ? portraitData.portrait_description : ""}/>

            ) : <p>Pas d'information de Portrait</p>
          }
          <img src={logo} alt="logo"/>
        </div>
      </div>
    </div>
    {portraitData && portraitData.portrait_description !== undefined && <UpdatePortrait portraitTextProp={portraitData.portrait_description} fetchPortraitInformation={fetchPortraitInformation} /> }
    </>
  )
}
