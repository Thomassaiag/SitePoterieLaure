const express=require('express')
const {upload, uploadCollectionElementPicture}=require('../middleware/multerConfig')
const {createNewCollection, createCollectionElement,createCollectionElementInformations}=require('../controllers/adminControllers/collectionCreationController')
const {addNewCollectionElementPicture, deleteCollectionElementPicture, updateCollectionElementAttributes}=require('../controllers/adminControllers/collectionUpdateController')
const {deleteCollection}=require('../controllers/adminControllers/collectionDeletionController')
const router=express.Router()

router.post('/createCollection',upload.single('file'),createNewCollection)
router.post('/createCollectionElement',createCollectionElement)
router.post('/createCollectionElementInformations',createCollectionElementInformations)

router.post('/editElement/addNewPicture',uploadCollectionElementPicture.single('file'),addNewCollectionElementPicture)
router.put('/editElement/deleteElementPicture',deleteCollectionElementPicture)
router.put('/editElement/updateCollectionElementAttributes',updateCollectionElementAttributes)

router.put('/deleteCollection',deleteCollection)


module.exports=router