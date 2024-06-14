const express=require('express')
const {getAllCollectionUids}=require('../controllers/collectionElementControllers/collectionNavigationController')

const router=express.Router()

router.get('/allCollectionsUids',getAllCollectionUids)

module.exports=router