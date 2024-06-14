const multer=require('multer')
require('dotenv').config()
const collectionPath=process.env.COLLECTIONPICTUREPATH

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, collectionPath);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})


const upload=multer({storage:storage})

module.exports=upload