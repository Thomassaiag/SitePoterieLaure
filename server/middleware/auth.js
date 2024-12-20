const jwt=require('jsonwebtoken')
require('dotenv').config()


const authenticateToken=(req, res, next)=>{
    const authHeader=req.headers['authorization']
    const token= authHeader?.split(' ')[1]
    if(!token){
        return res.status(401).json({error: 'Access denied, no token provided'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded =>',decoded)
        req.user=decoded
        next()
     } catch (error) {
        if(error.name==='TokenExpiredError'){
            console.log('Token expired')
            return res.status(401).json({error: 'Access denied, token expired'})
        }
        console.log('Invalid Token')
        return res.status(403).json({message: 'invalid Token'})
    }
}
module.exports={authenticateToken}