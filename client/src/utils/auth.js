import { useConnectionStatus } from "../components/contextProvider/ConnectionStatusContextProvider";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const {setConnectionAttributes}=useConnectionStatus()
const [collectionCreationIssue, setCollectionCreationIssue]=useState(false)
let navigate=useNavigate()

const handleInvalidToken=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('connectionAttributes')
    setConnectionAttributes(prevConnectionAttributes=>({
    ...prevConnectionAttributes,
        adminConnection:false,
        connectedUserFirstName:'',
        invalidConnection: true,
        invalidToken: true
    }))
    setCollectionCreationIssue(true)
    navigate('/connection')
    throw new Error('Token Expired, please login again')
}


module.exports={c}