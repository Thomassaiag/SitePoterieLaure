const {pool}=require("../config/db")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {hashPassword}=require('../middleware/passwordEncryption')
require('dotenv').config()


//Login
const login=async(req, res, next)=>{
    const{userEmail, userPassword}=req.body
    try {
        const result= await pool.query(
            'SELECT user_email, admin_status, user_firstname FROM user_account WHERE user_email=$1;',[userEmail]
        )
        if(result.rowCount>0){
            console.log("user exists")
            let user=result.rows[0]
            console.log(user)
            const hashedPasswordDB= await pool.query(
                'SELECT user_password FROM user_account WHERE user_email=$1 ',[userEmail]
            )
            let hashedPassword=hashedPasswordDB.rows[0].user_password
            let doesPasswordMatch=await bcrypt.compare(userPassword,hashedPassword)
            if(doesPasswordMatch){
                console.log("password matches")
                const token=jwt.sign(
                    {
                        userId:user.user_uid,
                        email:user.user_email,
                        firstName:user.user_firstname,
                        adminStatus:user.admin_status
                    },
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRATION}
                )
                res.status(200).json({
                    message: "password matches", 
                    user: {
                        userFirstName:user.user_firstname,
                        adminStatus: user.admin_status
                    },
                    token
                })
            }
            else{
                console.log("password doesn't match")
                res.status(400).json({message: "password doesn't match"})
            }
        }    
        else{
            console.log("user doesn't exist", result)
            res.status(401).json({message: "no mail in DB"})
        }

    } catch (error) {
       console.log()
       res.status(500).json({message: 'Error Login, server side'}) 
    }
}


//Account creation
const createUserAccount=async (req, res, next)=>{
    const{userFirstName, userLastName, userEmail, userPassword}=req.body
    let hashedPassword=await hashPagissword(userPassword)
    try{
        const userEmailDB=await pool.query(
            'SELECT user_email FROM user_account WHERE user_email=$1',[userEmail]
        )
        if(userEmailDB.rowCount>0){
            console.log("this account already exists")
            res.status(400).json({message: "this account already exists"})
        }
        else{
            const newUser=await pool.query(
                'INSERT INTO user_account(user_email, user_password, user_firstName, user_lastName, admin_status) VALUES ($1,$2,$3,$4, $5) RETURNING user_uid, user_email',[userEmail, hashedPassword,userFirstName, userLastName, false]
            )
            const newUserEmailDB= await pool.query(
                'SELECT user_email FROM user_account WHERE user_email=$1',[userEmail]
            ) 
            if(newUserEmailDB.rowCount==1){

                //set JWT
                const token=jwt.sign(
                    { 
                        userId: newUser.rows[0].user_uid,
                        userEmail: newUser.rows[0].user_email},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_EXPIRATION}
                )

                //

                res.status(201).json({
                    message: "account successfuly created", 
                    token,
                    user:{
                        id: newUser.rows[0].user_uid,
                        email: newUser.rows[0].user_email
                    }
                })
            }
            else res.status(400).json({message : "account not created"})
        }
    }
    catch (error){
        res.status(500).json({message: "Couldn\'t created account"})
    }
}


module.exports={login, createUserAccount}