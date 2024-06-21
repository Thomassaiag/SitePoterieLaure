const express=require('express')
const {pool,connectToDatabase}=require('./config/db')
const multer=require('multer')
const path=require('path')

const routes=require ('./routes')
const cors= require('cors')
require('dotenv').config()

const app=express()

app.use(express.json())
app.use(cors())

app.use('/',routes)

const bcrypt=require('bcrypt')
const {hashPassword}=require('./passwordEncryption')

const collectionElementPath=process.env.COLLECTIONELEMENTPICTURESPATH


connectToDatabase()


app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});



//----------------------------------------------------------------------



// Add new user account

app.post('/accountCreation',async (req, res, next)=>{
    const{userFirstName, userLastName, userEmail, userPassword}=req.body
    console.log(userFirstName, userLastName, userEmail, userPassword)
    let hashedPassword=await hashPassword(userPassword)
    console.log(hashedPassword)
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
                'INSERT INTO user_account(user_email, user_password, user_firstName, user_lastName, admin_status) VALUEs($1,$2,$3,$4, $5)',[userEmail, hashedPassword,userFirstName, userLastName, false]
            )
            const newUserEmailDB= await pool.query(
                'SELECT user_email FROM user_account WHERE user_email=$1',[userEmail]
            )
            console.log(newUserEmailDB)    
            if(newUserEmailDB.rowCount==1){
                res.status(200).json({message: "account successfuly created"})
            }
            else res.status(400).json({message : "account not created"})
        }
    }
    catch (error){

    }
})




app.listen(5000,()=>{
    console.log("Server started on port 5000")
})
