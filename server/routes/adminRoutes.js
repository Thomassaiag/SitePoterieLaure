const express=require('express')
const upload=require('../middleware/multerConfig')
const {createNewCollection}=require('../controllers/adminControllers/collectionCreationController')
const router=express.Router()

router.post('/createCollection',upload.single('file'),createNewCollection)


module.exports=router