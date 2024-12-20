const fs = require('fs');
const multer=require('multer')
require('dotenv').config()


const collectionPath=process.env.COLLECTIONPICTUREPATH
const portraitPath=process.env.PORTRAITPICTURESPATH

if (!fs.existsSync(collectionPath)){
    fs.mkdirSync(collectionPath, {recursive: true})
}

const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, collectionPath);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const uploadCollectionPicture=multer({storage:storage})

const storageCollectionElementPicture=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, collectionPath);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const uploadCollectionElementPicture=multer({storage:storageCollectionElementPicture})



if (!fs.existsSync(portraitPath)){
    fs.mkdirSync(portraitPath, {recursive: true})
}

const storagePortraitPicture=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, portraitPath);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

const updatePortraitPicture=multer({storage:storagePortraitPicture})

module.exports={uploadCollectionPicture, uploadCollectionElementPicture, updatePortraitPicture}