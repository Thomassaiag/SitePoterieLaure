export const handleInvalidToken=(navigate,setConnectionAttributes) =>{
    localStorage.removeItem('token')
    localStorage.removeItem('connectionAttributes')
    setConnectionAttributes(prevConnectionAttributes=>({
    ...prevConnectionAttributes,
        adminConnection:false,
        connectedUserFirstName:'',
        invalidConnection: true,
        invalidToken: true
    }))
    navigate('/connection')
    throw new Error('Token Expired, please login again')
}