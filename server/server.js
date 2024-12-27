const express=require('express')
const {connectToDatabase}=require('./config/db')
const path = require('path');

const routes=require ('./routes')
const cors= require('cors')

const app=express()

app.use(express.json({ limit: '10mb' }))

app.use('/images', express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Changed to application/json
    next();
});

app.use('/',routes)

connectToDatabase()

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});



app.listen(14001,'0.0.0.0',()=>{
    console.log("Server started on port 14001")
})
