import React from 'react'
import { Description } from './Description'
import { portraitText } from '../data/portraitText'

export const Portrait= () => {
  return (
    <div className="portrait_Class">
        <h1>VL Céramique - Hand made by Laure</h1>
        <span>
            <img scr="" alt="" />
            <div>
                <h2><Description descriptionText={portraitText}/></h2>
                <img src="" alt="logo"/>
            </div>
        </span>

    </div>
  )
}
