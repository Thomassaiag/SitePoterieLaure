const express =require('express')
const app=express()
const pool=require('./database/db')
const multer=require('multer')
const path=require('path')

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

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});


//Get All collections

app.get('/collections', async (req, res, next)=>{
    try {
        const {rows} = await pool.query(
            "SELECT * FROM collection ORDER BY collection_uid ASC"
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
            ORDER BY collection_uid ASC
            `
        )
        res.json(rows)
    } catch (error) {
        
    }

})

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



const upload=multer({storage:storage})

app.post('/admin/uploadCollection', upload.single('file'), async(req, res, next)=>{

    // console.log(storage.destination)
    const {collectionTitle, collectionDescription}=req.body
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