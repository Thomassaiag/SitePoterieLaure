const express=require('express')
const {upload, uploadCollectionElementPicture, updatePortraitPicture}=require('../middleware/multerConfig')
const {createNewCollection, createCollectionElement,createCollectionElementInformations}=require('../controllers/adminControllers/collectionCreationController')
const {addNewCollectionElementPicture, deleteCollectionElementPicture, updateCollectionElementAttributes, updateCollectionElementInformations,deleteCollectionElementInformationInput}=require('../controllers/adminControllers/collectionUpdateController')
const {deleteCollection}=require('../controllers/adminControllers/collectionDeletionController')
const {updatePortrait, updatePortraitText}=require('../controllers/adminControllers/portraitUpdateController')
const {authenticateToken}=require('../middleware/auth')
const router=express.Router()

router.post('/createCollection',authenticateToken,upload.single('file'),createNewCollection)
router.post('/createCollectionElement',createCollectionElement)
router.post('/createCollectionElementInformations',createCollectionElementInformations)

router.post('/editElement/addNewPicture',uploadCollectionElementPicture.single('file'),addNewCollectionElementPicture)
router.put('/editElement/deleteElementPicture',authenticateToken,deleteCollectionElementPicture)
router.put('/editElement/updateCollectionElementAttributes',authenticateToken,updateCollectionElementAttributes)
router.put('/editElement/updateCollectionElementInformations',updateCollectionElementInformations)
router.delete('/editElement/deleteInformationInput',deleteCollectionElementInformationInput)

router.put('/updatePortrait',updatePortraitPicture.single('portraitPictureFile'),updatePortrait)

router.put('/updatePortraitText',updatePortraitText)

router.put('/deleteCollection', authenticateToken, deleteCollection)


module.exports=router