const express=require('express')
const {getAllCollections}=require('../controllers/collectionController')

const router=express.Router()

router.get('/',getAllCollections)

module.exports=router