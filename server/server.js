const express =require('express')
const app=express()
const pool=require('./database/db')

app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});


//Get All collections

app.get('/collections', async (req, res, next)=>{
    try {
        const {rows} = await pool.query(
            "SELECT * FROM collection"
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


// get 1 collection Element pictures
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

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})