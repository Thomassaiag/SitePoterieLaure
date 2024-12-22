const fs = require('fs');
const multer=require('multer')
require('dotenv').config()


const collectionPath=process.env.COLLECTIONPICTUREPATH
const portraitPath=process.env.PORTRAITPICTURESPATH
console.log(collectionPath)
console.log(portraitPath)
const createStorage=(path)=>{

    try {
        if (!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive: true})
    }
    } catch (error) {
        console.error('failed to create path for collection', error)
    }

    return multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path);
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})
}

if (!collectionPath || !portraitPath) {
    throw new Error('Environment variables COLLECTIONPICTUREPATH and PORTRAITPICTURESPATH must be defined.');
}


const uploadCollectionPicture=multer({storage:createStorage(collectionPath)})
const uploadCollectionElementPicture=multer({storage:createStorage(collectionPath)})
const updatePortraitPicture=multer({storage:createStorage(portraitPath)})

module.exports={uploadCollectionPicture, uploadCollectionElementPicture, updatePortraitPicture}