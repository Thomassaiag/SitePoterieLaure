const jwt=require('jsonwebtoken')
require('dotenv').config()


const authenticateToken=(req, res, next)=>{
    try {
        const authHeader=req.headers['authorization']
        const token= authHeader?.split(' ')[1]
        console.log('authHeader ',authHeader)
        console.log('token ',token)
        console.log(jwt)
        if(!token){
            return res.status(401).json({error: 'Access denied, no token provided'})
        }
        console.log('JWT_SECRET =>',process.env.JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded =>',decoded)
        req.user=decoded
        next()
     } catch (error) {
        
        res.status(403).json({message: 'invald Token'})
    }
}
module.exports={authenticateToken}