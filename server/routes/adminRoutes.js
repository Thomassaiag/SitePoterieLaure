const express=require('express')
const {upload, uploadCollectionElementPicture, updatePortraitPicture}=require('../middleware/multerConfig')
const {createNewCollection, createCollectionElement,createCollectionElementInformations}=require('../controllers/adminControllers/collectionCreationController')
const {addNewCollectionElementPicture, deleteCollectionElementPicture, updateCollectionElementAttributes, updateCollectionElementInformations,deleteCollectionElementInformationInput}=require('../controllers/adminControllers/collectionUpdateController')
const {deleteCollection}=require('../controllers/adminControllers/collectionDeletionController')
const {updatePortrait, updatePortraitText}=require('../controllers/adminControllers/portraitUpdateController')
const router=express.Router()

router.post('/createCollection',upload.single('file'),createNewCollection)
router.post('/createCollectionElement',createCollectionElement)
router.post('/createCollectionElementInformations',createCollectionElementInformations)

router.post('/editElement/addNewPicture',uploadCollectionElementPicture.single('file'),addNewCollectionElementPicture)
router.put('/editElement/deleteElementPicture',deleteCollectionElementPicture)
router.put('/editElement/updateCollectionElementAttributes',updateCollectionElementAttributes)
router.put('/editElement/updateCollectionElementInformations',updateCollectionElementInformations)
router.delete('/editElement/deleteInformationInput',deleteCollectionElementInformationInput)

router.put('/updatePortrait',updatePortraitPicture.single('portraitPictureFile'),updatePortrait)

router.put('/updatePortraitText',updatePortraitText)

router.put('/deleteCollection',deleteCollection)


module.exports=router