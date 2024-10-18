import React, {useEffect, useState} from 'react'
import { Description } from '../description/Description'
import { portraitText } from '../../data/portraitText'
import './Portrait.css'
import { UpdatePortrait } from '../updatePortrait/UpdatePortrait'
const logo  ='../../images/logoLaureSansNom.jpg'
const imageLeft='../../images/poteriePresentation.jpg'

export const Portrait= () => {


  let [portraitData, setPortraitData]=useState(null)

  const fetchPortraitInformation=async()=>{
    try {
      let response=await fetch('http://localhost:5000/portrait')
      if(!response.ok){
        const errorData= await response.json();
        throw new Error(errorData.message || "something went wrong when fetching portrait")
      }
      let jsonData= await response.json() 
      console.log(jsonData[0])
      setPortraitData(jsonData[0])
    } catch (error) {
      throw new Error(error.message || 'NetWork error occured')
    }
  }

  useEffect(()=>{
    window.scrollTo(0,0)
    fetchPortraitInformation()
  },[])

  useEffect(()=>{
    console.log('portraitData => '+portraitData)
  },[portraitData])
  return (
    <>
    <div className="portraitContainer">
      <p className='titleText'>VL Céramique - Hand made by Laure</p>
      <div className='portraitPresentationContainer'>
        <div className='portraitPresentationPictureContainer'>
          {
            portraitData ? (

              <img className='presentationPicture' src={portraitData.portrait_picture_url} alt={portraitData.portrait_picture_alt} />
              
            ) : <p>DataL</p>
          }
        </div>
        <div className='presentationContainerRight'>
          {
              portraitData ? (
              <Description descriptionText={portraitData.portrait_description}/>

            ) : <p>Data Loading...</p>
          }
          <img src={logo} alt="logo"/>
        </div>
      </div>
    </div>
    <UpdatePortrait portraitTextProp={portraitText} />
    </>
  )
}
