const express=require('express')
const contactRoutes=require('./contactRoutes')
const collectionRoutes=require('./collectionRoutes')
const collectionElementRoutes=require('./collectionElementRoutes')
const adminRoutes=require('./adminRoutes')


const router=express.Router()

router.use('/contact',contactRoutes)
router.use('/collections',collectionRoutes)
router.use('/collectionElement',collectionElementRoutes)
router.use('/admin',adminRoutes)


module.exports=router