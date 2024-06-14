const express=require('express')
const {getCollectionElement,getCollectionElementPictures}=require('../controllers/collectionElementController')

const router=express.Router()

router.get('/:id',getCollectionElement)
router.get('/:id/pictures',getCollectionElementPictures)

module.exports=router