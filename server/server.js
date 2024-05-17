const express =require('express')
const app=express()
const pool=require('./database/db')
const multer=require('multer')
const path=require('path')
const nodemailer =require('nodemailer')

const bcrypt=require('bcrypt')
const {hashPassword}=require('./passwordEncryption')


const cors= require('cors')

const collectionPath="C:/Users/Moi/OneDrive/Documents/Ada/ProjetsPerso/SiteWebLaure/client/public/images/Collections/"

app.use(express.json())


app.use(cors())

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//   next();
// });

console.log(typeof process.env.DBPASSWORD, process.env.DBPASSWORD)

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});


//Get All collections

app.get('/collections', async (req, res, next)=>{
    try {
        const {rows} = await pool.query(
            `SELECT * FROM collection
            WHERE collection_deletionflag=false
            ORDER BY collection_uid ASC`
        )
        res.json(rows) 
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'something went wrong'})
    }
})

app.get(`/allCollectionsUids`, async(req, res, next)=>{
    try {
        const {rows}= await pool.query(
            `SELECT collection_uid
            FROM collection
            WHERE collection_deletionflag=false
            ORDER BY collection_uid ASC`
        )
        res.json(rows)
    } catch (error) {
        
    }

})

//Get 1 collection

app.get('/collections/:id/collection', async (req, res, next)=>{
    try {
        const {id}=req.params
        const {rows} = await pool.query(
            `WITH NextRow AS (
            SELECT collection_picture_url, collection_picture_alt, collection_uid
            FROM collection
            WHERE collection_uid > $1
            ORDER BY collection_uid ASC
            LIMIT 1
            ),
            PrevRow AS (
                SELECT collection_picture_url, collection_picture_alt, collection_uid
                FROM collection
                WHERE collection_uid < $1
                ORDER BY collection_uid DESC
                LIMIT 1
            ),
            FirstRow AS (
                SELECT collection_picture_url, collection_picture_alt, collection_uid
                FROM collection
                ORDER BY collection_uid ASC
                LIMIT 1
            ),
            LastRow AS (
                SELECT collection_picture_url, collection_picture_alt, collection_uid
                FROM collection
                ORDER BY collection_uid DESC
                LIMIT 1
            )
            Select *
            FROM
            (
                SELECT * FROM NextRow
                UNION ALL
                SELECT * FROM PrevRow
                UNION ALL
                SELECT * FROM FirstRow
                WHERE NOT EXISTS (SELECT 1 FROM NextRow)
                UNION ALL
                SELECT * FROM LastRow
                WHERE NOT EXISTS (SELECT 1 FROM PrevRow)
                
            )
            ORDER BY
				CASE 
					WHEN 1 =(SELECT MIN (collection_uid) FROM collection)
					OR 1 = (SELECT MAX (collection_uid) FROM collection)
					THEN collection_uid*-1
					ELSE collection_uid
			END
            `,[id]
        )
        res.json(rows) 
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'something went wrong'})
    }
})




//Get 1 collection Element description

app.get('/collections/:id', async (req, res, next)=>{
    try {
        const {id}=req.params
        const {rows} = await pool.query(
            `SELECT * FROM collection_element WHERE collection_UID=$1`,[id]
        )
        res.json(rows) 
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'something went wrong'})
    }
})

// get 1 collection Element pictures
app.get('/collections/:id/pictures', async (req, res, next)=>{
    try {
        const {id}=req.params
        const {rows} = await pool.query(
            `SELECT * FROM collection_element_pictures WHERE collection_UID=$1`,[id]
        )
        res.json(rows) 
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'something went wrong'})
    }
})

// get 1 collection Element 1 selected picture
app.get('/collections/:id/pictures/:pictureId', async (req, res, next)=>{
    try {
        const {id, pictureId}=req.params
        const {rows} = await pool.query(
            `SELECT * FROM collection_element_pictures WHERE collection_UID=$1 AND collection_element_picture_uid=$2`,[id, pictureId]
        )
        res.json(rows) 
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'something went wrong'})
    }
})


