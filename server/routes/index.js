const express=require('express')
const contactRoutes=require('./contactRoutes')


const router=express.Router()

router.use('/contact',contactRoutes)

module.exports=router