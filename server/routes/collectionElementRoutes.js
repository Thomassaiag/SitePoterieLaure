const express=require('express')
const {getCollectionElement,getCollectionElementPictures,getCollectionElementIndividualPicture,getCollectionElementInformation}=require('../controllers/collectionElementController')

const router=express.Router()

router.get('/:id',getCollectionElement)
router.get('/:id/pictures',getCollectionElementPictures)
router.get('/:id/pictures/:pictureId',getCollectionElementIndividualPicture)
router.get('/:id/information',getCollectionElementInformation)

module.exports=router