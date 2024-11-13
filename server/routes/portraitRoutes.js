const express=require('express')
const {getPortrait}=require('../controllers/portraitController')

const router=express.Router()

router.get('/',getPortrait)

module.exports=router