// get 1 collection Element information
app.get('/collections/:id/information', async (req, res, next)=>{
    try {
        const {id}=req.params
        const {rows} = await pool.query(
            `SELECT * FROM collection_element_informations WHERE collection_UID=$1`,[id]
        )
        res.json(rows) 
    }
    catch (err) {
        console.error('Error executing query',err)
        res.status(500).json({error:'something went wrong'})
    }
})



//Post 1 new Collection ID in Collection Table

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, collectionPath);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})


//Post contact email to emailtable

app.post('/contact',async(req,res, next)=>{
    const {email}=req.body
    console.log(`contactEmail=>${email}`)
    // console.log(`contactEmail keys=>${Object.keys(email)}`)
    try{
        const existingEmail= await pool.query(
            'SELECT * FROM newsletter_contact WHERE email=$1',[email]
        )
        console.log(existingEmail.rowCount)
        if (existingEmail.rowCount>0){
            console.log('email présent')
            return res.status(400).json({message:'email already exists'})
        }
        else{
            console.log('email absent')
            await pool.query(
                'INSERT INTO newsletter_contact (email) VALUES($1)',[email]
                )
            return res.status(200).json({message:'Email submitted successfully'})
        }
    }
    catch(err){
        console.error('Error adding newCollection', err)
        res.status(500).json({message:'Server Error'})
    }
})



//Delete 1 collection


app.put('/collections/admin/deleteCollection/${id}',async(req, res, next)=>{
    try {
        let {collectionUID}=req.body
        console.log(`collectionUID => ${collectionUID}`)
        let collectionToDelete=await pool.query(
            `UPDATE collection
            SET collection_deletionflag=true
            WHERE collection_uid=$1`,[collectionUID]
        )
        if(collectionToDelete){
            return res.status(200).json({message:"collection deleted"})
            console.log("collection deleted")
        }
        else {
            return res.status(201).json({message:"collection didn't deleted"})
            console.log("the collection didn't get deleted")
        }
    } catch (err) {
        console.error('error deleting collection =>',err )
        return res.status(400).json({message:"Deletion wasn't completed due to an error"})
    }


})

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


//Send message to site admin


app.post('/contact/message', async (req, res,next)=>{
    const {firstName,lastName,object,senderEmail,senderMessage}=req.body
    console.log(`firstName => ${firstName}`)
    const transporter=nodemailer.createTransport({
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user:process.env.MAILUSER,
            pass:process.env.MAILPASSWORD
        }
    })

    const mailOptions={
        from: 'thomas.saiag@gmail.com',
        to: 'thomas.saiag@gmail.com',
        subject:object,
        text: `message from ${firstName} ${lastName} : ${senderMessage}`
    }

    try
    {  await transporter.sendMail(mailOptions)
        res.status(200).send({message: 'Email sent successfuly'})
    }

    catch(error){
        console.error('Error sending email',error)
        res.status(400).send({message: 'Email not sent'})
    }
    
})

const upload=multer({storage:storage})

app.post('/admin/uploadCollection', upload.single('file'), async(req, res, next)=>{

    const {collectionTitle, collectionDescription}=req.body
    console.log(collectionTitle)
    const collectionPictureAlt=`Image ${collectionTitle}`
    const collectionPictureUrl=`/images/Collections/${req.file.originalname}`

    try{
        const newCollection=await pool.query(
            'INSERT INTO collection (collection_title, collection_description, collection_picture_url, collection_picture_alt) VALUES ($1, $2, $3, $4) RETURNING *',
            [collectionTitle, collectionDescription, collectionPictureUrl, collectionPictureAlt]
        )
        res.json(newCollection.rows[0])
    }
    catch(err){
        console.error('Error adding newCollection', err)
        res.status(500).send('Server Error')
    }
})

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})