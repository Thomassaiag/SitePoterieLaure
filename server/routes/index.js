const express=require('express')
const contactRoutes=require('./contactRoutes')
const collectionRoutes=require('./collectionRoutes')
const collectionElementRoutes=require('./collectionElementRoutes')

const router=express.Router()

router.use('/contact',contactRoutes)
router.use('/collections',collectionRoutes)
router.use('/',collectionElementRoutes)

module.exports=router