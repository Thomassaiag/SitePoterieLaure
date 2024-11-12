const multer=require('multer')
require('dotenv').config()


const collectionPath=process.env.COLLECTIONPICTUREPATH
const collectionElementPath=process.env.COLLECTIONELEMENTPICTURESPATH
const portraitPath=process.env.PORTRAITPICTURESPATH

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, collectionPath);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const upload=multer({storage:storage})


const storageCollectionElementPicture=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, collectionElementPath);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const uploadCollectionElementPicture=multer({storage:storageCollectionElementPicture})


const storagePortraitPicture=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, portraitPath);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const updatePortraitPicture=multer({storage:storagePortraitPicture})

module.exports={upload, uploadCollectionElementPicture, updatePortraitPicture}