const express=require('express')
const {getAllCollections}=require('../controllers/collectionControllers/collectionController')
const {getAllCollectionUids, getPrevAndNextCollections}=require('../controllers/collectionControllers/collectionNavigationController')


const router=express.Router()

router.get('/',getAllCollections)
router.get('/allCollectionsUids',getAllCollectionUids)
router.get('/:id/collection',getPrevAndNextCollections)


module.exports=router