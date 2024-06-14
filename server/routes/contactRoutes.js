const express=require('express')
const {sendMessage, subscribeToMailingList}=require('../controllers/contactController')

const router=express.Router()

router.post('/message',sendMessage)
router.post('/subscribe',subscribeToMailingList)

module.exports=router