const express=require('express')
const upload=require('../middleware/multerConfig')
const {createNewCollection, createCollectionElement}=require('../controllers/adminControllers/collectionCreationController')
const router=express.Router()

router.post('/createCollection',upload.single('file'),createNewCollection)
router.post('/createCollectionElement',createCollectionElement)

module.exports=router