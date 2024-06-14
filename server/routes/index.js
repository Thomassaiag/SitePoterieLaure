const express=require('express')
const contactRoutes=require('./contactRoutes')
const collectionRoutes=require('./collectionRoutes')


const router=express.Router()

router.use('/contact',contactRoutes)
router.use('/collections',collectionRoutes)

module.exports=router