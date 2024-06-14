const express=require('express')
const {getCollectionElement}=require('../controllers/collectionElementController')

const router=express.Router()

router.get('/:id',getCollectionElement)

module.exports=router