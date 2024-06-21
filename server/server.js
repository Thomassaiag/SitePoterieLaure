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

//Login

app.post('/connection', async(req, res, next)=>{
    const{userEmail, userPassword}=req.body

    console.log(userEmail)
    console.log(userPassword)

    try {
        const userEmailDB= await pool.query(
            'SELECT user_email, admin_status, user_firstname FROM user_account WHERE user_email=$1;',[userEmail]
        )
        if(userEmailDB.rowCount>0){
            console.log("user exists")
            let adminStatus=userEmailDB.rows[0].admin_status
            let userFirstName=userEmailDB.rows[0].user_firstname
            // console.log(userEmailDB)
            // const userPasswordDB= await pool.query(
            //     'SELECT user_password FROM user_account WHERE user_Password=$1 AND user_email=$2 ',[hashedPassword, userEmail]
            // )
            const hashedPasswordDB= await pool.query(
                'SELECT user_password FROM user_account WHERE user_email=$1 ',[userEmail]
            )
            let hashedPassword=hashedPasswordDB.rows[0].user_password

            console.log(`hashedPassword=> ${hashedPassword}`)
            let doesPasswordMatch=await bcrypt.compare(userPassword,hashedPassword)
            console.log("test bcrypt "+ doesPasswordMatch)
            if(doesPasswordMatch){
                console.log("password matches")
                res.status(200).json({message: "password matches", adminStatus, userFirstName})
            }
            else{
                console.log("password doesn't match")
                res.status(400).json({message: "password doesn't match"})
            }
        }    
        else{
            console.log("user doesn't exist", userEmailDB)
            res.status(400).json({message: "no mail in DB"})
        }
        
        // await pool.query(
        //     'INSERT INTO user_account (user_email, user_password) VALUES ($1,$2))',[userEmail, userPassword]
        // )
    } catch (error) {
        
    }

})



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
