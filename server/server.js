const express=require('express')
const {connectToDatabase}=require('./config/db')

const routes=require ('./routes')
const cors= require('cors')

const app=express()

app.use(express.json())
app.use(cors())

app.use('/',routes)

connectToDatabase()

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});



app.listen(5000,()=>{
    console.log("Server started on port 5000")
})
