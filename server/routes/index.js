const express=require('express')
const contactRoutes=require('./contactRoutes')
const collectionRoutes=require('./collectionRoutes')
const collectionElementRoutes=require('./collectionElementRoutes')
const adminRoutes=require('./adminRoutes')
const userManagementRoutes=require('./userManagementRoutes')


const router=express.Router()

router.use('/contact',contactRoutes)
router.use('/collections',collectionRoutes)
router.use('/collectionElement',collectionElementRoutes)
router.use('/admin',adminRoutes)
route.use('user', userManagementRoutes)


module.exports=router