const express=require('express')

const router=express.Router()
const {login,createUserAccount}=require('../controllers/userManagementController')


router.post('/login',login)
router.post('/createUserAccount',createUserAccount)

module.exports=router


