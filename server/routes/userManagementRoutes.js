const express=require('express')

const route=express.Router()
const {login}=require('../controllers/userManagementController')



route.post(,login)

module.exports={route}


